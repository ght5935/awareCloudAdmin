import React from 'react';
import TableSkeleton from '../../component/common/TableSkeleton';
import { Row, Col, Input, Skeleton, Radio, Select, Button, Icon, Table, Pagination, Popconfirm, message } from 'antd';
import { connect } from 'dva';

import * as Utils from '../../utils/utils';
import styles from './index.less';
import DetailCarModal from '../../component/car/DetailCarModal'

const RadioGroup = Radio.Group;
const { Column, ColumnGroup } = Table;

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableScrollY: 0,
      modalBtn: '确认新增',
      modalTitle: '新增车辆',
      modalOrg: '',
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
      type: 'car/getProvince'
    })
    this.props.dispatch({
      type: 'car/getCarBrand'
    })
    this.props.dispatch({
      type: 'car/getColor'
    })
    this.props.dispatch({
      type: 'car/getAllVillage'
    })
    this.props.dispatch({
      type: 'car/getCarSearch'
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
  onProvinceChange = value => {
    const searchParams = this.props.car.searchParams
    this.props.dispatch({
      type: 'car/success',
      payload: {
        searchParams: {
          ...searchParams,
          province: value
        }
      }
    })
  }
  onPlateNumberChange = (e) => {
    const searchParams = this.props.car.searchParams
    this.props.dispatch({
      type: 'car/success',
      payload: {
        searchParams: {
          ...searchParams,
          plateNumber: e.target.value
        }
      }
    })
  }
  onModelChange = value => {
    const searchParams = this.props.car.searchParams
    this.props.dispatch({
      type: 'car/success',
      payload: {
        searchParams: {
          ...searchParams,
          model: value
        }
      }
    })
  }
  onBrandChange = value => {
    const searchParams = this.props.car.searchParams
    this.props.dispatch({
      type: 'car/success',
      payload: {
        searchParams: {
          ...searchParams,
          brand: value
        }
      }
    })
  }
  onColorChange = value => {
    const searchParams = this.props.car.searchParams
    this.props.dispatch({
      type: 'car/success',
      payload: {
        searchParams: {
          ...searchParams,
          color: value
        }
      }
    })
  }
  onVillageChange = value => {
    const searchParams = this.props.car.searchParams
    this.props.dispatch({
      type: 'car/success',
      payload: {
        searchParams: {
          ...searchParams,
          village: value
        }
      }
    })
  }
  onNameChange = (e) => {
    const searchParams = this.props.car.searchParams
    this.props.dispatch({
      type: 'car/success',
      payload: {
        searchParams: {
          ...searchParams,
          name: e.target.value
        }
      }
    })
  }
  onPhoneChange = (e) => {
    const searchParams = this.props.car.searchParams
    this.props.dispatch({
      type: 'car/success',
      payload: {
        searchParams: {
          ...searchParams,
          phone: e.target.value
        }
      }
    })
  }
  onPlateTypeChange = (e) => {
    const searchParams = this.props.car.searchParams
    this.props.dispatch({
      type: 'car/success',
      payload: {
        searchParams: {
          ...searchParams,
          plateType: e.target.value
        }
      }
    })
  }
  onPageChange = (page, pageSize) => {
    const searchParams = this.props.car.searchParams
    this.props.dispatch({
      type: 'car/success',
      payload: {
        searchParams: {
          ...searchParams,
          pageNo: page,
          pageSize
        }
      }
    });
    this.props.dispatch({
      type: 'car/getCarSearch'
    });
  }
  onSearchClick = () => {
    const searchParams = this.props.car.searchParams
    if (searchParams.phone) {
      if (Utils.isPhone(searchParams.phone)) {
        this.props.dispatch({
          type: 'car/getCarSearch'
        })
      } else {
        message.error('手机号格式不正确')
      }
    } else {
      this.props.dispatch({
        type: 'car/getCarSearch'
      })
    }
    // let carNo = `${searchParams.province}${searchParams.plateNumber}`
    // if (carNo) {
    //   if (Utils.isLicenseNo(carNo)) {
    //     this.props.dispatch({
    //       type: 'car/getCarSearch'
    //     })
    //   } else {
    //     message.error('车牌号不正确')
    //   }
    // } else {
    //   this.props.dispatch({
    //     type: 'car/getCarSearch'
    //   })
    // }

  }
  onDeletConfirm = (record) => {
    this.props.dispatch({
      type: 'car/success',
      payload: {
        singleDelete: record.id
      }
    });
    this.props.dispatch({
      type: 'car/getDelete'
    })
  }
  onAllRowSelected = () => {
    const data = this.props.car.carList
    const deleteSelected = data.map(v => v.id)
    this.props.dispatch({
      type: 'car/success',
      payload: {
        deleteSelected
      }
    })
  }
  onAllRowNoSelected = () => {
    const data = this.props.car.carList
    const deleteSelected = this.props.car.deleteSelected
    const allKeys = data.map(v => v.id)
    const payload = allKeys.filter(v => deleteSelected.indexOf(v) === -1)
    this.props.dispatch({
      type: 'car/success',
      payload: {
        deleteSelected: payload
      }
    })
  }
  onDeleteRows = () => {
    this.props.dispatch({
      type: 'car/getDeletes'
    })
  }
  addModal = () => {
    this.setState({
      modalTitle: '新增车辆',
      modalBtn: '确认新增',
      modifyImgPath: '',
    })
    this.props.dispatch({
      type: 'car/success',
      payload: {
        addModalVisiable: true
      }
    })
  }
  modifyModal = (v, e) => {
    const addCarParams = this.props.car.addCarParams
    const houseParams = this.props.car.houseParams
    this.setState({
      modalTitle: '编辑车辆',
      modalBtn: '确认修改',
      modalOrg: v.houseOrgData,
      modalPerson: v,
      modifyImgPath: v.img && v.img.length > 0 ? v.img[0] : ''
    })
    this.props.dispatch({
      type: 'car/success',
      payload: {
        addModalVisiable: true,
        addCarParams: {
          ...addCarParams,
          id: v.id ? v.id : '',
          imgPath: '',
          province: v.provinceId ? v.provinceId : '',
          plateNumber: v.plateNumber ? v.plateNumber : '',
          model: v.model ? v.model : '',
          brand: v.brandId ? v.brandId : '',
          color: v.colorId ? v.colorId : '',
          plateType: v.plateType ? v.plateType : '',
          houseId: v.houseOrgData && v.houseOrgData.houseId ? v.houseOrgData.houseId : '',
          personId: v.ownerId ? v.ownerId : '',
        },
        houseParams: {
          ...houseParams,
          burg: v.houseOrgData && v.houseOrgData.townId ? v.houseOrgData.townId : '',
          orgunitId: v.houseOrgData && v.houseOrgData.committeeId ? v.houseOrgData.committeeId : '',
          village: v.houseOrgData && v.houseOrgData.villageId ? v.houseOrgData.villageId : '',
          building: v.houseOrgData && v.houseOrgData.buildingId ? v.houseOrgData.buildingId : '',
          unit: v.houseOrgData && v.houseOrgData.unitId ? v.houseOrgData.unitId : '',
          floor: v.houseOrgData && v.houseOrgData.floorId ? v.houseOrgData.floorId : '',
          room: v.houseOrgData && v.houseOrgData.houseId ? v.houseOrgData.houseId : '',
          person: v.ownerId ? v.ownerId : '',
        },
        urbanList: [{ id: v.houseOrgData.committeeId, name: v.houseOrgData.committee }],
        villageList1: [{ id: v.houseOrgData.villageId, name: v.houseOrgData.village }],
        buildList: [{ id: v.houseOrgData.buildingId, name: v.houseOrgData.building }],
        unitList: [{ id: v.houseOrgData.unitId, name: v.houseOrgData.unit }],
        floorList: [{ id: v.houseOrgData.floorId, name: v.houseOrgData.floor }],
        roomList: [{ id: v.houseOrgData.houseId, room: v.houseOrgData.room }],
        personList: [{ id: v.ownerId, name: v.owner }]
      }
    })
  }
  onCancel = () => {
    this.props.dispatch({
      type: 'car/success',
      payload: {
        addModalVisiable: false
      }
    })
  }
  render() {
    const searchParams = this.props.car.searchParams
    const rowSelection = {
      selectedRowKeys: this.props.car.deleteSelected,
      onChange: (keys) => {
        this.props.dispatch({
          type: 'car/success',
          payload: {
            deleteSelected: keys
          }
        })
      }
    }
    return (
      <div className={styles.normal}>
        <div className={styles.search}>
          <Skeleton loading={false}>
            <Row>
              <Col span={5}>
                <span>车牌号：</span>
                <Select style={{ width: '32%', marginRight: '10px' }} onChange={this.onProvinceChange} value={searchParams.province} >
                  <Select.Option value=''>全部</Select.Option>
                  {this.props.car.provinceList.map(v =>
                    <Select.Option key={v.id} value={v.id}>{v.province}</Select.Option>
                  )}
                </Select>
                <Input style={{ width: '34%' }} value={searchParams.plateNumber} onChange={this.onPlateNumberChange} />
              </Col>
              <Col span={4}>
                <span>车型：</span>
                <Select style={{ width: '70%' }} value={searchParams.model} onChange={this.onModelChange}>
                  <Select.Option value=''>全部</Select.Option>
                  <Select.Option value={1}>小型车</Select.Option>
                  <Select.Option value={2}>大型车</Select.Option>
                </Select>
              </Col>
              <Col span={5}>
                <span>车辆品牌：</span>
                <Select style={{ width: '65%' }} value={searchParams.brand} onChange={this.onBrandChange}>
                  <Select.Option value=''>全部</Select.Option>
                  {this.props.car.brandList.map(v =>
                    <Select.Option key={v.id} value={v.id}>{v.brand}</Select.Option>
                  )}
                </Select>
              </Col>
              <Col span={5}>
                <span>车辆颜色：</span>
                <Select style={{ width: '65%' }} value={searchParams.color} onChange={this.onColorChange}>
                  <Select.Option value=''>全部</Select.Option>
                  {this.props.car.colorList.map(v =>
                    <Select.Option key={v.id} value={v.id}>{v.color}</Select.Option>
                  )}
                </Select>
              </Col>
              <Col span={5}>
                <span>车辆所属社区：</span>
                <Select style={{ width: '55%' }} value={searchParams.village} onChange={this.onVillageChange}>
                  <Select.Option value="">全部</Select.Option>
                  {this.props.car.villageList.map(v =>
                    <Select.Option key={v.id} value={v.id}>{v.name}</Select.Option>
                  )}
                </Select>
              </Col>
            </Row>
            <Row style={{ marginTop: '10px' }}>
              <Col span={5}>
                <span>车主姓名：</span>
                <Input style={{ width: '65%' }} value={searchParams.name} onChange={this.onNameChange} />
              </Col>
              <Col span={6}>
                <span>车主手机号：</span>
                <Input style={{ width: '50%' }} value={searchParams.phone} onChange={this.onPhoneChange} />
              </Col>

              <Col span={11}>
                <span>标签：</span>
                <Radio.Group
                  className={styles.personTags}
                  defaultValue=""
                  buttonStyle="solid"
                  value={searchParams.plateType}
                  onChange={this.onPlateTypeChange}
                >
                  <Radio.Button value=''>不限</Radio.Button>
                  <Radio.Button value={1}>本地车</Radio.Button>
                  <Radio.Button value={2}>外地车</Radio.Button>
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
                <Button onClick={this.onAllRowSelected} ><Icon type="plus" theme="outlined" />全 选</Button>
                <Button onClick={this.onAllRowNoSelected}><Icon type="check-square" theme="outlined" />反 选</Button>
                <Popconfirm title={this.props.car.deleteSelected.length > 0 ? "您将执行删除人员操作，将会引起数据变化，是否继续执行？" : "请选择需要删除的内容！"} onConfirm={this.onDeleteRows} placement="bottom" okText="是" cancelText="否">
                  <Button><Icon type="delete" theme="outlined" />删除选中</Button>
                </Popconfirm>
              </Col>
              <Col span={2}>
                <div className={styles.searchBtn}>
                  <Button type="primary" onClick={this.addModal}><Icon type="plus" theme="outlined" />新增车辆</Button>
                </div>
              </Col>

            </Row>
            <div ref="tableNode" style={{ overflow: 'hidden', borderBottom: '1px solid #e8e8e8', borderRadius: '4px', position: 'relative' }}>
              <Table
                dataSource={this.props.car.carList}
                size="small"
                bordered
                pagination={false}
                scroll={{ y: this.state.tableScrollY }}
                rowSelection={rowSelection}
                rowKey={record => record.id}
              >
                <Column
                  title="车牌号码"
                  key="plateNumber"
                  render={r => `${r.province}${r.plateNumber}`}
                  width={100}
                />
                <Column
                  title="车型"
                  dataIndex="modelStr"
                  key="modelStr"
                  width={80}
                />
                <Column
                  title="车辆品牌"
                  dataIndex="brand"
                  key="brand"
                  width={150}
                />
                <Column
                  title="车辆颜色"
                  dataIndex="color"
                  key="color"
                  width={80}
                />
                <Column
                  title="标签"
                  dataIndex="plateTypeStr"
                  key="plateTypeStr"
                  width={80}
                />
                <Column
                  title="车主姓名"
                  dataIndex="owner"
                  key="owner"
                  width={100}
                />
                <Column
                  title="车主手机号"
                  dataIndex="phone"
                  key="phone"
                  width={120}
                />
                <Column
                  title="车辆所属社区"
                  dataIndex="houseOrgData"
                  key="houseOrgData"
                  render={r => r.village}
                  width={120}
                />
                <Column
                  title="操作"
                  key="id"
                  datakey="id"
                  width={100}
                  render={record => (
                    <div>
                      {/* <a className={styles.operate}>查看</a> */}
                      <a className={styles.operate} onClick={this.modifyModal.bind(this, record)}>编辑</a>
                      <Popconfirm title="您将执行删除人员操作，将会引起数据变化，是否继续执行？" onConfirm={this.onDeletConfirm.bind(this, record)} placement="topRight" okText="是" cancelText="否">
                        <a className={styles.operate}>删除</a>
                      </Popconfirm>
                    </div>
                  )}
                />
              </Table>
              {this.props.car.carList && this.props.car.carList.length > 0 ? '' : <TableSkeleton />}
            </div>
          </Skeleton>
          <Row style={{ position: 'absolute', bottom: '20px', right: '20px' }}>

            <Col span={24}>
              <div style={{ float: 'right' }}>
                {this.props.car.carList && this.props.car.carList.length > 0 ? <Pagination
                  total={this.props.car.carPage.total}
                  pageSize={this.props.car.carPage.pageSize}
                  current={this.props.car.carPage.pageNo}
                  itemRender={this.itemRender}
                  showTotal={(total, range) => `共 ${total} 条`}
                  showQuickJumper
                  onChange={this.onPageChange}
                /> : ''}
              </div>

            </Col>
          </Row>
        </div>
        <DetailCarModal
          visiable={this.props.car.addModalVisiable}
          onCancel={this.onCancel}
          title={this.state.modalTitle}
          btnText={this.state.modalBtn}
          houseOrgData={this.state.modalOrg}
          personData={this.state.modalPerson}
          imageUrl={this.state.modifyImgPath}
        />
      </div>
    );
  }
}
export default connect((state) => {
  return { ...state }
})(IndexPage)
