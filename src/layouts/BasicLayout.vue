<template>
    <a-layout :style="{height:'100vh'}">
        <a-layout-sider
            breakpoint="lg"
            :collapsible="collapsible"
            :collapsed="collapsed"
            width="208px">
            <sider-menu/>
        </a-layout-sider>
        <a-layout>
            <a-layout-header :style="headerStyle">
                <global-header :collapsed.sync="collapsed"></global-header>
            </a-layout-header>
            <multi-tab @refresh="onRefresh"></multi-tab>
            <a-layout-content :style="contentStyle">
                <keep-alive :include="cacheList">
                    <router-view v-if="!refreshing"
                                 :key="$route.fullPath"/>
                </keep-alive>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    name: 'basicLayout',
    data() {
        return {
            headerStyle: {
                background: '#fff',
                boxShadow: '0 1px 4px rgba(0, 21, 41, .08)',
                padding: '0',
                position: 'sticky',
                top: '0',
                zIndex: 1000,
                height: '48px',
            },
            contentStyle: {
                margin: '16px',
                minHeight: 'auto',
            },
            footerStyle: {
                textAlign: 'center',
            },
            collapsible: false,
            collapsed: false,
            refreshing: false,
        }
    },
    computed: {
        ...mapGetters({
            cacheList: 'multiTab/cacheList',
        }),
    },
    methods: {
        handleToggleCollapsed() {
            this.collapsed = !this.collapsed
        },
        /**
         * 刷新
         */
        onRefresh() {
            this.refreshing = true
            setTimeout(() => {
                this.refreshing = false
            }, 100)
        },
    },
}
</script>

<style lang="scss" scoped>

</style>
