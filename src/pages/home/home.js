import wxbarcode from "wxbarcode";
import { deepClone } from "../../utils/util";
const app = getApp();
Page({
  onLoad() {
    this.test();
  },
  test() {
    app.globalData.userInfo = deepClone({});
    wxbarcode.qrcode("qrcode", "1234567890123456789", 400, 400);
    this.testPromise(deepClone(app.globalData.userInfo));
  },
  testPromise() {
    return new Promise((resolve) => {
      resolve();
    });
  },
});
