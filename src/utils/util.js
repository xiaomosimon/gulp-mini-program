/**
 * @summary 为url添加query
 * @param {string} url
 * @param {object} query
 * @returns {string}
 */
 export function formatUrlByQuery(url, query) {
  if (url.indexOf("?") === -1) {
    url += "?";
  }
  for (let key in query) {
    url += `${key}=${query[key]}&`;
  }
  return url.substring(0, url.length - 1);
}

// 深拷贝
export const deepCloneByJSON = function (value) {
  return JSON.parse(JSON.stringify(value));
};

export const deepClone = function (obj) {
  let newObj = null;
  if (typeof obj === "object" && obj !== null) {
    newObj = obj instanceof Array ? [] : {};
    for (let i in obj) {
      newObj[i] = typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i];
    }
  } else {
    newObj = obj;
  }
  return newObj;
};

// 判断对象是否存在某属性
const _hasOwnProperty = Object.prototype.hasOwnProperty
export function hasOwn(obj, key) {
  return _hasOwnProperty.call(obj, key)
}

// 复杂类型判断
const _toString = Object.prototype.toString;
export function backVariableType(value) {
  return _toString.call(value).slice(8, -1);
}
export function isArray(value) {
  return backVariableType(value) === "Array";
}
export function isObject(value) {
  return backVariableType(value) === "Object";
}

// 为数组顶部添加数组
const _unshift = Array.prototype.unshift
export function unshiftArray(source, value) {
  return _unshift.apply(source, value);
}
// 为数组尾部添加数组
const _push = Array.prototype.push
export function pushArray(source, value) {
  return _push.apply(source, value);
}


// 正则验证
export function isPureEnglish(value) {
  return /^[a-zA-Z]+$/.test(value);
}
export function isValidPassport(value) {
  return /^[a-zA-Z0-9]+$/.test(value);
}
export function isValidEmail(value) {
  return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(
    value
  );
}
export function isValidName(value) {
  return /^[a-zA-Z0-9]+(\s?[.·\-()a-zA-Z]*[a-zA-Z])+$/.test(value);
}

/**
 * @summary 函数节流
 * @param {function} fn 保存需要被延迟执行的函数引用
 * @param {number} interval 延时时间
 * @returns {function} 拥有节流功能的函数
 */
export function throttle(fn, interval) {
  let _self = fn; // 保存需要被延迟执行的函数引用
  let timer; // 定时器
  let firstTime = true; // 是否是第一次调用

  return function () {
    let args = arguments;
    let _me = this;

    if (firstTime) {
      // 如果是第一次调用，不需延迟执行
      _self.apply(_me, args);
      firstTime = false;
      return false;
    }

    if (timer) {
      // 如果定时器还在，说明前一次延迟执行还没有完成
      return false;
    }

    timer = setTimeout(function () {
      // 延迟一段时间执行
      clearTimeout(timer);
      timer = null;
      _self.apply(_me, args);
    }, interval || 500);
  };
}

/**
 * @summary 防抖
 * @returns {string} uuid字符串
 */
export function debounce (func, wait, immediate, initValue) {
  let timeout
  let result = initValue

  const later = function (context, args) {
    timeout = null
    if (args) {
      result = func.apply(context, args)
    }
  }

  const debounced = function (...args) {
    if (timeout) {
      clearTimeout(timeout)
    }
    if (immediate) {
      const callNow = !timeout
      timeout = setTimeout(later, wait)
      if (callNow) {
        result = func.apply(this, args)
      }
    } else {
      timeout = setTimeout(() => {
        later(this, args)
      }, wait)
    }

    return result
  }

  debounced.cancel = function () {
    clearTimeout(timeout)
    timeout = null
  }

  return debounced
}

/**
 * @summary 深度替换值
 * @param {*} dataSource 数据源
 * @param {*} condition 全等条件值
 * @param {*} value 被替换成的值
 */
export function deepReplace(dataSource, condition, value) {
  if (dataSource === condition) {
    dataSource = value;
  } else if (dataSource === "toNull") {
    dataSource = null;
  } else if (isArray(dataSource)) {
    dataSource = dataSource.map((v) => {
      return deepReplace(v, condition, value);
    });
  } else if (isObject(dataSource)) {
    for (let i in dataSource) {
      dataSource[i] = deepReplace(dataSource[i], condition, value);
    }
  }
  return dataSource;
}