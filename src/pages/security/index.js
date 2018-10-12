import React from 'react';
import { Row, Col, Input, Skeleton, Select, Button, Upload, Icon } from 'antd';
import { connect } from 'dva';

import * as Conf from '../../utils/config';
import * as Utils from '../../utils/utils';

import addImg from '../../assets/add.png';
import securityImg from '../../assets/security.png';
import securityImg1 from '../../assets/security1.png';
import securityImg2 from '../../assets/security2.png';

import styles from './index.less';
import FireCard from '../../component/common/FireCard';
const data = [
    { name: '门禁', number: 1600, img: securityImg },
    { name: '摄像头', number: 810, img: securityImg1 },
    { name: '巡更点为', number: 320, img: securityImg2 },
]
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}
class IndexPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
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
            const addParams = this.props.security.addParams;
            this.props.dispatch({
                type: 'security/success',
                payload: {
                    addParams: {
                        ...addParams,
                        imgPath: info.file.response.result
                    }
                }
            })
        }
    }
    componentDidMount() {
        this.props.dispatch({
            type: 'security/getAllVillage'
        })
    }
    onSelectVillage = (value) => {
        const searchParams = this.props.security.searchParams
        this.props.dispatch({
            type: 'security/success',
            payload: {
                searchParams: {
                    village: value
                }
            }
        })
    }
    renderFireCard = data => {
        return data.map((v, i) => (
            <FireCard
                key={i}
                leabelName={v.name}
                leabelNumber={v.number}
                fireImg={v.img}
            >

            </FireCard>
        ))
    }
    render() {
        const uploadButton = (
            <div>
                {/* <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className={styles.uploadText}>点击上传图片</div> */}
                <img alt='' src={addImg} />
            </div>
        );
        return (
            <div className={styles.normal}>
                <div className={styles.search}>
                    <Skeleton loading={false}>
                        <Row>
                            <Col span={8}>
                                <span>社区：</span>
                                <Select
                                    style={{ width: '60%', marginRight: '10px' }}
                                    onChange={this.onSelectVillage}
                                    value={this.props.security.searchParams.village}
                                >
                                    <Select.Option value=''>全部</Select.Option>
                                    {this.props.security.villageList.map(v =>
                                        <Select.Option key={v.id} value={v.id}>{v.name}</Select.Option>
                                    )}
                                </Select>
                            </Col>
                        </Row>
                    </Skeleton>
                </div>
                <div className={styles.container}>
                    <Skeleton loading={false} active>

                        <div className={styles.addFireCard}>
                            <div className={styles.addPicture}>
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
                            </div>
                            <div>
                                <div style={{ margin: '2px 0' }}>
                                    <span>名称: </span>
                                    <Input
                                        style={{ width: '110px' }}
                                    />
                                    <span style={{ marginLeft: '8px' }}>数量: </span>
                                    <Input
                                        style={{ width: '110px' }}
                                    />
                                </div>
                                <Button type="primary">添加</Button>
                            </div>
                        </div>

                        {this.renderFireCard(data)}
                    </Skeleton>
                </div>
            </div>

        )
    }
}
export default connect((state) => {
    return { ...state }
})(IndexPage)
