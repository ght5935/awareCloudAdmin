import { API_PREFIX } from './config';

export const onLogin = `${API_PREFIX}/logon.do`;
// 首页   五实信息
export const five_real = `${API_PREFIX}/cloudHome/getActually.do`;
export const getFacilities = `${API_PREFIX}/cloudHome/getFacilities.do`;
export const getSecurity = `${API_PREFIX}/cloudHome/getSecurity.do`;

export const getTodayFace = `${API_PREFIX}/cloudHome/getTodayFace.do`;
export const getOrgWeek = `${API_PREFIX}/cloudHome/getOrgWeek.do`;

// 房屋 统计
export const getAllVillage = `${API_PREFIX}/org/getAllVillage.do`;
export const getHouseAmountByVillage = `${API_PREFIX}/house/getHouseAmountByVillage.do`;
export const getHouseTypeAmount = `${API_PREFIX}/house/getHouseTypeAmount.do`;
export const getListByOrgunitId = `${API_PREFIX}/org/getListByOrgunitId.do`;
export const getBuildingList = `${API_PREFIX}/house/getBuildingList.do`;
export const getUnitList = `${API_PREFIX}/house/getUnitList.do`;
export const getFloorList = `${API_PREFIX}/house/getFloorList.do`;
export const getRoomList = `${API_PREFIX}/house/getRoomList.do`;
export const getHouseType = `${API_PREFIX}/house/getHouseType.do`;
export const getHouseAttribute = `${API_PREFIX}/house/getHouseAttribute.do`;
export const getHouse = `${API_PREFIX}/house/getHouse.do`;
export const getVillageChart = `${API_PREFIX}/house/getHouseInfoCounts.do`;
export const getHouseInfo = `${API_PREFIX}/house/getHouseInfo.do`;
export const getUtilitiesDate = `${API_PREFIX}/house/getUtilitiesDate.do`
export const getUtilities = `${API_PREFIX}/house/getUtilities.do`;
// 人口
export const getMapOrgCount = `${API_PREFIX}/poi/getMapOrgCount.do`;
export const getMapTagCount = `${API_PREFIX}/poi/getMapTagCount.do`;
export const getMapOrgPerceiveAndFace = `${API_PREFIX}/poi/getMapOrgPerceiveAndFace.do`;
export const getAllNation = `${API_PREFIX}/nation/getAllNation.do`;
export const getAllTag = `${API_PREFIX}/tag/getAllTag.do`;
export const getAllPartisan = `${API_PREFIX}/partisan/getAllPartisan.do`;
export const getMapSearch = `${API_PREFIX}/poi/getMapSearch.do`;
export const getPersonTagChartByOrgId = `${API_PREFIX}/poi/getPersonTagChartByOrgId.do`;
export const getPersonChartByOrgId = `${API_PREFIX}/poi/getPersonChartByOrgId.do`;

export const getPersonDetailById = `${API_PREFIX}/poi/getPersonDetailById.do`;
export const getPersonFacePerveiceById = `${API_PREFIX}/poi/getPersonFacePerveiceById.do`;
export const getPersonAccessControlById = `${API_PREFIX}/poi/getPersonAccessControlById.do`;
export const getCarInfoByPersonId = `${API_PREFIX}/poi/getCarInfoByPersonId.do`;
export const getHouseInfoByPersonId = `${API_PREFIX}/poi/getHouseInfoByPersonId.do`;


// 车辆
// export const getCarAmount = `${API_PREFIX}/car/getCarAmount.do`;
// export const getParkingAmount = `${API_PREFIX}/car/getParkingAmount.do`;
// export const getCarInfoCounts = `${API_PREFIX}/car/getCarInfoCounts.do`;
// export const getCar = `${API_PREFIX}/car/getCar.do`;
// export const getCarInfo = `${API_PREFIX}/car/getCarInfo.do`;
export const getProvince = `${API_PREFIX}/car/getProvince.do`;
export const getCarModel = `${API_PREFIX}/car/getCarModel.do`;
export const getCarBrand = `${API_PREFIX}/car/getCarBrand.do`;
export const getColor = `${API_PREFIX}/car/getColor.do`;
export const getAllVillageCar = `${API_PREFIX}/org/getAllVillage.do`;
export const getPlateType = `${API_PREFIX}/car/getPlateType.do`;
export const getCarSearch = `${API_PREFIX}/car/getCarSearch.do`;
export const getDelete = `${API_PREFIX}/car/delete.do`;
export const getDeletes = `${API_PREFIX}/car/deletes.do`;
export const getAdd = `${API_PREFIX}/car/add.do`;
export const getModify = `${API_PREFIX}/car/modify.do`;
export const getPoiByHouse = `${API_PREFIX}/poi/getPoiByHouse.do`;

// 管理后台接口
    // 上传图片
export const saveImg = `${API_PREFIX}/poi/saveImg.do`;
export const deleteInfoImg = `${API_PREFIX}/poi/deleteInfoImg.do`;

    // 房屋
export const getOrgunitTree = `${API_PREFIX}/org/getOrgunitTree.do`;
export const addCommittee = `${API_PREFIX}/house/addCommittee.do`;
export const deleteCommittee = `${API_PREFIX}/house/deleteCommittee.do`;
export const modifyCommittee = `${API_PREFIX}/house/modifyCommittee.do`;
export const listOrgunit = `${API_PREFIX}/house/listOrgunit.do`;
export const addVillage = `${API_PREFIX}/house/addVillage.do`;
export const deleteVillage = `${API_PREFIX}/house/deleteVillage.do`;
export const modifyVillage = `${API_PREFIX}/house/modifyVillage.do`;
export const addBuilding = `${API_PREFIX}/house/addBuilding.do`;
export const deleteBuilding = `${API_PREFIX}/house/deleteBuilding.do`;
export const modifyBuilding = `${API_PREFIX}/house/modifyBuilding.do`;
export const getHouseOrgInfo = `${API_PREFIX}/house/getHouseOrgInfo.do`;
export const listHouse = `${API_PREFIX}/house/listHouse.do`;
export const addUnit = `${API_PREFIX}/house/addUnit.do`;
export const deleteUnit = `${API_PREFIX}/house/deleteUnit.do`;
export const deleteHouse = `${API_PREFIX}/house/deleteHouse.do`;
export const deleteFloor = `${API_PREFIX}/house/deleteFloor.do`;
export const modifyFloor = `${API_PREFIX}/house/modifyFloor.do`;
export const modifyHouse =  `${API_PREFIX}/house/modifyHouse.do`;
export const addFloor =  `${API_PREFIX}/house/addFloor.do`;
export const getOrgByBuId = `${API_PREFIX}/house/getOrgByBuId.do`;
export const addRoom = `${API_PREFIX}/house/addHouse.do`;
export const getAttribute = `${API_PREFIX}/house/getAttribute.do`;


    // 人员
export const getPoiList = `${API_PREFIX}/poi/list.do`;
export const poiAdd = `${API_PREFIX}/poi/add.do`;
export const poiDeletes = `${API_PREFIX}/poi/deletes.do`;
export const poiDelete = `${API_PREFIX}/poi/delete.do`;
export const poiModify = `${API_PREFIX}/poi/modify.do`;
    // 车辆

// 消防设施

