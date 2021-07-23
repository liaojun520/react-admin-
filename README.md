npm install less less-loader --save          //antd采用的是less
npm install babel-plugin-import  --save-dev  //按需引入antd
npm install redux react-redux react-router-dom mock axios --save-dev


npm run eject之前必须git提交干净
git init
git add .
git commit -m "Saving before ejecting"
npm run eject




具体配置按需引入antd样式
安装 antd
# npm 
npm install antd --save

# yarn
yarn add antd
安装 less, less-loader
由于 antd 是由 less 开发的样式组件, 所以我们也需要引入 less 及 less-loader

# npm
npm install less less-loader --save

# yarn
yarn add less less-loader
安装 babel-plugin-import
按需加载组件库, 我们还需要一个插件 babel-plugin-import

create-react-app 按需引入 antd 组件, 更改主题配置

更改配置项时注意图中区别
在使用 create-react-app 创建了 react 项目时. 我们在项目目录中是看不到关于 webpack 的配置项的. 而 create-react-app 也为我们提供了能看到它的方式.

暴露配置文件
我们需要在项目终端运行一行命令:

# npm
npm run eject

# yarn
yarn eject
此时, 我们就可以看到项目中多了两个文件夹 config 和 scripts . 再打开 package.json 发现它也是大变样. 不过我们关注的重点主要在 config 文件中的 webpack.config.js 上

create-react-app 按需引入 antd 组件, 更改主题配置

更改配置项
// webpack.config.js

...
// style files regexes
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

// 此处添加: 自定义添加less配置
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;
// 添加结束
...
在 file-loader 上面引入规则 顺序不可变更. 当配置多个 loader 时, loader 的执行顺序是从右到左, 从下到上

...
{
  test: sassModuleRegex,
  use: getStyleLoaders(
    {
      importLoaders: 3,
      sourceMap: isEnvProduction && shouldUseSourceMap,
      modules: {
        getLocalIdent: getCSSModuleLocalIdent,
      },
    },
    'sass-loader'
  ),
},

// 此处添加: 自定义添加 less
{
  test: lessRegex,
  exclude: lessModuleRegex,
  use: getStyleLoaders(
    {
      importLoaders: 3,
      sourceMap: isEnvProduction && shouldUseSourceMap,
    },
    'less-loader'
  ),
  sideEffects: true,
},
{
  test: lessModuleRegex,
  use: getStyleLoaders(
    {
      importLoaders: 3,
      sourceMap: isEnvProduction && shouldUseSourceMap,
      modules: {
        getLocalIdent: getCSSModuleLocalIdent,
      },
    },
    'less-loader'
  ),
},
// 添加结束!

{
  loader: require.resolve('file-loader'),
  // Exclude `js` files to keep "css" loader working as it injects
  // its runtime that would otherwise be processed through "file" loader.
  // Also exclude `html` and `json` extensions so they get processed
  // by webpacks internal loaders.
  exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
  options: {
    name: 'static/media/[name].[hash:8].[ext]',
  },
},
// ** STOP ** Are you adding a new loader?
...
按需加载
...
plugins: [
  [
    require.resolve('babel-plugin-named-asset-import'),
    {
      loaderMap: {
        svg: {
          ReactComponent:
            '@svgr/webpack?-svgo,+titleProp,+ref![path]',
        },
      },
    },
  ],
  // 此处添加: 按需引入 antd
  [
    require.resolve('babel-plugin-import'),
    {
      libraryName: 'antd',
      "libraryDirectory": "es",
      style: true
    }
  ]
  // 添加结束
],
...
自定义主题
...
if (preProcessor) {
  loaders.push(
    {
      loader: require.resolve('resolve-url-loader'),
      options: {
        sourceMap: isEnvProduction && shouldUseSourceMap,
      },
    },
    {
      loader: require.resolve(preProcessor),
      options: {
        sourceMap: true,
      },
    }
  );
}
// 此处添加: 自定义主题
if (preProcessor && preProcessor === 'less-loader') {
  loaders.push(
    {
      loader: require.resolve('resolve-url-loader'),
      options: {
        sourceMap: isEnvProduction && shouldUseSourceMap
      }
    },
    {
      loader: require.resolve(preProcessor),
      options: {
        sourceMap: true,
        javascriptEnabled: true,
        modifyVars: {
          'primary-color': '#ff4757',
          'link-color': '#ff4757',
          'border-radius-base': '2px',
        }
      }
    }
  );
}
// 添加结束
return loaders;
...
antd 样式变量

此后, 我们无需在任何地方引入 antd 的 css 文件!




修改端口：script/start.js 



配置根路径 src ==> @
webpack.config.js
 alias: {
  // Support React Native Web
  // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
  'react-native': 'react-native-web',
  //配置根路径
  '@': path.resolve('src'),
  // Allows for better profiling with ReactDevTools
  ...(isEnvProductionProfile && {
    'react-dom$': 'react-dom/profiling',
    'scheduler/tracing': 'scheduler/tracing-profiling',
  }),
  ...(modules.webpackAliases || {}),
},














