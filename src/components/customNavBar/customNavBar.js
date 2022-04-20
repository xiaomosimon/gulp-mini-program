// components/customNavBar/customNavBar.js
/**
 * 使用方式：
 * json文件引入,设置 "navigationStyle": "custom"
 * wxml文件：
 * <custom-nav-bar backTitleStyle="margin-left:64rpx;font-size:34rpx;font-weight:600;" />
 */
/**
 * 兼容：如果要在顶部进行scroll-view设置阈值
 * <scroll-view class="{{refresherTriggered ? 'refresher-margin-top' : ''}}" />
 * .refresher-margin-top {
 *    margin-top: 80rpx;
 * }
 */
/**
 * properties:
 * title 中间标题文字
 * titleStyle 中间标题文字样式
 * backgroundColor 背景颜色，支持任何正规格式颜色值,包括'transparent'
 * transition 背景颜色改变是否使用过渡
 * back 左侧返回按钮是否显示，显示文字还是left图标
 * backTitleStyle 左侧文字样式
 * slotBackIcon 是否自定义左侧图标
 * backIconColor 暂只支持 'white' or 'black'
 * 
 * 具名插槽slot:
 * back
 * title
 * backIcon
 */
Component({
  options: {
    multipleSlots: true
  },
  properties: {
    title: {
      type: String,
      value: ''
    },
    titleStyle: {
      type: String,
      value: ''
    },
    // background相关
    // 支持任何正规格式颜色值,包括transparent
    backgroundColor: {
      type: String,
      value: ''
    },
    transition: {
      type: Boolean,
      value: false
    },
    // back相关
    back: {
      type: Boolean,
      optionalTypes: [String],
      value: false
    },
    backTitleStyle: {
      type: String,
      value: ''
    },
    // 自定义左侧图标
    slotBackIcon: {
      type: Boolean,
      value: false
    },
    // 暂只支持 white or black
    backIconColor: {
      type: String,
      value: 'black'
    }
  },
  data: {
    navBarTop: 0,
    navBarHeight: 0,
    showBack: false,
    backTitle: ''
  },
  observers: {
    // 有时非attached时改变，eg 需根据页面数据来判断后改变
    'back': function (back) {
      let showBack = false;
      const backType = typeof back;
      let backTitle = '';
      if (backType === 'string') {
        showBack = true;
        backTitle = back;
      } else if (back) {
        showBack = back;
      }
      this.setData({
        showBack,
        backTitle,
      })
    }
  },
  lifetimes: {
    attached() {
      // 获取手机状态栏高度
      let phoneStatusBarHeight = 0;
      try {
        phoneStatusBarHeight = wx.getSystemInfoSync().statusBarHeight;
      } catch (e) {}
      // 获取胶囊信息
      const menuButtonInfo = wx.getMenuButtonBoundingClientRect();

      // 导航栏内容高度 =（胶囊按钮的顶部距离 - 手机状态高度）*2 + 胶囊高度
      const navBarTop = menuButtonInfo.top || phoneStatusBarHeight || 20;
      const menuButtonHeight = menuButtonInfo.height || 32;
      this.setData({
        navBarTop,
        navBarHeight: menuButtonHeight
      });
      // 8是navBar的底间距
      const containerHeight = navBarTop + menuButtonHeight + 8;
      this.triggerEvent('customNavBar:getHeight', containerHeight);
    },
  },
  methods: {
    onBack() {
      this.triggerEvent('customNavBar:onBack')
    }
  }
})