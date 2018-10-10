import React from 'react';
import TableSkeleton from '../../component/common/TableSkeleton';
import { Row, Col, Input, Skeleton, Radio, Select, Button, Icon, Table, Tree } from 'antd';
import { connect } from 'dva';

import CommitteeCard from '../../component/house/CommitteeCard';
import VillageCard from '../../component/house/VillageCard';
import BuildingNum from '../../component/house/BuildingNum';
import BuildingContent from '../../component/house/BuildingContent';
import RoomContent from '../../component/house/RoomContent'


import * as Utils from '../../utils/utils';
import * as Conf from '../../utils/config';
import styles from './index.less';
import Sider from 'antd/lib/layout/Sider';

const TreeNode = Tree.TreeNode;

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  componentDidMount() {
    const silder = this.refs.silder;
    const cont = this.refs.cont;
    Utils.getHeightResponse(silder);
    Utils.getHeightResponse(cont);

    window.onresize = function () {
      Utils.getHeightResponse(silder);
      Utils.getHeightResponse(cont);
    }
    this.props.dispatch({
      type: 'house/getOrgTree'
    });
    this.props.dispatch({
      type: 'house/getHouseType'
  })
  this.props.dispatch({
    type: 'house/getAttribute'
})
  }

  renderTreeNode = (data = [], i = 0) => {
    return data.map((item) => {
      let key = `${item.id}-${item.level}-${item.parentId}`;
      if(item.level == 5){
        key = `${item.parentId}-${item.level}-${item.id}`;
      }
    
      let name = item.name + `(${item.count})`; 
      if (key.split('-')[1] == Conf.HOUSE_INDEX) {
        name = item.name.split('单元')[1]
      }
      if (item.childrenList) {
        return (
          <TreeNode title={name} key={key} dataRef={item}>
            {this.renderTreeNode(item.childrenList, key)}
          </TreeNode>
        );
      }

      return <TreeNode title={name} key={key} dataRef={item} />;
    });
  }
  treeSelect = (selectedKeys, e) => {
    if( selectedKeys.length === 0 ){
      return false;
    }
    let selectedKey = selectedKeys[0];
    let unitActive = 0;
    if( selectedKey.split('-')[1] === '5' ){
      unitActive = selectedKey.split('-')[2] - 0;
    } 
      this.props.dispatch({
        type: 'house/success',
        payload: {
          listOrgunitParams: {
            orgunitId: selectedKey,
            type: selectedKey.split('-')[1],
           
          },
          orgCardList: [],
          unitActive
        }
      });
    // }
    this.props.dispatch({
      type: 'house/chooseIssueAjax'
    })
    /*
    type 值 注解：
      1：镇层级
      2：居委层级
      3：小区层级
      4：楼栋号层级
      5：单元层级
      6：室内层级    
    
    */
  }
  renderCardGroup = () => {
    let rt = [];
    const type = this.props.house.listOrgunitParams.type - 0;
    switch (type) {
      case 1:
        rt = this.props.house.orgCardList.map((v, i) => <CommitteeCard data={v} i={i} />);
        rt.unshift(<CommitteeCard orgunitId={this.props.house.listOrgunitParams.orgunitId} i={-1} />)
        break;
      case 2:
        rt = this.props.house.orgCardList.map((v, i) => <VillageCard data={v} i={i} />);
        rt.unshift(<VillageCard orgunitId={this.props.house.listOrgunitParams.orgunitId} i={-1} />)
        break;
      case 3:
        rt = this.props.house.orgCardList.map((v, i) => <BuildingNum data={v} i={i} />)
        rt.unshift(<BuildingNum orgunitId={this.props.house.listOrgunitParams.orgunitId} i={-1} />)
        break;
      case 4:
        rt = <BuildingContent changeToRoomPage={this.changeToRoomPage}/>
        break;
      case 5:
        rt = <BuildingContent changeToRoomPage={this.changeToRoomPage}/>
        break;
      case 6:
        rt = <RoomContent/>
        break;
      default:
        break;

    }
    return rt
  }
  changeToRoomPage = (room, pid) => {
  
    this.props.dispatch({
      type: 'house/success',
      payload: {
        listOrgunitParams: {
          orgunitId: `${room}-6-${pid}`,
          type: '6'
        }
      }
    });
    this.props.dispatch({
      type: 'house/chooseIssueAjax'
    });
    
  }
  render() {
    return (
      <div className={styles.normal}>
        <div className={styles.search}>
          <Skeleton loading={false}>
            <Row>
              <Col span={6}>
                <span className={styles.label}>社区名称/地址：</span>
                <Input style={{ width: '58%' }} placeholder="请输入姓名" />
              </Col>
              <Col span={6}>
                <span className={styles.label}>房屋类型：</span>
                <Select style={{ width: '63%' }}>
                <Select.Option value={''}>全部</Select.Option>
                {this.props.house.houseType.map(v => <Select.Option value={v.id}>{v.typeName}</Select.Option>)}
                  
                </Select>
              </Col>
              <Col span={7}>
                <span className={styles.label}>标签：</span>
                <Radio.Group className={styles.personTags} defaultValue="" buttonStyle="solid">
                <Radio.Button value="">不限</Radio.Button>
                {this.props.house.allAttributes.map(v => <Radio.Button value={v.id}>{v.attributeName}</Radio.Button>)}
              
                </Radio.Group>
              </Col>
              <Col span={5}>
                <div className={`${styles.searchBtn} ${styles.exportBtn}`}>
                  <Button>一键导入</Button>
                </div>
                <div className={styles.searchBtn}>
                  <Button type="primary">搜索</Button>
                </div>
              </Col>
            </Row>
          </Skeleton>
        </div>

        <Row gutter={20}>
          <Col span={5}>
            <div className={styles.silder} ref="silder">
              <Tree
                selectedKeys={[`${this.props.house.listOrgunitParams.orgunitId}`]}
                onSelect={this.treeSelect}
              >
                {this.renderTreeNode(this.props.house.orgTree, 0)}
              </Tree>
            </div>
          </Col>
          <Col span={19}>
            <div className={styles.houseContent} ref="cont">
              <Row>
                {this.renderCardGroup()}
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
export default connect((state) => {
  return { ...state }
})(IndexPage)
