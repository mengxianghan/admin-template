/**
 * @Author: 孟祥涵
 * @Date: 2020-10-08
 * @Description: app.js
 */

import axios from 'axios'

const state = {
    complete: false
}

const mutations = {
    /**
     * 设置初始化完成状态
     * @param state
     * @param complete
     * @constructor
     */
    SET_COMPLETE(state, complete = false) {
        state.complete = complete
    }
}

const actions = {
    /**
     * 初始化
     * @param dispatch
     * @returns {Promise}
     */
    init({commit, dispatch}) {
        return new Promise((resolve) => {
            axios.all([
                dispatch('router/getRouterList', null, {root: true})
            ]).then(() => {
                commit('SET_COMPLETE', true)
                resolve()
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
