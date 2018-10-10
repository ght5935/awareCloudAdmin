import request from '../utils/request';
import * as api from '../utils/api';
import { toQueryString } from '../utils/utils';

export async function getOrgunitTree(params) {
  return request(`${api.getOrgunitTree}?${toQueryString(params)}`);
}
export async function addCommittee(params) {
  return request(`${api.addCommittee}?${toQueryString(params)}`);
}
export async function deleteCommittee(params) {
  return request(`${api.deleteCommittee}?${toQueryString(params)}`);
}
export async function modifyCommittee(params) {
  return request(`${api.modifyCommittee}?${toQueryString(params)}`);
}
export async function listOrgunit(params) {
  return request(`${api.listOrgunit}?${toQueryString(params)}`);
}
export async function deleteVillage(params) {
  return request(`${api.deleteVillage}?${toQueryString(params)}`);
}
export async function getBuildingList(params) {
  return request(`${api.getBuildingList}?${toQueryString(params)}`);
}
export async function addBuilding(params) {
  return request(`${api.addBuilding}?${toQueryString(params)}`);
}
export async function deleteBuilding(params) {
  return request(`${api.deleteBuilding}?${toQueryString(params)}`);
}
export async function modifyBuilding(params) {
  return request(`${api.modifyBuilding}?${toQueryString(params)}`);
}
export async function getHouseOrgInfo(params) {
  return request(`${api.getHouseOrgInfo}?${toQueryString(params)}`);
}
export async function listHouse(params) {
  return request(`${api.listHouse}?${toQueryString(params)}`);
}
export async function addUnit(params) {
  return request(`${api.addUnit}?${toQueryString(params)}`);
}
export async function deleteUnit(params) {
  return request(`${api.deleteUnit}?${toQueryString(params)}`);
}
export async function deleteHouse(params) {
  return request(`${api.deleteHouse}?${toQueryString(params)}`);
}
export async function deleteFloor(params) {
  return request(`${api.deleteFloor}?${toQueryString(params)}`);
}
export async function modifyFloor(params) {
  return request(`${api.modifyFloor}?${toQueryString(params)}`);
}
export async function addFloor(params) {
  return request(`${api.addFloor}?${toQueryString(params)}`);
}
export async function getOrgByBuId(params) {
  return request(`${api.getOrgByBuId}?${toQueryString(params)}`);
}
export async function addRoom(params) {
  return request(`${api.addRoom}?${toQueryString(params)}`);
}
export async function getAttribute(params) {
  return request(`${api.getAttribute}?${toQueryString(params)}`);
}
export async function getHouseType(params) {
  return request(`${api.getHouseType}?${toQueryString(params)}`);
}
export async function addVillage(params) {
  return request(api.addVillage, {
    method: 'post',
    data: params
  });
}
export async function modifyVillage(params) {
  return request(api.modifyVillage, {
    method: 'post',
    data: params
  });
}
export async function modifyHouse(params) {
  return request(api.modifyHouse, {
    method: 'post',
    data: params
  });
}
