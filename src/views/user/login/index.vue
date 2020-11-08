<template>
    <div class="user-layout-container">
        <div class="user-layout-content">
            <div class="user-layout-top">
                <div class="user-layout-header">
                    {{title}}
                </div>
                <div class="user-layout-desc">
                    欢迎使用管理系统
                </div>
            </div>
            <div class="user-layout-main">
                <a-form>
                    <a-form-item>
                        <a-input size="large">
                            <a-icon slot="prefix"
                                    type="user"/>
                        </a-input>
                    </a-form-item>
                    <a-form-item>
                        <a-input size="large">
                            <a-icon slot="prefix"
                                    type="lock"/>
                        </a-input>
                    </a-form-item>
                    <a-form-item>
                        <a-button type="primary"
                                  size="large"
                                  block
                                  @click="handleLogin">登录
                        </a-button>
                    </a-form-item>
                </a-form>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        data() {
            return {
                title: process.env.VUE_APP_TITLE
            }
        },
        computed: {
            ...mapGetters({
                appComplete: 'appComplete',
                indexRouter: 'router/indexRouter'
            })
        },
        mounted() {
        },
        methods: {
            handleLogin() {
                this.$store.dispatch('user/mockLogin').then(() => {
                    if (this.appComplete) {
                        this.$router.push(this.indexRouter)
                    } else {
                        this.$store.dispatch('app/init').then(() => {
                            this.$router.push(this.indexRouter)
                        })
                    }
                })
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
            font-size: 30px;
            font-width: 600;
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
