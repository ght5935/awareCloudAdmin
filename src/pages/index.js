import React from 'react';
import TableSkeleton from '../component/common/TableSkeleton';
import {
  Row, Col, Input, Skeleton, Radio,
  Select, Button, Icon, Table, Pagination,
  Popconfirm, Modal, Form, version
} from 'antd';
import { connect } from 'dva';

import DetailPersonModal from '../component/person/DetailPersonModal'

import * as Utils from '../utils/utils';
import * as Conf from '../utils/config';
import styles from './index.less';

const RadioGroup = Radio.Group;
const { Column, ColumnGroup } = Table;
const FormItem = Form.Item;

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalTitle: '新增人员',
      modalBtn: '确认新增',
      tableScrollY: 0,
      modifyImgPath: ''
    }
  }
  componentDidMount() {
    const table = this.refs.table;
    const tableNode = this.refs.tableNode;
    let y = 0;
    const _this = this;
    Utils.getHeightResponse(table);
    window.onresize = function () {
      Utils.getHeightResponse(table);
      y = Utils.getTableHeight(tableNode);
      _this.setState({
        tableScrollY: y
      })
    }
    y = Utils.getTableHeight(tableNode);
    this.setState({
      tableScrollY: y
    })

    this.props.dispatch({
      type: 'global/getPoiList'
    });
    this.props.dispatch({
      type: 'global/getAllNation'
    })
    this.props.dispatch({
      type: 'global/getAllPartisan'
    })
    this.props.dispatch({
      type: 'global/getAllTag'
    })
    this.props.dispatch({
      type: 'global/getAllVillage'
    })
    this.props.dispatch({
      type: 'global/getProvince'
    })
  }

  itemRender = (current, type, originalElement) => {
    if (type === 'prev') {
      return <a className={styles.paginationBtn}><Icon type="left" theme="outlined" />上一页</a>
    }
    if (type === 'next') {
      return <a className={styles.paginationBtn}>下一页<Icon type="right" theme="outlined" /></a>
    }
    return originalElement
  }
  onDeletConfirm = (record) => {
    this.props.dispatch({
      type: 'global/success',
      payload: {
        singlePoiDelete: {
          id: record.id
        }
      }
    });
    this.props.dispatch({
      type: 'global/poiDelete'
    })
  }
  onNameChange = (e) => {
    const getPoiListParams = this.props.global.getPoiListParams;
    this.props.dispatch({
      type: 'global/success',
      payload: {
        getPoiListParams: {
          ...getPoiListParams,
          name: e.target.value
        }
      }
    })
  }
  onGenderChange = (v) => {
    const getPoiListParams = this.props.global.getPoiListParams;
    this.props.dispatch({
      type: 'global/success',
      payload: {
        getPoiListParams: {
          ...getPoiListParams,
          gender: v
        }
      }
    })
  }
  onIdCardChange = (e) => {
    const getPoiListParams = this.props.global.getPoiListParams;
    this.props.dispatch({
      type: 'global/success',
      payload: {
        getPoiListParams: {
          ...getPoiListParams,
          idCard: e.target.value
        }
      }
    })
  }
  onPhoneChange = (e) => {
    const getPoiListParams = this.props.global.getPoiListParams;
    this.props.dispatch({
      type: 'global/success',
      payload: {
        getPoiListParams: {
          ...getPoiListParams,
          phone: e.target.value
        }
      }
    })
  }
  onMaritalStatusChange = (v) => {
    const getPoiListParams = this.props.global.getPoiListParams;
    this.props.dispatch({
      type: 'global/success',
      payload: {
        getPoiListParams: {
          ...getPoiListParams,
          marital_status: v
        }
      }
    })
  }
  onNationChange = (v) => {
    const getPoiListParams = this.props.global.getPoiListParams;
    this.props.dispatch({
      type: 'global/success',
      payload: {
        getPoiListParams: {
          ...getPoiListParams,
          nation: v
        }
      }
    })
  }

  onPartisanIdChange = (v) => {
    const getPoiListParams = this.props.global.getPoiListParams;
    this.props.dispatch({
      type: 'global/success',
      payload: {
        getPoiListParams: {
          ...getPoiListParams,
          partisanId: v
        }
      }
    })
  }
  onCensusIdChange = (v) => {
    const getPoiListParams = this.props.global.getPoiListParams;
    this.props.dispatch({
      type: 'global/success',
      payload: {
        getPoiListParams: {
          ...getPoiListParams,
          census: v
        }
      }
    })
  }
  onOrgunitIdChange = (v) => {
    const getPoiListParams = this.props.global.getPoiListParams;
    this.props.dispatch({
      type: 'global/success',
      payload: {
        getPoiListParams: {
          ...getPoiListParams,
          orgunitId: v
        }
      }
    })
  }
  onCarCountChange = (e) => {
    const getPoiListParams = this.props.global.getPoiListParams;
    this.props.dispatch({
      type: 'global/success',
      payload: {
        getPoiListParams: {
          ...getPoiListParams,
          carCount: e.target.value
        }
      }
    })
  }
  onTagChange = (e) => {
    const getPoiListParams = this.props.global.getPoiListParams;
    this.props.dispatch({
      type: 'global/success',
      payload: {
        getPoiListParams: {
          ...getPoiListParams,
          tag: e.target.value
        }
      }
    })
  }
  onPageChange = (page, pageSize) => {
    const getPoiListParams = this.props.global.getPoiListParams;
    this.props.dispatch({
      type: 'global/success',
      payload: {
        getPoiListParams: {
          ...getPoiListParams,
          pageNo: page,
          pageSize
        }
      }
    });
    this.props.dispatch({
      type: 'global/getPoiList'
    });
  }
  onSearchClick = () => {
    this.props.dispatch({
      type: 'global/getPoiList'
    });
  }
  addModalVisit = (v, e) => {
    const addPoiParams = this.props.global.addPoiParams;
    const infoImgs = v.relatedInfo && v.relatedInfo.length > 0 ? v.relatedInfo : []
    if (v.id) {
      this.setState({
        modalTitle: '编辑人员',
        modalBtn: '确认修改',
        modifyImgPath: v.img && v.img.length > 0 ? v.img[0] : ''
      });
      let initHouseMsg = {
        urbanList0: [],
        villageList0: [],
        buildList0: [],
        UnitList0: [],
        FloorList0: [],
        RoomList0: []
      }
      let g = {}
      const count = v.houseList ? v.houseList.length : 0

      this.props.dispatch({
        type: 'global/success',
        payload: {
          addPoiParams: {
            ...addPoiParams,
            imgPath: '',
            name: v.name ? v.name : '',
            idCard: v.identityCard ? v.identityCard : '',
            gender: v.gender ? v.gender : 0,
            infoImgPath: infoImgs.map(value => ({
              uid: '-1',
              name: value.split('imgName=')[1],
              status: 'done',
              url: value,
              thumbUrl: value,
            })),
            phone: v.phone ? v.phone : '',
            marital_status: v.maritalStatus ? v.maritalStatus : '',
            tag: v.tagData && v.tagData.length > 0 ? v.tagData[0].id : '',
            nation: v.nationData && v.nationData.id ? v.nationData.id : '',
            census: v.census ? v.census : '',
            partisanId: v.partisanData && v.partisanData.id ? v.partisanData.id : '',
            houseCount: v.houseList && v.houseList.length > 0 ? v.houseList.length : 0,
            id: v.id ? v.id : ''
          },
        }
      });
      for (let i = 0; i < count; i++) {
        g[`houseHomeParams${i}`] = {
          burg: '1',
          orgunitId: v.houseList[i].neighborhood.toString(),
          village: v.houseList[i].community.toString(),
          building: v.houseList[i].building.toString(),
          unit: v.houseList[i].unit.toString(),
          floor: v.houseList[i].floor.toString(),
          room: v.houseList[i].houseId.toString(),
          houseRelation: v.houseList[i].houseRelation
        }
        if (!initHouseMsg[`urbanList${i}`]) {
          initHouseMsg[`urbanList${i}`] = []
        }
        if (!initHouseMsg[`villageList${i}`]) {
          initHouseMsg[`villageList${i}`] = []
        }

        if (!initHouseMsg[`buildList${i}`]) {
          initHouseMsg[`buildList${i}`] = []
        }
        if (!initHouseMsg[`UnitList${i}`]) {
          initHouseMsg[`UnitList${i}`] = []
        }
        if (!initHouseMsg[`FloorList${i}`]) {
          initHouseMsg[`FloorList${i}`] = []
        }
        if (!initHouseMsg[`RoomList${i}`]) {
          initHouseMsg[`RoomList${i}`] = []
        }


        initHouseMsg[`urbanList${i}`].push({ id: v.houseList[i].neighborhood.toString(), name: v.houseList[i].neighborhoodName });
        initHouseMsg[`villageList${i}`].push({ id: v.houseList[i].community.toString(), name: v.houseList[i].communityName });
        initHouseMsg[`buildList${i}`].push({ id: v.houseList[i].building.toString(), name: v.houseList[i].buildingName });
        initHouseMsg[`UnitList${i}`].push({ id: v.houseList[i].unit.toString(), name: v.houseList[i].unitName });
        initHouseMsg[`FloorList${i}`].push({ id: v.houseList[i].floor.toString(), name: v.houseList[i].floorName });
        initHouseMsg[`RoomList${i}`].push({ id: v.houseList[i].houseId.toString(), room: v.houseList[i].room });
      }
      this.props.dispatch({
        type: 'global/getInitHouseMsg',
        payload: { ...g, ...initHouseMsg }
      })
    } else {
      this.setState({
        modalTitle: '新增人员',
        modalBtn: '确认新增'
      })
    }
    this.props.dispatch({
      type: 'global/success',
      payload: {
        addPoiModalVisiable: true
      }
    })
  }
  addModalHidden = () => {
    this.props.dispatch({
      type: 'global/success',
      payload: {
        addPoiModalVisiable: false
      }
    });
    this.setState({
      modifyImgPath: ''
    })
    setTimeout(() => {
      this.props.dispatch({
        type: 'global/clearHomeHouse'
      })

    }, 300)

  }
  onAllRowSelected = () => {
    const data = this.props.global.poiList;
    const deletePoiSelected = data.map(v => v.id);
    this.props.dispatch({
      type: 'global/success',
      payload: {
        deletePoiSelected
      }
    })
  }
  onAllRowNoSelected = () => {
    const data = this.props.global.poiList;
    const deletePoiSelected = this.props.global.deletePoiSelected;
    const allKeys = data.map(v => v.id);

    const payload = allKeys.filter(v => deletePoiSelected.indexOf(v) === -1)

    this.props.dispatch({
      type: 'global/success',
      payload: {
        deletePoiSelected: payload
      }
    })
  }
  onDeleteRows = () => {
    this.props.dispatch({
      type: 'global/poiDeletes'
    })
  }
  getCarProvince = (id) => {
    const provinces = this.props.global.allProvinces;
    let rt = '';
    provinces.map(v => {
      if (v.id === id) {
        rt = v.province
      }
    })
    return rt
  }

  render() {
    const retrieve = this.props.global.getPoiListParams;
    const rowSelection = {
      selectedRowKeys: this.props.global.deletePoiSelected,
      onChange: (keys) => {
        this.props.dispatch({
          type: 'global/success',
          payload: {
            deletePoiSelected: keys
          }
        })
      }
    }
    return (
      <div className={styles.normal}>
        <div className={styles.search}>
          <Skeleton loading={false}>
            <Row>
              <Col span={4}>
                <span>姓名：</span>
                <Input value={retrieve.name} onChange={this.onNameChange} style={{ width: '70%' }} placeholder="请输入姓名" />
              </Col>
              <Col span={4}>
                <span>性别：</span>
                <Select onChange={this.onGenderChange} value={retrieve.gender} style={{ width: '63%' }}>
                  <Select.Option value="">全部</Select.Option>

                  <Select.Option value={1}>男</Select.Option>
                  <Select.Option value={0}>女</Select.Option>


                </Select>
                {/* <RadioGroup value={retrieve.gender} onChange={this.onGenderChange} className={styles.genderRadio} style={{ width: '70%', height: '32px', lineHeight: '32px' }}>
                  <Radio className={styles.radio} value={1}>男</Radio>
                  <Radio className={styles.radio} value={0}>女</Radio>
                </RadioGroup> */}
              </Col>
              <Col span={5}>
                <span>婚姻状况：</span>
                <Select onChange={this.onMaritalStatusChange} value={retrieve.marital_status} style={{ width: '63%' }}>
                  {/* 0-未婚，1-已婚，2-离婚，3-丧偶 */}
                  <Select.Option key={1} value="">全部</Select.Option>
                  <Select.Option key={2} value={0}>未婚</Select.Option>
                  <Select.Option key={3} value={1}>已婚</Select.Option>
                  <Select.Option key={4} value={2}>离婚</Select.Option>
                  <Select.Option key={5} value={3}>丧偶</Select.Option>

                </Select>

              </Col>
              <Col span={5}>
                <span>手机号码：</span>
                <Input onChange={this.onPhoneChange} value={retrieve.phone} style={{ width: '63%' }} placeholder="请输入手机号" />
              </Col>
              <Col span={6}>
                <span>身份证号：</span>
                <Input onChange={this.onIdCardChange} value={retrieve.idCard} style={{ width: '70%' }} placeholder="请输入身份证" />

              </Col>
            </Row>
            <Row style={{ marginTop: '10px' }}>
              <Col span={4}>
                <span>民族：</span>
                <Select onChange={this.onNationChange} value={retrieve.nation} style={{ width: '70%' }}>
                  <Select.Option value="">全部</Select.Option>
                  {this.props.global.allNation.map(v =>
                    <Select.Option key={v.id} value={v.id}>{v.name}</Select.Option>
                  )}
                </Select>
              </Col>
              <Col span={4}>
                <span>党派：</span>
                <Select onChange={this.onPartisanIdChange} value={retrieve.partisanId} style={{ width: '63%' }}>
                  <Select.Option value="">全部</Select.Option>
                  {this.props.global.allPartisan.map(v =>
                    <Select.Option key={v.id} value={v.id}>{v.name}</Select.Option>
                  )}
                </Select>
              </Col>
              <Col span={5}>
                <span>户籍：</span>
                <Select onChange={this.onCensusIdChange} value={retrieve.census} style={{ width: '76%' }}>
                  <Select.Option value="">全部</Select.Option>
                  {Conf.CENDSUS.map((v, i) => <Select.Option key={i} value={i}>{v}</Select.Option>)}
                </Select>
              </Col>
              <Col span={5}>
                <span>所属社区：</span>
                {/* <Input style={{width: '63%'}} placeholder="Basic usage"/> */}
                <Select onChange={this.onOrgunitIdChange} value={retrieve.orgunitId} style={{ width: '63%' }}>
                  <Select.Option key={''} value="">全部</Select.Option>
                  {this.props.global.allVillage.map(v =>
                    <Select.Option key={v.id} value={v.id}>{v.name}</Select.Option>
                  )}
                </Select>
              </Col>
              <Col span={6}>
                <span>拥有车辆：</span>
                <RadioGroup onChange={this.onCarCountChange} value={retrieve.carCount} className={styles.carCount} style={{ width: '70%', height: '32px', lineHeight: '32px' }}>
                  <Radio value={''}>全部</Radio>
                  <Radio value={0}>0</Radio>
                  <Radio value={1}>1</Radio>
                  <Radio value={2}>2</Radio>
                  <Radio value={3}>>2</Radio>
                </RadioGroup>
              </Col>
            </Row>
            <Row style={{ marginTop: '10px' }}>
              <Col span={22}>
                <span>标签：</span>
                <Radio.Group onChange={this.onTagChange} value={retrieve.tag} className={styles.personTags} buttonStyle="solid">
                  <Radio.Button value={''}>全部</Radio.Button>
                  {this.props.global.allTag.map(v => <Radio.Button key={v.id} value={`${v.id}`}>{v.name}</Radio.Button>)}
                </Radio.Group>
              </Col>
              <Col span={2}>
                <div className={styles.searchBtn}>
                  <Button onClick={this.onSearchClick} type="primary">搜索</Button>
                </div>
              </Col>
            </Row>
          </Skeleton>
        </div>
        <div className={styles.table} ref="table">
          <Skeleton loading={false} active>
            <Row style={{ marginBottom: '26px' }}>
              <Col className={styles.selectBtns} span={22}>
                <Button onClick={this.onAllRowSelected}><Icon type="plus" theme="outlined" />全 选</Button>
                <Button onClick={this.onAllRowNoSelected}><Icon type="check-square" theme="outlined" />反 选</Button>
                <Popconfirm title={this.props.global.deletePoiSelected.length > 0 ? "您将执行删除人员操作，将会引起数据变化，是否继续执行？" : "请选择需要删除的内容！"} onConfirm={this.onDeleteRows} placement="bottom" okText="是" cancelText="否">
                  <Button><Icon type="delete" theme="outlined" />删除选中</Button>
                </Popconfirm>
              </Col>
              <Col span={2}>
                <div className={styles.searchBtn}>
                  <Button onClick={this.addModalVisit} type="primary"><Icon type="plus" theme="outlined" />新增人员</Button>
                </div>
              </Col>

            </Row>
            <div ref="tableNode" style={{ overflow: 'hidden', borderBottom: '1px solid #e8e8e8', borderRadius: '4px', position: 'relative' }}>
              <Table
                dataSource={this.props.global.poiList}
                size="small"
                bordered
                pagination={false}
                scroll={{ y: this.state.tableScrollY }}
                rowSelection={rowSelection}
                rowKey={record => record.id}
              >
                <Column
                  title="姓名"
                  dataIndex="name"
                  key="name"
                  width={100}
                />
                <Column
                  title="性别"
                  dataIndex="sex"
                  key="sex"
                  width={100}
                />
                <Column
                  title="民族"
                  dataIndex="nationData"
                  key="nationData"
                  width={100}
                  render={nation => nation.name}
                />
                <Column
                  title="党派"
                  dataIndex="partisanData"
                  key="partisanData"
                  width={100}
                  render={partisan => partisan.name}
                />
                <Column
                  title="标签"
                  dataIndex="tagData"
                  key="tagData"
                  width={100}
                  render={tag => (
                    tag ? tag.map((v, i) => i === tag.length - 1 ? <span key={i}>{v.name}</span> : <span key={i}>{v.name}<br /></span>) : ''
                  )}
                />
                <Column
                  title="所属社区"
                  dataIndex="orgunitData"
                  key="orgunitData"
                  width={100}
                  render={org => org.name}
                />
                <Column
                  title="房屋信息"
                  dataIndex="houseList"
                  key="houseList"
                  width={100}
                  render={house => (
                    house ? house.map((v, i) => i === house.length - 1 ? <span key={i}>{v.address}</span> : <span key={i}>{v.address}<br /></span>) : ''
                  )}
                />
                <Column
                  title="车辆"
                  dataIndex="carList"
                  key="carList"
                  width={100}
                  render={car => (
                    car ? car.map((v, i) => i === car.length - 1 ? <span key={i}>{this.getCarProvince(v.province)}{v.plateNumber}</span> : <span key={i}>{this.getCarProvince(v.province)}{v.plateNumber}<br /></span>) : ''
                  )}
                />
                <Column
                  title="详情"
                  key="id"
                  datakey="id"
                  width={100}
                  render={record => (
                    <div>
                      {/* <a className={styles.operate}>查看</a> */}
                      <a className={styles.operate} onClick={this.addModalVisit.bind(this, record)}>编辑</a>
                      <Popconfirm title="您将执行删除人员操作，将会引起数据变化，是否继续执行？" onConfirm={this.onDeletConfirm.bind(this, record)} placement="topRight" okText="是" cancelText="否">
                        <a className={styles.operate}>删除</a>
                      </Popconfirm>
                    </div>
                  )}
                />
              </Table>
              {/* {this.props.global.poiList && this.props.global.poiList.length > 0 ? '' : <TableSkeleton />} */}
            </div>
          </Skeleton>
          <Row style={{ position: 'absolute', bottom: '20px', right: '20px' }}>

            <Col span={24}>
              <div style={{ float: 'right' }}>
                {this.props.global.poiList && this.props.global.poiList.length > 0 ? <Pagination
                  total={this.props.global.poiPage.total}
                  pageSize={this.props.global.poiPage.pageSize}
                  current={this.props.global.poiPage.pageNo}
                  itemRender={this.itemRender}
                  showTotal={(total, range) => `共 ${total} 条`}
                  showQuickJumper
                  onChange={this.onPageChange}
                /> : ''}

              </div>

            </Col>
          </Row>
        </div>
        <DetailPersonModal
          visiable={this.props.global.addPoiModalVisiable}
          onCancel={this.addModalHidden}
          title={this.state.modalTitle}
          btnText={this.state.modalBtn}
          allNation={this.props.global.allNation}
          allPartisan={this.props.global.allPartisan}
          allTag={this.props.global.allTag}
          imageUrl={this.state.modifyImgPath}
        />
      </div>
    );
  }
}

const FormIndex = Form.create()(IndexPage);
export default connect((state) => {
  return { ...state }
})(FormIndex)
