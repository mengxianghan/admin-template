<template>
    <div class="user-layout-container">
        <div class="user-layout-content">
            <div class="user-layout-top">
                <div class="user-layout-header">
                    <img src="/images/logo.png">
                    <h1>{{ title }}</h1>
                </div>
                <div class="user-layout-desc">
                    欢迎使用管理系统
                </div>
            </div>
            <div class="user-layout-main">
                <a-form :form="form">
                    <a-form-item>
                        <a-input size="large"
                                 v-decorator="[
                                    'username',
                                    {
                                        rules: [
                                            { required: true, message: '请输入用户名' }
                                        ]
                                    }
                                 ]">
                            <a-icon slot="prefix"
                                    type="user"/>
                        </a-input>
                    </a-form-item>
                    <a-form-item>
                        <a-input size="large"
                                 v-decorator="[
                                     'password',
                                     {
                                         rules: [
                                             { required: true, message: '请输入密码' }
                                         ]
                                     }
                                 ]">
                            <a-icon slot="prefix"
                                    type="lock"/>
                        </a-input>
                    </a-form-item>
                    <a-form-item>
                        <a-button type="primary"
                                  size="large"
                                  block
                                  :loading="loading"
                                  @click="handleLogin">登录
                        </a-button>
                    </a-form-item>
                </a-form>
            </div>
        </div>
    </div>
</template>

<script>
import form from '@/mixins/form'
import {mapGetters} from 'vuex'

export default {
    mixins: [form],
    data() {
        return {
            title: process.env.VUE_APP_TITLE,
            loading: false
        }
    },
    computed: {},
    mounted() {
    },
    methods: {
        /**
         * 登录
         */
        async handleLogin() {
            try {
                this.form.validateFieldsAndScroll(async (errors, values) => {
                    if (!errors) {
                        this.loading = true
                        const {code, data} = await this.$store.dispatch('user/login', {
                            ...values
                        })
                        this.loading = false
                        if (code === '200') {
                            let indexRouter = this.getIndexRouter()
                            // 加载完成
                            if (this.$store.getters['appComplete']) {
                                indexRouter = this.getIndexRouter()
                                if (!indexRouter) return
                                this.$router.push(indexRouter)
                            } else {
                                this.$store.dispatch('app/init').then(() => {
                                    indexRouter = this.getIndexRouter()
                                    if (!indexRouter) return
                                    this.$router.push(indexRouter)
                                })
                            }
                        }
                    }
                })
            } catch (e) {
                this.loading = false
            }
        },
        /**
         * 获取首页路由
         * @return {*}
         */
        getIndexRouter() {
            const indexRouter = this.$store.getters['router/indexRouter']
            if (!indexRouter) {
                this.$message.warning('没有任何权限，请联系站点管理员')
            }
            return indexRouter
        }
    }
}
</script>

<style lang="scss" scoped>
.user-layout {
    &-container {
        height: 100vh;
        background: #f0f2f5 url("/images/bg_login.svg") no-repeat center;
        background-size: cover;
    }

    &-content {
        padding: 72px 0 24px;
    }

    &-top {
        text-align: center;
    }

    &-header {
        display: flex;
        align-items: center;
        justify-content: center;

        img {
            height: 44px;
            margin-right: 16px;
        }

        h1 {
            font-size: 30px;
            font-weight: 500;
            margin: 0;
        }
    }

    &-desc {
        margin: 12px 0 48px;
    }

    &-main {
        width: 368px;
        margin: 0 auto;
    }
}
</style>
