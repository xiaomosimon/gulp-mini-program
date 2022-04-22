// 字符串判空
export function stringNotEmpty(text) {
  return text != null && text.replace(/\s+/g, "") != "";
}
export function stringIsEmpty(text) {
  return !stringNotEmpty(text);
}

// 过滤价格
export function filterPrice(price) {
  if (price) {
    return (Math.round(price * 1000 / 10) / 100).toFixed(2);
  }
  return 0;
}
export function filterPriceFromCent(price) {
  if (price) {
    return (Math.round(price) / 100).toFixed(2);
  }
  return 0;
}

/** 
 * @summary 随机生成uuid
 * @returns {string} uuid字符串
 */
export function generateRandomUuid() {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substring(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substring((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  var uuid = s.join("");
  return uuid;
}

/**
 * @summary 随机生成uuid
 * @returns {string} uuid字符串
 */
export function randomUuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = (Math.random() * 16) | 0;
    let v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  }) // by www.jbxue.com
}

/**
 * @summary 首字母大写
 * @param {string} str
 * @returns {string}
 */
export function toInitialsUpperCase (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * @summary 首字母小写
 * @param {string} str
 * @returns {string}
 */
export function toInitialsLowerCase(str) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}