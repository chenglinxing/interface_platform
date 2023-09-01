import { defineConfig } from 'vite';

import { viteMockServe } from 'vite-plugin-mock'



import vue from '@vitejs/plugin-vue';
import path from "path"

const resolve = (p) => path.resolve(__dirname, p)
console.log(__dirname, 'd')
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // viteMockServe({
  //   supportTs: true, //是否读取ts文件模块，设置为true时不能读取js文件
  //   logger: true, //是否在控制台显示请求日志
  //   mockPath: "./mock/"   // 注意：此时的 mockPath 地址是真正安装的 mock 文件夹的地址;
  // })],
  resolve: {
    alias: {
      "@": resolve("src")
    }
  }
})
