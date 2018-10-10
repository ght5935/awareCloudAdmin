import { Modal, message } from 'antd';
import { func } from 'prop-types';
export function getHeightResponse(obj) {
  var oriH = window.innerHeight;
  var objTop = oriH - obj.getBoundingClientRect().top;
  obj.style.height = `${objTop - 50}px`
}
export function getTableHeight(obj) {
  var oriH = window.innerHeight;
  var objTop = oriH - obj.getBoundingClientRect().top;
  return objTop - 160
}


export const toQueryString = obj => obj ? `${Object.keys(obj).sort().map(key => {
  const val = obj[key];
  if (Array.isArray(val)) {
    return val.sort().map(val2 => `${encodeURIComponent(key)}=${encodeURIComponent(val2)}`).join('&');
  }

  return `${encodeURIComponent(key)}=${encodeURIComponent(val)}`;
}).join('&')}&ts=${new Date().getTime()}` : '';

/**
 * @description 将请求结果从返回数据中剥离
 * @param {*} { response, err }
 * @returns 
 */
export function apiData({ response, err }) {
  return response.data.result;
}


/**
 * @description 判断请求是否成功
 * @param {*} response
 * @returns true/false
 */
export function isApiSuccess(response) {
  if (response.err) {
    return false;
  }
  const { data } = response.response;
  if (data && data.status === 0) {
    return true;
  }

  return false;
}

export function cfShowWarning(title, content, okText) {
  Modal.warn({ title, content, okText });
}

export function cfShowApiFail({
  response,
  err
}, opt = {}) {
  // api status !=0  or http error, or else
  let { title, content, okText } = opt;
  let msg;

  title = title || '操作失败';
  okText = okText || '确定';

  if (response) {
    const { data } = response;
    msg = data.message;
  }

  if (err) {
    if (err.response) {
      msg = `${err.response.status} ${err.response.statusText}`;
    } else if (err.request) {
      msg = '网络错误';
    } else {
      msg = '发生错误';
    }
  }

  content = content || msg;

  // Modal.warn({title, content, okText});
  message.error(content);
}

export function cfApiSuccess() {
  message.success('操作成功！');
}

//把时间戳转化为日期, 精确到秒
export function timestampToTime(timestamp) {
  let date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let Y = date.getFullYear() + '-';
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
  let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
  let m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
  let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  return Y + M + D + h + m + s;
}

export function delay(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}


/**
 * @author Jason cui
 * @description 获取字符串的长度
 * @param {*} str
 * @returns num
 */
export function getStrLength(str) {
  if (str == null) return 0;
  if (typeof str !== 'string') {
    str += '';
  }
  return str.length;
}


/**
 * @author Jason cui
 * @description 在数组数据中获取选中的项的字段值
 * @param {*} arr
 * @param {*} i
 * @param {*} str
 * @returns
 */
export function getDataFromArr(arr, i, str) {
  let rt = '';
  arr.map(v => {
    if (v.id == i) {
      rt = v[str]
    }
  });
  return rt;
}

export function handleImg(obj, con) {
  if (obj && con) {
    const ow = con.offsetWidth;
    con.style.height = ow + 'px';
    setTimeout(function () {
      const nw = obj.naturalWidth;
      const nh = obj.naturalHeight;
      if (nw <= nh) {
        // 定高显示
        obj.style.height = ow - 20 + 'px';
        obj.style.width = (ow - 20) * nw / nh + 'px'
      } else {
        // 定宽显示
        obj.style.width = ow - 20 + 'px';
        obj.style.height = (ow - 20) * nh / nw + 'px'
      }
    }, 300)
  }
}

export function handleTreeSelectParams(v) {
  let data = v.split('?')
}

/* 获取鼠标从哪个方向进入元素 */

export function handleMouseEnterDirection(node, obj) {
  const nodeOffset = node.getBoundingClientRect();
  const nl = nodeOffset.left;
  const nr = nodeOffset.right;
  const nb = nodeOffset.bottom;
  const nt = nodeOffset.top;

  const mx = obj.clientX;
  const my = obj.clientY;

  var arr = [Math.abs(my - nt), Math.abs(mx - nr), Math.abs(my - nb), Math.abs(mx - nl)]
  var min = eval("Math.min(" + arr.join() + ")");
  var i = arr.indexOf(min)
  return i;
}

// 验证车牌号码
export function isLicenseNo(str) {
  return /(^[\u4E00-\u9FA5]{1}[A-Z0-9]{6}$)/.test(str);
}

// 验证手机号
export function isPhone(str) {
  var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
  if (!myreg.test(str)) {
      return false
  } else {
      return true
  }
}