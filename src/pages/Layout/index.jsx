// ant-design组件
import { Button, Layout, Menu, Popconfirm, Space, Typography } from "antd";
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
import { useNavigate } from "react-router-dom";
// 布局视图组件，在这里将员工、分类等等功能作为子组件使
const LayoutView = () => {
  /**ant0design菜单组件的元素，这里的@type意思是让编辑器识别类型
   * @type {import("antd").MenuProps["items"]}
   */
  const menuItems = [
    { label: "员工管理", key: "staff", icon: <UserSwitchOutlined /> },
    { label: "分类管理", key: "classify", icon: <AppstoreOutlined /> },
    { label: "菜品管理", key: "dishes", icon: <CoffeeOutlined /> },
    {
      label: "套餐管理",
      key: "combo",
      icon: <GiftOutlined />,
    },
    {
      label: "订单管理",
      key: "details",
      icon: <BookOutlined />,
    },
  ];
  // 返回一个函数，这个函数可以改变浏览器url地址（切换前端路由，不发送请求）
  const navigate = useNavigate();

  return (
    // https://ant.design/components/layout-cn
    // ant-design布局组件，方便快速布局视图
    <Layout className={styles["layout-view"]}>
      {/*左边 - 侧边栏《 包含log和菜单栏  */}
      <Layout.Sider>
        {/* styles.logo和styles["logo"]完全一致，但点运算符只能表示字母的属性 */}
        {/* 上边 - 一个logo */}
        <div className={styles.logo} />
        {/* 下边 - 菜单栏，由items pro的值生成菜单项 */}
        <Menu items={menuItems} mode="inline" theme="dark" />
      </Layout.Sider>
      {/* 右边 */}
      <Layout>
        {/* 上边 - 头部栏，包含当前页信息，退出登录 */}
        <Layout.Header className={styles.header}>
          {/* 文字排版组件 */}
          <Typography.Title level={5} className={styles.title}>
            员工管理
          </Typography.Title>
          <div>
            <Typography.Text type="success">管理员</Typography.Text>
            <Button type="link">
              {/* 气泡确认框，子组件为显示内容，由父组件prop完成确认框点击显示内容 */}
              <Popconfirm
                title="确认是否退出"
                // 点击确认时的事件
                onConfirm={() => {
                  navigate("/login");
                }}
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
          <div
            style={{ background: "white", height: "300px", padding: "20px" }}
          >
            内容还没有
          </div>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

// 导出此自定义组件
export default LayoutView;
