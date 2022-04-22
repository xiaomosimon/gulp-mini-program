Component({
  options: {
    styleIsolation: 'apply-shared'
  },
  properties: {
    className: String,
    customStyle: String,
    swiperList: {
      type: Array,
      value: []
    }
  },
  data: {
    swiperDotIndex: 0
  },
  methods: {
    onSwiperChange(e) {
      this.setData({
        swiperDotIndex: e.detail.current
      });
    },
    onNavigateTapped(e) {
      e.currentTarget.dataset.path && this.triggerEvent('onNavigateTapped', e.currentTarget.dataset);
    },
  }
})