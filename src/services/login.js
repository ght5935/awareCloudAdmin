/**
 * Created by Jason on 2018/2/2.
 */
import request from '../../src/utils/request';
import * as api from '../utils/api';

export async function onlogin(params) {
  return request(api.onLogin, {
    method: 'post',
    data: params
  });
}
