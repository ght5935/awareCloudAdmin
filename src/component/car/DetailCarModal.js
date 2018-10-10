
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
    componentDidMount() {
    }
    onSelectUrbanList = (value) => {
        const houseParams = this.props.car.houseParams
        if (this.props.title == '编辑车辆') {
            if (houseParams.burg) {
                this.props.dispatch({
                    type: 'car/getListByOrgunitId'
                })
            }
        }
    }
    onSelectVillageList = value => {
        const houseParams = this.props.car.houseParams
        if (this.props.title == '编辑车辆') {
            if (houseParams.orgunitId) {
                this.props.dispatch({
                    type: 'car/getListByOrgunitId2'
                })
            }
        }
    }
    onSelectBuildList = (value) => {
        const houseParams = this.props.car.houseParams
        if (this.props.title == '编辑车辆') {
            if (houseParams.village) {
                this.props.dispatch({
                    type: 'car/getBuildingList'
                })
            }
        }
    }
    onSelectUnitList = (value) => {
        const houseParams = this.props.car.houseParams
        if (this.props.title == '编辑车辆') {
            if (houseParams.building) {
                this.props.dispatch({
                    type: 'car/getUnitList'
                })
            }
        }

    }
    onSelectFloorList = (value) => {
        const houseParams = this.props.car.houseParams
        if (this.props.title == '编辑车辆') {
            if (houseParams.unit) {
                this.props.dispatch({
                    type: 'car/getFloorList'
                })
            }
        }
    }
    onSelectRoomList = (value) => {
        const houseParams = this.props.car.houseParams
        if (this.props.title == '编辑车辆') {
            if (houseParams.floor) {
                this.props.dispatch({
                    type: 'car/getRoomList'
                })
            }
        }
    }
    onSelectPersonList = (value) => {
        const houseParams = this.props.car.houseParams
        if (this.props.title == '编辑车辆') {
            if (houseParams.room) {
                this.props.dispatch({
                    type: 'car/getPoiByHouse'
                })
            }
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                switch (this.props.title) {
                    case '新增车辆':
                        this.props.dispatch({
                            type: 'car/getAdd',
                            payload: {
                                form: this.props.form
                            }
                        })
                        break;
                    case '编辑车辆':
                        this.props.dispatch({
                            type: 'car/getModify',
                            payload: {
                                form: this.props.form
                            }
                        })
                        break;
                }
            }
        })
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
            const addCarParams = this.props.car.addCarParams;
            this.props.dispatch({
                type: 'car/success',
                payload: {
                    addCarParams: {
                        ...addCarParams,
                        imgPath: info.file.response.result
                    }
                }
            })
        }
    }
    onProvinceChange = value => {
        const addCarParams = this.props.car.addCarParams;
        this.props.dispatch({
            type: 'car/success',
            payload: {
                addCarParams: {
                    ...addCarParams,
                    province: value
                }
            }
        })
    }
    onPlateNumberChange = e => {
        const addCarParams = this.props.car.addCarParams;
        this.props.dispatch({
            type: 'car/success',
            payload: {
                addCarParams: {
                    ...addCarParams,
                    plateNumber: e.target.value
                }
            }
        })
    }
    onBrandChange = value => {
        const addCarParams = this.props.car.addCarParams;
        this.props.dispatch({
            type: 'car/success',
            payload: {
                addCarParams: {
                    ...addCarParams,
                    brand: value
                }
            }
        })
    }
    onPlateTypeChange = e => {
        const addCarParams = this.props.car.addCarParams;
        this.props.dispatch({
            type: 'car/success',
            payload: {
                addCarParams: {
                    ...addCarParams,
                    plateType: e.target.value
                }
            }
        })
    }
    onModelChange = value => {
        const addCarParams = this.props.car.addCarParams;
        this.props.dispatch({
            type: 'car/success',
            payload: {
                addCarParams: {
                    ...addCarParams,
                    model: value
                }
            }
        })
    }
    onColorChange = value => {
        const addCarParams = this.props.car.addCarParams;
        this.props.dispatch({
            type: 'car/success',
            payload: {
                addCarParams: {
                    ...addCarParams,
                    color: value
                }
            }
        })
    }
    onSelectBurg = (value) => {
        const houseParams = this.props.car.houseParams
        this.props.dispatch({
            type: 'car/success',
            payload: {
                urbanList: value ? this.props.car.urbanList : [],
                villageList1: [],
                buildList: [],
                unitList: [],
                floorList: [],
                roomList: [],
                personList: [],
                houseParams: {
                    ...houseParams,
                    burg: value,
                    orgunitId: '',
                    village: '',
                    building: '',
                    unit: '',
                    floor: '',
                    room: '',
                    person: ''
                }
            }
        })
        if (value) {
            this.props.dispatch({
                type: 'car/getListByOrgunitId'
            })
            this.props.form.resetFields(['orgunitId', 'village', 'building', 'unit', 'floor', 'room', 'person'])
        }
    }
    onSelectUrban = (value) => {
        const houseParams = this.props.car.houseParams
        this.props.dispatch({
            type: 'car/success',
            payload: {
                villageList1: value ? this.props.car.villageList1 : [],
                buildList: [],
                unitList: [],
                floorList: [],
                roomList: [],
                personList: [],
                houseParams: {
                    ...houseParams,
                    orgunitId: value,
                    village: '',
                    building: '',
                    unit: '',
                    floor: '',
                    room: '',
                    person: ''
                }
            }
        })
        if (value) {
            this.props.dispatch({
                type: 'car/getListByOrgunitId2'
            })
            this.props.form.resetFields(['village', 'building', 'unit', 'floor', 'room', 'person'])
        }
    }
    onSelectVillage = (value) => {
        const houseParams = this.props.car.houseParams
        this.props.dispatch({
            type: 'car/success',
            payload: {
                buildList: value ? this.props.car.buildList : [],
                unitList: [],
                floorList: [],
                roomList: [],
                personList: [],
                houseParams: {
                    ...houseParams,
                    village: value,
                    building: '',
                    unit: '',
                    floor: '',
                    room: '',
                    person: ''
                }
            }
        })
        if (value) {
            this.props.dispatch({
                type: 'car/getBuildingList'
            })
            this.props.form.resetFields(['building', 'unit', 'floor', 'room', 'person'])
        }
    }
    onSelectBuild = (value) => {
        const houseParams = this.props.car.houseParams
        this.props.dispatch({
            type: 'car/success',
            payload: {
                unitList: value ? this.props.car.unitList : [],
                floorList: [],
                roomList: [],
                personList: [],
                houseParams: {
                    ...houseParams,
                    building: value,
                    unit: '',
                    floor: '',
                    room: '',
                    person: ''
                }
            }
        })
        if (value) {
            this.props.dispatch({
                type: 'car/getUnitList'
            })
            this.props.form.resetFields(['unit', 'floor', 'room', 'person'])
        }
    }
    onSelectUnit = (value) => {
        const houseParams = this.props.car.houseParams
        this.props.dispatch({
            type: 'car/success',
            payload: {
                floorList: value ? this.props.car.floorList : [],
                roomList: [],
                personList: [],
                houseParams: {
                    ...houseParams,
                    unit: value,
                    floor: '',
                    room: '',
                    person: ''
                }
            }
        })
        if (value) {
            this.props.dispatch({
                type: 'car/getFloorList'
            })
            this.props.form.resetFields(['floor', 'room', 'person'])
        }
    }
    onSelectFloor = (value) => {
        const houseParams = this.props.car.houseParams
        this.props.dispatch({
            type: 'car/success',
            payload: {
                roomList: value ? this.props.car.roomList : [],
                personList: [],
                houseParams: {
                    ...houseParams,
                    floor: value,
                    room: '',
                    person: ''
                }
            }
        })
        if (value) {
            this.props.dispatch({
                type: 'car/getRoomList'
            })
            this.props.form.resetFields(['room', 'person'])
        }
    }
    onSelectRoom = (value) => {
        const houseParams = this.props.car.houseParams
        const addCarParams = this.props.car.addCarParams
        this.props.dispatch({
            type: 'car/success',
            payload: {
                houseParams: {
                    ...houseParams,
                    room: value,
                    person: ''
                },
                addCarParams: {
                    ...addCarParams,
                    houseId: value
                }
            }
        })
        if (value) {
            this.props.dispatch({
                type: 'car/getPoiByHouse'
            })
            this.props.form.resetFields(['person'])
        }
    }
    onPersonChange = (value) => {
        const houseParams = this.props.car.houseParams
        const addCarParams = this.props.car.addCarParams
        this.props.dispatch({
            type: 'car/success',
            payload: {
                houseParams: {
                    ...houseParams,
                    person: value,
                },
                addCarParams: {
                    ...addCarParams,
                    personId: value
                }
            }
        })

    }
    onCancel = () => {
        const addCarParams = this.props.car.addCarParams
        const houseParams = this.props.car.houseParams
        this.props.form.resetFields();
        this.props.onCancel()
        this.setState({
            imageUrl: ''
        })
        this.props.dispatch({
            type: 'car/success',
            payload: {
                addCarParams: {
                    ...addCarParams,
                    id: '',
                    imgPath: '',
                    province: '',
                    plateNumber: '',
                    model: '',
                    brand: '',
                    color: '',
                    plateType: '',
                    houseId: '',
                    personId: ''
                },
                houseParams: {
                    ...houseParams,
                    burg: '',
                    orgunitId: '',
                    village: '',
                    building: '',
                    unit: '',
                    floor: '',
                    room: '',
                    person: ''
                },
                urbanList: [],
                villageList1: [],
                buildList: [],
                unitList: [],
                floorList: [],
                roomList: [],
                personList: []
            }
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
        const { getFieldDecorator, getFieldsError } = this.props.form
        const addCarParams = this.props.car.addCarParams
        const houseOrgData = this.props.houseOrgData
        const ownerPerson = this.props.personData ? this.props.personData : ''
        return (
            <Modal
                title={this.props.title}
                visible={this.props.visiable}
                onCancel={this.onCancel}
                width={960}
                footer={null}
                className={styles.modalWrapper}
            >
                <Form
                    onSubmit={this.handleSubmit}
                >
                    <Row gutter={24}>
                        <Col span={7}>
                            <FormItem >
                                {getFieldDecorator('image', {
                                    valuePropName: 'image',
                                    getValueFromEvent: this.normFile,
                                    rules: [{ required: this.props.title === '新增车辆' ? true : false, message: '照片不能为空' }],
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
                        <Col span={17}>
                            <Row>
                                <Col span={13}>
                                    <FormItem {...formItemLayout} label="车牌号">
                                        {getFieldDecorator('province', {
                                            initialValue: this.props.car.addCarParams.province,
                                            rules: [{ message: '车牌不能为空', required: true }],
                                        })(
                                            <Select
                                                style={{ width: '35%', marginRight: '10px' }}
                                                onChange={this.onProvinceChange}
                                            >
                                                {this.props.car.provinceList.map(v =>
                                                    <Select.Option key={v.id} value={v.id}>{v.province}</Select.Option>
                                                )}
                                            </Select>
                                        )}
                                        {getFieldDecorator('plateNumber', {
                                            initialValue: `${this.props.car.addCarParams.plateNumber}`,
                                            rules: [{ message: '车牌不能为空', required: true }],
                                        })(
                                            <Input
                                                style={{ width: '55%' }}
                                                onChange={this.onPlateNumberChange}
                                            />
                                        )}
                                    </FormItem>

                                    <FormItem {...formItemLayout} label="车辆品牌">
                                        {getFieldDecorator('brand', {
                                            initialValue: this.props.car.addCarParams.brand,
                                            rules: [{ message: '车辆品牌不能为空!', required: true }],
                                        })(
                                            <Select
                                                style={{ width: '95%' }}
                                                onChange={this.onBrandChange}
                                            >
                                                {this.props.car.brandList.map(v =>
                                                    <Select.Option key={v.id} value={v.id}>{v.brand}</Select.Option>
                                                )}
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={11}>
                                    <FormItem {...formItemLayout} label="车型">
                                        {getFieldDecorator('model', {
                                            initialValue: this.props.car.addCarParams.model,
                                            rules: [{ message: '车型不能为空!', required: true }],
                                        })(
                                            <Select
                                                onChange={this.onModelChange}
                                            >
                                                <Select.Option value={1}>小型车</Select.Option>
                                                <Select.Option value={2}>大型车</Select.Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="车辆颜色">
                                        {getFieldDecorator('color', {
                                            initialValue: this.props.car.addCarParams.color,
                                            rules: [{ message: '车辆颜色不能为空!', required: true }],
                                        })(
                                            <Select
                                                onChange={this.onColorChange}
                                            >
                                                {this.props.car.colorList.map(v =>
                                                    <Select.Option key={v.id} value={v.id}>{v.color}</Select.Option>
                                                )}
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={24} style={{ paddingLeft: '10px' }}>
                                    <FormItem labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} label="标签">
                                        {getFieldDecorator('plateType', {
                                            initialValue: this.props.car.addCarParams.plateType,
                                            rules: [{ message: '标签不能为空!', required: true }],
                                        })(
                                            <Radio.Group
                                                className={styles.personTags}
                                                buttonStyle="solid"
                                                onChange={this.onPlateTypeChange}
                                            >
                                                <Radio.Button value={1}>本地车</Radio.Button>
                                                <Radio.Button value={2}>外地车</Radio.Button>
                                            </Radio.Group>
                                        )}
                                    </FormItem></Col>
                            </Row>
                        </Col>
                    </Row>
                    <Divider></Divider>
                    <div className={styles.houseContent}>
                        <Row gutter={5}>
                            <Col span={6}>
                                <FormItem labelCol={{ span: 9 }} wrapperCol={{ span: 15 }} label="所属镇">
                                    {getFieldDecorator('burg', {
                                        initialValue: `${this.props.car.houseParams.burg}`,
                                        rules: [{ message: '', required: true }],
                                    })(

                                        <Select onChange={this.onSelectBurg}>
                                            <Select.Option value={'1'}>高境镇</Select.Option>
                                        </Select>
                                    )}
                                </FormItem>
                                <FormItem labelCol={{ span: 9 }} wrapperCol={{ span: 15 }} label="楼号">
                                    {getFieldDecorator('building', {
                                        initialValue: `${this.props.car.houseParams.building}`,
                                        rules: [{ message: '', required: true }],
                                    })(
                                        <Select onChange={this.onSelectBuild} onFocus={this.onSelectBuildList.bind(this, houseOrgData.buildingId)}>
                                            {this.props.car.buildList && this.props.car.buildList.length > 0 ?
                                                this.props.car.buildList.map((value, i) =>
                                                    <Select.Option
                                                        key={i}
                                                        value={`${value.id}`}>{value.name}</Select.Option>
                                                ) : ''}
                                            {/* <Select.Option value={`${houseOrgData.buildingId}`}>{houseOrgData.building}</Select.Option> */}
                                        </Select>
                                    )}
                                </FormItem>
                                <FormItem labelCol={{ span: 9 }} wrapperCol={{ span: 15 }} label="车辆所属人">
                                    {getFieldDecorator("person", {
                                        initialValue: `${this.props.car.houseParams.person}`,
                                        rules: [{ message: '', required: true }],
                                    })(
                                        <Select onChange={this.onPersonChange} onFocus={this.onSelectPersonList.bind(this, ownerPerson.ownerId)}>
                                            {this.props.car.personList && this.props.car.personList.length > 0 ?
                                                this.props.car.personList.map((value, i) =>
                                                    <Select.Option
                                                        key={i}
                                                        value={`${value.id}`}>{value.name}</Select.Option>
                                                ) : ''}
                                            {/* <Select.Option value={this.props.personData ? `${this.props.personData.ownerId}` : ''}>{this.props.personData ? this.props.personData.owner : ''}</Select.Option> */}
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={10}>
                                <FormItem labelCol={{ span: 9 }} wrapperCol={{ span: 15 }} label="所属居委会">
                                    {getFieldDecorator('orgunitId', {
                                        initialValue: `${this.props.car.houseParams.orgunitId}`,
                                        rules: [{ message: '', required: true }],
                                    })(
                                        <Select onChange={this.onSelectUrban} onFocus={this.onSelectUrbanList.bind(this, houseOrgData.townId)}>
                                            {this.props.car.urbanList && this.props.car.urbanList.length > 0 ?
                                                this.props.car.urbanList.map((value, i) =>
                                                    <Select.Option
                                                        key={i}
                                                        value={`${value.id}`}>{value.name}</Select.Option>
                                                ) : ''}

                                        </Select>
                                    )}
                                </FormItem>
                                <Row gutter={5}>
                                    <Col span={12}>
                                        <FormItem labelCol={{ span: 12 }} wrapperCol={{ span: 12 }} label="单元">
                                            {getFieldDecorator('unit', {
                                                initialValue: `${this.props.car.houseParams.unit}`,
                                                rules: [{ message: '', required: true }],
                                            })(
                                                <Select onChange={this.onSelectUnit} onFocus={this.onSelectUnitList.bind(this, houseOrgData.unitId)}>

                                                    {this.props.car.unitList && this.props.car.unitList.length > 0 ?
                                                        this.props.car.unitList.map((value, i) =>
                                                            <Select.Option
                                                                key={i}
                                                                value={`${value.id}`}>{value.name}</Select.Option>
                                                        ) : ''}
                                                    {/* <Select.Option value={`${houseOrgData.unitId}`}>{houseOrgData.unit}</Select.Option> */}
                                                </Select>
                                            )}
                                        </FormItem></Col>
                                    <Col span={12}>
                                        <FormItem labelCol={{ span: 12 }} wrapperCol={{ span: 12 }} label="楼层">
                                            {getFieldDecorator('floor', {
                                                initialValue: `${this.props.car.houseParams.floor}`,
                                                rules: [{ message: '', required: true }],
                                            })(
                                                <Select onChange={this.onSelectFloor} onFocus={this.onSelectFloorList.bind(this, houseOrgData.floorId)}>

                                                    {this.props.car.floorList && this.props.car.floorList.length > 0 ?
                                                        this.props.car.floorList.map((value, i) =>
                                                            <Select.Option
                                                                key={i}
                                                                value={`${value.id}`}>{value.name}</Select.Option>
                                                        ) : ''}
                                                    {/* <Select.Option value={`${houseOrgData.floorId}`}>{houseOrgData.floor}</Select.Option> */}
                                                </Select>
                                            )}
                                        </FormItem>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={8}>
                                <FormItem labelCol={{ span: 9 }} wrapperCol={{ span: 15 }} label="所属小区">
                                    {getFieldDecorator('village', {
                                        initialValue: `${this.props.car.houseParams.village}`,
                                        rules: [{ message: '', required: true }],
                                    })(
                                        <Select onChange={this.onSelectVillage} onFocus={this.onSelectVillageList.bind(this, houseOrgData.villageId)}>

                                            {this.props.car.villageList1 && this.props.car.villageList1.length > 0 ?
                                                this.props.car.villageList1.map((value, i) =>
                                                    <Select.Option
                                                        key={i}
                                                        value={`${value.id}`}>{value.name}</Select.Option>
                                                ) : ''}
                                            {/* <Select.Option value={`${houseOrgData.villageId}`}>{houseOrgData.village}</Select.Option> */}
                                        </Select>
                                    )}
                                </FormItem>
                                <FormItem labelCol={{ span: 9 }} wrapperCol={{ span: 15 }} label="房间号">
                                    {getFieldDecorator('room', {
                                        initialValue: `${this.props.car.houseParams.room}`,
                                        rules: [{ message: '', required: true }],
                                    })(
                                        <Select onChange={this.onSelectRoom} onFocus={this.onSelectRoomList.bind(this, houseOrgData.houseId)}>
                                            {this.props.car.roomList && this.props.car.roomList.length > 0 ?
                                                this.props.car.roomList.map((value, i) =>
                                                    <Select.Option
                                                        key={i}
                                                        value={`${value.id}`}>{value.room}</Select.Option>
                                                ) : ''}
                                            {/* <Select.Option value={`${houseOrgData.houseId}`}>{houseOrgData.room}</Select.Option> */}
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                    </div>
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
