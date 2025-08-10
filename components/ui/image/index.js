// components/tc-image/index.js
Component({
  options: {
    virtualHost: true,
    multipleSlots: true
  },

  properties: {
    // Core
    src: String,
    fallbackSrc: String,
    mode: { type: String, value: 'aspectFill' },
    lazyLoad: { type: Boolean, value: true },
    showMenuByLongpress: Boolean,

    // Styling
    width: String,
    height: String,
    containerClass: String,
    imageClass: String,
    containerStyle: String,
    imageStyle: String,
    overlayClass: String,
    badge: String,
    badgeClass: String,
    badgeStyle: String,

    // UX text
    loadingText: String,
    errorText: String,
    retryText: String,
    errorIcon: { type: String, value: '⚠️' },

    // Behavior
    previewable: Boolean,
    previewUrls: Array,
    retryCount: { type: Number, value: 3 },
    retryDelay: { type: Number, value: 1000 },

    // Integration
    cacheKey: String,
    namespace: { type: String, value: 'tc-image' }
  },

  data: {
    loading: true,
    error: false,
    currentRetry: 0,
    computedSrc: '',
    imageId: '',
    hasOverlay: false
  },

  lifetimes: {
    created() {
      this.data.imageId = `tc-image-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      this.eventBus = getApp().eventBus;
    },

    attached() {
      this.init();
      this.checkOverlaySlot();
      this.emit('image:created', this.getImageInfo());
    },

    detached() {
      this.emit('image:destroyed', { id: this.data.imageId });
    }
  },

  methods: {
    init() {
      const src = this.properties.src;
      if (src) {
        this.loadImage(src);
      } else {
        this.setData({ loading: false, error: true });
      }
    },

    loadImage(src) {
      const cacheKey = this.properties.cacheKey || src;
      if (this.isImageCached(cacheKey)) {
        this.setData({ computedSrc: src, loading: false, error: false });
        return;
      }

      wx.getImageInfo({
        src,
        success: () => {
          this.setData({ computedSrc: src, loading: false, error: false });
          this.cacheImage(cacheKey);
          this.emit('image:loaded', this.getImageInfo());
        },
        fail: () => {
          this.handleImageError();
        }
      });
    },

    handleImageError() {
      const { currentRetry } = this.data;
      const { retryCount, retryDelay, fallbackSrc, src } = this.properties;

      if (currentRetry < retryCount) {
        this.setData({ currentRetry: currentRetry + 1 });
        setTimeout(() => {
          this.emit('image:retry', { count: this.data.currentRetry });
          this.loadImage(fallbackSrc || src);
        }, retryDelay);
      } else {
        this.setData({ loading: false, error: true });
        this.emit('image:error', this.getImageInfo());
      }
    },

    previewImage() {
      const urls = this.properties.previewUrls || [this.data.computedSrc];
      wx.previewImage({
        current: this.data.computedSrc,
        urls
      });
    },

    onImageLoad(e) {
      this.emit('image:load', { id: this.data.imageId, detail: e.detail });
    },

    onImageError() {
      this.handleImageError();
    },

    onImageTap() {
      if (this.properties.previewable) {
        this.previewImage();
      }
      this.emit('image:tap', this.getImageInfo());
    },

    onImageLongpress() {
      this.emit('image:longpress', this.getImageInfo());
    },

    onErrorTap() {
      this.setData({ loading: true, error: false, currentRetry: 0 });
      this.loadImage(this.properties.src);
    },

    checkOverlaySlot() {
      this.createSelectorQuery()
        .select('.tc-image-overlay')
        .boundingClientRect()
        .exec(res => {
          this.setData({ hasOverlay: res[0] !== null });
        });
    },

    isImageCached(key) {
      const cache = wx.getStorageSync('tc-image-cache') || {};
      return cache[key] && (Date.now() - cache[key].timestamp < 3600000);
    },

    cacheImage(key) {
      const cache = wx.getStorageSync('tc-image-cache') || {};
      cache[key] = { timestamp: Date.now() };
      wx.setStorageSync('tc-image-cache', cache);
    },

    emit(event, payload) {
      if (this.eventBus) {
        this.eventBus.emit(`${this.properties.namespace}:${event}`, payload);
      }
    },

    // Public API
    reload() {
      this.setData({ loading: true, error: false, currentRetry: 0 });
      this.loadImage(this.properties.src);
    },

    getImageInfo() {
      return {
        id: this.data.imageId,
        src: this.data.computedSrc,
        loading: this.data.loading,
        error: this.data.error
      };
    }
  }
});