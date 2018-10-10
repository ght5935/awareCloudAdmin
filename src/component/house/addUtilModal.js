import React from 'react';
import {connect} from 'dva';
import { Modal, Select, Input, Button } from 'antd';



class AddUtilModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }
    }
    componentDidMount() {
        
    }
    onInputChange = (e) => {
        this.props.dispatch({
            type: 'house/success',
            payload: {
                addUtilNum: e.target.value
            }
        })
    }
    addUtils = () => {
        this.props.dispatch({
            type: 'house/addUnit'
        })
    }
    onCancel = () => {
        this.props.dispatch({
            type: 'house/success',
            payload: {
                addUtilModalVisible: false,
                addUtilNum: ''
            }
        })
    }
    render() {
        return (
            <Modal 
            visible={this.props.house.addUtilModalVisible} 
            title={'新增单元'} 
            footer={null}
            onCancel={this.onCancel}
            >
                <div style={{textAlign: 'center'}}>
                    <span>名称：</span>
                    <Input style={{width: '50%', marginRight: '20px'}} 
                    value={this.props.house.addUtilNum} 
                    onChange={this.onInputChange}/>
                    <Button type='primary' onClick={this.addUtils}>确定</Button>
                </div>

            </Modal>
        )
    }
}
export default connect((state) => {
    return { ...state }
  })(AddUtilModal)
