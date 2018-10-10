
import React from 'react';
import { Form, Icon, Input, Button, Checkbox, message, Modal } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import title from '../../assets/title.png'

import styles from './login.less';

const FormItem = Form.Item;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      userIconColor: '#e2e2e2',
      passNameIconColor: '#e2e2e2'
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
      }
    });
  }


  componentDidMount() {
    console.log(this.props.loading)
    // this.inputRef.input.focus();
  }
  inputRef = undefined;
  componentDidUpdate() {
    setTimeout(() => this.loginSuccess(), 2000);
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.onLoading(values);

      }
    });
  };
  onLoading = values => {
    this.setState({
      onLoading: true
    });
    this.props.dispatch({
      type: 'login/onLogin',
      payload: values
    });
  };
  onUserNameChange = e => {
    let username = e.target.value;
    username = username.trim();
    this.setState({
      username
    });
  };
  onPasswordChange = e => {
    let password = e.target.value;
    password = password.trim();
    this.setState({
      password
    });
    this.props.form.setFieldsValue({
      password
    });
  };

  loginSuccess() {
    if (this.props.isLogin && !this.props.hasError) {
      this.props.dispatch({
        type: 'login/success',
        payload: {
          loading: false
        }
      })
      router.replace('/')

    } else if (this.props.hasError) {
      message.destroy();
      message.warning(this.props.errorMsg);
      this.props.dispatch({
        type: 'login/clearMsg'
      });
    }
  }
  clearPassword = () => {
    this.setState({
      password: ''
    });
    this.props.form.setFieldsValue({
      password: ''
    });
  };
  componentWillMount(){
    this.props.dispatch({
      type: 'login/success',
      payload: {
        loading: false
      }
    })

  }

  userSvg = () => {
    return (
      <svg width="1.4em" height="1.4em" viewBox="0 0 30 30" fill="currentColor" >
        <defs>
          <filter x="-1.4%" y="-1.4%" width="102.8%" height="104.0%" filterUnits="objectBoundingBox" id="filter-1">
            <feOffset dx="0" dy="2" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
            <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
            <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0" type="matrix" in="shadowBlurOuter1" result="shadowMatrixOuter1"></feColorMatrix>
            <feMerge>
              <feMergeNode in="shadowMatrixOuter1"></feMergeNode>
              <feMergeNode in="SourceGraphic"></feMergeNode>
            </feMerge>
          </filter>
        </defs>
        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="00登录" transform="translate(-770.000000, -437.000000)" fill="currentColor">
            <g id="用户登录" filter="url(#filter-1)" transform="translate(709.000000, 368.000000)">
              <g id="用户" transform="translate(51.000000, 59.000000)">
                <path d="M19.3333333,18.6665776 C19.3333333,22.3484539 22.3180426,25.3333333 25.9999287,25.3333333 C29.6818149,25.3333333 32.6666667,22.3484539 32.6666667,18.6665776 C32.6666667,14.9847013 29.6818149,12 25.9999287,12 C22.3180426,12 19.3333333,14.9847013 19.3333333,18.6665776 Z M37.9245605,34.1501316 C36.8688604,31.0269922 34.1817052,28.6487435 30.918616,28 C29.4789957,28.840859 27.7994566,29.3213806 25.9999938,29.3213806 C24.2005311,29.3213806 22.520992,28.840859 21.0814075,28 C17.8183183,28.6487435 15.1311273,31.0269922 14.0754272,34.1501316 C13.7635256,35.0630295 14.4593474,36 15.4190227,36 L36.580965,36 C37.5406403,36 38.2364979,35.0630295 37.9245605,34.1501316 Z" id="会员"></path>
              </g>
            </g>
          </g>
        </g>
      </svg>
    )
  }
  passNameSvg = () => {
    return (
      <svg width="1.4em" height="1.4em" viewBox="0 0 30 30" fill="currentColor" >
        <defs>
          <filter x="-1.4%" y="-1.4%" width="102.8%" height="104.0%" filterUnits="objectBoundingBox" id="filter-1">
            <feOffset dx="0" dy="2" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
            <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
            <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0" type="matrix" in="shadowBlurOuter1" result="shadowMatrixOuter1"></feColorMatrix>
            <feMerge>
              <feMergeNode in="shadowMatrixOuter1"></feMergeNode>
              <feMergeNode in="SourceGraphic"></feMergeNode>
            </feMerge>
          </filter>
        </defs>
        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="00登录" transform="translate(-771.000000, -502.000000)" fill="currentColor">
            <g id="用户登录" filter="url(#filter-1)" transform="translate(709.000000, 368.000000)">
              <g id="密码" transform="translate(51.000000, 126.000000)">
                <path d="M33.7045926,20.8329234 L33.7045926,17.5812373 C33.7045926,17.5812373 33.7045926,10 26.0045484,10 C18.3045357,10 18.3045357,17.5812373 18.3045357,17.5812373 L18.3045357,20.8329234 L15,20.8329234 L15,36 L37,36 L37,20.8329234 L33.7045926,20.8329234 Z M27.1045231,29.1984463 L27.1045231,32.7483139 L24.9046052,32.7483139 L24.9046052,29.1984463 C24.2517903,28.8224424 23.8045357,28.1298805 23.8045357,27.3318522 C23.8045357,26.1348415 24.7904858,25.1670766 26.0045484,25.1670766 C27.2186425,25.1670766 28.2045926,26.1348415 28.2045926,27.3318522 C28.2045926,28.1344826 27.7572116,28.8270127 27.1045231,29.1984463 Z M31.5045484,20.8329234 L20.5045484,20.8329234 L20.5045484,17.599582 C20.5182566,16.6914535 20.8422635,12.1693776 26.0045484,12.1693776 C31.1667385,12.1693776 31.4908717,16.6914535 31.5045484,17.5858393 L31.5045484,20.8329234 Z"></path>
              </g>
            </g>
          </g>
        </g>
      </svg>
    )
  }
  onNameFoucs = () => {
    this.setState({
      userIconColor: '#3990FF'
    })
  }
  onNameBlur = () => {
    this.setState({
      userIconColor: '#e2e2e2'
    })
  }
  onPassNameFoucs = () => {
    this.setState({
      passNameIconColor: '#3990FF'
    })
  }
  onPassNameBlur = () => {
    this.setState({
      passNameIconColor: '#e2e2e2'
    })
  }
  render() {
    let { getFieldDecorator } = this.props.form;
    return (
      <div>
        <div className={styles.title}>
          <img src={title} alt=""/>
        </div>
      
      <div className={styles.loginContent}>

        
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={<Icon component={this.userSvg} style={{ color: this.state.userIconColor, transition: '.3s' }} />}
                onFocus={this.onNameFoucs}
                onBlur={this.onNameBlur}
                placeholder="用户名"
                onChange={this.onUserNameChange} />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon component={this.passNameSvg} style={{ color: this.state.passNameIconColor, transition: '.3s' }} />}
              onFocus={this.onPassNameFoucs}
              onBlur={this.onPassNameBlur}
              type="password" 
              placeholder="密码"
              onChange={this.onPasswordChange}/>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
             valuePropName: 'checked',
             initialValue: true,
            })(
              <Checkbox>记住密码</Checkbox>
            )}

          </FormItem>
          <div>
            <Button loading={this.props.loading} type="primary" htmlType="submit" style={{width: '100%'}}>
              登录
          </Button>

          </div>
        </Form>
      </div>
      </div>
    );
  }
}

function mapStateToProps({ login }) {
  return { ...login };
}

const mapPropsLogin = Form.create()(Login);

export default connect(mapStateToProps)(mapPropsLogin);
