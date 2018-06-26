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