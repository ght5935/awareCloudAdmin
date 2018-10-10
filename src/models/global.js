import * as Api from '../services/person';
import * as Utils from '../utils/utils'
export default {
    namespace: 'global',
    state: {
        getPoiListParams: {
            pageSize: 14,
            pageNo: 1,
            name: "",
            idCard: "",
            gender: "",
            carCount: "",
            nation: "",
            tag: "",
            partisanId: "",
            marital_status: "",
            census: "",
            phone: "",
            orgunitId: ""
        },
        addPoiParams: {
            imgPath: '',
            name: '',
            idCard: '',
            gender: '',
            infoImgPath: [],
            phone: '',
            marital_status: '',
            tag: '',
            nation: '',
            census: '',
            partisanId: '',
            houseCount: 1,
        },
        deleteInfoImg: [],
        poiList: [],
        poiPage: {
            pageSize: 14,
            pageNo: 1,
            total: 0
        },
        singlePoiDelete: {},
        deletePoiSelected: [],
        allNation: [],
        allPartisan: [],
        allTag: [],
        allVillage: [],
        addPoiModalVisiable: false,
        houseHomeParams0: {
            burg: '',
            orgunitId: '',
            village: '',
            building: '',
            unit: '',
            floor: '',
            room: '',
            houseRelation: ''
        },
        urbanList0: [],
        villageList0: [],
        buildList0: [],
        UnitList0: [],
        FloorList0: [],
        RoomList0: [],
        allProvinces: []
    },
    effects: {
        * getPoiList({ payload }, { put, call, select }) {
            const params = yield select(store => store.global.getPoiListParams);
            const response = yield call(Api.getPoiList, { ...params });
            if (Utils.isApiSuccess(response)) {
                const result = Utils.apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        poiList: result.list,
                        poiPage: result.page
                    }
                })
            }
        },
        * poiDelete({ payload }, { put, call, select }) {
            const params = yield select(store => store.global.singlePoiDelete);
            const response = yield call(Api.poiDelete, { ...params });
            if (Utils.isApiSuccess(response)) {
                const result = Utils.apiData(response);

                yield put({ type: 'getPoiList' })
            }
        },
        * poiDeletes({ payload }, { put, call, select }) {
            let params = yield select(store => store.global.deletePoiSelected);
            params = params.join(',');
            const response = yield call(Api.poiDeletes, { ids: params });
            if (Utils.isApiSuccess(response)) {
                const result = Utils.apiData(response);
                yield put({ type: 'getPoiList' })
            }
        },
        * getAllNation({ payload }, { put, call, select }) {
            const response = yield call(Api.getAllNation, {});
            if (Utils.isApiSuccess(response)) {
                const result = Utils.apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        allNation: result
                    }
                })
            }
        },
        * getAllTag({ payload }, { put, call, select }) {
            const response = yield call(Api.getAllTag, {});
            if (Utils.isApiSuccess(response)) {
                const result = Utils.apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        allTag: result
                    }
                })
            }
        },
        * getAllPartisan({ payload }, { put, call, select }) {
            const response = yield call(Api.getAllPartisan, {});
            if (Utils.isApiSuccess(response)) {
                const result = Utils.apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        allPartisan: result
                    }
                })
            }
        },
        * getAllVillage({ payload }, { put, call, select }) {
            const response = yield call(Api.getAllVillage, {});
            if (Utils.isApiSuccess(response)) {
                const result = Utils.apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        allVillage: result
                    }
                })
            }
        },
        * poiAdd({ payload }, { put, call, select }) {
            const g = yield select(store => store.global);
            const params = yield select(store => store.global.addPoiParams);
            const i = params.houseCount;
            for (let j = 0; j < i; j++) {
                params[`houseId_${j + 1}`] = g[`houseHomeParams${j}`].room
                params[`houseRelation_${j + 1}`] = g[`houseHomeParams${j}`].houseRelation
                // houseRelation_i: ''
            }
            let infoImgPath = params.infoImgPath.map(v => {
                return v.url
            });
            infoImgPath = infoImgPath.join(',');
            const response = yield call(Api.poiAdd, { ...params, infoImgPath });
            if (Utils.isApiSuccess(response)) {
                const result = Utils.apiData(response);
                yield put({ type: 'success', payload: { addPoiModalVisiable: false } })
                yield put({ type: 'getPoiList' });

                //TODO
                payload.form.resetFields()
            }
        },
        * poiModify({ payload }, { put, call, select }) {
            const g = yield select(store => store.global);
            const params = yield select(store => store.global.addPoiParams);
            const i = params.houseCount;
            for (let j = 0; j < i; j++) {
                params[`houseId_${j + 1}`] = g[`houseHomeParams${j}`].room
                params[`houseRelation_${j + 1}`] = g[`houseHomeParams${j}`].houseRelation
                // houseRelation_i: ''
            }
            let infoImgPath = params.infoImgPath.filter(v => {
                return v.uid !== '-1'
            });
            infoImgPath = infoImgPath.map(v => {
                return v.url
            })
            infoImgPath = infoImgPath.join(',');
            const response = yield call(Api.poiModify, { ...params, infoImgPath });
            if (Utils.isApiSuccess(response)) {
                const result = Utils.apiData(response);
                Utils.cfApiSuccess();
                yield put({ type: 'success', payload: { addPoiModalVisiable: false } })
                yield put({ type: 'getPoiList' });

                //TODO
                payload.form.resetFields()
            } else {
                Utils.cfShowApiFail(response);
            }
        },
        * getListByOrgunitId({ payload }, { put, call, select }) {
            const i = payload.type;
            const houseHomeParams = yield select(store => store.global[`houseHomeParams${i}`]);
            const response = yield call(Api.getListByOrgunitId, { orgunitId: houseHomeParams.burg ? houseHomeParams.burg : '' });
            if (Utils.isApiSuccess(response)) {
                const result = Utils.apiData(response);
                let addObj = {}
                addObj[`urbanList${i}`] = result;
                yield put({
                    type: 'success',
                    payload: {
                        ...addObj
                    }
                })
            }
        },
        * getListByOrgunitId2({ payload }, { put, call, select }) {
            const i = payload.type;
            const houseHomeParams = yield select(store => store.global[`houseHomeParams${i}`]);
            const response = yield call(Api.getListByOrgunitId, { orgunitId: houseHomeParams.orgunitId ? houseHomeParams.orgunitId : '' });
            if (Utils.isApiSuccess(response)) {
                const result = Utils.apiData(response);
                let addObj = {}
                addObj[`villageList${i}`] = result;
                yield put({
                    type: 'success',
                    payload: {
                        ...addObj
                    }
                })
            }
        },
        * getBuildingList({ payload }, { put, call, select }) {
            const i = payload.type;
            const houseHomeParams = yield select(store => store.global[`houseHomeParams${i}`]);

            const params = {
                orgunitId: houseHomeParams.village ? houseHomeParams.village : ''
            }
            const response = yield call(Api.getBuildingList, { ...params });
            if (Utils.isApiSuccess(response)) {
                const result = Utils.apiData(response);
                let addObj = {}
                addObj[`buildList${i}`] = result;
                yield put({
                    type: 'success',
                    payload: {
                        ...addObj
                    }
                })
            }
        },
        * getUnitList({ payload }, { put, call, select }) {
            const i = payload.type;
            const houseHomeParams = yield select(store => store.global[`houseHomeParams${i}`]);
            const params = {
                orgunitId: houseHomeParams.village ? houseHomeParams.village : '',
                building: houseHomeParams.building
            }
            const response = yield call(Api.getUnitList, { ...params });
            if (Utils.isApiSuccess(response)) {
                const result = Utils.apiData(response);
                let addObj = {}
                addObj[`UnitList${i}`] = result;
                yield put({
                    type: 'success',
                    payload: {
                        ...addObj
                    }
                })
            }
        },
        * getFloorList({ payload }, { put, call, select }) {
            const i = payload.type;
            const houseHomeParams = yield select(store => store.global[`houseHomeParams${i}`]);
            const params = {
                orgunitId: houseHomeParams.village ? houseHomeParams.village : '',
                building: houseHomeParams.building,
                unit: houseHomeParams.unit
            }
            const response = yield call(Api.getFloorList, { ...params });
            if (Utils.isApiSuccess(response)) {
                const result = Utils.apiData(response);
                let addObj = {}
                addObj[`FloorList${i}`] = result;
                yield put({
                    type: 'success',
                    payload: {
                        ...addObj
                    }
                })
            }
        },
        * getRoomList({ payload }, { put, call, select }) {
            const i = payload.type;
            const houseHomeParams = yield select(store => store.global[`houseHomeParams${i}`]);
            const params = {
                orgunitId: houseHomeParams.village ? houseHomeParams.village : '',
                building: houseHomeParams.building,
                unit: houseHomeParams.unit,
                floor: houseHomeParams.floor,
            }
            const response = yield call(Api.getRoomList, { ...params });
            if (Utils.isApiSuccess(response)) {
                const result = Utils.apiData(response);
                let addObj = {}
                addObj[`RoomList${i}`] = result;
                yield put({
                    type: 'success',
                    payload: {
                        ...addObj
                    }
                })
            }
        },
        * deleteInfoImg({ payload }, { put, call, select }) {
            const deleteInfoImg = yield select(store => store.global.deleteInfoImg);
            const { id } = yield select(store => store.global.addPoiParams);
            if (deleteInfoImg && deleteInfoImg.length > 0) {
                const imgName = deleteInfoImg.join(',');
                const response = yield call(Api.deleteInfoImg, { imgName, id });
                if (Utils.isApiSuccess(response)) {
                    const result = Utils.apiData(response);
                    Utils.cfApiSuccess()
                } else {
                    Utils.cfShowApiFail(response)
                }

            }
        },
        * getProvince({payload}, {put, call, select}){
            const response = yield call(Api.getProvince);
            if(Utils.isApiSuccess(response)){
                const result = Utils.apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        allProvinces: result
                    }
                })
            }
        }

    },


    reducers: {
        success(state, action) {
            return { ...state, ...action.payload };
        },
        clearHomeHouse(state, action) {
            const count = state.addPoiParams.houseCount;
            for (let i = 1; i < count; i++) {
                delete state[`houseHomeParams${i}`];
                delete state[`urbanList${i}`];
                delete state[`villageList${i}`];
                delete state[`buildList${i}`];
                delete state[`UnitList${i}`];
                delete state[`FloorList${i}`];
                delete state[`RoomList${i}`];
            }
            state.addPoiParams.houseCount = 1;
            state.houseHomeParams0 = {
                burg: '',
                orgunitId: '',
                village: '',
                building: '',
                unit: '',
                floor: '',
                room: '',
            };
            state.urbanList0 = [];
            state.villageList0 = [];
            state.buildList0 = [];
            state.UnitList0 = [];
            state.FloorList0 = [];
            state.RoomList0 = [];
            state.addPoiParams = {
                imgPath: '',
                name: '',
                idCard: '',
                gender: '',
                infoImgPath: [],
                phone: '',
                marital_status: '',
                tag: '',
                nation: '',
                census: '',
                partisanId: '',
                houseCount: 1,
                houseRelation_i: ''
            }
            return { ...state, ...action.payload };
        },
        getInitHouseMsg(state, action) {
            return { ...state, ...action.payload }
        }
    }
}