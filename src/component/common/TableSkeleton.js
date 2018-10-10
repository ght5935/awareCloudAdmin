import React from 'react';
import { Skeleton, Divider } from 'antd';

import styles from './TableSkeleton.less';

class TableSkeleton extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true
        }
    }
    componentDidMount(){
        this.timer = setTimeout(() => {
            this.setState({
                loading: false
            })
        }, 1000)
    }
    renderSkeleton = () => {
        let rt = [];
        for (let i = 0; i < 3; i++) {
            rt.push(<div key={i} className={styles.skeleton}>
                <Skeleton active loading={this.state.loading} title={false} paragraph={{ rows: 2 }}><div/></Skeleton>
            </div>)
        }
        return rt;
    }
    componentWillUnmount() {
        clearTimeout(this.timer);
    }
    render() {
        return (
            <div className={styles.content}>
                <div className={styles.theader}>
                    <div className={styles.theaderText}></div>
                </div>
                <div className={styles.contain}>
                    {this.renderSkeleton()}
                </div>
            </div>
        )
    }
}
export default TableSkeleton;