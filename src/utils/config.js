// export const API_PREFIX    = window.AWARE_API_PREFIX;
// export const WEBSOCKET_URL = window.AWARE_WEBSOCKET;
export const API_PREFIX = window.CF_API_PREFIX ? window.CF_API_PREFIX : 'http://192.168.1.218:8090/awareCloudAdmin';
export const WEBSOCKET_URL = window.CF_WEBSOCKET ? window.WEBSOCKET_URL : 'http://192.168.1.218:8011';
export const PROVINCE_FOR_SHORT = ['京', '津', '冀', '晋', '蒙',
    '辽', '吉', '黑', '沪', '苏', '浙', '皖', '闽', '赣',
    '鲁', '豫', '鄂/楚', '湘', '粤', '桂', '琼', '渝',
    '川/蜀', '贵/黔', '云/滇', '藏', '陕/秦', '甘/陇',
    '青', '宁', '新', '港', '澳', '台']
export const CENDSUS = ['户籍人员', '外地人员', '境外人员'];
export const MARITAL_STATUS = ['未婚', '已婚', '离异', '丧偶'];
export const GENDER = ['女', '男'];

// orgTree 房屋所在层级
export const HOUSE_INDEX = 6
