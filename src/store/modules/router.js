/**
 * @Author: 孟祥涵
 * @Date: 2020-10-08
 * @Description: router.js
 */

import router from '@/router'
import axios from 'axios'
import {rootRouter, notFoundRouter} from '@/config/router'
import * as layouts from '@/layouts'

const state = {
    addRouters: [],
    menuList: [],
    indexRouter: {}
}

const getters = {
    menuList: state => state.menuList,
    indexRouter: state => state.indexRouter,
}

const mutations = {
    /**
     * 设置路由
     * @param state
     * @param routes
     * @constructor
     */
    SET_ADD_ROUTERS(state, routers) {
        state.addRouters = routers
    },
    /**
     * 设置菜单
     * @param state
     * @param menuList
     * @constructor
     */
    SET_MENU_LIST(state, menuList) {
        state.menuList = menuList
    },
    /**
     * 设置首页路由
     * @param state
     * @param indexRouter
     * @constructor
     */
    SET_INDEX_ROUTER(state, indexRouter) {
        state.indexRouter = indexRouter
    }
}

const actions = {
    /**
     * 获取路由列表
     * @param commit
     * @returns {Promise}
     */
    getRouterList({commit}) {
        return new Promise(resolve => {
            axios.get('/router.json').then(res => {
                const {data} = res.data
                const routers = generatorDynamicRouter(data.list, data.format)
                const menuList = (routers.find(item => item.path === '/') && routers.find(item => item.path === '/').children) || []
                const indexRouter = getIndexRouter(menuList)
                router.addRoutes(routers)
                commit('SET_ADD_ROUTERS', routers)
                commit('SET_MENU_LIST', menuList)
                commit('SET_INDEX_ROUTER', indexRouter)
                resolve()
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

/**
 * 过滤无权限菜单
 */
const filterRouter = (routers, permissionList) => {
    return routers.filter(item => {
        const permission = item.meta.permission || []
        const permissionArr = permission ? permission instanceof Array ? permission : permission.split(',') : []
        const hasAuth = find(permissionList, (o) => permissionArr.includes(o.path)) || permissionArr.includes('*') ? true : false
        if (hasAuth) {
            const route = item
            if (item.children && item.children.length > 0) {
                route.children = filterRouter(item.children, permissionList)
            }
            return route
        }
    })
}

/**
 * 动态生成菜单
 * @returns {Promise<Router>}
 */
const generatorDynamicRouter = (data, format = true, permissionList = false) => {
    const menuList = []
    const childrenMenu = format ? listToTree(data, 0) : data
    const effectiveMenu = permissionList === false ? childrenMenu : filterRouter(childrenMenu, permissionList)
    rootRouter.children = effectiveMenu
    menuList.push(rootRouter)
    const routers = generator(menuList)
    routers.push(notFoundRouter)
    return routers
}

/**
 * 格式化树形结构数据 生成 vue-router 层级路由表
 *
 * @param routerMap
 * @param parent
 * @returns {*}
 */
const generator = (routerMap, parent) => {
    return routerMap.map(item => {
        const {title, isMenu, target, icon} = item.meta || {}
        const currentRouter = {
            // 如果路由设置了 path，则作为默认 path，否则 路由地址 动态拼接生成如 /dashboard/workplace
            path: item.path || `${parent && parent.path || ''}/${item.key}`,
            // 路由名称，建议唯一
            name: item.name || item.key || '',
            // 该路由对应页面的 组件 :方案1
            // component: constantRouterComponents[item.component || item.key],
            // 该路由对应页面的 组件 :方案2 (动态加载)
            component: (layouts[item.component || item.key]) || (() => import(`@/views/${item.component}`)),

            // meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
            meta: {
                icon,
                title,
                isMenu,
                target
            }
        }
        // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
        if (!currentRouter.path.startsWith('http')) {
            currentRouter.path = currentRouter.path.replace('//', '/')
        }
        // 重定向
        item.redirect && (currentRouter.redirect = item.redirect)
        // 是否有子菜单，并递归处理
        if (item.children && item.children.length > 0) {
            // Recursion
            currentRouter.children = generator(item.children, currentRouter)
        }
        return currentRouter
    })
}

/**
 * 数组转树形结构
 *
 * @param {Array} array
 * @param {String} parentId
 * @returns {[]}
 */
const listToTree = (array, parentId) => {
    let tree = []
    array.forEach(item => {
        // 判断是否为父级菜单
        if (item.parentId === parentId) {
            const child = {
                ...item,
                key: item.key || item.name
            }
            // 迭代 list， 找到当前菜单相符合的所有子菜单
            const children = listToTree(array, item.id)
            // 删掉不存在 children 值的属性
            if (children.length) {
                child.children = children
            }
            // 加入到树中
            tree.push(child)
        }
    })
    return tree
}

/**
 * 获取首页路由
 * 登录后默认跳转页面
 * @param menuList
 * @returns {{}}
 */
const getIndexRouter = (menuList) => {
    let index = {}
    for (let item of menuList) {
        if (item.children && item.children.length) {
            let temp = getIndexRouter(item.children)
            if (Object.keys(temp).length) {
                index = temp
                break
            }
        } else {
            index = item
            break
        }
    }
    return index
}
