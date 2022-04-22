import config from "./config";
import {
  backFailCallbackAfterSuccess,
  backFailCallback
} from "./errorHandler";
import appGlobalData from "../utils/appGlobalData";
const myRequest = function (configMethod) {
  const {
    baseUrl
  } = config;
  /**
   * @param {string} url
   * @param {object} options
   *  method
   *  header
   *  data
   *  complete
   * @returns {promise}
   *
   */
  return function (url, options = {}) {
    return new Promise((resolve, reject) => {
      const {
        method,
        header,
        data,
        complete
      } = options;
      // header
      let defaultHeader = {
        "content-type": "application/json; charset=UTF-8;",
        Authorization: appGlobalData.authorizationHeader,
      };
      // add header
      if (header) {
        defaultHeader = {
          ...defaultHeader,
          ...header,
        };
      }
      wx.request({
        url: baseUrl + url,
        header,
        data,
        method: typeof method === "string" ? method.toUpperCase() : configMethod,
        timeout: 0,
        success: (result) => {
          // 检测请求是否错误
          const failCallback = backFailCallbackAfterSuccess(result);
          return !failCallback ?
            resolve(result.data.content) :
            reject(result, failCallback);
        },
        fail: (res) => {
          return reject(res, backFailCallback);
        },
        complete: (res) => {
          complete && complete();
        },
      });
    });
  };
};
export default {
  'get': myRequest('GET'),
  'post': myRequest('POST'),
};