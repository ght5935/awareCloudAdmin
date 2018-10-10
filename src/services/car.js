
import request from '../utils/request';
import * as api from '../utils/api';
import { toQueryString } from '../utils/utils';


export async function getProvince(params) {
    return request(`${api.getProvince}`);
}
export async function getCarBrand(params) {
    return request(`${api.getCarBrand}`);
}
export async function getColor(params) {
    return request(`${api.getColor}`);
}
export async function getAllVillage(params) {
    return request(`${api.getAllVillageCar}`);
}

export async function getCarSearch(params) {
    return request(`${api.getCarSearch}?${toQueryString(params)}`);
}
export async function getDelete(params) {
    return request(api.getDelete, {
        method: 'post',
        data: params
    });
}
export async function getDeletes(params) {
    return request(api.getDeletes, {
        method: 'post',
        data: params
    });
}
export async function getAdd(params) {
    return request(api.getAdd, {
        method: 'post',
        data: params
    });
}
export async function getModify(params) {
    return request(api.getModify, {
        method: 'post',
        data: params
    });
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
export async function getPoiByHouse(params) {
    return request(`${api.getPoiByHouse}?${toQueryString(params)}`);
}