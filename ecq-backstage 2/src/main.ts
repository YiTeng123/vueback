import { createApp } from 'vue'
import "@/style/index.scss"
import "@/style/conmon.scss";
import './style.css'
import App from './App'
import router from './router'
// 引入路由守卫
import './router/permission'
// 引入tailwindcss来预检，初始化样式，但必须放在element之前，否则会覆盖按钮样式
import './tailwind/tailwind.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 引入全局状态管理，pinia持久化
import {createPinia} from 'pinia'
import {usePersist} from 'pinia-use-persist'
import Component from '@/components/component'
const store = createPinia()
store.use(usePersist)
// 引入element黑暗
import "element-plus/theme-chalk/dark/css-vars.css";


// 注册所有的element icon
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import * as echarts from 'echarts'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.component('Component',Component)

app.use(router).use(store).use(ElementPlus)

router.isReady().then(() => app.mount('#app'))

const body = document.documentElement as HTMLElement;
body.setAttribute("class", "dark");
