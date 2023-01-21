# 项目介绍

**瑞吉外卖 管理员前端系统**

> 项目来源自[B 站视频 - 黑马程序员](https://www.bilibili.com/video/BV13a411q753/?share_source=copy_web&vd_source=bb5f5798f55c369e64de4f2cf0239c85)

原本视频里是前后端不分离的 Spring Boot 项目，本次实现前端分离作为学习。同时用 React + Ant-Design 来重写

# 项目启动

```
npm install # 加载依赖
npm run dev # 启动构建工具
```

# 技术栈

- React
- Ant-Design UI
- Axios
- React-Router
- Vite
- Sass

# 学习记录

## 路由，基本 UI 创建 版本

- 使用了 react-router 对单页应用视为多页管理
- 使用了 Ant-Design 提供的组件，节省手写 html 元素
- 使用了 sass，方便扩展选择器和变量应用

目前存在的问题

1. 导入语法使用相对路径，如../../这样的引用，并不直观路径在哪。我们需要配置路径别名，比如@/代表是 src/路径下的文件
2. 登录和主页并没有请求后端
3. 主页需要鉴权，比如没有登录却输入浏览器 url 到/路径，可以正常进入

## 子路由、主题、别名、表格版本

### 项目基本结构

- **dist** - _构建后_
- **node_modules** - _node 模块（包）_
- **public** - _静态资源_
- **src** - _项目代码_
  - **assets** - _图片_
  - **pages** - _页面_
  - **utils** - _工具类_
  - **App.jsx** - _主应用_
  - **index.css** - _全局样式_
  - **main.jsx** - _项目入口_
- **index.html** - _构建工具打包模板_
- **jsconfig.json** - _vscode 解析 js 文件配置选项_
- **link.md** - _资源链接_
- **note.md** - _笔记_
- **package-lock.json** - _版本控制文件 npm_
- **package.json** - _node 项目描述文件_
- **README.md** - _项目说明_
- **vite.config.js** - _构建工具配置文件_
- **yarn.lock** - _版本控制文件 yarn_

### 配置别名

**给 Vite 构建工具配置别名后，解决了导入路径会有很多../问题**

```js
alias: {
 "@": join(dirname(fileURLToPath(import.meta.url)), "src")
},
```

此时，构建工具帮我们将@开头路径转换成项目的 src 开头路径

**这只是构建工具可以识别。vscode 还需要配置 jsconfig.json 作为 js 项目解析**

```json
// 给vscode编辑器做解析
{
  // 当js文件被解析处理时
  "compilerOptions": {
    // 基本路径是当前项目根目录
    "baseUrl": "./",
    // 路径别名
    "paths": {
      // @/开头下所有文件都映射为src/下所有文件
      "@/*": ["src/*"]
    }
  }
}
```

这样 vscode 就可以解析@/开头的路径了

### 子路由

**路由可以嵌套**

1. 方便前端路由路径呈现直观的父子关系
2. 方便根据 url 子路由组件渲染

### 主题

项目当种有两个主题色`#ffc200`和`#333333`，为了能方便复用这两个颜色，同时能和 ant-design 的设计结合，需要使用`ConfigProvider`组件，将我们的主色在**应用**当中配置。

同时，配置 ant-design UI 国际化为简体中文地区

### 表格组件

这次使用了面包屑、表格、分页器组件，面包屑来显示应用层级关系。

在 ant-design 的表格组件是个非常有效率的工具，根据**列配置项**来渲染**数据**，方便数据以 js 对象进行展示，避免手动循环遍历。同时包括了分页器，使得数据改变更为高效，将会在后面展示。

### 下一步

- 完成登录接口
- 使用 Axios 进行网络接口封装使用（栏截器、实例化）
- 完成菜品管理页面
- 404 页面
