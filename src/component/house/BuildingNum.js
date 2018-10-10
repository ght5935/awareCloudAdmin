import React from 'react';
import { connect } from 'dva';
import { Col, Input, Tooltip, Popconfirm, Icon, Select, InputNumber } from 'antd';
import styles from './buildingNum.less';
import icon from '../../assets/orgIcon.png';
import * as Utils from '../../utils/utils';
import editIcon from '../../assets/edit.png';
import deleteIcon from '../../assets/delete.png';

function docClick(_this) {
    // if (!_this.state.edit) {
    //     return false;
    // }
    if (_this.state.selectOpen) {
        _this.setState({
            selectOpen: false
        })
        return false;
    }
    _this.setState({
        edit: false,
        add: false
    });

}
class BuildingCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            add: false,
            edit: false,
            selectOpen: false,
            name: '',
            addName: '',
            typeId: '',
            addTypeId: ''
        }
    }
    componentDidMount() {
        this.setState({
            name: this.props.data && this.props.data.name ? this.props.data.name : ''
        })
        var card = this.refs.card;
        const _this = this;
        document.addEventListener('click', docClick.bind(document, _this), false);
        card.addEventListener('click', function (e) {
            // if (!_this.state.edit) {
            //     return false;
            // }
            if (_this.state.edit || _this.state.add) {
                var ev = e || window.event;
                ev.stopPropagation();
            }

        });
    }
    componentWillUnmount() {
        const _this = this;
        document.removeEventListener('click', docClick.bind(document, _this), false);
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
            edit: true,
            typeId: this.props.data.typeId,
            name: parseInt(this.props.data.name.split('号')[0])
        });
        const mask = this.refs.mask;
        const anim = mask.classList[mask.classList.length - 1]
        mask.classList.remove(styles.maskActive, anim);
        setTimeout(() => {
            this.setState({
                edit: true,
                typeId: this.props.data.typeId,
            name: parseInt(this.props.data.name.split('号')[0])
            });

        }, 300)
    }
    inputRef = undefined;
    onInputFocus = () => {
        
    }
    onInputChange = (v) => {
        this.setState({
            name: v
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


    }
    onAddInputChange = (v) => {
        this.setState({
            addName: v
        })
    }
    onPressEnter = (e) => {
        e.persist()
        if(e.keyCode !== 13){
            return false
        }
        this.props.dispatch({
            type: 'house/modifyBuilding',
            payload: {
                name: this.state.name,
                orgunitId: this.props.data.id,
                typeId: this.state.typeId
            }
        })

    }
    onAddPressEnter = (e) => {
        e.persist()
        if(e.keyCode !== 13){
            return false
        }
        this.props.dispatch({
            type: 'house/addBuilding',
            payload: {
                name: this.state.addName,
                orgunitId: this.props.orgunitId.split('-')[0],
                typeId: this.state.addTypeId
            }
        });
        this.setState({
            add: false
        })
    }

    onDeletConfirm = () => {
        this.props.dispatch({
            type: 'house/deleteBuilding',
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
        }, 300)
    }
    onSelectFocus = () => {
        this.setState({
            selectOpen: true
        })
    }
    onSelectChange = (v) => {
        this.setState({
            typeId: v
        })
    }
    onAddSelectChange = (v) => {
        this.setState({
            addTypeId: v
        })
    }
    getAttrbute = (typeId) => {
        const data = this.props.house.houseType;
        let rt = '';
        data.map((v, i) => {
            if (v.id === typeId) {
                rt = v.typeName
            }
        });
        return rt;
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
                            <Select value={this.state.addTypeId} open={this.state.selectOpen} onFocus={this.onSelectFocus} onChange={this.onAddSelectChange} style={{ marginTop: '12px', width: '109px' }}>
                                {this.props.house.houseType.map(v => <Select.Option value={v.id}>{v.typeName}</Select.Option>)}
                            </Select>
                            <Tooltip title={this.state.addName} visible={this.state.addName ? true : false} trigger={'focus'}>
                                <InputNumber value={this.state.addName} onFocus={this.addInputFocus} onChange={this.onAddInputChange} onKeyDown={this.onAddPressEnter} ref={c => { this.inputRef = c }} style={{ marginTop: '12px', width: '109px' }} />
                            </Tooltip>
                        </div> :
                        <div style={{ width: '100%', height: '100%' }} onClick={this.onAddClick}>
                            <Icon className={styles.add} type="plus"></Icon>
                        </div> : ''}
                    {this.props.i === -1 ? '' :
                        <div className={styles.content}>
                            <img src={icon} alt="" />
                            {this.state.edit ?
                                <Select value={this.state.typeId} open={this.state.selectOpen} onFocus={this.onSelectFocus} onChange={this.onSelectChange} style={{ marginTop: '12px', width: '109px' }}>
                                    {this.props.house.houseType.map(v => <Select.Option value={v.id}>{v.typeName}</Select.Option>)}
                                </Select> :
                                <p ref="orgname" style={{ width: this.getOrgNameWidth() }} className={styles.orgName}>{this.getAttrbute(this.props.data.typeId)}</p>}
                            {this.state.edit ?
                                <Tooltip title={this.state.name} trigger={'focus'}>
                                    <InputNumber value={this.state.name} onFocus={this.onInputFocus} onChange={this.onInputChange} onKeyDown={this.onPressEnter} ref={c => { this.inputRef = c }} style={{ marginTop: '12px', width: '109px' }} />
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
})(BuildingCard)
