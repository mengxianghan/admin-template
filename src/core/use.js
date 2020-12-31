import Vue from 'vue'
import antd from 'ant-design-vue'
import api from '@/api'
import '@/directive/action'
import './permission'
import '@/components'
import 'nprogress/nprogress.css'
import 'ant-design-vue/dist/antd.less'
import '@/assets/style/index.scss'

Vue.use(antd)

// 模拟数据
if (process.env.VUE_APP_MOCK === 'true') {
    require('@/mock')
}

window.$xy = Vue.prototype.$xy = {
    api
}
