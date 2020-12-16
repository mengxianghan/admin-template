<!--
 * @Author: 孟祥涵
 * @Date: 2020-10-23
 * @Description: MultiTab
-->
<template>
    <div class="multi-tab">
        <a-tabs :active-key="current"
                type="editable-card"
                hide-add
                @change="onSwitch"
                @edit="onClose">
            <a-tab-pane v-for="(item,index) in list"
                        :key="index">
                <a-dropdown slot="tab"
                            :trigger="['contextmenu']">
                    <div>{{ item.meta.title }}</div>
                    <a-menu slot="overlay"
                            @click="handleMenu($event,item,index)">
                        <a-menu-item key="refresh">重新加载</a-menu-item>
                        <a-menu-item key="close">关闭</a-menu-item>
                        <a-menu-item v-if="list.length > 1" key="closeOther">关闭其他</a-menu-item>
                        <a-menu-item v-if="index > 0" key="closeLeft">关闭左侧</a-menu-item>
                        <a-menu-item v-if="index < list.length - 1" key="closeRight">关闭右侧</a-menu-item>
                    </a-menu>
                </a-dropdown>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    name: 'MultiTab',
    data() {
        return {}
    },
    computed: {
        ...mapGetters({
            list: 'multiTab/list',
            current: 'multiTab/current'
        })
    },
    watch: {
        '$route'(to) {
            this.onOpen(to)
        }
    },
    created() {
    },
    mounted() {
        this.onOpen(this.$route)
    },
    methods: {
        /**
         * 菜单
         * @param {String} key 操作类型
         * @param {Number} route 路由
         */
        handleMenu({key}, route, index) {
            switch (key) {
                case 'refresh': // 刷新
                    this.$store.dispatch('multiTab/refresh', {route, index})
                    break
                case 'close': // 关闭
                    this.$store.dispatch('multiTab/close', {route, index})
                    break
                case 'closeOther': // 关闭其他
                    this.$store.dispatch('multiTab/closeOther', {route, index})
                    break
                case 'closeLeft': // 关闭左侧
                    this.$store.dispatch('multiTab/closeLeft', {route, index})
                    break
                case 'closeRight': // 关闭右侧
                    this.$store.dispatch('multiTab/closeRight', {route, index})
                    break
            }
        },
        /**
         * 打开
         * @param {Object} route 路由
         */
        onOpen(route) {
            this.$store.dispatch('multiTab/push', {route})
        },
        /**
         * 切换标签页
         * @param {Number} index 索引
         */
        onSwitch(index) {
            this.$store.dispatch('multiTab/switch', {
                route: this.list[index],
                index
            })
        },
        /**
         * 关闭标签页
         * @param {Number} index 索引
         * @param {String} action 操作
         */
        onClose(index, action) {
            switch (action) {
                case 'remove':
                    this.$store.dispatch('multiTab/close', {
                        route: this.list[index],
                        index
                    })
                    break
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.multi-tab {
    position: sticky;
    top: 48px;
    z-index: 100;
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

    $height: 40px;

    ::v-deep {
        $border-radius: 8px;
        $bg-tab-color-active: #f0f2f5;

        .ant-tabs-bar {
            margin: 0;
            border: 0;
            background: #fff;
        }

        .ant-tabs-nav {
            padding: 0 8px;
        }

        .ant-tabs-nav .ant-tabs-tab::before,
        .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab-active::before {
            transition: none;
        }

        .ant-tabs-nav .ant-tabs-tab:not(.ant-tabs-tab-active):hover {
            color: $text-color;
        }

        .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab {
            padding: 0 8px 0 12px;
            border: 0;
            background: transparent;
            line-height: 40px;
            border-radius: $border-radius $border-radius 0 0;
            margin: 0;
            transition: none;
        }

        .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab-active {
            font-weight: normal;
            background: $bg-tab-color-active;
            position: relative;
            box-shadow: 8px 20px 0 0 $bg-tab-color-active, -8px 20px 0 0 $bg-tab-color-active;

            &::before,
            &::after {
                content: '';
                position: absolute;
                top: 0;
                bottom: 0;
                width: $border-radius;
                background: #fff;
                border: 0;
            }

            &::before {
                left: -$border-radius;
                border-radius: 0 0 $border-radius 0;
            }

            &::after {
                right: -$border-radius;
                border-radius: 0 0 0 $border-radius;
            }
        }

        .ant-tabs-tab > div {
            display: flex;
            align-items: center;
        }

        .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab .ant-tabs-close-x {
            margin: 0 0 0 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            width: 16px;
            height: 16px;
            border-radius: 10em;

            &:hover {
                background: rgba(0, 0, 0, .2);
            }
        }
    }
}
</style>
