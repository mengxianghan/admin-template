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
    active: 0
}

const getters = {
    list: state => state.list,
    active: state => state.active
}

const mutations = {
    /**
     * 添加
     * @param state
     * @param route
     * @constructor
     */
    ADD(state, {route}) {
        state.list.push(route)
        state.active = state.list.length - 1
    },
    /**
     * 更新
     * @param state
     * @param route
     * @param index
     * @constructor
     */
    UPDATE(state, {route, index}) {
        state.list.splice(index, 1, route)
        state.active = index
    },
    /**
     * 移除
     * @param state
     * @param index
     * @constructor
     */
    REMOVE(state, {index}) {
        state.list.splice(index, 1)
        state.active = index === 0 ? 0 : index - 1
    },
    /**
     * 改变
     * @param state
     * @param index
     * @constructor
     */
    CHANGE(state, {index}) {
        state.active = index
    }
}

const actions = {
    /**
     * 初始化
     * @param state
     * @param commit
     * @param route
     */
    init({state, commit}, {route}) {
        const list = state.list
        const index = findIndex(list, o => o.name === route.name)
        // 判断是否已存在
        if (index > -1) {
            // 存在则更新
            commit('UPDATE', {
                route,
                index
            })
        } else {
            // 不存在则新增
            commit('ADD', {
                route
            })
        }
    },
    /**
     * 移除
     * @param commit
     * @param index
     */
    remove({state, commit}, {index}) {
        // 判断还有几个标签页
        if (state.list.length === 1) {
            message.warning('至少保留一个标签页')
            return
        }
        const current = state.active
        // 如果删除的是当前标签页
        if (index === current) {
            router.push(state.list[current === 0 ? 1 : current - 1])
        }
        commit('REMOVE', {index})
    },
    /**
     * 改变
     * @param commit
     * @param index
     */
    change({commit}, {index}) {
        commit('CHANGE', {index})
    },
    /**
     * 关闭
     * @param commit
     */
    close({state, commit, dispatch}) {
        dispatch('remove', {
            index: state.active
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
