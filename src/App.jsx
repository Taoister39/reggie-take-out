import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// 导入ant-design的css样式，导入css相当于html加载css样式，由构建工具完成此实现
import "antd/dist/reset.css";
// 布局视图
import LayoutView from "@/pages/Layout";
// 登录组件
import Login from "@/pages/Login";
// 员工管理
import StaffManage from "@/pages/StaffManage";
// 分类管理
import ClassifyManage from "@/pages/ClassifyManage";
import AddStaff from "@/pages/StaffManage/AddStaff";

function App() {
  return (
    // 启用全局路由模式，以渲染router组件，和hash-router区别在于url不会有*符号
    <BrowserRouter>
      {/* 路由组，因为路由匹配不能单独使用 */}
      <Routes>
        {/* 浏览器输入的对应path地址，会展示为对应的element里的组件 */}
        <Route path="/" element={<LayoutView />}>
          {/* 子路由 - index prop 代表着和父路由同样路径 */}
          <Route index element={<Navigate to="/staff" />} />
          <Route path="/staff">
            <Route index element={<StaffManage />} />
            <Route path="addstaff" element={<AddStaff />} />
          </Route>
          <Route path="/classify" element={<ClassifyManage />} />
        </Route>
        <Route path="/login" element={<Login />} />
        {/* 当除/或login开头的路由都不匹配时，前端导航到登录 */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
