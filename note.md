# 使用构建工具

**Vite**
优点：

1. 构建速度快
2. 使用 es 模块

使用命令

```
yarn create vite
```

打开 vscode

```
code .
```

下载依赖后，然后会生成一个 node_modules 文件夹

**所有的包导入会尝试在此文件夹下查找**

```
yarn # 下载依赖
yarn dev # 启动构建工具
```

# 项目文件

项目的入口在 main.jsx 中

一般应用会写在 App.jsx 文件

1. 单页管理 -> 组件直接作为 App 组件的子组件
2. 多页管理 -> 前端路由匹配

assets 文件夹，放置图片文件

# 前端路由

Router 组件的 path 对应浏览器地址栏的路径

然后渲染对应的 element 元素

```jsx
<BrowserRouter>
  {/* 路由组，因为路由匹配不能单独使用 */}
  <Routes>
    {/* 浏览器输入的对应path地址，会展示为对应的element里的组件 */}
    <Route path="/" element={<LayoutView />} />
    <Route path="/login" element={<Login />} />
  </Routes>
</BrowserRouter>
```

> 浏览器地址为 / ，渲染 LayoutView 组件
>
> 浏览器地址为 /login ，渲染 Login 组件

**多页管理核心思想**

一个 pages 文件夹下的组件视为一个页面

# 路由嵌套

**代码**

```jsx
<Route path="/" element={<LayoutView />}>
  {/* 子路由 */}
  <Route index element={<StaffManage />} />
</Route>
```

> _子路由应该怎么使用呢？_

在`<LayoutView />`组件中使用`<Outlet />`组件，**本行代码**直接代表`<StaffManage />`组件渲染的结果，通过**子路径**的不同，切换不同的组件。

**同时**，path 的路径呈现父子关系。

# CSS Module 语法

当类名不需要被 hash 时，可以使用`:global()`伪类，这样类名和非 css module 一致。

```css
:gloabl(.ant-menu-item:last-child) {
  margin-bottom: 0;
}
```

等价 css 原生

```css
.ant-menu-item:last-child {
  margin-bottom: 0;
}
```

# 获取当前浏览器 url 地址

使用`useLocation`函数会返回和`window.location`很像的对象，但其中还包括了 state 和 key，用于页面数据传递和唯一页面信息，重要的是使用不会发送网络请求（前端路由）。

```json
{
  "pathname": "/staff",
  "search": "",
  "hash": "",
  "state": null,
  "key": "54vgqa8h"
}
```

**pathname**属性可以帮助我们找到浏览器 url 地址，这样我们再通过字符串分割 _/_ 符号，以捕获路径层次。
