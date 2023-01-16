# 项目介绍
**瑞吉外卖 管理员前端系统**
> 项目来源自[B站视频 - 黑马程序员]( https://www.bilibili.com/video/BV13a411q753/?share_source=copy_web&vd_source=bb5f5798f55c369e64de4f2cf0239c85)

原本视频里是前后端不分离的Spring Boot项目，本次实现前端分离作为学习。同时用React + Ant-Design来重写

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
## 路由，基本UI创建 版本
- 使用了react-router对单页应用视为多页管理
- 使用了Ant-Design提供的组件，节省手写html元素
- 使用了sass，方便扩展选择器和变量应用


目前存在的问题
1. 导入语法使用相对路径，如../../这样的引用，并不直观路径在哪。我们需要配置路径别名，比如@/代表是src/路径下的文件
2. 登录和主页并没有请求后端
3. 主页需要鉴权，比如没有登录却输入浏览器url到/路径，可以正常进入