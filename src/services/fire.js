
import request from '../utils/request';
import * as api from '../utils/api';
import { toQueryString } from '../utils/utils';


export async function getAllVillage(params) {
    return request(`${api.getAllVillage}`);
}


