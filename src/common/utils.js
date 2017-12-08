/**
 * Created by zxf on 2017.11.29.
 */
export function Css(el, prop) {
  return window.getComputedStyle(el)[prop]
}

let Tween = {
  Quad: {
    easeIn: function (t, b, c, d) {
      return c * (t /= d) * t + b;
    },
    easeOut: function (t, b, c, d) {
      return -c * (t /= d) * (t - 2) + b;
    },
    easeInOut: function (t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t + b;
      return -c / 2 * ((--t) * (t - 2) - 1) + b;
    }
  }
}
export {
  Tween
}

export function isArray(arr) {
  return Object.prototype.toString.apply(arr) === '[object Array]';
}

export function trim(str) {
  console.log(str);
  return str.replace(/\s*/g, '')
}

export function arrHas(arr, value) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === value) {
      return i;
    }
  }
}

export function objHasKey(obj) {
  let arr = [];
  for (let k in obj) {
    if (obj.hasOwnProperty(k)) {
      arr.push(k);
    }
  }
  return arr;
}
const SessionStorge={
  setItem(key,value){
    console.log(value);
    window.sessionStorage.setItem(key,JSON.stringify(value));
  },
  getItem(key){

    let v=window.sessionStorage.getItem(key);
   console.log(JSON.parse(v))
    return JSON.parse(v);
  }
}
export {
  SessionStorge
}



