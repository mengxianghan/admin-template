<template>
    <header class="global-header">
        <div class="global-header__left pl-2">
            <breadcrumb></breadcrumb>
        </div>
        <div class="global-header__right">
            <!--<div class="global-header__action">
                <a-badge count="5">
                    <a-icon type="bell"></a-icon>
                </a-badge>
            </div>-->
            <div class="global-header__action">
                <a-dropdown :trigger="['click']">
                    <div class="user-info">
                        <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"></a-avatar>
                        <span v-if="isLogin">{{userInfo.username}}</span>
                    </div>
                    <a-menu slot="overlay"
                            @click="handleClick">
                        <a-menu-item key="signOut">
                            <a-icon type="logout"/>
                            退出登录
                        </a-menu-item>
                    </a-menu>
                </a-dropdown>
            </div>
        </div>
    </header>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: 'LayoutHeader',
        computed: {
            ...mapGetters(['isLogin', 'userInfo'])
        },
        methods: {
            handleClick({key}) {
                if (key === 'signOut') {
                    this.$confirm({
                        title: '注销登录？',
                        okText: '确认',
                        cancelText: '取消',
                        onOk: () => {
                            this.$store.dispatch('user/logout')
                            location.href = process.env.VUE_APP_AUTH_SIGNOUT_ADDRESS
                        }
                    })
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .global-header {
        display: flex;
        height: 100%;

        &__left {
            ::v-deep {
                .ant-menu {
                    border-bottom: 0;
                    height: 100%;

                    &-horizontal {
                        line-height: 1;
                    }

                    &-item,
                    &-submenu {
                        height: 100%;
                        top: 0;
                        margin: 0;
                        display: inline-flex;
                        align-items: center;
                    }

                    &-submenu-title {
                        height: 100%;
                        display: flex;
                        align-items: center;
                    }
                }
            }
        }

        &__right {
            margin-left: auto;
            display: flex;
            height: 100%;
        }

        &__action {
            height: 100%;
            padding: 0 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all .3s;
            color: rgba(0, 0, 0, .65);

            &:hover {
                background: rgba(0, 0, 0, .025);
            }

            .anticon {
                padding: 4px;
            }
        }

        .user-info {
            display: flex;
            align-items: center;
            height: 100%;

            .ant-avatar {
                margin-right: 8px;
            }
        }
    }
</style>
