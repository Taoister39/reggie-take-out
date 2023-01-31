import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./index.module.scss";

import {
  Button,
  ConfigProvider,
  Divider,
  Form,
  Input,
  Radio,
  Space,
  message,
} from "antd";
import { useEffect } from "react";
import request from "@/utils/request";
import { useState } from "react";
// 添加员工
const AddStaff = () => {
  // 表单提交时
  const onFinish = async (params) => {
    // 打印提交的内容
    // console.log(params);
    // 如果请求发生错误会抛出异常
    await request.post("employee", params);
    message.success(edit ? "修改成功" : "新增成功");
    // 调用接口成功后，把表单输入框都重置为空，
    form.resetFields();
    // 不需要继续添加时，跳转上一级路由
    if (!isContinue) {
      navigate("..");
    }
  };
  // 如果是编辑数据的话，通过前端路由传递的数据进行设置表单项（监听输入框、单选框）的值
  const edit = useLocation().state;
  // 当组件加载完毕时，会调用第一个参数的函数
  useEffect(() => {
    // 如果没有的话，就是新增数据
    if (edit) {
      // 因为edit对象的 键名 对应着Form.Item prop name，值 对应着Form.Item监听的组件value
      form.setFieldsValue(edit);
      // 因为传递过来性别值是字符串，要转换成数字再设置
      form.setFieldValue("sex", Number(edit.sex));
    }
  });
  // Form组件的数据对象，包含组件的表单项的监听值设置
  const [form] = Form.useForm();
  // 是否是继续添加
  const [isContinue, setIsContinue] = useState(false);
  // 前端路由导航函数
  const navigate = useNavigate();

  return (
    <div className={styles["add-staff"]}>
      {/* 模态框主体 */}
      {/* Form组件是基于珊格布局，可以对其设置行列要求 */}
      {/* labelCol表示 标签所占珊格数，wrapperCol表示 表单域里组件所占珊格数 */}
      <Form
        // 当点击了html type submit按钮，同时通过了数据规则（Form.Item prop rules），会调用一个函数
        onFinish={onFinish}
        form={form} // 使用Form(实例)数据对象，没有会自动创建
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 5 }}
      >
        {/* 表单域 */}
        <Form.Item
          label="账号"
          name="username"
          rules={[
            // 本表单项必须是必填
            {
              required: true,
              message: "账号不能为空",
            },
          ]}
        >
          <Input placeholder="请输入账号" />
        </Form.Item>
        <Form.Item
          label="员工姓名"
          name="name"
          rules={[
            {
              required: true,
              message: "员工不能为空",
            },
          ]}
        >
          <Input placeholder="请输入员工姓名" />
        </Form.Item>
        <Form.Item
          label="手机号"
          name="phone"
          rules={[
            // 长度11位
            { len: 11, message: "长度必须是11位" },
            // 填写的值是数字
            { type: "number", message: "只能为数字" },
            {
              required: true,
              message: "手机号不能为空",
            },
          ]}
        >
          <Input placeholder="请输入手机号" />
        </Form.Item>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#ffc200",
            },
          }}
        >
          <Form.Item
            name="sex"
            label="性别"
            initialValue={1}
            rules={[
              {
                required: true,
                message: "性别不能为空",
              },
              // pattern是使用正则表达式匹配规则模式，这里意思是要么1或2
              { pattern: /^(1|2)$/, message: "错误" },
            ]}
          >
            {/* 副色主题 */}
            {/* 单选框 */}
            <Radio.Group>
              <Radio value={1}>男</Radio>
              <Radio value={2}>女</Radio>
            </Radio.Group>
          </Form.Item>
        </ConfigProvider>
        <Form.Item
          label="身份证号"
          name="idNumber"
          rules={[
            {
              required: true,
              message: "身份证号不能为空",
            },
            { len: 18, message: "身份证号不合法" },
          ]}
        >
          <Input placeholder="请输入身份证号" />
        </Form.Item>
        <Divider />
        {/* 主体底部有三个按钮 */}
        <div className={styles["submit-view"]}>
          <Space size="large">
            {/* 返回父路径，点击时触法，渲染是一个a标签  */}
            <Link to="..">
              <Button>取消</Button>
            </Link>
            <Button
              type="primary"
              // html的type属性为submit
              htmlType="submit"
              // 先触发点击事件
              // 然后触法表单提交事件
              // 设置不用继续提交状态
              onClick={() => setIsContinue(false)}
            >
              提交
            </Button>
            {/* 副主题色 */}
            {/* 如果不是修改数据的话可以继续添加 */}
            {!edit && (
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: "#333333",
                  },
                }}
              >
                <Button
                  type="primary"
                  // html的type属性为submit
                  htmlType="submit"
                  // 设置继续提交状态
                  onClick={() => setIsContinue(true)}
                >
                  保存并继续添加
                </Button>
              </ConfigProvider>
            )}
          </Space>
        </div>
      </Form>
    </div>
  );
};

export default AddStaff;
