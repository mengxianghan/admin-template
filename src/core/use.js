import Vue from 'vue'
import antd from 'ant-design-vue'
import * as ali from '@/utils/ali'
import api from '@/api'
import './permission'
import '@/components'
import 'nprogress/nprogress.css'
import 'ant-design-vue/dist/antd.less'
import '@/assets/style/index.scss'

Vue.use(antd)

window.$xy = Vue.prototype.$xy = {
    ali,
    api
}
