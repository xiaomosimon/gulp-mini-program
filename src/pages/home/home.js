import wxbarcode from 'wxbarcode';
const app = getApp();
Page({
  onLoad() {
    this.test()
  },
  test() {
    app.globalData.userInfo = {}
    wxbarcode.qrcode('qrcode', '1234567890123456789', 400, 400)
    this.testPromise();
    console.log(2);
  },
  testPromise() {
    return new Promise((resolve)=> {
      console.log(3);
      resolve()
    })
  }
});
