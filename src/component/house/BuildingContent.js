import React from 'react';
import { connect } from 'dva';
import { Tabs, Row, Col, Dropdown, Icon, Menu, Popconfirm, Input, InputNumber } from 'antd';
import styles from './BuildingContent.less';
import floor from '../../assets/floor.png';
import Swiper from 'swiper/dist/js/swiper.min.js';
import editIcon from '../../assets/edit.png';
import deleteIcon from '../../assets/delete.png';
import * as Utils from '../../utils/utils';
import AddRoomModal from './addRoomModal';
import AddUtilModal from './addUtilModal';
import AddFloorModal from './addFloorModal';

import 'swiper/dist/css/swiper.min.css'
import { publicDecrypt } from 'crypto';

const TabPane = Tabs.TabPane;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
function stopPropagation(ev) {
  ev.stopPropagation()
}
function docClick(_this) {
  // if (!_this.state.edit) {
  //     return false;
  // }
  _this.setState({
    floorEdit: -1
  });

}

class BuildingContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      floorEdit: -1,
      floorEditText: '',
      floorCardIndex: ""
    }
  }
  componentDidMount() {
    const _this = this;
    document.addEventListener('click', docClick.bind(document, _this), false);
  }
  getIconClass = (id) => {
    let rt = ''
    switch (id) {
      case 1:
        rt = styles.selfIcon;
        break;
      case 2:
        rt = styles.leaseIcon;
        break;
      case 3:
        rt = styles.emptyIcon;
        break;
      default:
        rt = ''

    }
    return rt;
  }
  onTabClick = (v) => {
    this.props.dispatch({
      type: 'house/success',
      payload: {
        unitActive: v
      }
    })
  }

  onAddUnitClick = () => {
    this.props.dispatch({
      type: 'house/success',
      payload: {
        addUtilModalVisible: true
      }
    })
  }
  onAddRoomClick = () => {
    this.props.dispatch({
      type: 'house/success',
      payload: {
        addRoomModalVisible: true
      }
    })
  }
  onAddFloorClick = () => {
    this.props.dispatch({
      type: 'house/success',
      payload: {
        addFloorModalVisible: true
      }
    })
  }
  onDeletConfirm = (id, e) => {
    e.stopPropagation();
    this.props.dispatch({
      type: 'house/deleteFloor',
      payload: {
        id: id
      }
    })

  }
  onDeleteUtilConfirm = (id, e) => {
    e.stopPropagation();
    this.props.dispatch({
      type: 'house/deleteUnit',
      payload: {
        id: id
      }
    })

  }
  onRoomDeletConfirm = (id, e) => {
    this.props.dispatch({
      type: 'house/deleteHouse',
      payload: {
        id: id
      }
    })
  }
  onStopPropagation = (e) => {
    e.stopPropagation()
  }
  onCardMouseEnter = (index, e) => {
    const card = this.refs[`card_${index}`];
    card.removeEventListener('click', stopPropagation, false)
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
    const mask = this.refs[`mask_${index}`];
    // mask.classList += " " + styles.maskActive + ' ' + anim;
    mask.classList.add(styles.maskActive, anim);
  }
  onCardMouseLeave = (i) => {
    const mask = this.refs[`mask_${i}`];
    const card = this.refs[`card_${i}`];

    card.removeEventListener('click', stopPropagation, false)
    const count = mask.classList.length;
    if (count === 3) {
      const anim = mask.classList[mask.classList.length - 1]
      mask.classList.remove(styles.maskActive, anim);
    }
  }
  onEditClick = (e, i, name) => {
    e.stopPropagation();
    const mask = this.refs[`mask_${i}`];
    const card = this.refs[`card_${i}`];
    this.setState({
      floorEdit: i,
      floorEditText: parseInt(name.split('层')[0]),
      floorCardIndex: i
    });


    const anim = mask.classList[mask.classList.length - 1]
    mask.classList.remove(styles.maskActive, anim);
    setTimeout(() => {
      this.setState({
        floorEdit: i
      });
      card.addEventListener('click', stopPropagation, false)
      // this.inputRef.input.focus();
    }, 300)
  }
  renderEditPage = (i, name) => {
    return (
      <div ref={`mask_${i}`} className={styles.mask}>
        <div className={styles.maskIconContain}>
          <img src={editIcon} onClick={(e) => this.onEditClick(e, i, name)} alt="" />
          <Popconfirm title={'您将执行删除人员操作，将会引起数据变化，是否继续执行？'} onConfirm={this.onDeletConfirm.bind(this, i)} placement="topRight" okText="是" cancelText="否">
            <img src={deleteIcon} alt="" />
          </Popconfirm>
        </div>
      </div>
    )
  }
  onInputNumChange = (e) => {

    let floorEditText = e;
    if (floorEditText <= 0) {
      floorEditText = 1
    }

    this.setState({
      floorEditText
    })
  }
  onFloorEnterPress = (e) => {
    if (e.keyCode === 13) {
      this.props.dispatch({
        type: 'house/modifyFloor',
        payload: {
          floor: this.state.floorEditText,
          id: this.state.floorEdit
        }
      })
      this.setState({
        floorEditText: '',
        floorEdit: -1
      })
    }

  }
  onRoomEditClick = (e, roomID, pid) => {
    this.props.changeToRoomPage(roomID, pid)
  }

  render() {
    const renderMenu =
      <Menu>
        <Menu.Item key="1" >
          <span onClick={this.onAddUnitClick}>新增单元</span>
        </Menu.Item>
        <Menu.Item key="2" >
          <span onClick={this.onAddFloorClick}>新增楼层</span>
        </Menu.Item>
        <Menu.Item key="3" >
          <span onClick={this.onAddRoomClick}>新增房屋</span>
        </Menu.Item>
      </Menu>
    return (
      <div className={styles.content}>
        <div style={{ fontSize: '18px', marginBottom: '10px', position: 'relative' }}>
          <span>{`${this.props.house.houseOrgInfo && this.props.house.houseOrgInfo.villageName ? this.props.house.houseOrgInfo.villageName : ''}-${this.props.house.houseOrgInfo && this.props.house.houseOrgInfo.building && this.props.house.houseOrgInfo.building.name ? this.props.house.houseOrgInfo.building.name : ''}`}</span>
          <Dropdown overlay={renderMenu}>
          <div style={{ position: 'absolute', right: '10px', top: '15px' }}>
            
              <span >
                <Icon className={styles.plusIcon} style={{ fontSize: '30px' }} type="plus" />
              </span>
         
          </div>
          </Dropdown>
        </div>
        <Tabs type="card" activeKey={`${this.props.house.unitActive}`} onTabClick={this.onTabClick}>
          {this.props.house.houseOrgInfo.unitList.map(v => (
            <TabPane key={`${v.unit.id}`} tab={
              <div className={styles.tabTextContain}>
                <span className={styles.tabText}>{v.unit.name}</span>
                <Popconfirm title={'您将执行删除单元操作，将会引起数据变化，是否继续执行？'} onConfirm={this.onDeleteUtilConfirm.bind(this, v.unit.id)} placement="topRight" okText="是" cancelText="否">
                  <Icon className={styles.deleteIcon} onClick={this.onStopPropagation} type="close-circle" theme="filled" />
                </Popconfirm>
              </div>
            }>
              <div className={styles.listContent}>
                {v.floorList.map((value, i) => (
                  <div className={styles.listItem}>
                    <Row>
                      <Col span={4} className={styles.floor}>
                        <div
                          ref={`card_${value.floor.id}`}
                          className={styles.floorCard}
                          onMouseEnter={this.state.floorEdit === -1 ? this.onCardMouseEnter.bind(this, value.floor.id) : () => { return false; }}
                          onMouseLeave={this.state.floorEdit === -1 ? this.onCardMouseLeave.bind(this, value.floor.id) : () => { return false; }}
                        >
                          <span className={styles.context}>
                            <img src={floor} alt="" />
                            {this.state.floorEdit === value.floor.id ? <InputNumber
                              autoFocus
                              formatter={value => `${value}层`}
                              parser={value => value.replace('层', '')}
                              style={{ marginTop: '10px' }}
                              value={this.state.floorEditText}
                              onChange={this.onInputNumChange}
                              onKeyDown={this.onFloorEnterPress}
                            /> : <p style={{ marginTop: '11px' }}>{value.floor.name}</p>}
                          </span>
                          {this.renderEditPage(value.floor.id, value.floor.name)}
                        </div>
                      </Col>
                      <Col span={20}>
                        <Row>
                      
                          {value.houseList.map(item => (

                            <Col className={styles.roomItem} span={6}>
                              <div
                                className={styles.roomCard}
                              >
                                <i className={`${styles.attribute} ${this.getIconClass(item.attribute  && item.attribute.id? item.attribute.id : '')}`}></i>
                                <span className={`${styles.context} ${styles.room}`}>{item.house.room}室</span>
                                <div className={styles.roomMask}>
                                  <div className={styles.maskIconContain}>
                                    <img src={editIcon} onClick={(e) => this.onRoomEditClick(e, item.house.id, item.house.floor)} alt="" />
                                    <Popconfirm title={'您将执行删除人员操作，将会引起数据变化，是否继续执行？'} onConfirm={this.onRoomDeletConfirm.bind(this, item.house.id)} placement="topRight" okText="是" cancelText="否">
                                      <img src={deleteIcon} alt="" />
                                    </Popconfirm>
                                  </div>
                                </div>
                              </div>

                            </Col>
                          ))}
                          
                        </Row>
                      </Col>
                    </Row>
                  </div>
                ))}
              </div>
            </TabPane>
          ))}
        </Tabs>
        <AddRoomModal />
        <AddUtilModal />
        <AddFloorModal />

      </div >
    )
  }
}
export default connect((state) => {
  return { ...state }
})(BuildingContent)
