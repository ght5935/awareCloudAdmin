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
                addFloorNum: e.target.value
            }
        })
    }
    addFloor = () => {
        this.props.dispatch({
            type: 'house/addFloor'
        })
    }
    onCancel = () => {
        this.props.dispatch({
            type: 'house/success',
            payload: {
                addFloorModalVisible: false,
                addFloorNum: ''
            }
        })
    }
    render() {
        return (
            <Modal 
            visible={this.props.house.addFloorModalVisible} 
            title={'新增楼层'} 
            footer={null}
            onCancel={this.onCancel}
            >
                <div style={{textAlign: 'center'}}>
                
                    <span>楼层号：</span>
                    <Input style={{width: '50%', marginRight: '20px'}} 
                    value={this.props.house.addFloorNum} 
                    onChange={this.onInputChange}/>
                    <Button type='primary' onClick={this.addFloor}>确定</Button>
                </div>

            </Modal>
        )
    }
}
export default connect((state) => {
    return { ...state }
  })(AddUtilModal)
