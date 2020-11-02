/**
 * @Author: 孟祥涵
 * @Date: 2020-10-08
 * @Description: vuex 入口
 */

import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import getters from './getters'

Vue.use(Vuex)

//自动化引入modules
const modules = {}
const register = (req) => {
    req.keys().forEach(filename => {
        const name = filename.replace(/^\.\/(.*)\.\w+$/, '$1')
        if (name === 'index') return
        const options = () => {
            const config = req(filename)
            return config.default || config
        }
        modules[name] = options()
    })
}

register(require.context('./modules/', false, /[A-Za-z]+\.(js)$/))

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules,
    getters,
    plugins: [
        createPersistedState({
            reducer(state) {
                return {
                    complete: state.app.complete,
                    token: state.user.token,
                    userInfo: state.user.userInfo,
                    isLogin: state.user.isLogin
                }
            }
        })
    ]
})
