/**
 * Button Component
 * Primary/secondary variants with loading state and press animation
 */
Component({
  properties: {
    disabled: {
      type: Boolean,
      value: false,
    },
    loading: {
      type: Boolean,
      value: false,
    },
    type: {
      type: String,
      value: 'primary', // 'primary' | 'secondary'
    },
  },

  data: {
    pressed: false,
  },

  methods: {
    executionAction() {
      if (!this.properties.disabled && !this.properties.loading) {
        this.triggerEvent('onPress');
      }
    },
    onPressStart() {
      if (!this.properties.disabled) {
        this.setData({ pressed: true });
      }
    },
    onPressEnd() {
      this.setData({ pressed: false });
    },
  },
});
