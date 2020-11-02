<template>
    <a-layout :style="{height:'100vh'}">
        <a-layout-sider
                breakpoint="lg"
                :collapsible="collapsible"
                width="256px">
            <sider-menu/>
        </a-layout-sider>
        <a-layout>
            <a-layout-header :style="headerStyle">
                <global-header></global-header>
            </a-layout-header>
            <a-layout-content :style="contentStyle">
                <keep-alive>
                    <router-view/>
                </keep-alive>
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
                    zIndex: 100
                },
                contentStyle: {
                    margin: '24px',
                    minHeight: 'auto'
                },
                footerStyle: {
                    textAlign: 'center'
                },
                collapsible: false
            }
        },
        methods: {}
    }
</script>

<style lang="scss" scoped>

</style>
