
/**
 * index
 */
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    message: {
      type: String,
      value: '',
    },
    align: {
      type: String,
      value: 'left', // left, center, right
    },
    fontWeight: {
      type: String,
      value: 'normal', // normal, bold, lighter, bolder, or 100-900
    },
    colour: {
      type: String,
      value: '#000000', // default black
    },
    fontSize: {
      type: String,
      value: '16px', // default 16px
    },
    textDecoration: {
      type: String,
      value: 'none', // none, underline, overline, line-through
    },
    ellipsis: {
      type: Boolean,
      value: false, // whether to truncate text with ellipsis
    },
    lineHeight: {
      type: String,
      value: '1.4', // default line-height
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})

