Component({
  options: {
    multipleSlots: true
  },
  properties: {
    options: Array,
    value: String,
    containerClass: { type: String, value: '' },
    itemClass: { type: String, value: '' },
    activeClass: { type: String, value: '' },
    inactiveClass: { type: String, value: '' }
  },
  methods: {
    onSelect(e) {
      const value = e.currentTarget.dataset.value;
      this.triggerEvent('change', { value });
    }
  }
});