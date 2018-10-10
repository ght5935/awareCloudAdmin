
// ref: https://umijs.org/config/
export default {
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: {
        loadingComponent: '/component/common/Loading.js'
      },
      title: '智慧社区感知云管理',
      dll: false,
      pwa: false,
      routes: {
        exclude: [
          /model\.(j|t)sx?$/,
          /service\.(j|t)sx?$/,
          /models\//,
          /components\//,
          /assets\//,
          /services\//
        ],
      },
      hardSource: false,
      polyfills: ['ie9', 'ie10', 'ie11']
    }],
  ],
  publicPath: '/awareCloudAdmin/cf/',
  history: 'hash',
 
}
