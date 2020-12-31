/**
 * @author: 孟祥涵
 * @email: 1056811341@qq.com
 * @date: 2020-12-30
 * @description: action
 */
import Vue from 'vue'

/**
 * Action 权限指令
 * 指令用法：
 *  - 在需要控制 action 级别权限的组件上使用 v-action:[method] 或 v-action="[method]" 如下：
 *    <a-button v-action:insert >添加用户</a-button>
 *    或
 *    <a-button v-action="['insert']" >添加用户</a-button>
 *
 *  - 当前用户没有权限时，组件上使用了该指令则会被禁用
 */
Vue.directive('action', (el, binding, vnode, oldVnode) => {
    const route = vnode.context.$route
    const action = route.meta?.action ?? []
    const value = binding.value || []
    const arg = binding.arg
    if (route?.meta?.action === '*') return
    if (arg) {
        if (!action.includes(arg)) {
            el.parentNode && el.parentNode.removeChild(el) || (el.style.display = 'none')
            // el.setAttribute('disabled', 'disabled');
        }
    } else {
        value.forEach(item => {
            if (!action.includes(item)) {
                el.parentNode && el.parentNode.removeChild(el) || (el.style.display = 'none')
                // el.setAttribute('disabled', 'disabled');
            }
        })
    }
})
