/**
 * @Author: 孟祥涵
 * @Date: 2020-10-08
 * @Description: user.js
 */
import storage from "@/utils/storage"

const state = {
    isLogin: storage.getIsLogin() || false,
    userInfo: storage.getUserInfo() || null,
    token: storage.getToken() || ''
}

const getters = {
    isLogin: state => state.isLogin,
    userInfo: state => state.userInfo,
    token: state => state.token
}

const mutations = {
    /**
     * 设置登录状态
     * @param state
     * @param {Boolean} isLogin
     * @constructor
     */
    SET_IS_LOGIN(state, isLogin = false) {
        state.isLogin = isLogin
        storage.setIsLogin(isLogin)
    },
    /**
     * 设置用户信息
     * @param state
     * @param {Object} userInfo
     * @constructor
     */
    SET_USER_INFO(state, userInfo = {}) {
        state.userInfo = userInfo
        storage.setUserInfo(userInfo)
    },
    /**
     * 设置 token
     * @param state
     * @param {String} token
     * @constructor
     */
    SET_TOKEN(state, token = '') {
        state.token = token
        storage.setToken(token)
    }
}

const actions = {
    /**
     * 登录
     * @param commit
     * @param {String} username
     * @param {String} password
     * @returns {Promise<unknown>}
     */
    login({commit}, {username = '', password = ''}) {
        return new Promise(async (resolve, reject) => {
            const res = await window.$xy.api.user.login({
                username,
                password
            })
            const {code, data} = res
            if (code === '200') {
                const {username, token} = data
                commit('SET_USER_INFO', {
                    username
                })
                commit('SET_IS_LOGIN', true)
                commit('SET_TOKEN', token)
            }
            resolve(res)
        })
    },
    /**
     * 退出登录
     * @param commit
     */
    logout({commit}) {
        return new Promise((resolve) => {
            commit('SET_USER_INFO', null)
            commit('SET_IS_LOGIN', false)
            commit('SET_TOKEN', '')
            resolve()
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
