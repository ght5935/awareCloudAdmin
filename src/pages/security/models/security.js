import * as Api from '../../../services/security';
import * as Utils from '../../../utils/utils'
export default {
    namespace: 'security',
    state: {
        searchParams: {
            village: ''
        },
        villageList: [],
        addParams: {
            name: '',
            number: '',
            imgPath: '',
        }
    },
    effects: {

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
    },
    reducers: {
        success(state, action) {
            return { ...state, ...action.payload };
        }
    }
}