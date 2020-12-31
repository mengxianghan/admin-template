<template>
    <div class="sider-menu">
        <div class="sider-menu__logo">
            <img src="/images/logo.png">
            <h1>{{ title }}</h1>
        </div>
        <a-menu mode="inline"
                theme="dark"
                :inline-collapsed="collapsed"
                :open-keys="openKeys"
                v-model="selectedKeys"
                @click="handleClick"
                @openChange="onOpenChange">
            <template v-for="item in menuList">
                <template v-if="item.meta.isMenu">
                    <a-menu-item v-if="!item.children"
                                 :key="item.name">
                        <a-icon v-if="item.meta.icon" :type="item.meta.icon"/>
                        <span>{{ item.meta.title }}</span>
                    </a-menu-item>
                    <sub-menu v-else :key="item.name" :menu-info="item"/>
                </template>
            </template>
        </a-menu>
    </div>
</template>

<script>
import {Menu} from 'ant-design-vue'
import {mapGetters} from 'vuex'

const SubMenu = {
    template: `
        <a-sub-menu :key="menuInfo.name" v-bind="$props" v-on="$listeners">
        <span slot="title">
                    <a-icon v-if="menuInfo.meta && menuInfo.meta.icon"
                            :type="menuInfo.meta.icon"/><span>{{ menuInfo.meta.title }}</span>
                </span>
        <template v-for="item in menuInfo.children">
            <template v-if="item.meta.isMenu">
                <a-menu-item v-if="!item.children"
                             :key="item.name">
                    <a-icon v-if="item.meta.icon" :type="item.meta.icon"/>
                    <span>{{ item.meta.title }}</span>
                </a-menu-item>
                <sub-menu v-else :key="item.name" :menu-info="item"/>
            </template>
        </template>
        </a-sub-menu>
    `,
    name: 'SubMenu',
    isSubMenu: true,
    props: {
        ...Menu.SubMenu.props,
        menuInfo: {
            type: Object,
            default: () => ({})
        }
    }
}
export default {
    name: 'SiderMenu',
    components: {
        'sub-menu': SubMenu
    },
    data() {
        return {
            title: process.env.VUE_APP_TITLE,
            collapsed: false,
            openKeys: [],
            selectedKeys: []
        }
    },
    computed: {
        ...mapGetters({
            menuList: 'router/menuList'
        }),
        rootSubmenuKeys() {
            return this.menuList.map(item => item.name)
        }
    },
    watch: {
        '$route'() {
            this.setSelectedMenu()
        }
    },
    mounted() {
        this.setSelectedMenu()
    },
    methods: {
        /**
         * 设置选中菜单
         */
        setSelectedMenu() {
            const {name, meta} = this.$route || {}
            this.openKeys = meta?.openKeys || []
            this.selectedKeys = [meta?.active ?? name]
        },
        /**
         * SubMenu 展开/关闭的回调
         * @param openKeys
         */
        onOpenChange(openKeys) {
            const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1)
            if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
                this.openKeys = openKeys
            } else {
                this.openKeys = latestOpenKey ? [latestOpenKey] : []
            }
        },
        handleClick({key}) {
            if (this.$route.name === key) return
            this.$router.push({
                name: key
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.sider-menu {
    &__logo {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 48px;
        white-space: nowrap;

        img {
            width: 32px;
            height: 32px;
            border-radius: 6px;
            display: none;
        }

        h1 {
            color: #fff;
            font-size: 20px;
            margin: 0;
            padding: 0 12px;
            text-overflow: ellipsis;
            overflow: hidden;
        }
    }

    .ant-menu {
        height: calc(100vh - 64px);
        overflow-y: auto;
    }
}

.ant-layout-sider-collapsed {
    .sider-menu {
        &__logo {

            img {
                display: block;
            }

            h1 {
                display: none;
            }
        }
    }
}
</style>
