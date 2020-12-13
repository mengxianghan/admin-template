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
    current: 0,
}

const getters = {
    list: state => state.list,
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
     * 关闭
     * @param state
     * @param index
     * @constructor
     */
    CLOSE(state, index) {
        state.list.splice(index, 1)
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
    closeAll({commit}) {
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}
