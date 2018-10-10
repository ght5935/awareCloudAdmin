import React from 'react';
import { LocaleProvider } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import Link from 'umi/link';
import { Layout, Menu, Popover, Icon } from 'antd';
import styles from './index.less';
import logo from '../assets/logo.png';
import user from '../assets/user.png';
import userIcon from '../assets/userIcon.png';
import houseIcon from '../assets/houseIcon.png';

import carIcon from '../assets/carIcon.png';




const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

class BasicLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signOutHover: true,
      signOutText: true
    }
  }
  componentDidMount() {
    let pathname = this.props.pathname === '/' ? 'index' : this.props.pathname;

    pathname = pathname.replace('/', '');
    this.setState({
      selectedKeys: [pathname]
    })
  }
  onMenuChange = (e) => {
    this.setState({
      selectedKeys: [e.key]
    })
  }
  onSignoutEnter = () => {
    this.setState({
      signOutText: false
    })
  }
  onSignoutLeave = () => {
    this.setState({
      signOutText: true
    })
  }
  logout = () => {
    window.g_app._store.dispatch({
      type: 'login/success',
      payload: {
        loading: false
      }
    })
    // router.replace('/login')
  }
  renderSignOut = () => {
    return (
      <div style={{ cursor: 'pointer', width: '80px' }} onMouseEnter={this.onSignoutEnter} onMouseLeave={this.onSignoutLeave} onClick={this.logout}>
        <Icon
          type={'poweroff'}
          theme="outlined"
          style={{ transition: '.3s', color: `${this.state.signOutText ? '#000' : '#3F7BFE'}`, fontSize: '14px' }} />
        <span style={{ transition: '.3s', color: `${this.state.signOutText ? '#000' : '#3F7BFE'}`, marginLeft: '10px' }}>退出</span>
      </div>
    )
  }
  onSignOutHover = () => {
    this.setState({
      signOutHover: false
    })
  }
  onSignOutLeave = () => {
    this.setState({
      signOutHover: true
    })
  }
  render() {
    return (
      <LocaleProvider locale={zh_CN}>
        {this.props.pathname !== '/login' ?
          <Layout className={styles.mainLayout}>
            <Header>
              <div className={styles.header}>
                <div className={styles.logo}>
                  <img src={logo} alt="" />
                </div>

                <div className={styles.signOut} >
                  <img src={user} alt="" />
                  <Popover
                    content={this.renderSignOut()}
                    onMouseEnter={this.onSignOutHover}
                    onMouseLeave={this.onSignOutLeave}>
                    <span className={styles.userName}>admin</span>
                    <Icon
                      type={'down'}
                      theme="outlined"
                      style={{ transition: '.3s', transformOrigin: '50% 50%', transform: `rotate(${this.state.signOutHover ? '0' : '180'}deg)`, marginLeft: '11px', color: '#fff', fontSize: '12px' }} />
                  </Popover>
                </div>

              </div>
            </Header>
            <Content className={styles.content} >
              <Layout style={{ background: 'rgba(0,0,0,0)' }}>
                <Sider width={200} style={{ background: 'rgba(0,0,0,0)' }}>
                  <Menu
                    mode="inline"
                    selectedKeys={this.state.selectedKeys}
                    style={{ height: '100%' }}
                    onSelect={this.onMenuChange}
                  >
                    <Menu.Item key="index"><Link to="/"><img className={styles.menuIcon} src={userIcon} alt="" /><span className={styles.menuText}>人员管理</span></Link></Menu.Item>
                    <Menu.Item key="house"><Link to="/house"><img className={styles.menuIcon} src={houseIcon} alt="" /><span className={styles.menuText}>房屋管理</span></Link></Menu.Item>
                    <Menu.Item key="car"><Link to="/car"><img className={styles.menuIcon} src={carIcon} alt="" /><span className={styles.menuText}>车辆管理</span></Link></Menu.Item>
                  </Menu>
                </Sider>
                <Content style={{ paddingLeft: '20px', height: 'calc(100% - 48px)' }}>
                  {this.props.children}
                </Content>
              </Layout>
            </Content>

          </Layout>
          : this.props.children}
      </LocaleProvider>
    );
  }
}


export default connect((state) => {
  return {
    pathname: state.routing.location.pathname,
    loading: state.login.loading
  }
})(BasicLayout)
