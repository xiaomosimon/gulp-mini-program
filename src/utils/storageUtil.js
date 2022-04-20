import requestConfig from "../myRequest/config";

const { env } = requestConfig;

export default {
  /**
   * 区分不同环境的本地存储
   * @param {String} key
   * @param {Function} callback
   */
  getStorage(key, callback) {
    key = `${env}-${key}`;
    wx.getStorage({
      key,
      success(res) {
        callback && callback(res.data);
      },
    });
  },

  /**
   * 区分不同环境的本地存储 同步
   * @param {String} key
   */
  getStorageSync(key) {
    key = `${env}-${key}`;
    return wx.getStorageSync(key);
  },

  /**
   * 区分不同环境的本地存储
   * @param {*} key
   * @param {*} value
   */
  setStorage(key, value) {
    key = `${env}-${key}`;
    wx.setStorage({
      key,
      data: value,
    });
  },

  /**
   * 区分不同环境的本地存储 同步
   * @param {*} key
   * @param {*} value
   */
  setStorageSync(key, vlaue) {
    key = `${env}-${key}`;
    wx.setStorageSync(key, vlaue);
  },

  /**
   * 区分不同环境的本地存储
   * @param {*} key
   * @param {*} callback
   */
  removeStorage(key, callback) {
    key = `${env}-${key}`;
    wx.removeStorage({
      key,
      success(res) {
        callback && callback(res);
      },
    });
  },
};
