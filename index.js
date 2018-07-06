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

  return localStorage.setItem(key, value) ? true : false;
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