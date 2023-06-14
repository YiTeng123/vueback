
/**
 * @install
 * vue3应该装router4版本
 * npm install vue-router@4
 *
 */

//引入路由对象
import { createRouter, createWebHistory, createWebHashHistory, createMemoryHistory, RouteRecordRaw, useRoute } from 'vue-router'
const routes: Array<RouteRecordRaw> = [{
    path: '/',
    // component: () => import('../view/login.vue'),
    redirect: to => {
        // 方法接收目标路由作为参数
        // return 重定向的字符串路径/路径对象,这里需略过compoent配置项
        return { path: '/ecq_login' }
    },
},
{
    path: '/ecq_login',
    name: 'ecq_login',
    component: () => import('../view/newlogin/index.vue')

},
{
    path: '/index',
    name: 'index',
    component: () => import('../view/index/index.vue')

},
{
    path: '/backstage',
    name: 'backstage',
    component: () => import('../view/main.vue'),
    redirect: to => {
        // 方法接收目标路由作为参数
        // return 重定向的字符串路径/路径对象,这里需略过compoent配置项
        return { path: '/backstage/index' }
    },
    children: [
        {
            // 数据总览
            path: 'general',
            name: 'general',
            component: () => import('../view/general/general'),
            meta: {
                title: '数据总览',
                path: '/backstage/general',
                name: 'general',
                close: false,
                icon:'Menu' 
            }
        },
        {
            // 数据图表
            path: 'generalApi',
            name: 'generalApi',
            component: () => import('../view/generalApi/genenarMain'),
            meta: {
                title: '数据图表',
                path: '/backstage/generalApi',
                name: 'generalApi',
                close: false,
                icon:'Menu' 
            }
        },
        // 使用动态路由参数匹配相应的报告组件
        {
            path: 'general/:methods',
            name: 'report',
            component: () => import('../view/general/personReport/personReport'),
        },
        {
            path: 'generalApi/:methodsApi',
            name: 'reportApi',
            component: () => import('../view/generalApi/personReport/personReport'),
        },
        {
            // 脑电检测
            path: 'eegdetection',
            name: 'eegdetection',
            component: () => import('../view/eegdetection/eegdetection.vue')
        },

        {
            // 专家建议
            path: 'expert',
            name: 'expert',
            component: () => import('../view/expert/expert.vue')
        },
        {
            // 表情检测
            path: 'express',
            name: 'express',
            component: () => import('../view/express/express'),
            meta: {
                title: '表情检测',
                path: '/backstage/express',
                name: 'express',
                close: false,
                icon:'Menu' 
            }
        },
        {
            // 步态检测
            path: 'gait',
            name: 'gait',
            component: () => import('../view/gait/gait'),
            meta: {
                title: '步态检测',
                path: '/backstage/gait',
                name: 'gait',
                close: false,
                icon:'Menu' 
            }
        },
        {
            // 首页
            path: 'index',
            name: 'index',
            component: () => import('../view/index/index.vue'),
            meta: {
                title: '首页',
                path: '/backstage/index',
                name: 'index',
                close: false,
                icon: 'HomeFilled'

            },
        },
        {
            // 学校报告
            path: 'result',
            name: 'result',
            component: () => import('../view/schoolResult/result'),
            meta: {
                title: '学校报告',
                path: '/backstage/result',
                name: 'result',
                close: false,
                icon:'Menu' 

            }
        },
        {
            // 班级报告
            path: 'classResult',
            name: 'classResult',
            component: () => import('../view/classResult/result'),
            meta: {
                title: '班级报告',
                path: '/backstage/classResult',
                name: 'classResult',
                close: false,
                icon:'Menu' 
            }
        },
        {
            // 年级报告
            path: 'gradeResult',
            name: 'gradeResult',
            component: () => import('../view/gradeResult/result'),
            meta: {
                title: '年级报告',
                path: '/backstage/gradeResult',
                name: 'gradeResult',
                close: false,
                icon:'Menu' 
            }
        },
        {
            // 用户管理
            path: 'user',
            name: 'user',
            component: () => import('../view/user/user.vue')
        },
        {
            // 声音检测
            path: 'voice',
            name: 'voice',
            component: () => import('../view/voice/voice'),
            meta: {
                title: '声音检测',
                path: '/backstage/voice',
                name: 'voice',
                close: false,
                icon:'Menu' 
            }
        },
        {
            // 账户管理
            path: 'account',
            name: 'account',
            component: () => import('../view/account/account.vue')
        },
        {
            path: 'game',
            name: 'game',
            component: () => import('../view/game/game.vue')
        }

    ]
}
]



const router = createRouter({
    history: createWebHistory(),
    routes
})

declare module 'vue-router' {
    interface RouteMeta {
        title: string,
        path: string;
        name: string;
        close: boolean;
        icon: string
    }
}

//导出router
export default router