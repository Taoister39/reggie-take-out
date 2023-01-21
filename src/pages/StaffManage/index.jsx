import { Button, ConfigProvider, Input, Space, Table } from "antd";
import styles from "./index.module.scss";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

// 员工管理
const StaffManage = () => {
  /**
   * @type {import("antd").TableProps["columns"]}
   * ^ 表格组件的第一行（标题），配置每列数据格式
   */
  const tableColumns = [
    { title: "员工姓名", dataIndex: "name" },
    { title: "账号", dataIndex: "username" },
    { title: "手机号", dataIndex: "phone" },
    {
      title: "账号状态",
      dataIndex: "status",
      render(status) {
        switch (status) {
          case 1:
            return "正常";
          case 0:
            return "非法";
        }
      },
    },
    {
      // 本列160px宽度
      width: 160,
      // 标题居中
      align: "center",
      title: "操作",
      render() {
        return (
          <Space>
            <Button type="link">编辑</Button>
            <Button type="link" danger>
              禁用
            </Button>
          </Space>
        );
      },
    },
  ];
  /**
   * @type {import("antd").TableProps["dataSource"]}
   * 数据，属性对应着tableColumns的dataIndex作为渲染组件
   */
  const tableData = [
    {
      key: 1,
      name: "管理员",
      username: "admin",
      status: 1,
      phone: "13012121212",
    },
  ];

  return (
    <div className={styles["staff-manage"]}>
      <div className={styles["top-bar"]}>
        <Input
          placeholder="请输入员工姓名"
          // 输入框前面放组件
          prefix={
            // 搜索图标，点击时触法事件，同时css样式作为鼠标指针可点击提示
            <SearchOutlined
              onClick={() => {
                console.log("点击了搜索图标");
              }}
              className={styles.icon}
            />
          }
          className={styles.search}
        />
        {/* 点击时前端路由切换，注意这里是相对路径 */}
        <Link to="./addstaff">
          {/* 使用副色调 */}
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#ffc200",
              },
            }}
          >
            <Button type="primary">
              <PlusOutlined />
              添加员工
            </Button>
          </ConfigProvider>
        </Link>
      </div>
      <Table
        // 配置
        columns={tableColumns}
        // 数据
        dataSource={tableData}
        // 分页器
        pagination={{
          position: ["bottomCenter"], // 组件位置
          current: 1, // 当前页数
          pageSize: 2, // 每页数量
          showTotal(total) {
            return <>共 {total} 条</>;
          },
          total: 100, // 数据总数
          pageSizeOptions: ["2"], // 指定每页可以选多少数量
          showQuickJumper: true, // 可以显示跳转
          // 页面切换时
          onChange: function () {
            console.log("页面切换了");
          },
        }}
      />
    </div>
  );
};

export default StaffManage;
