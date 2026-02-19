/**
 * Nav Bar Component
 * Custom navigation bar with safe area handling, back button, and title
 */
Component({
  properties: {
    title: { type: String, value: '' },
    showBack: { type: Boolean, value: true },
    transparent: { type: Boolean, value: false },
  },

  data: {
    statusBarHeight: 0,
    navHeight: 44,
  },

  lifetimes: {
    attached() {
      const sysInfo = wx.getSystemInfoSync();
      this.setData({
        statusBarHeight: sysInfo.statusBarHeight || 20,
      });
    },
  },

  methods: {
    goBack() {
      const pages = getCurrentPages();
      if (pages.length > 1) {
        wx.navigateBack();
      }
    },
  },
});
