import {BasicLayout, RouteView} from '@/layouts'

export const whiteList = [
    'login',
    '404'
]

/**
 * 根路由
 * @type {{path: string, component: *, children: [], meta: {}, name: string, key: string}}
 */
export const rootRouter = {
    key: '',
    path: '',
    name: 'root',
    component: 'BasicLayout',
    meta: {},
    children: []
}

/**
 * 未找到页面路由
 * @type {{redirect: string, path: string, hidden: boolean}}
 */
export const notFoundRouter = {
    path: '*',
    redirect: '/exception/404',
    meta: {
        isLogin: false,
        isMenu: false
    }
}

/**
 * 基础路由
 * 关键字：index,login,exception,404,redirect
 * @type {*[]}
 */
export const constantRouterMap = [
    {
        path: '/',
        name: 'index',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/user/login')
    },
    {
        path: '/exception',
        name: 'exception',
        component: RouteView,
        children: [
            {
                path: '404',
                name: '404',
                component: () => import('@/views/exception/404')
            }
        ]
    },
    {
        path: '/redirect/:name(.*)',
        component: RouteView,
        children: [
            {
                path: '',
                name: 'redirect',
                component: {
                    template: `<div></div>`,
                    created() {
                        const {params: {name}, query} = this.$route
                        this.$router.replace({
                            name,
                            query
                        })
                    }
                }
            }
        ]
    }
]
