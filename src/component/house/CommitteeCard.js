import React from 'react';
import { connect } from 'dva';
import { Col, Input, Tooltip, Popconfirm, Icon } from 'antd';
import styles from './committeeCard.less';
import icon from '../../assets/orgIcon.png';
import * as Utils from '../../utils/utils';
import editIcon from '../../assets/edit.png';
import deleteIcon from '../../assets/delete.png';

function docClick(_this) {
    // if (!_this.state.edit) {
    //     return false;
    // }
    _this.setState({
        edit: false,
        add: false
    });

}
class CommitteeCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            add: false,
            edit: false,
            name: '',
            addName: ''
        }
    }
    componentDidMount() {
        this.setState({
            name: this.props.data && this.props.data.name ? this.props.data.name : ''
        })
        var card = this.refs.card;
        const _this = this;
        document.addEventListener('click',docClick.bind(document, _this), false );
        card.addEventListener('click', function (e) {
            if (!_this.state.edit) {
                return false;
            }
            var ev = e || window.event;
            ev.stopPropagation();
        });
    }
    componentWillUnmount() {
        const _this = this;
        document.removeEventListener('click',docClick.bind(document, _this), false);
    }
    getCardHeight = () => {
        var card = this.refs.card;
        if (card) {
            var width = card.offsetWidth;
            return `${width}px`;
        }
    }
    getOrgNameWidth = () => {
        var card = this.refs.card;
        if (card) {
            var width = card.offsetWidth;
            return `${width - 20}px`;
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
        // mask.classList += " " + styles.maskActive + ' ' + anim;
        mask.classList.add(styles.maskActive, anim);
    }
    onCardMouseLeave = () => {
        const mask = this.refs.mask;
        const count = mask.classList.length;
        if (count === 3) {
            const anim = mask.classList[mask.classList.length - 1]
            mask.classList.remove(styles.maskActive, anim);
        }
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
    inputRef = undefined;
    onInputFocus = () => {
        this.setState({
            name: this.props.data.name
        });
    }
    onInputChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }
    addInputFocus = () => {
        var addRef = this.refs.addRef ? this.refs.addRef : null;
        const _this = this
        // if (addRef) {
        //     addRef.addEventListener('click', function (e) {
        //         if (!_this.state.add) {
        //             return false;
        //         }
        //         var ev = e || window.event;
        //         ev.stopPropagation();
        //     });
        // }

        this.setState({
            addName: ''
        })

    }
    onAddInputChange = (e) => {
        this.setState({
            addName: e.target.value
        })
    }
    onPressEnter = (e) => {
        e.persist()
        if (this.state.name !== this.props.data.name) {
            this.props.dispatch({
                type: 'house/modifyCommittee',
                payload: {
                    name: this.state.name,
                    orgunitId: this.props.data.id
                }
            })
        } else {
            return false
        }
    }
    onAddPressEnter = (e) => {
        e.persist()
        if (this.state.addName !== '') {
            this.props.dispatch({
                type: 'house/addCommittee',
                payload: {
                    name: this.state.addName,
                    orgunitId: this.props.orgunitId.split('-')[0]
                }
            });

        } else {
            return false
        }
        this.setState({
            add: false
        })
    }

    onDeletConfirm = () => {
        this.props.dispatch({
            type: 'house/deleteCommittee',
            payload: {
                orgunitId: this.props.data.id
            }
        })
    }

    onAddClick = (e) => {
        this.setState({
            add: true,
            addName: ''
        });
        setTimeout(() => {
            this.setState({
                add: true
            });
            this.inputRef.input.focus();
        }, 300)
    }
    render() {
        return (
            <Col span={4} className={styles.col}>
                <div
                    data-id="card"
                    className={styles.card}
                    onMouseEnter={this.state.edit || !this.props.data ? () => { return false } : this.onCardMouseEnter}
                    onMouseLeave={this.state.edit || !this.props.data ? () => { return false } : this.onCardMouseLeave}
                    ref="card"
                    style={{ height: this.getCardHeight() }}>
                    {this.props.i === -1 ? this.state.add ?
                        <div className={styles.content} ref="addRef">
                            <img src={icon} alt="" />
                            <Tooltip title={this.state.addName} visible={this.state.addName ? true : false} trigger={'focus'}>
                                <Input value={this.state.addName} onFocus={this.addInputFocus} onChange={this.onAddInputChange} onPressEnter={this.onAddPressEnter} ref={c => { this.inputRef = c }} style={{ marginTop: '12px', width: '109px' }} />
                            </Tooltip>
                        </div> :
                        <div style={{ width: '100%', height: '100%' }} onClick={this.onAddClick}>
                            <Icon className={styles.add} type="plus"></Icon>
                        </div> : ''}
                    {this.props.i === -1 ? '' :
                        <div className={styles.content}>
                            <img src={icon} alt="" />
                            {this.state.edit ?
                                <Tooltip title={this.state.name} trigger={'focus'}>
                                    <Input value={this.state.name} onFocus={this.onInputFocus} onChange={this.onInputChange} onPressEnter={this.onPressEnter} ref={c => { this.inputRef = c }} style={{ marginTop: '12px', width: '109px' }} />
                                </Tooltip> :
                                <p ref="orgname" style={{ width: this.getOrgNameWidth() }} className={styles.orgName}>{this.props.data.name}</p>}
                        </div>}

                    {this.props.i === -1 ? '' :
                        <div ref="mask" className={styles.mask}>
                            <div className={styles.maskIconContain}>
                                <img src={editIcon} onClick={(e) => this.onEditClick(e)} alt="" />

                                <Popconfirm title={'您将执行删除人员操作，将会引起数据变化，是否继续执行？'} onConfirm={this.onDeletConfirm} placement="topRight" okText="是" cancelText="否">
                                    <img src={deleteIcon} alt="" />
                                </Popconfirm>
                            </div>
                        </div>}
                </div>
            </Col>
        )
    }
}
export default connect((state) => {
    return { ...state }
})(CommitteeCard)
