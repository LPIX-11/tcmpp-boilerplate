Component({
  properties: {
    value: { type: Number, value: 1 },
    min: { type: Number, value: 1 },
    max: { type: Number, value: 99 },
    name: String,
    containerClass: { type: String, value: '' },
    iconClass: { type: String, value: '' },
    valueClass: { type: String, value: '' }
  },
  data: {},
  methods: {
    minus() {
      if (this.data.value > this.data.min) {
        this.triggerEvent('change', { name: this.data.name, value: this.data.value - 1 });
      }
    },
    plus() {
      if (this.data.value < this.data.max) {
        this.triggerEvent('change', { name: this.data.name, value: this.data.value + 1 });
      }
    }
  }
});