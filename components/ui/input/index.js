Component({
  options: {
    multipleSlots: true
  },
  properties: {
    value: String,
    placeholder: String,
    type: { type: String, value: 'text' },
    readonly: { type: Boolean, value: false },
    containerClass: String,
    icon: String,
    showResults: { type: Boolean, value: false },
    resultClass: String,
    results: { type: Array, value: [] }
  },
  methods: {
    onInput(e) {
      this.triggerEvent('input', { value: e.detail.value });
    },
    onIconTap() {
      this.triggerEvent('iconTap');
    },
    onSelectResult(e) {
      // delegate to parent, pass data attributes
      this.triggerEvent('selectResult', e);
    },
    onDateChange(e) {
      this.triggerEvent('dateChanged', { value: e.detail.value });
    }
  }
});