export default defineAppConfig({
  pages: ['pages/index/index', 'pages/my/index'],
  window: {
    backgroundColor: '#fff',
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'Taro3',
    navigationBarTextStyle: 'black',
    navigationStyle: 'custom'
  },
  subPackages: [
    {
      root: 'package',
      pages: ['material/index', 'package-b/index', 'package-c/index', 'icon/index']
    }
  ],
  tabBar: {
    custom: true,
    color: '#000000',
    selectedColor: '#FF0000',
    list: [
      {
        pagePath: 'pages/index/index',
        text: 'AI创作'
      },
      {
        pagePath: 'pages/my/index',
        text: '个人中心'
      }
    ]
  }
});
