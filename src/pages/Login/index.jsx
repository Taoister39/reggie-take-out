import { Button, Card, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
// 引入scss（sass），最终都会编译成css样式。这里使用了css模块，每个编译后的css类名都会根据文件路径不同哈希化前缀名
// 避免了两个文件写同类名但样式不同会合并样式，编译后会是两个不同css类名，所有由构建工具完成。
import styles from "./index.module.scss";
// 这里导入的值是一个路径字符串，由构建工具完成，`方便直接当变量引入如html img的src值
import logoImg from "@/assets/login/logo.png";
import coverImg from "@/assets/login/login-l.png";

const Login = () => {
  // 返回一个函数，此函数可以更改浏览器url
  const navigate = useNavigate();
  // 表单提交时的事件
  const onFinish = (params) => {
    navigate("/");
  };

  return (
    // 这个容器主要是将元素铺满屏幕宽度，让背景色看起来是全部屏幕
    <div className={styles["login-view"]}>
      {/* 视口定位，让元素在浏览器中心 */}
      <div className={styles["login-card"]}>
        {/* 左边 - 封面 */}
        <img src={coverImg} className={styles["login-cover"]} />
        {/* 右边 - 表单 */}
        <Card>
          <img src={logoImg} className={styles["title-logo"]} />
          <Form onFinish={onFinish}>
            {/* Form.Item是表单域。用于统一样式风格，还有输入name prop后监视子组件值，提交时会携带此name值对应属性 */}
            <Form.Item name="username">
              {/* prefix是当前组件前面会有什么元素，比如用户图标 */}
              <Input placeholder="请输入管理账号" prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item name="password">
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="请输入密码"
              />
            </Form.Item>
            <Form.Item>
              {/* block相当于应用display:block。htmlType prop是在html中的type属性值。这里为submit。会触发表单提交事件（onFinish） */}
              <Button type="primary" block htmlType="submit">
                登录
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};
// 导出此自定义组件
export default Login;
