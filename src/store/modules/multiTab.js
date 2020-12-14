/**
 * @Author: 孟祥涵
 * @Date: 2020-11-06
 * @Description: multiTab
 */
import {findIndex} from 'lodash'
import {message} from 'ant-design-vue'
import router from '@/router'

const state = {
    list: [],
    cacheList: [],
    current: 0,
}

const getters = {
    list: state => state.list,
    cacheList: state => state.cacheList,
    current: state => state.current,
}

const mutations = {
    /**
     * 设置当前
     * @param state
     * @param current
     * @constructor
     */
    SET_CURRENT(state, current) {
        state.current = current < 0 ? 0 : current
    },
    /**
     * PUSH
     * @param state
     * @param route
     * @constructor
     */
    PUSH(state, route) {
        state.list.push(route)
        state.cacheList.push(route.name)
    },
    /**
     * REPLACE
     * @param state
     * @param route
     * @param index
     * @constructor
     */
    REPLACE(state, {route, index}) {
        state.list.splice(index, 1, route)
    },
    /**
     * 刷新
     * @param state
     * @param index
     * @constructor
     */
    REFRESH(state, index) {
        const key = state.cacheList[index]
        state.cacheList.splice(index, 1)
        setTimeout(() => {
            state.cacheList.push(key)
        }, 100)
    },
    /**
     * 关闭
     * @param state
     * @param index
     * @constructor
     */
    CLOSE(state, index) {
        state.list.splice(index, 1)
        state.cacheList.splice(index, 1)
    },
    /**
     * 关闭其他
     * @param state
     * @param index
     * @constructor
     */
    CLOSE_OTHER(state, index) {
        const list = []
        list.push(state.list[index])
        state.list = list
    },
    /**
     * 关闭左侧
     * @param state
     * @param index
     * @constructor
     */
    CLOSE_LEFT(state, index) {
        state.list.splice(0, index)
        state.cacheList.splice(0, index)
    },
    /**
     * 关闭右侧
     * @param state
     * @param index
     * @constructor
     */
    CLOSE_RIGHT(state, index) {
        state.list.splice(index + 1)
        state.cacheList.splice(index + 1)
    },
}

const actions = {
    /**
     * Push
     * @param dispatch
     * @param commit
     * @param state
     * @param route
     */
    push({dispatch, commit, state}, {route}) {
        const {fullPath} = route
        const index = findIndex(state.list, item => item.fullPath === fullPath)
        // 是否已存在
        if (index > -1) {
            // 存在
            dispatch('replace', {route, index})
        } else {
            // 不存在
            commit('PUSH', route)
            commit('SET_CURRENT', state.list.length - 1)
        }
    },
    /**
     * Replace
     * @param commit
     * @param route
     * @param index
     */
    replace({commit}, {route, index}) {
        commit('REPLACE', {
            route,
            index,
        })
        commit('SET_CURRENT', index)
    },
    /**
     * 刷新
     * @param commit
     * @param state
     * @param index
     */
    refresh({dispatch, commit, state}, index) {
        commit('REFRESH', index)
    },
    /**
     * 关闭
     * @param dispatch
     * @param commit
     * @param state
     * @param index
     */
    close({dispatch, commit, state}, index) {
        // 最后一个标签页
        if (state.list.length === 1) {
            message.warning('至少保留一个标签页')
            return
        }
        commit('CLOSE', index)

        // 关闭前面的标签
        if (index < state.current) {
            commit('SET_CURRENT', state.current - 1)
            return
        }

        // 关闭当前标签
        if (index === state.current) {
            commit('SET_CURRENT', index - 1)
            // 更新标签页
            router.push(state.list[state.current])
        }

    },
    /**
     * 关闭其他
     * @param commit
     * @param state
     * @param index
     */
    closeOther({commit, state}, index) {
        // 不是当前页面
        if (state.current !== index) {
            // 更新标签页
            router.push(state.list[index])
        }
        commit('CLOSE_OTHER', index)
        commit('SET_CURRENT', 0)
    },
    /**
     * 关闭左侧
     * @param commit
     * @param state
     * @param index
     */
    closeLeft({commit, state}, index) {
        // 不是当前页
        if (state.current !== index) {
            // 更新标签页
            router.push(state.list[index])
        }
        commit('CLOSE_LEFT', index)
        commit('SET_CURRENT', 0)
    },
    /**
     * 关闭右侧
     * @param commit
     * @param state
     * @param index
     */
    closeRight({commit, state}, index) {
        // 是否关闭了当前页
        if (state.current > index) {
            router.push(state.list[index])
            commit('SET_CURRENT', index)
        }
        commit('CLOSE_RIGHT', index)
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}
