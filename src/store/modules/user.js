/**
 * @Author: 孟祥涵
 * @Date: 2020-10-08
 * @Description: user.js
 */
import storage from '@/utils/storage'
import {message} from 'ant-design-vue'

const state = {
    isLogin: storage.getIsLogin() || false,
    userInfo: storage.getUserInfo() || null,
    token: storage.getToken() || '',
    permission: storage.getPermission() || []
}

const getters = {
    isLogin: state => state.isLogin,
    userInfo: state => state.userInfo,
    token: state => state.token,
    permission: state => state.permission
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
    },
    /**
     * 设置权限列表
     * @param state
     * @param {Array} permission
     * @constructor
     */
    SET_PERMISSION(state, permission = []) {
        state.permission = permission
        storage.setPermission(permission)
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
    login({commit, dispatch, rootState}, params) {
        return new Promise(async (resolve, reject) => {
            const result = await window.$xy.api.user.login(params)
            const {code, data} = result
            if (code === '200') {
                const {username, token} = data
                commit('SET_USER_INFO', {
                    username
                })
                commit('SET_IS_LOGIN', true)
                commit('SET_TOKEN', token)
            }
            resolve(result)
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
