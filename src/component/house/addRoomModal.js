import React from 'react';
import {connect} from 'dva';
import { Modal, Select, Input, Button, Cascader } from 'antd';



class AddRoomModal extends React.Component {
    componentDidMount() {
        
    }
    onCascaderChange = (v) => {
        const addRoomParams = this.props.house.addRoomParams;
        this.props.dispatch({
            type: 'house/success',
            payload: {
                addRoomParams: {
                    ...addRoomParams,
                    unit: v[0],
                    floor: v[1]
                }
            }
        })
    }
    onInputChange = (e) => {
        const addRoomParams = this.props.house.addRoomParams;
        this.props.dispatch({
            type: 'house/success',
            payload: {
                addRoomParams: {
                    ...addRoomParams,
                    room: e.target.value
                }
            }
        })
    }
    onBtnClick = () => {
        this.props.dispatch({
            type: 'house/addRoom'
        })
    }
    onCancel = () => {
        this.props.dispatch({
            type: 'house/success',
            payload: {
                addRoomModalVisible: false,
                addRoomParams: {
                    building: '',
                    room: '',
                    unti: '',
                    floor: ''
                }
            }
        })
    }
    render() {
        const cascaderValue = [this.props.house.addRoomParams.unit, this.props.house.addRoomParams.floor]
        return (
            <Modal footer={null} onCancel={this.onCancel} visible={this.props.house.addRoomModalVisible} title={'新增房屋'}>
                <div style={{marginBottom: '10px'}}>
                    <span style={{display: 'inline-block',width: '200px', textAlign: 'right'}}>单元/楼层号：</span>
                    <Cascader value={cascaderValue} placeholder="请选择单元号/楼层号" options={this.props.house.cascaderData} onChange={this.onCascaderChange}/>
                </div>
                <div style={{marginBottom: '10px'}}>
                    <span style={{display: 'inline-block',width: '200px', textAlign: 'right'}}>房屋号：</span>
                   <Input style={{width: '36.5%'}} onChange={this.onInputChange} value={this.props.house.addRoomParams.room}/>
                </div>
                <div style={{textAlign: 'center'}}>
                    <Button type="primary" onClick={this.onBtnClick}>确认</Button>
                </div>

            </Modal>
        )
    }
}

export default connect((state) => {
    return { ...state }
  })(AddRoomModal)

