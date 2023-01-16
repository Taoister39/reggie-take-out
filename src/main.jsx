import React from "react";
import ReactDOM from "react-dom/client";
// 主应用组件
import App from "./App";
// 加载全局的css样式
import "./index.css";
// 创建一个根，可以渲染react组件。参数传入为一个html dom节点，所有渲染的组件所生成的dom节点都会挂在此处
const root = ReactDOM.createRoot(document.getElementById("root"));
// 根需要渲染的组件，最终会生成dom节点（html元素）
root.render(
  // react严格模式，检查react特性
  <React.StrictMode>
    {/* 主应用组件 */}
    <App />
  </React.StrictMode>
);
