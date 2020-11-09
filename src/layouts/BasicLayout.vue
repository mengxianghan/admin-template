<template>
    <a-layout :style="{height:'100vh'}">
        <a-layout-sider
                breakpoint="lg"
                :collapsible="collapsible"
                width="208px">
            <sider-menu/>
        </a-layout-sider>
        <a-layout>
            <a-layout-header :style="headerStyle">
                <global-header></global-header>
            </a-layout-header>
            <a-layout-content :style="contentStyle">
                <router-view/>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script>
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
                    height: '48px'
                },
                contentStyle: {
                    margin: '16px',
                    minHeight: 'auto'
                },
                footerStyle: {
                    textAlign: 'center'
                },
                collapsible: false
            }
        },
        computed: {},
        methods: {}
    }
</script>

<style lang="scss" scoped>

</style>
