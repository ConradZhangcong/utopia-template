/** https://vitejs.dev/config/ */

import { defineConfig, normalizePath } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import autoprefixer from "autoprefixer";
import viteEslint from "vite-plugin-eslint";
import viteStylelint from "@amatlash/vite-plugin-stylelint";

const resolvePath = (p) => path.resolve(__dirname, p);

// 全局 scss 文件的路径
// 用 normalizePath 解决 window 下的路径问题
const variablePath = normalizePath(resolvePath("/src/styles/variable.scss"));

export default defineConfig({
  plugins: [react(), viteEslint(), viteStylelint({ exclude: /node_modules/ })],
  css: {
    modules: {
      // 一般我们可以通过 generateScopedName 属性来对生成的类名进行自定义
      // 其中，name 表示当前文件名，local 表示类名
      generateScopedName: "[name]__[local]___[hash:base64:5]",
    },
    preprocessorOptions: {
      scss: {
        // additionalData 的内容会在每个 scss 文件的开头自动注入
        additionalData: `@import "${variablePath}";`,
      },
    },
    postcss: {
      plugins: [
        autoprefixer({
          // 指定目标浏览器
          overrideBrowserslist: ["Chrome > 40", "ff > 31", "ie 11"],
        }),
      ],
    },
  },
  resolve: {
    // 别名配置
    alias: {
      "@components": resolvePath("src/components"),
      "@utils": resolvePath("src/utils"),
    },
  },
  server: {
    host: "0.0.0.0",
  },
});
