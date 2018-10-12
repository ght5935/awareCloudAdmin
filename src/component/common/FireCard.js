import React from 'react';
import { connect } from 'dva';
import { Upload, Icon, Modal, Input, Popconfirm } from 'antd';


import fireImg from '../../assets/fire.png';
import editIcon from '../../assets/edit.png';
import deleteIcon from '../../assets/delete.png';

import * as Utils from '../../utils/utils';
import styles from './FireCard.less';

class FireCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
        }
    }
    onCardMouseEnter = (e) => {
        const card = this.refs.card;
        const i = Utils.handleMouseEnterDirection(card, e);
        let anim = ''
        switch (i) {
            case 0:
                anim = styles.animTop;
                break;
            case 1:
                anim = styles.animRight;
                break;
            case 2:
                anim = styles.animBottom;
                break;
            case 3:
                anim = styles.animLeft;
                break;
            default:
                anim = ''
        }
        const mask = this.refs.mask;
        mask.classList.add(styles.maskActive, anim);
    }
    onCardMouseLeave = () => {
        const mask = this.refs.mask;
        const count = mask.classList.length;
        if (count === 3) {
            const anim = mask.classList[mask.classList.length - 1]
            mask.classList.remove(styles.maskActive, anim);
        }
        this.setState({
            edit: false,
        })
    }
    onDeletConfirm = () => {
        // this.props.dispatch({
        //     type: 'house/deleteCommittee',
        //     payload: {
        //         orgunitId: this.props.data.id
        //     }
        // })
    }
    onEditClick = (e) => {
        e.stopPropagation();
        this.setState({
            edit: true
        });
        const mask = this.refs.mask;
        const anim = mask.classList[mask.classList.length - 1]
        mask.classList.remove(styles.maskActive, anim);
        setTimeout(() => {
            this.setState({
                edit: true
            });
            this.inputRef.input.focus();
        }, 300)
    }
    componentDidMount() {

    }

    render() {
  
        return (
            <div
                className={styles.card}
                onMouseEnter={this.onCardMouseEnter}
                onMouseLeave={this.onCardMouseLeave}
                ref="card"
            >
                <div style={{ position: 'absolute' }}>
                    <img alt='' src={this.props.fireImg} className={styles.picture} />
                    {
                        this.state.edit ?
                            <div>
                                <Input
                                    style={{ marginTop: '6px', width: '109px' }}
                                    ref={c => { this.inputRef = c }}
                                    value={this.props.leabelName}
                                />
                                <br/>
                                <Input
                                    style={{marginTop: '6px', width: '109px' }}
                                    ref={c => { this.inputRef = c }}
                                    value={this.props.leabelNumber}
                                />
                            </div>
                            :
                            <div>
                                <span className={styles.TxtLabel}>{this.props.leabelName}</span>
                                <br />
                                <span className={styles.TxtNumber} >{this.props.leabelNumber}</span>
                            </div>
                    }
                </div>
                <div ref="mask" className={styles.mask}>
                    <div className={styles.maskIconContain}>
                        <img src={editIcon} alt="" onClick={(e) => this.onEditClick(e)} />
                        <Popconfirm title={'您将执行删除人员操作，将会引起数据变化，是否继续执行？'} onConfirm={this.onDeletConfirm} placement="topRight" okText="是" cancelText="否">
                            <img src={deleteIcon} alt="" />
                        </Popconfirm>
                    </div>
                </div>

            </div>

        )
    }
}
export default connect((state) => {
    return { ...state }
})(FireCard)
