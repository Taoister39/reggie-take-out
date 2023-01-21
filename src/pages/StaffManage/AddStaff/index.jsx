import { Link } from "react-router-dom";
import styles from "./index.module.scss";

import {
  Button,
  ConfigProvider,
  Divider,
  Form,
  Input,
  Radio,
  Space,
} from "antd";
// 添加员工
const AddStaff = () => {
  // 表单提交时
  const onFinish = (params) => {
    // 打印提交的内容
    console.log(params);
  };

  return (
    <div className={styles["add-staff"]}>
      {/* 模态框主体 */}
      {/* Form组件是基于珊格布局，可以对其设置行列要求 */}
      {/* labelCol表示 标签所占珊格数，wrapperCol表示 表单域里组件所占珊格数 */}
      <Form onFinish={onFinish} labelCol={{ span: 3 }} wrapperCol={{ span: 5 }}>
        {/* 表单域 */}
        <Form.Item label="账号" name="username">
          <Input placeholder="请输入账号" />
        </Form.Item>
        <Form.Item label="员工姓名" name="name">
          <Input placeholder="请输入员工姓名" />
        </Form.Item>
        <Form.Item label="手机号" name="phone">
          <Input placeholder="请输入手机号" />
        </Form.Item>
        <Form.Item name="sex" label="性别">
          {/* 副色主题 */}
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#ffc200",
              },
            }}
          >
            {/* 单选框 */}
            <Radio.Group>
              <Radio value={1}>男</Radio>
              <Radio value={2}>女</Radio>
            </Radio.Group>
          </ConfigProvider>
        </Form.Item>
        <Form.Item label="身份证号" name="idNumber">
          <Input placeholder="请输入身份证号" />
        </Form.Item>
        <Divider />
        {/* 主体底部有三个按钮 */}
        <div className={styles["submit-view"]}>
          <Space size="large">
            {/* 返回父路径，点击时触法，渲染是一个a标签  */}
            <Link to="../">
              <Button>取消</Button>
            </Link>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
            {/* 副主题色 */}
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#333333",
                },
              }}
            >
              <Button type="primary">保存并继续添加</Button>
            </ConfigProvider>
          </Space>
        </div>
      </Form>
    </div>
  );
};

export default AddStaff;
