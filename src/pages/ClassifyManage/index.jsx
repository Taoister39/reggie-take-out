import { Button, ConfigProvider, Form, Input, Modal, Space, Table } from "antd";
import styles from "./index.module.scss";
import { PlusOutlined } from "@ant-design/icons";

const ClassifyManage = () => {
  /**
   * @type {import("antd").TableProps['columns']}
   * ! 表格列配置，基本的内容武胜标题，数据索引键
   */
  const tableColumns = [
    {
      title: "分类名称",
      dataIndex: "name",
    },
    {
      title: "分类类型",
      dataIndex: "type",
      // 函数第一个参数是数据传递的值，返回的内容将作为组件渲染内容
      render(type) {
        if (type == 1) {
          return "菜品分类";
        }
        return "套餐分类";
      },
    },
    {
      title: "操作时间",
      dataIndex: "updateTime",
    },
    {
      title: "排序",
      dataIndex: "sort",
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
      key: 1,
      id: "1397844263642378242",
      type: 1,
      name: "湘菜",
      sort: 1,
      createTime: "2021-05-27 09:16:58",
      updateTime: "2021-07-15 20:25:23",
      createUser: "1",
      updateUser: "1",
    },
    {
      key: 2,
      id: "1397844303408574465",
      type: 1,
      name: "川菜",
      sort: 2,
      createTime: "2021-05-27 09:17:07",
      updateTime: "2021-06-02 14:27:22",
      createUser: "1",
      updateUser: "1",
    },
    {
      key: 3,
      id: "1397844391040167938",
      type: 1,
      name: "粤菜",
      sort: 3,
      createTime: "2021-05-27 09:17:28",
      updateTime: "2021-07-09 14:37:13",
      createUser: "1",
      updateUser: "1",
    },
    {
      key: 4,
      id: "1413342269393674242",
      type: 2,
      name: "商务套餐",
      sort: 5,
      createTime: "2021-07-09 11:40:30",
      updateTime: "2021-07-09 14:43:45",
      createUser: "1",
      updateUser: "1",
    },
  ];

  return (
    <div className={styles["classify-manage"]}>
      <div className={styles["top-bar"]}>
        <Space size="large">
          {/* 主题为副色调 */}
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#333333",
              },
            }}
          >
            <Button type="primary">
              {/* 加号图标 */}
              <PlusOutlined />
              新增菜品分类
            </Button>
          </ConfigProvider>
          <Button type="primary">
            <PlusOutlined />
            新增套餐分类
          </Button>
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
      {/* 模态框（对话框）组件 */}
      <Modal
        title="新增菜品分类"
        // 内容里的样式
        bodyStyle={{
          padding: "43px 90px 21px",
        }}
        // 可以把下面这一行注释取消掉，来体验一下模态框效果
        // open={true}
        // 底部渲染的组件
        footer={
          <div className={styles["modal-bar"]}>
            <Space>
              <Button>取消</Button>
              <Button type="primary">确定</Button>
              <ConfigProvider
                theme={{
                  token: { colorPrimary: "#66666" },
                }}
              >
                <Button type="primary">保存并继续添加</Button>
              </ConfigProvider>
            </Space>
          </div>
        }
      >
        {/* 模态框主体 */}
        {/* Form组件是基于珊格布局，可以对其设置行列要求 */}
        {/* labelCol表示 标签所占珊格数，wrapperCol表示 表单域里组件所占珊格数 */}
        <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
          {/* 表单域 */}
          <Form.Item label="分类名称" name="type">
            <Input placeholder="请输入分类名称" />
          </Form.Item>
          <Form.Item label="排序" name="sort">
            <Input placeholder="请输入排序" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ClassifyManage;
