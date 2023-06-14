



import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from "unplugin-auto-import/vite";
import vueJsx from '@vitejs/plugin-vue-jsx'
import path, { resolve } from 'path'
import { terser } from 'rollup-plugin-terser';


const pathResolve = (dir: string): any => {
  return resolve(__dirname, '.', dir)
}
// const alias: Record<string, string> = {
//   "@": pathResolve('src')
// }

// https://vitejs.dev/config/
export default defineConfig({
  // npm i @vitejs/plugin-vue-jsx -D  安装jsx
  plugins: [vue(),vueJsx(
    {
      babelPlugins: [
        ["@babel/plugin-proposal-decorators", { legacy: true }],
        ["@babel/plugin-proposal-class-properties", { loose: true }],
      ],
}
  ),AutoImport({
    // 自动导入vue相关的Api
    imports: ["vue"],   // 也支持vue-router、axios等
    // 声明文件的存放位置
    dts: 'auto-imports.d.ts',
  })],
  build: {
    rollupOptions: {
      plugins: [
        terser({
          compress: {
            drop_console: true // 去除 console.log()
          }
        })
      ]
    }
  }
,
  resolve: {
    alias: [
      {
          find: '@',
          replacement: resolve(__dirname, './src'),
      },
  ]
  },
  server: {
    host: '0.0.0.0'
  }
})

