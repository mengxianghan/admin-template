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
            <multi-tab></multi-tab>
            <a-layout-content :style="contentStyle">
                <keep-alive :include="include">
                    <router-view/>
                </keep-alive>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    data() {
        return {
            headerStyle: {
                background: '#fff',
                boxShadow: '0 1px 4px rgba(0, 21, 41, .08)',
                padding: '0',
                position: 'sticky',
                top: '0',
                zIndex: 100,
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
        }
    },
    computed: {
        include() {
            return this.$store.getters['multiTab/list'].map(item => item.name)
        },
    },
    watch: {
        cacheList(value) {
            console.log(value)
        },
    },
    methods: {
        handleToggleCollapsed() {
            this.collapsed = !this.collapsed
        },
    },
}
</script>

<style lang="scss" scoped>

</style>
