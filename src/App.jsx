import { BrowserRouter, Route, Routes } from "react-router-dom";
// 导入ant-design的css样式，导入css相当于html加载css样式，由构建工具完成此实现
import "antd/dist/reset.css";
// 布局视图
import LayoutView from "./pages/Layout";
// 登录组件
import Login from "./pages/Login";

function App() {
  return (
    // 启用全局路由模式，以渲染router组件，和hash-router区别在于url不会有*符号
    <BrowserRouter>
      {/* 路由组，因为路由匹配不能单独使用 */}
      <Routes>
        {/* 浏览器输入的对应path地址，会展示为对应的element里的组件 */}
        <Route path="/" element={<LayoutView />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
