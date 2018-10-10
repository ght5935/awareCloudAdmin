import request from '../utils/request';
import * as api from '../utils/api';
import {toQueryString} from '../utils/utils';

export async function getPoiList(params) {
  return request(`${api.getPoiList}?${toQueryString(params)}`);
}
export async function getAllNation(params) {
  return request(`${api.getAllNation}?${toQueryString(params)}`);
}
export async function getAllTag(params) {
  return request(`${api.getAllTag}`);
}
export async function getAllPartisan(params) {
  return request(`${api.getAllPartisan}`);
}
export async function getAllVillage(params) {
  return request(`${api.getAllVillage}`);
}
export async function getListByOrgunitId(params) {
  return request(`${api.getListByOrgunitId}?${toQueryString(params)}`);
}
export async function getBuildingList(params) {
  return request(`${api.getBuildingList}?${toQueryString(params)}`);
}
export async function getUnitList(params) {
  return request(`${api.getUnitList}?${toQueryString(params)}`);
}
export async function getFloorList(params) {
  return request(`${api.getFloorList}?${toQueryString(params)}`);
}
export async function getRoomList(params) {
  return request(`${api.getRoomList}?${toQueryString(params)}`);
}
export async function getProvince(params) {
  return request(`${api.getProvince}?${toQueryString(params)}`);
}

export async function saveImg(params) {
  return request(api.saveImg, {
    method: 'post',
    data: params
  });
}
export async function poiAdd(params) {
  return request(api.poiAdd, {
    method: 'post',
    data: params
  });
}
export async function poiDeletes(params) {
  return request(api.poiDeletes, {
    method: 'post',
    data: params
  });
}
export async function poiDelete(params) {
  return request(api.poiDelete, {
    method: 'post',
    data: params
  });
}
export async function poiModify(params) {
  return request(api.poiModify, {
    method: 'post',
    data: params
  });
}
export async function deleteInfoImg(params) {
  return request(api.deleteInfoImg, {
    method: 'post',
    data: params
  });
}