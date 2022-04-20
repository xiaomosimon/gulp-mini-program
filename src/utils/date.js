const _weekChineseKeys = ['日', '一', '二', '三', '四', '五', '六'];

/**
 * 整数补零
 * @param {int} num 
 * @param {number} digits 位数 默认为2位
 */
const zeroPadding = function (num, digits = 2) {
  if (typeof num !== 'number') {
    return num;
  }
  if (num <= Math.pow(10, digits - 1)) {
    let str = (num + '');
    const difference = digits - (num + '').length;
    for (let i = 0; i < difference; i++) {
      str = '0' + str;
    }
    return str;
  }
  return num;
}

/**
 * @summary 判断获取Date对象
 * @param {*} date
 * @returns {Date} _date
 */
export const backDate = function (date) {
  let _date;
  const dataType = typeof date;
  if (!date) {
    _date = new Date();
  } else if (dataType === 'string') {
    date = date.replace(/[.|-]/g, '/');
    if (date.split('/').length === 2) {
      date = date + '/01';
    }
    _date = new Date(date);
  } else if (dataType === 'number') {
    _date = new Date(date);
  } else {
    _date = date;
  }
  return _date;
};

/**
 * @summary 获取Date对象可获取的所有信息(年月日等)
 * @param {*} date 
 * @returns {object}
 */
export const getDateInfos = function (date) {
  const _date = backDate(date);
  const year = _date.getFullYear();
  const month = _date.getMonth() + 1;
  const day = _date.getDate();
  const hour = _date.getHours();
  const minute = _date.getMinutes();
  const second = _date.getSeconds();
  const week = _date.getDay();
  const weekInChina = week === 0 ? 7 : week;
  const weekCN = _weekChineseKeys[week];
  return {
    year,
    month,
    day,
    hour,
    minute,
    second,
    format: {
      month: zeroPadding(month),
      day: zeroPadding(day),
      hour: zeroPadding(hour),
      minute: zeroPadding(minute),
      second: zeroPadding(second),
    },
    week: weekInChina,
    weekCN
  };
};


/**
 * @summary 格式化日期为 yyyy(-/.)MM(-/.)DD
 * @param {*} date
 * @param {string} format
 */
export const formatDate = function (date, format = '-') {
  const _date = backDate(date);
  const year = _date.getFullYear();
  const month = _date.getMonth() + 1;
  const day = _date.getDate();
  const formatMonth = zeroPadding(month);
  const formatDay = zeroPadding(day);
  return `${year}${format}${formatMonth}${format}${formatDay}`;
};

/**
 * @summary 格式化日期为 yyyy(-/.)MM
 * @param {*} date
 * @param {String} format
 */
export const formatDateToMonth = function (date, format = '-') {
  const _date = backDate(date);
  const year = _date.getFullYear();
  const month = _date.getMonth() + 1;
  const formatMonth = zeroPadding(month);
  return `${year}${format}${formatMonth}`;
};


/**
 * @summary 格式化日期为 yyyy年MM月DD日
 * @param {*} date
 * @param {String} format
 */
export const formatDateIntoCN = function (date) {
  const _date = backDate(date);
  const year = _date.getFullYear();
  const month = _date.getMonth() + 1;
  const day = _date.getDate();
  const formatMonth = zeroPadding(month);
  const formatDay = zeroPadding(day);
  return `${year}年${formatMonth}月${formatDay}日`;
};

/**
 * @summary 格式化日期为 yyyy年MM月
 * @param {*} date
 */
export const formatDateToMonthIntoCN = function (date) {
  const _date = backDate(date);
  const year = _date.getFullYear();
  const month = _date.getMonth() + 1;
  const formatMonth = zeroPadding(month);
  return `${year}年${formatMonth}月`;
};

/**
 * @summary 格式化日期为 MM月DD日 星期W
 * @param {*} date
 */
export const formatDateBetweenMonthAndWeekIntoCN = function (date) {
  const _date = backDate(date);
  const month = _date.getMonth() + 1;
  const day = _date.getDate();
  const week = _date.getDay();
  const weekCN = _weekChineseKeys[week];
  const formatMonth = zeroPadding(month);
  const formatDay = zeroPadding(day);
  return `${formatMonth}月${formatDay}日 星期${weekCN}`;
};


/**
 * @summary 兼容苹果的格式（yyyy/mm/dd）
 * @param {string} value 后端返回的日期字符串
 */
export function filterSafariBackDate(value) {
  if (typeof value === 'string') {
    return value.replace(/-|./g, '/');
  }
  return value;
}