import router from './'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { ElMessage } from 'element-plus'

// 头部蓝色的进度条
NProgress.configure({ showSpinner: false })
// 路由守卫
const whiteList = ['/ecq_login']
router.beforeEach((to, from, next) => {
    NProgress.start()
    if (sessionStorage.getItem('tokenTime') && new Date().getTime() < Number(sessionStorage.getItem('tokenTime'))) {
        if (sessionStorage.getItem('token')) {
            if (to.path === '/ecq_login') {
                next('/backstage')
            } else {
                next()
            }
        } else {
            if (whiteList.includes(to.path)) {
                next()
            } else {
                next('/ecq_login')
            }
        }
    }
    else {
        localStorage.clear()
        if (to.path === '/ecq_login') {
            next()
            ElMessage.error('token过期,请重新登录');
        }
        else next('/ecq_login')
    }
})
router.afterEach(()=>{
    NProgress.done()
})
