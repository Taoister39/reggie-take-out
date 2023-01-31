import {
  Button,
  ConfigProvider,
  Image,
  Input,
  Space,
  Table,
} from "antd";
import styles from "./index.module.scss";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import noImg from "@/assets/noImg.png";

const DishesManage = () => {
  /**
   * @type {import("antd").TableProps['columns']}
   * ! 表格列配置，基本的内容武胜标题，数据索引键
   */
  const tableColumns = [
    {
      title: "菜品名称",
      dataIndex: "name",
    },
    {
      title: "图片",
      dataIndex: "image",
      // 函数第一个参数是数据传递的值，返回的内容将作为组件渲染内容
      render(image) {
        return <Image height={40} src={image} fallback={noImg} />;
      },
    },
    {
      title: "菜品分类",
      dataIndex: "categoryName",
    },
    {
      title: "售价",
      dataIndex: "price",
      render(price) {
        return "￥ " + price / 100;
      },
    },
    {
      title: "售卖状态",
      dataIndex: "status",
      render(status) {
        if (status === 1) {
          return "在售";
        }
        return "售空";
      },
    },
    {
      title: "最后操作时间",
      dataIndex: "updateTime",
    },
    {
      title: "操作",
      // 标题居中
      align: "center",
      // 160px宽度
      width: 160,
      render() {
        return (
          <Space>
            <Button type="link">修改</Button>
            <Button type="link">停售</Button>
            <Button type="link" danger>
              删除
            </Button>
          </Space>
        );
      },
    },
  ];
  // 表格数据，对象的属性对应着tableColumns的dataIndex
  const tableDatas = [
    {
      id: "1413384757047271425",
      name: "王老吉",
      categoryId: "1413341197421846529",
      price: 500,
      code: "",
      image: "00874a5e-0df2-446b-8f69-a30eb7d88ee8.png",
      description: "",
      status: 1,
      sort: 0,
      createTime: "2021-07-09 14:29:20",
      updateTime: "2021-07-12 09:09:16",
      createUser: "1",
      updateUser: "1",
      flavors: [],
      categoryName: "饮品",
      copies: null,
    },
    {
      id: "1413385247889891330",
      name: "米饭",
      categoryId: "1413384954989060097",
      price: 200,
      code: "",
      image: "ee04a05a-1230-46b6-8ad5-1a95b140fff3.png",
      description: "",
      status: 1,
      sort: 0,
      createTime: "2021-07-09 14:31:17",
      updateTime: "2021-07-11 16:35:26",
      createUser: "1",
      updateUser: "1",
      flavors: [],
      categoryName: "主食",
      copies: null,
    },
  ];
  return (
    <div className={styles["dishes-manage"]}>
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
        <Space>
          <Button type="link" danger>
            批量删除
          </Button>
          <Button type="link">批量启售</Button>
          <Button type="link" danger>
            批量停产
          </Button>
          {/* 点击时前端路由切换，注意这里是相对路径 */}
          <Link to="./adddishes">
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
        </Space>
      </div>
      <Table
        // 配置项
        columns={tableColumns}
        // 数据
        dataSource={tableDatas}
        // 分页器
        pagination={{
          position: ["bottomCenter"],
          current: 1, // 当前页数
          pageSize: 10, // 每页数量
          showTotal(total) {
            return <>共 {total} 条</>;
          },
          total: 100, // 数据总数
          pageSizeOptions: ["10", "20", "30", "40"], // 指定每页可以选多少数量
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

export default DishesManage;
