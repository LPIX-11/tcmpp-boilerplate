Component({
  options: {
    multipleSlots: true
  },
  properties: {
    tabs: {
      type: Array,
      value: []
    },
    default: {
      type: String,
      value: ''
    },
    containerClass: { // For the main tabs wrapper
      type: String,
      value: ''
    },
    itemContainerClass: { // For each tab item
      type: String,
      value: ''
    },
    activeItemContainerClass: { // For each active tab item
      type: String,
      value: ''
    }
  },
  data: {
    activeKey: ''
  },
  lifetimes: {
    attached() {
      const tabs = this.data.tabs;
      this.setData({
        activeKey: this.data.default || (tabs[0] ? tabs[0].key : '')
      });
    }
  },
  methods: {
    onTabClick(e) {
      const key = e.currentTarget.dataset.key;
      this.setData({ activeKey: key });
      this.triggerEvent('changedActive', { key });
    }
  }
});