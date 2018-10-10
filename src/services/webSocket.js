/**
 * Created by Jason on 2018/8/21.
 */

/**
 *  websocket 请求，socket.on('event',function(data){})  事件不能多次订阅，不然会出现多条重复数据
 */

import io from 'socket.io-client';

let socket;

export function watchList(config, cb) {
  console.log(socket)
  if (!socket) {
    socket = io(config.url + config.namespace, {transports: ['polling', 'websocket']});
    // socket = io('http://192.168.1.59:9192/org_1')
    // socket = io(config.url);
    console.log(socket)
    socket.on('connect', () => {
      console.log('=====>connected');
    });
    socket.on('apimsg', data => {
      console.log(data)
      cb(data);
    });
    socket.on('disconnected', () => {
      console.log('======>disconnected');
    });
    socket.on('reconnect', () => {
      console.log('======>reconnected');
    });
  } else {
    console.log('already watchList! 155');
  }
}
