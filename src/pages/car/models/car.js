import * as Api from '../../../services/car';
import * as Utils from '../../../utils/utils'
export default {
    namespace: 'car',
    state: {
        provinceList: [],
        brandList: [],
        colorList: [],
        villageList: [],
        carPage: {
            pageSize: 10,
            pageNo: 1,
            total: 0
        },
        carList: [],
        searchParams: {
            pageSize: 10,
            pageNo: 1,
            province: '',
            plateNumber: '',
            model: '',
            brand: '',
            color: '',
            village: '',
            name: '',
            phone: '',
            plateType: ''
        },
        singleDelete: '',
        deleteSelected: [],
        addCarParams: {
            id: '',
            imgPath: '',
            province: '',
            plateNumber: '',
            model: '',
            brand: '',
            color: '',
            plateType: '',
            houseId: '',
            personId: ''
        },
        addModalVisiable: false,
        houseParams: {
            burg: '',
            orgunitId: '',
            village: '',
            building: '',
            unit: '',
            floor: '',
            room: '',
            person: ''
        },
        urbanList: [],
        villageList1: [],
        buildList: [],
        unitList: [],
        floorList: [],
        roomList: [],
        personList: []
    },
    effects: {
        * getProvince({ payload }, { put, call, select }) {
            const response = yield call(Api.getProvince, {});
            if (Utils.isApiSuccess(response)) {
                const result = Utils.apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        provinceList: result,
                    }
                });
            }
        },
        * getCarBrand({ payload }, { put, call, select }) {
            const response = yield call(Api.getCarBrand, {});
            if (Utils.isApiSuccess(response)) {
                const result = Utils.apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        brandList: result,
                    }
                });
            }
        },
        * getColor({ payload }, { put, call, select }) {
            const response = yield call(Api.getColor, {});
            if (Utils.isApiSuccess(response)) {
                const result = Utils.apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        colorList: result,
                    }
                });
            }
        },
        * getAllVillage({ payload }, { put, call, select }) {
            const response = yield call(Api.getAllVillage, {});
            if (Utils.isApiSuccess(response)) {
                const result = Utils.apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        villageList: result,
                    }
                });
            }
        },
        * getCarSearch({ payload }, { put, call, select }) {
            const params = yield select(store => store.car.searchParams);
            const response = yield call(Api.getCarSearch, { ...params });
            if (Utils.isApiSuccess(response)) {
                const result = Utils.apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        carList: result.list,
                        carPage: result.page
                    }
                });
            }
        },
        * getDelete({ payload }, { put, call, select }) {
            const params = yield select(store => store.car.singleDelete);
            const response = yield call(Api.getDelete, { id: params });
            if (Utils.isApiSuccess(response)) {
                const result = Utils.apiData(response);
                yield put({ type: 'getCarSearch' })
            }
        },
        * getDeletes({ payload }, { put, call, select }) {
            let params = yield select(store => store.car.deleteSelected);
            params = params.join(',');
            const response = yield call(Api.getDeletes, { ids: params });
            if (Utils.isApiSuccess(response)) {
                const result = Utils.apiData(response);
                yield put({ type: 'getCarSearch' })
            }
        },
        * getAdd({ payload }, { put, call, select }) {
            let addCarParams = yield select(store => store.car.addCarParams)
            const houseParams = yield select(store => store.car.houseParams)
            const response = yield call(Api.getAdd, { ...addCarParams });
            if (Utils.isApiSuccess(response)) {
                const result = Utils.apiData(response)
                yield put({
                    type: 'success',
                    payload: {
                        addModalVisiable: false,
                        addCarParams: {
                            ...addCarParams,
                            id: '',
                            imgPath: '',
                            province: '',
                            plateNumber: '',
                            model: '',
                            brand: '',
                            color: '',
                            plateType: '',
                            houseId: '',
                            personId: ''
                        },
                        houseParams: {
                            ...houseParams,
                            burg: '',
                            orgunitId: '',
                            village: '',
                            building: '',
                            unit: '',
                            floor: '',
                            room: '',
                            person: ''
                        }
                    }
                })
                yield put({ type: 'getCarSearch' })
                //TODO
                payload.form.resetFields()
            }
        },
        * getModify({ payload }, { put, call, select }) {
            let addCarParams = yield select(store => store.car.addCarParams)
            const houseParams = yield select(store => store.car.houseParams)
            const response = yield call(Api.getModify, { ...addCarParams })
            if (Utils.isApiSuccess(response)) {
                const result = Utils.apiData(response)
                yield put({
                    type: 'success',
                    payload: {
                        addModalVisiable: false,
                        addCarParams: {
                            ...addCarParams,
                            id: '',
                            imgPath: '',
                            province: '',
                            plateNumber: '',
                            model: '',
                            brand: '',
                            color: '',
                            plateType: '',
                            houseId: '',
                            personId: ''
                        },
                        houseParams: {
                            ...houseParams,
                            burg: '',
                            orgunitId: '',
                            village: '',
                            building: '',
                            unit: '',
                            floor: '',
                            room: '',
                            person: ''
                        }
                    }
                })
                yield put({ type: 'getCarSearch' })
               //TODO
               payload.form.resetFields()
            }
        },
        * getListByOrgunitId({ payload }, { put, call, select }) {
            const houseParams = yield select(store => store.car.houseParams)
            const response = yield call(Api.getListByOrgunitId, { orgunitId: houseParams.burg ? houseParams.burg : '' });
            if (Utils.isApiSuccess(response)) {
                const result = Utils.apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        urbanList: result
                    }
                })
            }
        },
        * getListByOrgunitId2({ payload }, { put, call, select }) {
            const houseParams = yield select(store => store.car.houseParams)
            const response = yield call(Api.getListByOrgunitId, { orgunitId: houseParams.orgunitId ? houseParams.orgunitId : '' });
            if (Utils.isApiSuccess(response)) {
                const result = Utils.apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        villageList1: result
                    }
                })
            }
        },
        * getBuildingList({ payload }, { put, call, select }) {
            const houseParams = yield select(store => store.car.houseParams)
            const params = {
                orgunitId: houseParams.village ? houseParams.village : ''
            }
            const response = yield call(Api.getBuildingList, { ...params });
            if (Utils.isApiSuccess(response)) {
                const result = Utils.apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        buildList: result
                    }
                })
            }
        },
        * getUnitList({ payload }, { put, call, select }) {
            const houseParams = yield select(store => store.car.houseParams)
            const params = {
                // orgunitId: houseParams.village ? houseParams.village : '',
                building: houseParams.building ? houseParams.building : ''
            }
            const response = yield call(Api.getUnitList, { ...params });
            if (Utils.isApiSuccess(response)) {
                const result = Utils.apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        unitList: result
                    }
                })
            }
        },
        * getFloorList({ payload }, { put, call, select }) {
            const houseParams = yield select(store => store.car.houseParams)
            const params = {
                // orgunitId: houseParams.village ? houseParams.village : '',
                // building: houseParams.building,
                unit: houseParams.unit ? houseParams.unit : ''
            }
            const response = yield call(Api.getFloorList, { ...params });
            if (Utils.isApiSuccess(response)) {
                const result = Utils.apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        floorList: result
                    }
                })
            }
        },
        * getRoomList({ payload }, { put, call, select }) {
            const houseParams = yield select(store => store.car.houseParams)
            const params = {
                // orgunitId: houseParams.village ? houseParams.village : '',
                // building: houseParams.building,
                // unit: houseParams.unit,
                floor: houseParams.floor ? houseParams.floor : ''
            }
            const response = yield call(Api.getRoomList, { ...params });
            if (Utils.isApiSuccess(response)) {
                const result = Utils.apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        roomList: result
                    }
                })
            }
        },
        * getPoiByHouse({ payload }, { put, call, select }) {
            const houseParams = yield select(store => store.car.houseParams)
            const params = {
                houseId: houseParams.room ? houseParams.room : ''
            }
            const response = yield call(Api.getPoiByHouse, { ...params });
            if (Utils.isApiSuccess(response)) {
                const result = Utils.apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        personList: result
                    }
                })
            }
        },
    },
    reducers: {
        success(state, action) {
            return { ...state, ...action.payload };
        }
    }
}