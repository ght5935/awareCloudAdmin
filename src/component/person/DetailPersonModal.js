import React from 'react';

import { Row, Col, Input, Modal, Form, Radio, Select, Upload, Tooltip, Icon, Button, Divider } from 'antd';
import { connect } from 'dva';
import styles from './index.less';

import * as Conf from '../../utils/config';
import { isFunction } from 'util';
import { fileToObject } from 'antd/lib/upload/utils';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: '',
      loading: false,
      phoneValidate: false
    }
  }
  // componentDidUpdate(){
  //   const addPoiParams = this.props.global.addPoiParams;
  //   this.props.dispatch({
  //     type:'global/success',
  //     payload:{
  //       addPoiParams: {
  //         ...addPoiParams,
  //         infoImgPath: this.props.InfoImgs
  //       }
  //     }

  //   })
  // }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (this.props.title === '新增人员') {
          this.props.dispatch({
            type: 'global/poiAdd',
            payload: {
              form: this.props.form
            }
          })
        } else {
          this.props.dispatch({
            type: 'global/poiModify',
            payload: {
              form: this.props.form
            }
          });
          this.props.dispatch({
            type: 'global/deleteInfoImg'
          })
        }

      }
    });
  }
  normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }
  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }));
      const addPoiParams = this.props.global.addPoiParams;
      this.props.dispatch({
        type: 'global/success',
        payload: {
          addPoiParams: {
            ...addPoiParams,
            imgPath: info.file.response.result
          }
        }
      })
    }

  }
  handleChange2 = (info) => {
    if (info.file.status === 'removed') {
      return false;
    }
    const addPoiParams = this.props.global.addPoiParams;
    const { infoImgPath } = addPoiParams;

    let fileList = info.fileList;
    // fileList = fileList.slice(-2);

    fileList = fileList.map(file => {
      if (file.response) {
        file.url = file.response.result;
      }
      return file;
    });

    fileList = fileList.filter(file => {
      if (file.response) {
        return file.response.status === 0;
      }
      return true;
    });

    // this.setState({ fileList });
    // infoImgPath.push(info.file.response.result);
    this.props.dispatch({
      type: 'global/success',
      payload: {
        addPoiParams: {
          ...addPoiParams,
          infoImgPath: fileList
        }
      }
    })

  }
  onInfoImgRemove = (imgObj) => {
    var deleteInfoImg = this.props.global.deleteInfoImg;
    const infoImgPath = this.props.global.addPoiParams.infoImgPath;
    const addPoiParams = this.props.global.addPoiParams
    if (imgObj.uid === '-1') {
      //送到删除参数接口里
      deleteInfoImg.push(imgObj.name);
    }
    let index = 0;
    infoImgPath.map((v, i) => {
      if (v.name === imgObj.name) {
        index = i
      }
    });
    infoImgPath.splice(index, 1);
    this.props.dispatch({
      type: 'global/success',
      payload: {
        addPoiParams: {
          ...addPoiParams,
          infoImgPath
        },
        deleteInfoImg
      }
    })

  }
  onNameChange = (e) => {
    const addPoiParams = this.props.global.addPoiParams;
    this.props.dispatch({
      type: 'global/success',
      payload: {
        addPoiParams: {
          ...addPoiParams,
          name: e.target.value
        }
      }
    })
  }
  onGenderChange = (e) => {
    const addPoiParams = this.props.global.addPoiParams;
    this.props.dispatch({
      type: 'global/success',
      payload: {
        addPoiParams: {
          ...addPoiParams,
          gender: e.target.value
        }
      }
    })
  }
  onMaritalStatusChange = (v) => {
    const addPoiParams = this.props.global.addPoiParams;
    this.props.dispatch({
      type: 'global/success',
      payload: {
        addPoiParams: {
          ...addPoiParams,
          marital_status: v
        }
      }
    })
  }
  onNationChange = (v) => {
    const addPoiParams = this.props.global.addPoiParams;
    this.props.dispatch({
      type: 'global/success',
      payload: {
        addPoiParams: {
          ...addPoiParams,
          nation: v
        }
      }
    })
  }
  onCensusChange = (v) => {
    const addPoiParams = this.props.global.addPoiParams;
    this.props.dispatch({
      type: 'global/success',
      payload: {
        addPoiParams: {
          ...addPoiParams,
          census: v
        }
      }
    })
  }
  onIdCardChange = (e) => {
    const addPoiParams = this.props.global.addPoiParams;
    this.props.dispatch({
      type: 'global/success',
      payload: {
        addPoiParams: {
          ...addPoiParams,
          idCard: e.target.value
        }
      }
    })
  }
  onPhoneChange = (e) => {
    // if(!(/^1[34578]\d{9}$/.test(e.target.value))){
    //   this.setState({
    //     phoneValidate: true
    //   });
    // }

    const addPoiParams = this.props.global.addPoiParams;
    this.props.dispatch({
      type: 'global/success',
      payload: {
        addPoiParams: {
          ...addPoiParams,
          phone: e.target.value
        }
      }
    })
  }
  onTagChange = (v) => {
    const addPoiParams = this.props.global.addPoiParams;
    this.props.dispatch({
      type: 'global/success',
      payload: {
        addPoiParams: {
          ...addPoiParams,
          tag: v
        }
      }
    })
  }
  onPartisanIdChange = (v) => {
    const addPoiParams = this.props.global.addPoiParams;
    this.props.dispatch({
      type: 'global/success',
      payload: {
        addPoiParams: {
          ...addPoiParams,
          partisanId: v
        }
      }
    })
  }


  onSelectBurg = (i, focus = "select", value) => {
    if (focus === 'select') {
      const obj = this.props.global[`houseHomeParams${i}`];
      let addObj = {};
      addObj[`houseHomeParams${i}`] = obj;
      addObj[`houseHomeParams${i}`].burg = value;
      addObj[`houseHomeParams${i}`].orgunitId = '';
      addObj[`houseHomeParams${i}`].village = '';
      addObj[`houseHomeParams${i}`].building = '';
      addObj[`houseHomeParams${i}`].unit = '';
      addObj[`houseHomeParams${i}`].floor = '';
      addObj[`houseHomeParams${i}`].room = '';
      addObj[`villageList${i}`] = [];
      addObj[`buildList${i}`] = [];
      addObj[`UnitList${i}`] = [];
      addObj[`FloorList${i}`] = [];
      addObj[`RoomList${i}`] = [];
      this.props.form.resetFields([`orgunitId${i}`,`village${i}`,`building${i}`, `unit${i}`, `floor${i}`, `room${i}`]);
      this.props.dispatch({
        type: 'global/success',
        payload: {
          ...addObj,

        }
      });
    }


    this.props.dispatch({
      type: 'global/getListByOrgunitId',
      payload: {
        type: i
      }
    })
  };
  onSelectUrban = (i, flag = "select", value) => {
    if (flag === 'select') {
      const obj = this.props.global[`houseHomeParams${i}`];
      let addObj = {};
      addObj[`houseHomeParams${i}`] = obj;
      addObj[`houseHomeParams${i}`].orgunitId = value;

      addObj[`houseHomeParams${i}`].village = '';
      addObj[`houseHomeParams${i}`].building = '';
      addObj[`houseHomeParams${i}`].unit = '';
      addObj[`houseHomeParams${i}`].floor = '';
      addObj[`houseHomeParams${i}`].room = '';
      addObj[`buildList${i}`] = [];
      addObj[`UnitList${i}`] = [];
      addObj[`FloorList${i}`] = [];
      addObj[`RoomList${i}`] = [];
      this.props.form.resetFields([`village${i}`, `building${i}`, `unit${i}`, `floor${i}`, `room${i}`]);

      this.props.dispatch({
        type: 'global/success',
        payload: {
          ...addObj
        }
      });
    }
    this.props.dispatch({
      type: 'global/getListByOrgunitId2',
      payload: {
        type: i
      }
    })

  }
  onSelectVillage = (i, flag = "select", value) => {
    if (flag === 'select') {

      const obj = this.props.global[`houseHomeParams${i}`];
      let addObj = {};
      addObj[`houseHomeParams${i}`] = obj;
      addObj[`houseHomeParams${i}`].village = value;
      addObj[`houseHomeParams${i}`].building = '';
      addObj[`houseHomeParams${i}`].unit = '';
      addObj[`houseHomeParams${i}`].floor = '';
      addObj[`houseHomeParams${i}`].room = '';
      addObj[`UnitList${i}`] = [];
      addObj[`FloorList${i}`] = [];
      addObj[`RoomList${i}`] = [];
      this.props.form.resetFields([ `building${i}`, `unit${i}`, `floor${i}`, `room${i}`]);

      this.props.dispatch({
        type: 'global/success',
        payload: {
          ...addObj
        }
      });
    }
    this.props.dispatch({
      type: 'global/getBuildingList',
      payload: {
        type: i
      }
    })
  }
  onSelectBuild = (i, flag = "select", value) => {
    if (flag === 'select') {

      const obj = this.props.global[`houseHomeParams${i}`];
      let addObj = {};
      addObj[`houseHomeParams${i}`] = obj;
      addObj[`houseHomeParams${i}`].building = value - 0;

      addObj[`houseHomeParams${i}`].unit = '';
      addObj[`houseHomeParams${i}`].floor = '';
      addObj[`houseHomeParams${i}`].room = '';

      addObj[`FloorList${i}`] = [];
      addObj[`RoomList${i}`] = [];
      this.props.form.resetFields([`unit${i}`, `floor${i}`, `room${i}`]);
      this.props.dispatch({
        type: 'global/success',
        payload: {
          ...addObj
        }
      });
    }
    this.props.dispatch({
      type: 'global/getUnitList',
      payload: {
        type: i
      }
    })
  };
  onSelectUnit = (i, flag = "select", value) => {
    if (flag === 'select') {

      const obj = this.props.global[`houseHomeParams${i}`];
      let addObj = {};
      addObj[`houseHomeParams${i}`] = obj;
      addObj[`houseHomeParams${i}`].unit = value - 0;

      addObj[`houseHomeParams${i}`].floor = '';
      addObj[`houseHomeParams${i}`].room = '';


      addObj[`RoomList${i}`] = [];
      this.props.form.resetFields([ `floor${i}`, `room${i}`]);
      this.props.dispatch({
        type: 'global/success',
        payload: {
          ...addObj
        }
      });
    }
    this.props.dispatch({
      type: 'global/getFloorList',
      payload: {
        type: i
      }
    })
  };
  onSelectFloor = (i, flag = "select", value) => {
    if (flag === 'select') {

      const obj = this.props.global[`houseHomeParams${i}`];
      let addObj = {};
      addObj[`houseHomeParams${i}`] = obj;
      addObj[`houseHomeParams${i}`].floor = value - 0;
      addObj[`houseHomeParams${i}`].room = '';

      this.props.form.resetFields([ `room${i}`]);

      this.props.dispatch({
        type: 'global/success',
        payload: {
          ...addObj
        }
      });
    }
    this.props.dispatch({
      type: 'global/getRoomList',
      payload: {
        type: i
      }
    })
  };
  onSelectRoom = (i, value) => {
    const obj = this.props.global[`houseHomeParams${i}`];
    let addObj = {};
    addObj[`houseHomeParams${i}`] = obj;
    addObj[`houseHomeParams${i}`].room = value - 0;

    this.props.dispatch({
      type: 'global/success',
      payload: {
        ...addObj
      }
    });
  };
  onHouseRelationChange = (i, value) => {
    const obj = this.props.global[`houseHomeParams${i}`];
    let addObj = {};
    addObj[`houseHomeParams${i}`] = obj;
    addObj[`houseHomeParams${i}`].houseRelation = value - 0;

    this.props.dispatch({
      type: 'global/success',
      payload: {
        ...addObj
      }
    });
  };

  onAddHouseClick = () => {
    const i = this.props.global.addPoiParams.houseCount;
    const addPoiParams = this.props.global.addPoiParams;
    const addObj = {};
    addObj[`houseHomeParams${i}`] = {
      burg: '',
      orgunitId: '',
      village: '',
      building: '',
      unit: '',
      floor: '',
      room: '',
      HouseRelation: ''
    }
    addObj[`urbanList${i}`] = [];
    addObj[`villageList${i}`] = [];
    addObj[`buildList${i}`] = [];
    addObj[`UnitList${i}`] = [];
    addObj[`FloorList${i}`] = [];
    addObj[`RoomList${i}`] = [];

    this.props.dispatch({
      type: 'global/success',
      payload: {
        ...addObj,
        addPoiParams: {
          ...addPoiParams,
          houseCount: i + 1
        }
      }
    })
  }
  onHouseRowDelete = (i) => {
    const addPoiParams = this.props.global.addPoiParams
    const count = this.props.global.addPoiParams.houseCount;
    const g = this.props.global;
    if (i === count - 1) {
      delete g[`houseHomeParams${i}`];
      delete g[`urbanList${i}`];
      delete g[`villageList${i}`];
      delete g[`buildList${i}`];
      delete g[`UnitList${i}`];
      delete g[`FloorList${i}`];
      delete g[`RoomList${i}`];
    } else {
      for (let v = 0; v < count; v++) {
        if (v === i) {
          delete g[`houseHomeParams${v}`];
          delete g[`urbanList${v}`];
          delete g[`villageList${v}`];
          delete g[`buildList${v}`];
          delete g[`UnitList${v}`];
          delete g[`FloorList${v}`];
          delete g[`RoomList${v}`];
        }
        if (v > i) {
          g[`houseHomeParams${v - 1}`] = g[`houseHomeParams${v}`]
          g[`urbanList${v - 1}`] = g[`urbanList${v}`]
          g[`villageList${v - 1}`] = g[`villageList${v}`]
          g[`buildList${v - 1}`] = g[`buildList${v}`]
          g[`UnitList${v - 1}`] = g[`UnitList${v}`]
          g[`FloorList${v - 1}`] = g[`FloorList${v}`]
          g[`RoomList${v - 1}`] = g[`RoomList${v}`]
          delete g[`houseHomeParams${v}`];
          delete g[`urbanList${v}`];
          delete g[`villageList${v}`];
          delete g[`buildList${v}`];
          delete g[`UnitList${v}`];
          delete g[`FloorList${v}`];
          delete g[`RoomList${v}`];
        }
      }
    }
    this.props.dispatch({
      type: 'global/success',
      payload: {
        addPoiParams: {
          ...addPoiParams,
          houseCount: count - 1
        }
      }
    })
  }
  onCancel = () => {
    this.props.form.resetFields();
    this.props.onCancel()
    this.setState({
      imageUrl: ''
    })
  }
  render() {
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    }
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className={styles.uploadText}>点击上传图片</div>
      </div>
    );
    const { getFieldDecorator, getFieldsError } = this.props.form;
    return (
      <Modal
        title={this.props.title}
        visible={this.props.visiable}
        onCancel={this.onCancel}
        width="950px"
        footer={null}
        className={styles.modalWrapper}
      >
        <Form
          onSubmit={this.handleSubmit}
        >
          <Row gutter={24}>
            <Col span={4}>
              <FormItem >
                {getFieldDecorator('image', {
                  valuePropName: 'image',
                  getValueFromEvent: this.normFile,
                  rules: [{ required: this.props.title === '新增人员' ? true : false, message: '照片不能为空' }],
                })(
                  <Upload
                    name="image"
                    listType="picture-card"
                    className="avatar-uploader"
                    action={`${Conf.API_PREFIX}/poi/saveImg.do`}
                    showUploadList={false}
                    onChange={this.handleChange}
                  >
                    {this.state.imageUrl || this.props.imageUrl ? <img className={styles.uploadedImg} src={this.state.imageUrl || this.props.imageUrl} alt="avatar" /> : uploadButton}
                  </Upload>
                )}
              </FormItem>
            </Col>
            <Col span={10}>
              <FormItem {...formItemLayout} label="姓名">
                {getFieldDecorator('name', {
                  initialValue: this.props.global.addPoiParams.name,
                  rules: [{ message: '姓名不能为空', required: true }],
                })(
                  <Input onChange={this.onNameChange} />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="性别">
                {getFieldDecorator('gender', {
                  initialValue: this.props.global.addPoiParams.gender,
                  rules: [{ message: '性别不能为空!', required: true }],
                })(
                  <RadioGroup onChange={this.onGenderChange}>
                    <Radio value={1}>男</Radio>
                    <Radio value={0}>女</Radio>
                  </RadioGroup>
                )}
              </FormItem>
              <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} label="婚姻状况">
                {getFieldDecorator('marital_status', {
                  initialValue: this.props.global.addPoiParams.marital_status,
                })(
                  <Select onChange={this.onMaritalStatusChange}>
                    <Select.Option key={0} value={0}>未婚</Select.Option>
                    <Select.Option key={1} value={1}>已婚</Select.Option>
                    <Select.Option key={2} value={2}>离婚</Select.Option>
                    <Select.Option key={3} value={3}>丧偶</Select.Option>
                  </Select>
                )}
              </FormItem>
              <Row>
                <Col span={4}></Col>
                <Col span={10}>
                  <FormItem labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} label="民族">
                    {getFieldDecorator('nation', {
                      initialValue: this.props.global.addPoiParams.nation,
                    })(
                      <Select onChange={this.onNationChange}>
                        {this.props.allNation.map(v =>
                          <Select.Option key={v.id} value={v.id}>{v.name}</Select.Option>
                        )}
                      </Select>

                    )}
                  </FormItem>
                </Col>
                <Col span={10}>
                  <FormItem labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} label="户籍">
                    {getFieldDecorator('census', {
                      initialValue: this.props.global.addPoiParams.census,
                    })(
                      <Select onChange={this.onCensusChange}>
                        {Conf.CENDSUS.map((v, i) => <Select.Option key={i} value={i}>{v}</Select.Option>)}
                      </Select>

                    )}
                  </FormItem>
                </Col>
              </Row>

            </Col>
            <Col span={10}>
              <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} label="身份证号">
                {getFieldDecorator('idCard', {
                  initialValue: this.props.global.addPoiParams.idCard,
                  rules: [
                    {
                      required: true, message: '请填写身份证'
                    },
                    {
                      pattern: /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/,
                      message: '请输入正确格式手机号！'
                    }
                  ]
                })(
                  <Input onChange={this.onIdCardChange} />
                )}
              </FormItem>
              {/* <Tooltip trigger={'focus'} title={'llll'}> */}
              <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} label="手机号码">
                {getFieldDecorator('phone', {
                  initialValue: this.props.global.addPoiParams.phone,
                  rules: [
                    { required: 'true', message: '请输入手机号！' },
                    { pattern: /^1[34578][0-9]{9}$/, message: '请输入正确格式手机号！' }
                  ]
                })(
                  // <Tooltip visible={this.state.phoneValidate} trigger="focus">
                  <Input onChange={this.onPhoneChange} />
                  // </Tooltip>
                )}
              </FormItem>
              {/* </Tooltip> */}
              <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} label="标签">
                {getFieldDecorator('tag', {
                  initialValue: this.props.global.addPoiParams.tag,
                })(
                  <Select onChange={this.onTagChange}>
                    {this.props.allTag.map(v =>
                      <Select.Option key={v.id} value={v.id}>{v.name}</Select.Option>
                    )}
                  </Select>
                )}
              </FormItem>
              <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} label="党派">
                {getFieldDecorator('partisanId', {
                  initialValue: this.props.global.addPoiParams.partisanId,

                })(
                  <Select onChange={this.onPartisanIdChange}>
                    {this.props.allPartisan.map(v =>
                      <Select.Option key={v.id} value={v.id}>{v.name}</Select.Option>
                    )}
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col className={styles.upload} span={24} style={{ textAlign: 'center' }}>
              <Upload
                name="image"
                accept="image"
                listType="picture"
                className="avatar-uploader"
                fileList={this.props.global.addPoiParams.infoImgPath && this.props.global.addPoiParams.infoImgPath.length > 0 ?
                  this.props.global.addPoiParams.infoImgPath : []}
                action={`${Conf.API_PREFIX}/poi/saveImg.do`}
                onChange={this.handleChange2}
                onRemove={this.onInfoImgRemove}
              >
                <Button type="primary">添加身份证、老护照、驾驶证等证件</Button>
              </Upload>
            </Col>
          </Row>
          <Divider></Divider>
          <div className={styles.houseContent}>
            {(() => {
              const count = this.props.global.addPoiParams.houseCount;
              const arr = []
              for (let i = 0; i < count; i++) {
                arr.push(i)
              }
              let rt = []
              rt = arr.map((v, i) => (
                <Row key={i} gutter={5}>
                  {i > 0 ? <Divider orientation="right" dashed={true} >
                    <Icon className={styles.deleteBtn} onClick={this.onHouseRowDelete.bind(this, i)} type="delete" theme="outlined" />
                  </Divider> : ''}
                  <Col span={7}>
                    <FormItem labelCol={{ span: 9 }} wrapperCol={{ span: 15 }} label="所属镇">
                      {getFieldDecorator(`burg${i}`, {
                        initialValue: this.props.global[`houseHomeParams${i}`].burg,
                        rules: [{ message: '', required: true }],
                      })(

                        <Select onChange={this.onSelectBurg.bind(this, i, 'select')}>
                          <Select.Option key={'1'} value={`1`}>高境镇</Select.Option>
                        </Select>
                      )}
                    </FormItem>
                    <FormItem labelCol={{ span: 9 }} wrapperCol={{ span: 15 }} label="楼号">
                      {getFieldDecorator(`building${i}`, {
                        initialValue: this.props.global[`houseHomeParams${i}`].building,
                        rules: [{ message: '', required: true }],
                      })(
                        <Select
                          onChange={this.onSelectBuild.bind(this, i, 'select')}
                          onFocus={this.onSelectVillage.bind(this, i, 'focus')}
                        >
                          {this.props.global[`buildList${i}`] && this.props.global[`buildList${i}`].length > 0 ?
                            this.props.global[`buildList${i}`].map((value, i) =>
                              <Select.Option
                                key={value.id}
                                value={`${value.id}`}>{value.name}</Select.Option>
                            ) : null}
                        </Select>
                      )}
                    </FormItem>
                    <FormItem labelCol={{ span: 9 }} wrapperCol={{ span: 15 }} label="与户主关系">
                      {getFieldDecorator(`houseRelation${i}`, {
                        initialValue: this.props.global[`houseHomeParams${i}`].houseRelation,
                        rules: [{ message: '', required: true }],
                      })(
                        <Select onChange={this.onHouseRelationChange.bind(this, i)}>
                          {/* 0-户主，1-亲戚，2-租户 */}
                          <Select.Option key={0} value={0}>户主</Select.Option>
                          <Select.Option key={1} value={1}>亲戚</Select.Option>
                          <Select.Option key={2} value={2}>租户</Select.Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  <Col span={9}>
                    <FormItem labelCol={{ span: 9 }} wrapperCol={{ span: 15 }} label="所属居委会">
                      {getFieldDecorator(`orgunitId${i}`, {
                        initialValue: this.props.global[`houseHomeParams${i}`].orgunitId,
                        rules: [{ message: '', required: true }],
                      })(
                        <Select
                          onChange={this.onSelectUrban.bind(this, i, 'select')}
                          onFocus={this.onSelectBurg.bind(this, i, 'focus')}
                        >
                          {this.props.global[`urbanList${i}`] && this.props.global[`urbanList${i}`].length > 0 ?
                            this.props.global[`urbanList${i}`].map((value, i) =>
                              <Select.Option
                                key={i}
                                value={`${value.id}`}>{value.name}</Select.Option>
                            ) : null}
                        </Select>
                      )}
                    </FormItem>
                    <Row gutter={5}>
                      <Col span={12}>
                        <FormItem labelCol={{ span: 12 }} wrapperCol={{ span: 12 }} label="单元">
                          {getFieldDecorator(`unit${i}`, {
                            initialValue: this.props.global[`houseHomeParams${i}`].unit,
                            rules: [{ message: '', required: true }],
                          })(
                            <Select onFocus={this.onSelectBuild.bind(this, i, 'focus')} onChange={this.onSelectUnit.bind(this, i, 'select')}>
                              {this.props.global[`UnitList${i}`] && this.props.global[`UnitList${i}`].length > 0 ?
                                this.props.global[`UnitList${i}`].map((value, i) =>
                                  <Select.Option
                                    key={i}
                                    value={`${value.id}`}>{value.name}</Select.Option>
                                ) : null}
                            </Select>
                          )}
                        </FormItem></Col>
                      <Col span={12}>
                        <FormItem labelCol={{ span: 12 }} wrapperCol={{ span: 12 }} label="楼层">
                          {getFieldDecorator(`floor${i}`, {
                            initialValue: this.props.global[`houseHomeParams${i}`].floor,
                            rules: [{ message: '', required: true }],
                          })(
                            <Select onFocus={this.onSelectUnit.bind(this, i, 'focus')} onChange={this.onSelectFloor.bind(this, i, 'select')}>
                              {this.props.global[`FloorList${i}`] && this.props.global[`FloorList${i}`].length > 0 ?
                                this.props.global[`FloorList${i}`].map((value, i) =>
                                  <Select.Option
                                    key={i}
                                    value={`${value.id}`}>{value.name}</Select.Option>
                                ) : null}
                            </Select>
                          )}
                        </FormItem>
                      </Col>

                    </Row>


                  </Col>
                  <Col span={8}>
                    <FormItem labelCol={{ span: 9 }} wrapperCol={{ span: 15 }} label="所属小区">
                      {getFieldDecorator(`village${i}`, {
                        initialValue: this.props.global[`houseHomeParams${i}`].village,
                        rules: [{ message: '', required: true }],
                      })(
                        <Select onFocus={this.onSelectUrban.bind(this, i, 'focus')} onChange={this.onSelectVillage.bind(this, i, 'select')}>
                          {this.props.global[`villageList${i}`] && this.props.global[`villageList${i}`].length > 0 ?
                            this.props.global[`villageList${i}`].map((value, i) =>
                              <Select.Option
                                key={i}
                                value={`${value.id}`}>{value.name}</Select.Option>
                            ) : null}
                        </Select>
                      )}
                    </FormItem>
                    <FormItem labelCol={{ span: 9 }} wrapperCol={{ span: 15 }} label="房间号">
                      {getFieldDecorator(`room${i}`, {
                        initialValue: this.props.global[`houseHomeParams${i}`].room,
                        rules: [{ message: '', required: true }],
                      })(
                        <Select
                          onChange={this.onSelectRoom.bind(this, i)}
                          dropdownMatchSelectWidth={false}
                          onFocus={this.onSelectFloor.bind(this, i, 'focus')}>
                          {this.props.global[`RoomList${i}`] && this.props.global[`RoomList${i}`].length > 0 ?
                            this.props.global[`RoomList${i}`].map((value, i) =>
                              <Select.Option
                                key={i}
                                value={`${value.id}`}>{value.room}</Select.Option>
                            ) : null}
                        </Select>
                      )}
                    </FormItem>
                  </Col>

                </Row>
              ))
              return rt;
            })()}
          </div>

          <Row>
            <Col span={24} style={{ textAlign: 'center' }}>
              <Button type="primary" onClick={this.onAddHouseClick}>添加房屋信息</Button>
            </Col>
          </Row>
          <Divider />
          <Row className={styles.submitBtn}>
            <Col span={24} style={{ textAlign: 'center' }}>
              <FormItem>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={hasErrors(getFieldsError())}
                >
                  {this.props.btnText}
                </Button>
              </FormItem>

            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}

const FormIndex = Form.create()(IndexPage);
export default connect((state) => {
  return { ...state }
})(FormIndex)
