/**
 * @Author: 孟祥涵
 * @Date: 2020-10-08
 * @Description: user.js
 */

const state = {
    token: '',
    userInfo: {},
    isLogin: false
}

const mutations = {
    /**
     * 设置用户信息
     * @param state
     * @param userInfo
     * @constructor
     */
    SET_USER_INFO(state, userInfo = {}) {
        state.userInfo = userInfo
    },
    /**
     * 设置登录状态
     * @param state
     * @param status
     * @constructor
     */
    SET_IS_LOGIN(state, status = false) {
        state.isLogin = status
    },
    /**
     * 设置 token
     * @param state
     * @param token
     * @constructor
     */
    SET_TOKEN(state, token = '') {
        state.token = token
    }
}

const actions = {
    /**
     * 登录
     * @param commit
     * @param rootState
     * @param username
     * @param password
     * @returns {Promise<unknown>}
     */
    login({commit}, params) {
        return new Promise(async (resolve, reject) => {
            const res = await window.$xy.api.user.login(params)
            if (res.code === 200) {
                commit('SET_USER_INFO', res.data)
                commit('SET_IS_LOGIN', true)
                commit('SET_TOKEN', '')
            }
            resolve(res)
        })
    },
    /**
     * 模拟登录
     * @param commit
     * @returns {Promise}
     */
    mockLogin({commit}) {
        return new Promise((resolve, reject) => {
            commit('SET_IS_LOGIN', true)
            resolve(true)
        })
    },
    /**
     * 退出登录
     * @param commit
     */
    logout({commit}) {
        return new Promise((resolve) => {
            commit('SET_USER_INFO', {})
            commit('SET_IS_LOGIN', false)
            commit('SET_TOKEN', '')
            resolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
