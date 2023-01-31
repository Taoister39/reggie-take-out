// ant-design组件
import {
  Breadcrumb,
  Button,
  Layout,
  Menu,
  Popconfirm,
  Space,
  Typography,
  message,
} from "antd";
// ant-design图标
import {
  AppstoreOutlined,
  BookOutlined,
  CoffeeOutlined,
  GiftOutlined,
  LoginOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
// 引入scss（sass），最终都会编译成css样式。这里使用了css模块，每个编译后的css类名都会根据文件路径不同哈希化前缀名
// 避免了两个文件写同类名但样式不同会合并样式，编译后会是两个不同css类名，所有由构建工具完成。
import styles from "./index.module.scss";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import request from "@/utils/request";
import { useState } from "react";
import { getUserinfo } from "@/utils/userinfo";
// 布局视图组件，在这里将员工、分类等等功能作为子组件使
const LayoutView = () => {
  /**ant0design菜单组件的元素，这里的@type意思是让编辑器识别类型
   * @type {import("antd").MenuProps["items"]}
   */
  const menuItems = [
    {
      // ! Link组件是前端路由的，渲染结果是一个a标签，点击跳转浏览器 url
      // ! label属性可以是react组件，并不局限在文本。https://ant.design/components/menu-cn#itemtype
      label: <Link to="/staff">员工管理</Link>,
      key: "staff",
      icon: <UserSwitchOutlined />,
    },
    {
      label: <Link to="/classify">分类管理</Link>,
      key: "classify",
      icon: <AppstoreOutlined />,
    },
    {
      label: <Link to="/dishes">菜品管理</Link>,
      key: "dishes",
      icon: <CoffeeOutlined />,
    },
    {
      label: <Link to="/combo">套餐管理</Link>,
      key: "combo",
      icon: <GiftOutlined />,
    },
    {
      label: <Link to="/details">订单管理</Link>,
      key: "details",
      icon: <BookOutlined />,
    },
  ];
  // 返回一个函数，这个函数可以改变浏览器url地址（切换前端路由，不发送请求）
  const navigate = useNavigate();
  // 路径表
  const pathMap = {
    staff: "员工管理",
    addstaff: "添加或编辑员工",
    adddishes: "添加菜品",
    classify: "分类管理",
    dishes: "菜品管理",
    combo: "套餐管理",
    details: "订单管理",
  };
  // 由于本来的location对象改变url会重新发送html文件请求
  // 因此使用前端路由修改的location对象
  const location = useLocation();
  // 将当前url中的 / 符号分割成字符串数组
  const breadPaths = location.pathname.split("/");
  // 第一个不要，因为分割时 第一个/ 左边为空字符串
  breadPaths.shift();
  // 退出登录
  const onLogout = async () => {
    // 因为不需要用返回值，所以直接兑现异步期约对象
    await request.post("/employee/logout");
    // 如果上面网络请求有问题会抛出异常，后面函数体不会值星
    message.success("退出登录成功");
    // 返回登录页
    navigate("/login");
  };
  // 用户信息视为State（状态）
  const [userinfo, setUserinfo] = useState(getUserinfo());
  // 每次重新渲染的时候，这个变量会更新，那么url第一个路径就是我们选择的菜单项
  const selectedKey = breadPaths[0];

  return (
    // https://ant.design/components/layout-cn
    // ant-design布局组件，方便快速布局视图
    <Layout className={styles["layout-view"]}>
      {/*左边 - 侧边栏《 包含log和菜单栏  */}
      <Layout.Sider className={styles.slider}>
        {/* styles.logo和styles["logo"]完全一致，但点运算符只能表示字母的属性 */}
        {/* 上边 - 一个logo */}
        <div className={styles.logo} />
        {/* 下边 - 菜单栏，由items pro的值生成菜单项 */}
        <Menu
          items={menuItems}
          mode="inline"
          theme="dark"
          selectedKeys={[selectedKey]}
          className={styles["my-menu"]}
        />
      </Layout.Sider>
      {/* 右边 */}
      <Layout>
        {/* 上边 - 头部栏，包含当前页信息，退出登录 */}
        <Layout.Header className={styles.header}>
          {/* 文字排版组件 */}
          {/* <Typography.Title level={5} className={styles.title}> */}
          {/* 员工管理 */}
          <Breadcrumb>
            {/* 使用分割出来的数组，映射为一个新的数组 */}
            {/* 这个数组都是组件渲染，react会自动将数组（可迭代对象）展开渲染 */}
            {breadPaths.map((item, index) => (
              <Breadcrumb.Item key={index}>
                {/* slice方法是将数组元素切割（只要一部分数组），返回一个新数组，然后将每项拼接为/间隔字符串 */}
                <Link to={breadPaths.slice(0, index + 1).join("/")}>
                  {pathMap[item]}
                </Link>
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
          {/* </Typography.Title> */}
          <div>
            <Typography.Text type="success">{userinfo.name}</Typography.Text>
            <Button type="link">
              {/* 气泡确认框，子组件为显示内容，由父组件prop完成确认框点击显示内容 */}
              <Popconfirm
                title="确认是否退出"
                // 点击确认时的事件
                onConfirm={onLogout}
                // 确认按钮的文字内容
                okText="确认"
                // 取消按钮的文字内容
                cancelText="取消"
              >
                {/* 间距组件，子组件之间会有空隙。这是一个inline（行内）元素*/}
                <Space>
                  <LoginOutlined />
                  退出
                </Space>
              </Popconfirm>
            </Button>
          </div>
        </Layout.Header>
        {/*下边 - 展示具体功能内容 */}
        <Layout.Content className={styles.content}>
          {/* 渲染子路由匹配的组件 */}
          {/* prop context则是子路由传递的数据（非路由跳转） */}
          <Outlet context={[userinfo, setUserinfo]} />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

// 导出此自定义组件
export default LayoutView;
