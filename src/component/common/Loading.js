import React from 'react';
import { Spin,Icon } from 'antd';

import styles from './TableSkeleton.less';

class TableSkeleton extends React.Component {
    
    render() {
        return (
            <div className={styles.span}>
                <Spin indicator={<Icon type="loading" style={{ fontSize: 24,position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} spin />}></Spin> 
            </div>
        )
    }
}
export default TableSkeleton;