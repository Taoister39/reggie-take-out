import { defineConfig } from "vite";
// react插件
import react from "@vitejs/plugin-react";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()], // 默认配置为react构建规则
  resolve: {
    alias: {
      // ! 配置别名，当构建工具识别到@就映射为src文件夹下
      "@": join(dirname(fileURLToPath(import.meta.url)), "src"),
      /**
       * ? import.meta.url 返回的是当前项目的绝对路径，为file协议，
       * ~ fileURLToPath函数将file协议路径转换成基本路径（没有前缀file://）
       * * dirname函数将路径去掉文件，只要文件夹那层。比如"/src/pages/StaffManage/index.jsx"，返回则是"/src/pages/StaffManage"
       * & join函数则是将路径合并，比如"/src"和"pages"两个参数，返回"/src/pages"
       */
    },
  },
});
