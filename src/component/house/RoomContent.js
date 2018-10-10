import React from 'react';
import { connect } from 'dva';
import { Row, Col, Input, InputNumber, Select, Button, Upload, Icon } from 'antd';
import * as Utils from '../../utils/utils';
import * as Conf from '../../utils/config';


import editIcon from '../../assets/edit.png';
import styles from './RoomContent.less';
function docClick(_this) {
    // if (!_this.state.edit) {
    //     return false;
    // }
    if (_this.state.selectOpen === true || _this.state.selectFloorOpen === true || _this.state.selectUnitOpen === true) {
        _this.setState({
            selectOpen: false,
            selectFloorOpen: false,
            selectUnitOpen: false
        });
        return false;
    }

    _this.setState({
        edit: false,
        edit1: false
    });

}
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
class RoomContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectOpen: false,
            selectUnitOpen: false,
            selectFloorOpen: false,
            edit1: false,
            edit: false,
            attributeId: '',
            unit: '',
            floor: '',
            room: '',
            area: '',
            id: '',
            waterMeter: '',
            eleMeter: '',
            gasMeter: '',
            imgPath: ''
        }
    }
    componentDidMount() {
        const card1 = this.refs.card1;
        const card = this.refs.card;
        const _this = this;
        document.addEventListener('click', docClick.bind(document, _this), false);
        card1.addEventListener('click', function (e) {
            if (!_this.state.edit1) {
                return false;
            }
            var ev = e || window.event;
            ev.stopPropagation();
        });
        card.addEventListener('click', function (e) {
            if (!_this.state.edit) {
                return false;
            }
            var ev = e || window.event;
            ev.stopPropagation();
        });
        this.props.dispatch({
            type: 'house/getAttribute'
        });

        setTimeout(() => {
            this.props.dispatch({
                type: 'house/getModifyHouseSelectData',
                payload: {
                    building: this.props.house.roomList.buildingId
                }
            })
        }, 300)

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
    onCard1MouseEnter = (e) => {
        const card = this.refs.card1;
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
        const mask = this.refs.mask1;
        // mask.classList += " " + styles.maskActive + ' ' + anim;
        mask.classList.add(styles.maskActive, anim);
    }
    onCard1MouseLeave = () => {
        const mask = this.refs.mask1;
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
            attributeId: this.props.house.roomList.attributeId,
            unit: this.props.house.roomList.unitId,
            floor: this.props.house.roomList.floorId,
            room: parseInt(this.props.house.roomList.room),
            area: parseInt(this.props.house.roomList.area.split('平方米')[0])

        });
        const mask = this.refs.mask;
        const anim = mask.classList[mask.classList.length - 1]
        mask.classList.remove(styles.maskActive, anim);
        setTimeout(() => {
            this.setState({
                edit: true,
                attributeId: this.props.house.roomList.attributeId,
                unit: this.props.house.roomList.unitId,
                floor: this.props.house.roomList.floorId,
                room: parseInt(this.props.house.roomList.room),
                area: parseInt(this.props.house.roomList.area.split('平方米')[0]),
            });
        }, 300)
    }
    onEdit1Click = (e) => {
        e.stopPropagation();
        this.setState({
            edit: true,
            waterMeter: this.props.house.roomList.waterMeter,
            eleMeter: this.props.house.roomList.eleMeter,
            gasMeter: this.props.house.roomList.gasMeter,
        });
        const mask = this.refs.mask1;
        const anim = mask.classList[mask.classList.length - 1]
        mask.classList.remove(styles.maskActive, anim);
        setTimeout(() => {
            this.setState({
                edit1: true,
                waterMeter: this.props.house.roomList.waterMeter,
                eleMeter: this.props.house.roomList.eleMeter,
                gasMeter: this.props.house.roomList.gasMeter,
            });
            this.inputRef1.input.focus();
        }, 300)
    }
    onAttrChange = (v) => {
        this.setState({
            attributeId: v
        })
    }
    onUnitChange = (v) => {
        const data = this.props.house.buildingData;
        const unitList = data.unitList;
        let i = -1;
        unitList.map((value, index) => {
            if (value.unit.id === v) {
                i = index
            }
        })
        this.setState({
            unit: v
        });
        this.props.dispatch({
            type: 'house/success',
            payload: {
                floorData: unitList[i].floorList.map(v => ({ id: v.floor.id, name: v.floor.name }))
            }
        })
    }
    onFloorChange = (v) => {
        this.setState({
            floor: v
        })
    }
    onRoomChange = (v) => {
        this.setState({
            room: v
        })
    }
    onAreaChange = (v) => {
        this.setState({
            area: v
        })
    }
    onWaterMeterChange = (e) => {
        this.setState({
            waterMeter: e.target.value
        })
    }
    onEleMeterChange = (e) => {
        this.setState({
            eleMeter: e.target.value
        })
    }
    onGasMeterChange = (e) => {
        this.setState({
            gasMeter: e.target.value
        })
    }
    onSubmit = (e) => {
        this.props.dispatch({
            type: 'house/modifyHouse',
            payload: {
                attributeId: this.state.attributeId,
                unit: this.state.unit,
                floor: this.state.floor,
                room: this.state.room,
                area: this.state.area,
                id: this.props.house.listOrgunitParams.orgunitId.split('-')[0],
                waterMeter: '',
                eleMeter: '',
                gasMeter: '',
                imgPath: ''
            }
        })

    }
    onSubmit2 = () => {
        this.props.dispatch({
            type: 'house/modifyHouse',
            payload: {
                id: this.props.house.listOrgunitParams.orgunitId.split('-')[0],
                waterMeter: this.state.waterMeter,
                eleMeter: this.state.eleMeter,
                gasMeter: this.state.gasMeter,
                attributeId: '',
                unit: '',
                floor: '',
                room: '',
                area: '',
                imgPath: ''
            }
        })

    }
    onSelectMouseEnter = () => {
        this.setState({
            selectOpen: true,
            selectUnitOpen: false,
            selectFloorOpen: false
        })
    }

    onSelectUnitMouseEnter = () => {
        this.setState({
            selectUnitOpen: true,
            selectOpen: false,
            selectFloorOpen: false
        })
    }
    onSelectFloorMouseEnter = () => {
        this.setState({
            selectFloorOpen: true,
            selectUnitOpen: false,
            selectOpen: false,
        })
    }
    onSelectMouseLeave = () => {
        this.setState({
            selectOpen: false
        })
    }
    handleChange = (info) => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
         this.setState({
            loading: false,
          })
          this.props.dispatch({
            type: 'house/modifyHouse',
            payload: {
                id: this.props.house.listOrgunitParams.orgunitId.split('-')[0],
                waterMeter:'',
                eleMeter: '',
                gasMeter: '',
                attributeId: '',
                unit: '',
                floor: '',
                room: '',
                area: '',
                imgPath: info.file.response.result
            }
        })
      }
    }
    render() {
        const uploadButton = (
            <div>
              <Icon type={this.state.loading ? 'loading' : 'plus'} />
              <div className={styles.uploadText}>点击上传图片</div>
            </div>
          );
        return (
            <div>
                <Row gutter={16}>
                    <Col span={12} className={styles.houseImg}>
                    <Upload
                    name="image"
                    listType="picture-card"
                    className="avatar-uploader"
                    action={`${Conf.API_PREFIX}/poi/saveImg.do`}
                    showUploadList={false}
                    onChange={this.handleChange}
                  >
                    { this.props.house.roomList.houseImg || this.state.imageUrl? <img className={styles.uploadedImg} src={this.props.house.roomList.houseImg || this.state.imageUrl} alt="avatar" /> : uploadButton}
                  </Upload>
                    </Col>
                    <Col span={6}>
                        <div
                            onMouseEnter={this.state.edit ? () => { return false } : this.onCardMouseEnter}
                            onMouseLeave={this.state.edit ? () => { return false } : this.onCardMouseLeave}
                            style={{ overflow: 'hidden', position: 'relative' }}
                            ref="card">
                            <div className={styles.attribute}>
                                <p>
                                    <span>房屋类型：</span>
                                    <span>{this.props.house.roomList.type ? this.props.house.roomList.type : ''}</span>
                                </p>
                                <p>
                                    <span>房屋属性：</span>
                                    {this.state.edit ?
                                        <Select
                                            open={this.state.selectOpen}
                                            onFocus={this.onSelectMouseEnter}
                                            onChange={this.onAttrChange}
                                            style={{ width: '55%' }}
                                            value={this.state.attributeId}>
                                            {this.props.house.allAttributes &&
                                                this.props.house.allAttributes.length > 0 ?
                                                this.props.house.allAttributes.map(v =>
                                                    <Select.Option value={v.id}>{v.attributeName}</Select.Option>) :
                                                ''}
                                        </Select> :
                                        <span>{this.props.house.roomList.attribute ? this.props.house.roomList.attribute : ''}</span>}
                                </p>
                                <p>
                                    <span>房屋单元：</span>
                                    {this.state.edit ?
                                        <Select
                                            open={this.state.selectUnitOpen}
                                            onFocus={this.onSelectUnitMouseEnter}
                                            value={this.state.unit}
                                            style={{ width: '55%' }}
                                            onChange={this.onUnitChange}>
                                            {this.props.house.untiData.map(v => <Select.Option value={v.id}>{v.name}</Select.Option>)}
                                        </Select> :
                                        <span>{this.props.house.roomList.unit ? this.props.house.roomList.unit : ''}</span>}
                                </p>
                                <p>
                                    <span>房屋楼层：</span>
                                    {this.state.edit ?
                                        <Select
                                            open={this.state.selectFloorOpen}
                                            onFocus={this.onSelectFloorMouseEnter}
                                            value={this.state.floor}
                                            style={{ width: '55%' }}
                                            onChange={this.onFloorChange}>
                                            {this.props.house.floorData.map(v => <Select.Option value={v.id}>{v.name}</Select.Option>)}
                                        </Select>
                                        :
                                        <span>{this.props.house.roomList.floor ? this.props.house.roomList.floor : ''}</span>}
                                </p>
                                <p>
                                    <span>房屋门牌：</span>
                                    {this.state.edit ?
                                        <InputNumber
                                            min={0}
                                            onChange={this.onRoomChange}
                                            style={{ width: '55%' }}
                                            value={this.state.room} /> :
                                        <span>{this.props.house.roomList.room ? this.props.house.roomList.room : ''}</span>}
                                </p>
                                <p>
                                    <span>房屋面积：</span>
                                    {this.state.edit ?
                                        //  <Input
                                        //   onPressEnter={this.onEditPress} 
                                        //   onChange={this.onAreaChange} 
                                        //   style={{ width: '55%' }} 
                                        //   value={this.state.area} /> 
                                        <InputNumber
                                            formatter={value => `${value}平方米`}
                                            parser={value => value.replace('平方米', '')}
                                            // onPressEnter={this.onEditPress} 
                                            min={0}
                                            onChange={this.onAreaChange}
                                            style={{ width: '55%' }}
                                            value={this.state.area} /> :
                                        <span>{this.props.house.roomList.area ? this.props.house.roomList.area : ''}</span>}
                                </p>



                            </div>

                            <div ref="mask" className={styles.mask}>
                                <div className={styles.maskIconContain}>
                                    <img src={editIcon} onClick={(e) => this.onEditClick(e)} alt="" />
                                </div>
                            </div>
                        </div>
                        {
                            this.state.edit ? <p>
                                <Button type="primary" onClick={this.onSubmit}>确定</Button>
                            </p> : ''
                        }
                    </Col>
                    <Col span={6}>
                        <div
                            onMouseEnter={this.state.edit1 ? () => { return false } : this.onCard1MouseEnter}
                            onMouseLeave={this.state.edit1 ? () => { return false } : this.onCard1MouseLeave}
                            style={{ overflow: 'hidden', position: 'relative' }}
                            ref="card1"
                        >
                            <div className={styles.attribute}>
                                <p>
                                    <span>水费：</span>
                                    {this.state.edit1 ? <Input onChange={this.onWaterMeterChange} ref={(c) => this.inputRef1 = c} value={this.state.waterMeter} /> :
                                        <span>{this.props.house.roomList.waterMeter ? this.props.house.roomList.waterMeter : ''}</span>}

                                </p>
                                <p>
                                    <span>电费：</span>
                                    {this.state.edit1 ? <Input value={this.state.eleMeter} /> :
                                        <span>{this.props.house.roomList.eleMeter ? this.props.house.roomList.eleMeter : ''}</span>}
                                </p>
                                <p>
                                    <span>燃气费：</span>
                                    {this.state.edit1 ? <Input value={this.state.gasMeter} /> :
                                        <span>{this.props.house.roomList.gasMeter ? this.props.house.roomList.gasMeter : ''}</span>}
                                </p>

                            </div>
                            <div ref="mask1" className={styles.mask}>
                                <div className={styles.maskIconContain}>
                                    <img src={editIcon} onClick={(e) => this.onEdit1Click(e)} alt="" />
                                </div>
                            </div>
                        </div>
                        {
                            this.state.edit1 ? <p>
                                <Button type="primary" onClick={this.onSubmit2}>确定</Button>
                            </p> : ''
                        }
                    </Col>

                </Row>
            </div>
        )
    }
}

export default connect((state) => {
    return { ...state }
})(RoomContent)
