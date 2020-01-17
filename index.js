/* Utils Lib Function */


/* -------------------About LocalStorage Operation------------------- */

/**
 * 向LocalStorage写入数据
 * @param key 一个键值
 * @param value 键对应的数据
 * @returns {boolean}
 */
function saveToLocalStorage(key, value) {
  if (typeof value === 'object' || typeof value === 'array') {
    try {
      value = JSON.stringify(value);
    } catch (err) {
      console.log(err);
    }
  }

  return localStorage.setItem(key, value);
}

/**
 * 从LocalStorage中读取数据
 * @param key 一个键值
 * @param defaultValue 当取不到值时默认返回的数据
 * @returns {*|Array}
 */
function getItemFormLocalStorage(key, defaultValue) {
  defaultValue = defaultValue || [];
  var item = null;
  try {
    item = JSON.parse(localStorage.getItem(key));
  } catch (err) {
    console.log(err)
  }

  return item ? item : defaultValue;
}

/* -------------------About DOM Operation----------------------------- */

/**
 * 为某个元素添加样式
 * @param el {DOM} Must
 * @param className
 */
export function addClass(el, className) {
  if (hasClass(el, className)) {
    return;
  }

  let classNameList = el.className.split(' ');
  classNameList.push(className);
  el.className = classNameList.join(' ');
}

/*
* 判断一个元素是否有某个样式的名称
* @param el {DOM}
* @param className {String} class name
* @return {Boolean}
 */
export function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
  return reg.test(el.className);
}

/**
 * 获取属性的值
 * @param el {dom}
 * @param name
 * @param val 不为undefined，说明是设置data-*的值
 * @returns {string}
 */
export function getData(el, name, val) {
  const prefix = 'data-';
  let prop = prefix + name;
  if (val) {
    el.setAttribute(prop, val);
  } else {
    return el.getAttribute(prop);
  }
}


/*----------------------校验手机号-------------------------------*/
/**
 * 校验手机号
 * @param phone
 * @returns {boolean}
 */
export function isPoneAvailable(phone) {
  var PhoneReg = /^[1][3,4,5,7,8][0-9]{9}$/

  return PhoneReg.test(phone)
}

/*-----------------------微信相关----------------------------------*/
/**
 * 判断平台
 * @return {String} 平台
 */
export function getUserOperation () {
  const ua = navigator.userAgent.toLowerCase()

  if (/MicroMessenger/i.test(ua)) {
    return 'weixin'
  } else if (/iPhone|iPad|iPod|iOS/i.test(ua)) {
    return 'ios'
  } else if (/Android/i.test(ua)) {
    return 'android'
  } else {
    return 'other'
  }
}

/**
 * 去掉字符串空格
 */
export function trimFun (s) {
  return s.replace(/(^\s*)|(\s*$)/g, '')
}

/**
 * 解析URL中的全部参数，返回键值对格式的对象
 * @param url
 * @returns {*}
 */
export function parseQueryString (url) {
  let str = url.split('?')[1]
  if (!str) {
    return {}
  }
  let items = str.split('&')
  let result = {}
  let res = {}

  for (let i = 0, len = items.length; i < len; ++i) {
    res = items[i].split('=')
    result[res[0]] = res[1]
  }

  return result
}

/**
 * 通过base64反向求出源文件的大小
 * @param base64
 * @returns {number} 返回单位：KB
 */
export function computedBase64Size (base64) {
  // 首先把头部的data:image/png;base64,（注意有逗号）去掉
  let base64Str = base64.substring(22)

  /**
   * Base64编码要求把3个8位字节（3*8=24）转化为4个6位的字节（4*6=24），之后在6位的前面补两个0，
   * 形成8位一个字节的形式，如果剩下的字符不足3个字节，则用0填充，输出字符使用’=’
   * 根据原理，反向推导出真正的图片字节数
   */
  let base64StrLength = base64Str.length * 3 / 4

  // 得到字节单位
  let BitUnit = base64StrLength / 1024 / 1024

  // 得到以KB为单位的数值，不能一步到位，因为会发生溢出
  return BitUnit / 1024
}

/**
 * ES5方法，数组去重
 * @param arr 需要去重的数组源数组
 * @returns {Array} 返回结果数组
 */
export function ES5UniqueArrayItem (arr) {
  if (!Array.isArray(arr)) {
    // 不是数组就返回
    return [];
  }

  var ret = [];
  arr.forEach(function (item) {
    if (ret.indexOf(item) === -1) {
      // 在结果集中没有找到相应的元素
      ret.push(item);
    }
  })

  return ret;
}

/**
 * ES6方法，数组去重
 * @param arr 需要去重的数组源数组
 * @returns {Array} 返回结果数组
 */
export function ES6UniqueArrayItem (arr) {
  if (!Array.isArray(arr)) {
    // 不是数组就返回
    return [];
  }

  // return [...new Set(arr)]; // 扩展运算符也可以办到
  return Array.from(new Set(arr));
}

/**
 * 将对象拼接成 URL 地址的 Query 参数形式
 * @param obj 层级深度为一的对象
 * @returns {string} 拼接的query参数
 */
export function objectToRequestQuery (obj) {
  let query = ''
  for (let key in obj) {
    if (obj[key].toString().length > 0) {
      // 只有有值的项才会被添加
      query += `&${key}=${obj[key].toString()}`
    }
  }

  return query
}

/**
 * 判断一个变量是否严格 等于 undefined
 * @param {any} variable 需要判断的数据
 * @returns {boolean} 布尔值
 */
export function isUndef (variable) {
  return variable === undefined
}

/**
 * 获取 2020-01-17 11:30:08 格式的时间
 * @param {string} div 分隔符
 */
export function getCurrentDataTime (div = '-') {
  const time = new Date()
  const year = time.getFullYear()
  const month = time.getMonth() + 1 > 9 ? time.getMonth() + 1 : '0' + (time.getMonth() + 1)
  const day = time.getDate() > 9 ? time.getDate() : '0' + time.getDate()
  const hour = time.getHours() > 9 ? time.getHours() : '0' + time.getHours()
  const min = time.getMinutes() > 9 ? time.getMinutes() : '0' + time.getMinutes()
  const seconds = time.getSeconds() > 9 ? time.getSeconds() : '0' + time.getSeconds()

  return year + div + month + div + day + ' ' + hour + ':' + min + ':' + seconds
}

/**
 * 判断平台
 * @return {String} 平台
 */
export function detectOS () {
  const ua = navigator.userAgent.toLowerCase()
  if (/MicroMessenger/i.test(ua)) {
    return 'weixin'
  } else if (/iPhone|iPad|iPod|iOS/i.test(ua)) {
    return 'ios'
  } else if (/Android/i.test(ua)) {
    return 'android'
  } else {
    return 'other'
  }
}

/**
 * 解析并返回当前页面的所有 Cookie
 * @return {object} cookies
 */
export function getAndParseCookies () {
  const cookies = document.cookie
  if (!cookies) return {}
  const temp = cookies.replace(/\s/g, '') // 删除所有的空格
  const cookieArr = temp.split(';') // 根据分号切割称键值对
  const res = {}
  cookieArr.forEach(o => {
    const [key, val] = o.split('=')
    res[key] = val
  })
  return res
}
