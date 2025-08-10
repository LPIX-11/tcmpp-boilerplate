
/**
 * index
 */
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    containerClass: String,
    bgColor: {
      type: String,
      value: '#F3F3F3'
    },
    enableBg: {
      type: Boolean,
      value: false
    },
    icon: String,
    width: {
      type: Number,
      value: 50
    },
    height: {
      type: Number,
      value: 50
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    BASE_URL: '/assets/icons/global/',
    CONTAINER: {},
  },

  lifetimes: {
    attached() {
      this.setData({
        CONTAINER: {
          HEIGHT: this.properties.height + 40,
          WIDTH: this.properties.width + 40,
        }
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})

