import axios from 'axios';
import qs from 'qs';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';
axios.defaults.withCredentials = true; // cookie
axios.defaults.timeout = 15000; // 15s
axios.defaults.maxContentLength = 1024 * 1024; // 1M

axios
  .interceptors
  .request
  .use(config => {
    const {method} = config;
    if (method && method.toLowerCase() === 'post') {
      config.data = qs.stringify(config.data);
    }
    return config;
  }, error => {
    Promise.reject(error);
  });

/**
 * Requests a URL, returning a promise.
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] { method, params, data}
 * @return {object}           An object containing either "res" or "err"
 * response = {data,status,statusText,headers,config,request}
 * err = {response,request,message,config}
 */
export default function request(url, options) {
  return axios(url, options)
    .then(response => ({response}))
    .catch(err => { return {err}; });
}
