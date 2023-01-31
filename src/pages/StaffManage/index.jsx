import {
  Button,
  ConfigProvider,
  Input,
  Popconfirm,
  Space,
  Table,
  message,
} from "antd";
import styles from "./index.module.scss";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import request from "@/utils/request";

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
            return "禁用";
        }
      },
    },
    {
      // 本列160px宽度
      width: 160,
      // 标题居中
      align: "center",
      title: "操作",
      render(_, record) {
        return (
          <Space>
            <Link to="./addstaff" state={record}>
              <Button type="link">编辑</Button>
            </Link>
            <Popconfirm
              title="确定要禁用吗"
              onConfirm={() => disabledStaff(record.id, record.status)}
            >
              <Button type="link" danger>
                {record.status === 1 ? "禁用" : "启用"}
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  /**
   * table - 数据，属性对应着tableColumns的dataIndex作为渲染组件
   */
  const [tableData, setTableData] = useState([
    {
      key: 1,
      name: "管理员",
      username: "admin",
      status: 1,
      phone: "13012121212",
    },
  ]);
  // 页面 State，用于配置分页器组件
  const [page, setPage] = useState({
    page: 1, // 当前页，默认为1
    pageSize: 2, // 默认每页大小为2
  });
  // 页面总数 State ，默认值 0
  const [total, setTotal] = useState(0);
  // 搜索过滤，员工姓名 State
  const [name, setName] = useState("");
  // 组件加载完毕时触发第一个参数函数，获取后端员工数据列表
  useEffect(() => {
    // 立即执行函数表达式，因为useEffect第一个参数必须是同步函数，
    // 那么需要在里面套一层异步函数才能使用await语法
    (async () => {
      const response = await request.get("employee/page", {
        params: { ...page, name },
      });
      // 数据
      const data = response.data.data;
      // 列表总数
      setTotal(data.total);
      const pageData = data.records;
      // 因为后端数据传过来没有key属性，那么需要在数组增加一个key属性，解决控制台报警告
      setTableData(pageData.map((item, index) => ({ key: index, ...item })));
    })();
    // 当page的值（对象引用）改变时，会重新触发useEffect第一个参数函数
  }, [page]);
  // 禁用员工
  const disabledStaff = async (id, status) => {
    // 目标的状态，和现在的相反
    const changeStatus = status === 0 ? 1 : 0;
    await request.put("/employee", {
      id,
      status: changeStatus,
    });
    message.success(status ? "禁用成功" : "启用成功");
    // 返回值一样，但引用不同的对象，刷新员工数据列表Effect
    setPage((state) => ({ ...state }));
  };

  return (
    <div className={styles["staff-manage"]}>
      <div className={styles["top-bar"]}>
        <Input
          // 有了value和onChange，这是一个受控组件，输入时触发onChange
          // State绑定至value，变量值即为输入框内容
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
          // 当按下回车键时刷新员工数据列表Effect
          onPressEnter={() => setPage((state) => ({ ...state }))}
          placeholder="请输入员工姓名"
          // 输入框前面放组件
          prefix={
            // 搜索图标，点击时触法事件，同时css样式作为鼠标指针可点击提示
            <SearchOutlined
              onClick={() => setPage((state) => ({ ...state }))}
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
          current: page.page, // 当前页数
          pageSize: page.pageSize, // 每页数量
          showTotal(total) {
            return <>共 {total} 条</>;
          },
          total: total, // 数据总数
          pageSizeOptions: [2, 10], // 指定每页可以选多少数量
          showQuickJumper: true, // 可以显示跳转
          showSizeChanger: true, // 显示可以显示切换每页数据量
          // 页面切换时
          onChange(page, pageSize) {
            setPage({ page, pageSize });
          },
        }}
      />
    </div>
  );
};

export default StaffManage;
