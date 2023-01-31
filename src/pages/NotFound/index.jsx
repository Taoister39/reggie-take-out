import { Result } from "antd";
import { Link } from "react-router-dom";
// 404页
const NotFound = () => {
  // https://ant.design/components/result-cn#components-result-demo-404
  return (
    // ant-design显示反馈结果组件，内置可以用于404页面
    <Result
      status="404"
      title="404"
      subTitle="抱歉，未找到，因为页面不存在。"
      extra={<Link to="/">回到主页</Link>}
    />
  );
};

export default NotFound;
