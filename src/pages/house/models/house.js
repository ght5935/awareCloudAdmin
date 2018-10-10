import * as Api from '../../../services/house';
import * as Utils from '../../../utils/utils'
export default {
    namespace: 'house',
    state: {
        orgTree: [],
        cascaderData: [],
        listOrgunitParams: {
            orgunitId: '',
            type: ''
        },
        orgCardList: [],
        houseOrgInfo: {
            villageName: '',
            building: '',
            unitList: []
        },
        cardType: 1,
        modifyCommitteeParams: {
            orgunitId: '',
            name: ''
        },
        unitActive: 0,
        roomList: {},
        modifyRoomParams: {
            id: '',
            typeId: '',
            attribute: '',
            unit: '',
            floor: '',
            room: '',
            area: '',
            waterMeter: '',
            eleMeter: '',
            gasMeter: '',
            image: ''
        },
        addUtilNum: '',
        addFloorNum: '',
        addRoomParams: {
            unit: '',
            floor: '',
            room: ''
        },
        addUtilModalVisible: false,
        addFloorModalVisible: false,
        addRoomModalVisible: false,
        allAttributes: [],
        houseType: [],
        buildingData: [],
        unitData: [],
        floorData: [],
    },
    effects: {
        * getOrgTree({ payload }, { put, call, select }) {
            const response = yield call(Api.getOrgunitTree, {});
            if (Utils.isApiSuccess(response)) {
                const result = Utils.apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        orgTree: [result],
                        listOrgunitParams: {
                            orgunitId: `${result.id}-${result.level}-${result.parentId}`,
                            type: result.level
                        }
                    }
                });
                yield put({
                    type: 'listOrgunit'
                })

            }
        },
        * getOrgTree2({ payload }, { put, call, select }) {
            const response = yield call(Api.getOrgunitTree, {});
            if (Utils.isApiSuccess(response)) {
                const result = Utils.apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        orgTree: [result]
                    }
                });
            }
        },
        * chooseIssueAjax({ payload }, { put, call, select }) {
            const params = yield select(store => store.house.listOrgunitParams);
            const v = params.type.toString();
            switch (v) {
                case '1':
                    yield put({ type: 'listOrgunit' });
                    break;
                case '2':
                    yield put({ type: 'listOrgunit' });
                    break;
                case '3':
                    yield put({ type: 'getBuildingList' });
                    break;
                case '4':
                    yield put({ type: 'getHouseOrgInfo' });
                    yield put({ type: 'getOrgByBuId' })
                    break;
                case '5':
                    yield put({ type: 'getHouseOrgInfo' });
                    yield put({ type: 'getOrgByBuId' })
                    break;
                case '6':
                    yield put({ type: 'listHouse' });
                    break;
                default:
                    break;
            }
        },
        * listOrgunit({ payload }, { put, call, select }) {
            const params = yield select(store => store.house.listOrgunitParams)
            const orgunitId = params.orgunitId.split('-')[0];
            const response = yield call(Api.listOrgunit, { orgunitId });
            if (Utils.isApiSuccess(response)) {
                const result = Utils.apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        orgCardList: result,
                        cardType: params.type
                    }
                });
            }
        },
        * getBuildingList({ payload }, { put, call, select }) {
            const params = yield select(store => store.house.listOrgunitParams)
            const orgunitId = params.orgunitId.split('-')[0];
            const response = yield call(Api.getBuildingList, { orgunitId, name: '', type: '', attribute: '' });
            if (Utils.isApiSuccess(response)) {
                const result = Utils.apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        orgCardList: result,
                        cardType: params.type
                    }
                });
            }
        },
        * deleteCommittee({ payload }, { put, call, select }) {
            const { orgunitId } = payload;
            const response = yield call(Api.deleteCommittee, { orgunitId });
            if (Utils.isApiSuccess(response)) {
                const result = Utils.apiData(response);
                Utils.cfApiSuccess();
                yield put({ type: 'getOrgTree2' })
                yield put({ type: 'chooseIssueAjax' })
            } else {

                Utils.cfShowApiFail(response)
            }
        },
        * modifyCommittee({ payload }, { put, call, select }) {
            const { orgunitId, name } = payload;
            const response = yield call(Api.modifyCommittee, { orgunitId, name });
            if (Utils.isApiSuccess(response)) {
                const result = Utils.apiData(response);
                Utils.cfApiSuccess();
                yield put({ type: 'getOrgTree2' })
                yield put({ type: 'chooseIssueAjax' })

            } else {
                Utils.cfShowApiFail(response)
            }
        },
        * addCommittee({ payload }, { put, call, select }) {
            const { orgunitId, name } = payload;
            const response = yield call(Api.addCommittee, { orgunitId, name });
            if (Utils.isApiSuccess(response)) {
                const result = Utils.apiData(response);
                Utils.cfApiSuccess();
                yield put({ type: 'getOrgTree2' })
                yield put({ type: 'chooseIssueAjax' })

            } else {
                Utils.cfShowApiFail(response)
            }
        },
        * addVillage({ payload }, { put, call, select }) {
            const { orgunitId, name, address, image } = payload;
            const response = yield call(Api.addVillage, { orgunitId, name, address, imgPath: image });
            if (Utils.isApiSuccess(response)) {
                const result = Utils.apiData(response);
                Utils.cfApiSuccess();
                yield put({ type: 'getOrgTree2' })
                yield put({ type: 'chooseIssueAjax' })

            } else {
                Utils.cfShowApiFail(response)
            }
        },
        * modifyVillage({ payload }, { put, call, select }) {
            const { orgunitId, name, address, image } = payload;
            const response = yield call(Api.modifyVillage, { orgunitId, name, address, imgPath: image });
            if (Utils.isApiSuccess(response)) {
                const result = Utils.apiData(response);
                Utils.cfApiSuccess();
                yield put({ type: 'getOrgTree2' })
                yield put({ type: 'chooseIssueAjax' })

            } else {
                Utils.cfShowApiFail(response)
            }
        },
        * deleteVillage({ payload }, { put, call, select }) {
            const { orgunitId } = payload;
            const response = yield call(Api.deleteVillage, { orgunitId });
            if (Utils.isApiSuccess(response)) {
                const result = Utils.apiData(response);
                Utils.cfApiSuccess();
                yield put({ type: 'getOrgTree2' })
                yield put({ type: 'chooseIssueAjax' })
            } else {

                Utils.cfShowApiFail(response)
            }
        },
        * addBuilding({ payload }, { put, call, select }) {
            const { orgunitId, name, typeId } = payload;
            const response = yield call(Api.addBuilding, { typeId,orgunitId, building: name });
            if (Utils.isApiSuccess(response)) {
                const result = Utils.apiData(response);
                Utils.cfApiSuccess();
                yield put({ type: 'getOrgTree2' })
                yield put({ type: 'chooseIssueAjax' })

            } else {
                Utils.cfShowApiFail(response)
            }
        },
        * modifyBuilding({ payload }, { put, call, select }) {
            const { orgunitId, name, typeId } = payload;
            const response = yield call(Api.modifyBuilding, { typeId: typeId, id: orgunitId, building: name });
            if (Utils.isApiSuccess(response)) {
                const result = Utils.apiData(response);
                Utils.cfApiSuccess();
                yield put({ type: 'getOrgTree2' })
                yield put({ type: 'chooseIssueAjax' })

            } else {
                Utils.cfShowApiFail(response)
            }
        },
        * deleteBuilding({ payload }, { put, call, select }) {
            const { orgunitId } = payload;
            const response = yield call(Api.deleteBuilding, { id: orgunitId });
            if (Utils.isApiSuccess(response)) {
                const result = Utils.apiData(response);
                Utils.cfApiSuccess();
                yield put({ type: 'getOrgTree2' })
                yield put({ type: 'chooseIssueAjax' })
            } else {

                Utils.cfShowApiFail(response)
            }
        },
        * getHouseOrgInfo({ payload }, { put, call, select }) {
            const params = yield select(store => store.house.listOrgunitParams)
            const orgunitId = params.orgunitId.split('-')[0];
            const response = yield call(Api.getHouseOrgInfo, { orgunitId });
            if (Utils.isApiSuccess(response)) {
                const result = Utils.apiData(response);
                let unitActive = '';
                if (params.type === '5') {
                    unitActive = params.orgunitId.split('-')[2];
                } else {
                    unitActive = result.unitList && result.unitList.length > 0 && result.unitList[0].unit && result.unitList[0].unit ? result.unitList[0].unit.id : 0
                }
                yield put({
                    type: 'success',
                    payload: {
                        houseOrgInfo: result,
                        unitActive
                    }
                })

            } else {
                Utils.cfShowApiFail(response)
            }
        },
        * listHouse({ payload }, { put, call, select }) {
            const params = yield select(store => store.house.listOrgunitParams)
            const id = params.orgunitId.split('-')[0];
            const response = yield call(Api.listHouse, { id });
            if (Utils.isApiSuccess(response)) {
                const result = Utils.apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        roomList: result,
                        cardType: params.type
                    }
                });
            }

        },
        * addUnit({ payload }, { put, call, select }) {
            const buildingId = yield select(store => store.house.houseOrgInfo.building.id);
            const unit = yield select(store => store.house.addUtilNum);

            const response = yield call(Api.addUnit, { buildingId, unit });
            if (Utils.isApiSuccess(response)) {
                const result = Utils.apiData(response);
                Utils.cfApiSuccess();
                yield put({ type: 'getOrgTree2' });
                yield put({ type: 'chooseIssueAjax' });
                yield put({ type: 'getHouseOrgInfo' });
                yield put({
                    type: 'success',
                    payload: {
                        addUtilModalVisible: false,
                        addUtilNum: ''
                    }
                })
            } else {
                Utils.cfShowApiFail(response);
            }

        },
        * deleteUnit({ payload }, { put, call, select }) {
            const id = payload.id;;
            // const units = yield select(store => store.house.houseOrgInfo.unitList);
            // const lastUnit = parseInt(units[units.length - 1].unit.name.split('单元')[0]);
            const response = yield call(Api.deleteUnit, { id });
            if (Utils.isApiSuccess(response)) {
                const result = Utils.apiData(response);

                yield put({ type: 'getOrgTree2' })
                yield put({ type: 'chooseIssueAjax' })
                yield put({
                    type: 'getHouseOrgInfo'
                });
                Utils.cfApiSuccess();
            } else {
                Utils.cfShowApiFail(response);
            }
        }
        ,
        * deleteHouse({ payload }, { put, call, select }) {
            const id = payload.id;
            // const units = yield select(store => store.house.houseOrgInfo.unitList);
            // const lastUnit = parseInt(units[units.length - 1].unit.name.split('单元')[0]);
            const response = yield call(Api.deleteHouse, { id });
            if (Utils.isApiSuccess(response)) {
                const result = Utils.apiData(response);
                Utils.cfApiSuccess();
                yield put({ type: 'getOrgTree2' })
                yield put({ type: 'chooseIssueAjax' })
                yield put({
                    type: 'getHouseOrgInfo'
                })
            } else {
                Utils.cfShowApiFail(response);
            }

        },
        * addFloor({ payload }, { put, call, select }) {
            const unitId = yield select(store => store.house.unitActive);
            const floor = yield select(store => store.house.addFloorNum);
            const response = yield call(Api.addFloor, { unitId, floor });
            if (Utils.isApiSuccess(response)) {
                const result = Utils.apiData(response);
                Utils.cfApiSuccess();
                yield put({
                    type: "success",
                    payload: {
                        addFloorModalVisible: false,
                        addFloorNum: ''
                    }
                })
                yield put({ type: 'getOrgTree2' })
                yield put({ type: 'chooseIssueAjax' })
                yield put({
                    type: 'getHouseOrgInfo'
                });

            } else {
                Utils.cfShowApiFail(response);
            }
        },
        * deleteFloor({ payload }, { put, call, select }) {
            const id = payload.id;
            // const units = yield select(store => store.house.houseOrgInfo.unitList);
            // const lastUnit = parseInt(units[units.length - 1].unit.name.split('单元')[0]);
            const response = yield call(Api.deleteFloor, { id });
            if (Utils.isApiSuccess(response)) {
                const result = Utils.apiData(response);
                Utils.cfApiSuccess();
                yield put({ type: 'getOrgTree2' })
                yield put({ type: 'chooseIssueAjax' })
                yield put({
                    type: 'getHouseOrgInfo'
                })
            } else {
                Utils.cfShowApiFail(response);
            }
        },
        * modifyFloor({ payload }, { put, call, select }) {
            const { id, floor } = payload
            // const units = yield select(store => store.house.houseOrgInfo.unitList);
            // const lastUnit = parseInt(units[units.length - 1].unit.name.split('单元')[0]);
            const response = yield call(Api.modifyFloor, { floor, id });
            if (Utils.isApiSuccess(response)) {
                const result = Utils.apiData(response);
                Utils.cfApiSuccess();
                yield put({ type: 'getOrgTree2' })
                yield put({ type: 'chooseIssueAjax' })
                yield put({
                    type: 'getHouseOrgInfo'
                })
            } else {
                Utils.cfShowApiFail(response);
            }
        },
        * getOrgByBuId({ payload }, { put, call, select }) {
            console.log('..............')
            let building = yield select(store => store.house.listOrgunitParams.orgunitId);
            building = parseInt(building.split('-')[0]);
            const response = yield call(Api.getOrgByBuId, { building });
            if (Utils.isApiSuccess(response)) {
                const result = Utils.apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        cascaderData: result
                    }
                })
            }


        },
        * addRoom({ payload }, { put, call, select }) {
            const params = yield select(store => store.house.addRoomParams);
            let building = yield select(store => store.house.listOrgunitParams.orgunitId);
            building = building.split('-')[0];
            const response = yield call(Api.addRoom, { ...params, building });

            if (Utils.isApiSuccess(response)) {

                const result = Utils.apiData(response);
                Utils.cfApiSuccess();
                yield put({
                    type: "success",
                    payload: {
                        addRoomModalVisible: false,
                        addRoomParams: {
                            building: '',
                            floor: '',
                            unit: '',
                            room: ''
                        }
                    }
                })
                yield put({ type: 'getOrgTree2' })
                yield put({ type: 'chooseIssueAjax' })
                yield put({
                    type: 'getHouseOrgInfo'
                });
            }

        },
        * modifyHouse({ payload }, { put, call, select }) {
            const { id, attributeId,
                unit, floor, room, area,
                waterMeter, eleMeter,
                gasMeter, imgPath } = payload
            const params = {
                id, unit, floor, room, area,
                waterMeter, eleMeter,
                gasMeter, imgPath
            }
            const response = yield call(Api.modifyHouse, { ...params, attribute: attributeId });
            if (Utils.isApiSuccess(response)) {
                const result = Utils.apiData(response);
                Utils.cfApiSuccess();
                yield put({ type: 'getOrgTree2' })
                yield put({ type: 'chooseIssueAjax' })

            } else {
                Utils.cfShowApiFail(response)
            }

        },
        * getAttribute({ payload }, { put, call, select }) {
            const response = yield call(Api.getAttribute);
            if (Utils.isApiSuccess(response)) {
                const result = Utils.apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        allAttributes: result
                    }
                })
            }
        },
        * getHouseType({ payload }, { put, call, select }) {
        const response = yield call(Api.getHouseType);
        if (Utils.isApiSuccess(response)) {
            const result = Utils.apiData(response);
            yield put({
                type: 'success',
                payload: {
                    houseType: result
                }
            })
        }
    },
        * getModifyHouseSelectData({ payload }, { put, call, select }) {
            const orgunitId = payload.building;
            const response = yield call(Api.getHouseOrgInfo, { orgunitId });
            if (Utils.isApiSuccess(response)) {
                const result = Utils.apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        buildingData: result,
                        untiData: result.unitList.map(v => ({ id: v.unit.id, name: v.unit.name })),
                        floorData: []
                    }
                })

            } else {
                Utils.cfShowApiFail(response)
            }
        },




    },
    reducers: {
        success(state, action) {
            return { ...state, ...action.payload };
        }
    }
}