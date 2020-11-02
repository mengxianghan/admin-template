/**
 * @Author: 孟祥涵
 * @Date: 2020-10-29
 * @Description: breakcrumb
 */

const state = {
    breadcrumbList: []
}

const mutations = {
    /**
     * 设置面包屑导航
     * @param state
     * @param {Array} breadcrumbList
     * @constructor
     */
    SET_BREADCRUMB_LIST(state, breadcrumbList) {
        state.breadcrumbList = breadcrumbList
    }
}

const actions = {
    /**
     * 设置面包屑导航
     * @param {Object} to
     * @param {Object} form
     */
    setBreadcrumbList({commit}, {to = {}, form = {}}) {
        commit('SET_BREADCRUMB_LIST', to.matched.filter(item => item.path))
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
