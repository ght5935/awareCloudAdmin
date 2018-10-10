import React from 'react';
import { connect } from 'dva';
import { Col, Input, Tooltip, Icon, Popconfirm, Upload } from 'antd';
import styles from './villageCard.less';
import icon from '../../assets/orgIcon.png';
import * as Utils from '../../utils/utils';
import editIcon from '../../assets/edit.png';
import deleteIcon from '../../assets/delete.png';
import * as Conf from '../../utils/config';

import test from '../../assets/default.png'

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
class VillageCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            add: false,
            orgunitId: '',
            address: '',
            image: '',
            edit: false,
            name: '',
            addName: '',
            addOrgunitId: '',
            addAddress: '',
            addImage: '',
            imageUrl: ''
        }
    }
    componentDidMount() {
        this.setState({
            name: this.props.data && this.props.data.name ? this.props.data.name : ''
        })
        var card = this.refs.card;

        const _this = this;
        document.addEventListener('click', function (e) {
            if(e.target.getAttribute('data-id') === 'upload' || e.target.getAttribute('type') === 'file'){
                return false
            }
            // if (!_this.state.edit) {
            //     return false;
            // }
            _this.setState({
                edit: false,
                add: false
            });

        });
        card.addEventListener('click', function (e) {
            if(e.target.getAttribute('data-id') === 'upload' || e.target.getAttribute('type') === 'file'){
                return false
            }
            if (!_this.state.edit) {
                return false;
            }
            var ev = e || window.event;
            ev.stopPropagation();
        });


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
            edit: true
        });
        const mask = this.refs.mask;
        const anim = mask.classList[mask.classList.length - 1]
        mask.classList.remove(styles.maskActive, anim);
        setTimeout(() => {
            this.setState({
                edit: true,
                name: this.props.data.name,
                address: this.props.data.address
            });
            this.inputRef.input.focus();
        }, 300)
    }
    inputRef = undefined;
    nameInputFocus = () => {
        this.setState({
            name: this.props.data.name
        });
    }
    addressInputFocus = () => {
        this.setState({
            address: this.props.data.address
        });
    }

    onNameInputChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }
    onAddressInputChange = (e) => {
        this.setState({
            address: e.target.value
        })
    }
    addAddressInputFocus = () => {
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

        this.setState({
            addAddress: ''
        })

    }
    addNameInputFocus = () => {
        // var addRef = this.refs.addRef ? this.refs.addRef : null;
        // const _this = this
        // if (addRef) {
        //     addRef.addEventListener('click', function (e) {
        //         if (!_this.state.add) {
        //             return false;
        //         }
        //         var ev = e || window.event;
        //         ev.stopPropagation();
        //     });
        // }

        this.setState({
            addName: ''
        })

    }
    onAddNameInputChange = (e) => {
        this.setState({
            addName: e.target.value
        })
    }
    onAddAddressInputChange = (e) => {
        this.setState({
            addAddress: e.target.value
        })
    }
    onPressEnter = (e) => {
        e.persist()
        if (this.state.name !== this.props.data.name) {
            this.props.dispatch({
                type: 'house/modifyCommittee',
                payload: {
                    name: this.state.name,
                    orgunitId: this.props.data.id
                }
            })
        } else {
            return false
        }
    }

    onAddPressEnter = (e) => {
        e.persist()
        if (this.state.addAddress !== '') {
            this.props.dispatch({
                type: 'house/addVillage',
                payload: {
                    name: this.state.addName,
                    orgunitId: this.props.orgunitId.split('-')[0],
                    address: this.state.addAddress,
                    image: this.state.addImage
                }
            });

        } else {
            return false
        }
        this.setState({
            add: false
        })
    }

    onDeletConfirm = () => {
        this.props.dispatch({
            type: 'house/deleteVillage',
            payload: {
                orgunitId: this.props.data.id
            }
        })
    }

    onAddClick = (e) => {
        this.setState({
            add: true,
            addName: '',
            addAddress: '',
            addImage: '',
            addOrgunitId: '',
            imageUrl: ''
        });
        setTimeout(() => {
            this.setState({
                add: true,
                edit: true
            });
            this.inputRef.input.focus();
        }, 300)
    }
    inputRef = undefined;

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
         this.setState({
            addImage: info.file.response.result
         })
        }
      }
    render() {
        const uploadButton = (
            <div data-id='upload' style={{ width: '195px', height: '157px', position: 'relative' }}>
              <Icon className={styles.add} type={this.state.loading ? 'loading' : 'plus'} />
            </div>
          );
        return (
            <Col span={6} className={styles.col}>
                <div
                    data-id="card"
                    className={styles.card}
                    onMouseEnter={this.state.edit || !this.props.data ? () => { return false } : this.onCardMouseEnter}
                    onMouseLeave={this.state.edit || !this.props.data ? () => { return false } : this.onCardMouseLeave}
                    ref="card"
                    style={{ height: '259px' }}
                >
                    {this.props.i === -1 ? this.state.add ?
                        <div className={styles.content} ref="addRef">
                            {/* <img style={{ width: '203px', height: '159px' }} src={test} alt="" /> */}
                            <Upload
                                name="image"
                                listType="picture-card"
                                className="avatar-uploader"
                                action={`${Conf.API_PREFIX}/poi/saveImg.do`}
                                showUploadList={false}
                                onChange={this.handleChange}
                            >
                                {this.state.imageUrl ? <div style={{textAlign:'center', width: '195px'}}><img style={{ height: '159px' }} src={this.state.imageUrl} alt="avatar" /></div> : uploadButton}
                            </Upload>
                            {/* <input type="file" /> */}
                            <span>小区：</span>
                            <Tooltip title={this.state.addName} trigger={'focus'}>
                                <Input
                                    value={this.state.addName}
                                    onFocus={this.addNameInputFocus}
                                    onChange={this.onAddNameInputChange}
                                    onPressEnter={this.onAddPressEnter}
                                    ref={c => { this.inputRef = c }}
                                    style={{ marginTop: '12px', width: '109px' }} />
                            </Tooltip>
                            <br />
                            <span>地址：</span>
                            <Tooltip title={this.state.addAddress} visible={this.state.addAddress ? true : false} trigger={'focus'}>
                                <Input value={this.state.addAddress}
                                    onFocus={this.addAddressInputFocus}
                                    onChange={this.onAddAddressInputChange}
                                    onPressEnter={this.onAddPressEnter}
                                    style={{ marginTop: '12px', width: '109px' }} />
                            </Tooltip>
                        </div> :
                        <div style={{ width: '100%', height: '100%' }} onClick={this.onAddClick}>
                            <Icon className={styles.add} type="plus"></Icon>
                        </div> : ''}

                    {this.props.i === -1 ? '' :
                        <div ref="mask" className={styles.mask}>
                            <div className={styles.maskIconContain}>
                                <img src={editIcon} onClick={(e) => this.onEditClick(e)} alt="" />
                                <Popconfirm title={'您将执行删除人员操作，将会引起数据变化，是否继续执行？'} onConfirm={this.onDeletConfirm} placement="topRight" okText="是" cancelText="否">
                                    <img src={deleteIcon} alt="" />
                                </Popconfirm>
                            </div>
                        </div>
                    }
                    {this.props.i === -1 ? '' :
                        <div className={styles.content}>
                            <img style={{ width: '203px', height: '159px' }} src={this.props.data.villageImg ? this.props.data.villageImg : test} alt="" />
                            <span className={this.state.edit ? '' : styles.label}>小区：</span>
                            {this.state.edit ?
                                <Tooltip title={this.state.name} trigger={'focus'}>
                                    <Input
                                        value={this.state.name}
                                        onFocus={this.nameInputFocus}
                                        onChange={this.onNameInputChange}
                                        onPressEnter={this.onPressEnter}
                                        ref={c => { this.inputRef = c }}
                                        style={{ marginTop: '12px', width: '109px' }} />
                                </Tooltip> :

                                <span className={styles.orgName}>{this.props.data.name}</span>}
                            <br />
                            <span className={this.state.edit ? '' : styles.label}>地址：</span>
                            {this.state.edit ?
                                <Tooltip title={this.state.address} trigger={'focus'}>
                                    <Input
                                        value={this.state.address}
                                        onFocus={this.addressInputFocus}
                                        onChange={this.onAddressInputChange}
                                        onPressEnter={this.onPressEnter}
                                        style={{ marginTop: '12px', width: '109px' }} />
                                </Tooltip> :
                                <span className={styles.orgName}>{this.props.data.address}</span>}
                        </div>
                    }


                </div>
            </Col>
        )
    }
}
export default connect((state) => {
    return { ...state }
})(VillageCard)
