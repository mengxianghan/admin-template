<!--
 * @Author: 孟祥涵
 * @Date: 2020-10-29
 * @Description: 面包屑导航
-->
<template>
    <div class="breadcrumb">
        <a-breadcrumb>
            <a-breadcrumb-item>
                <a-icon type="home"/>
            </a-breadcrumb-item>
            <a-breadcrumb-item v-for="(item,index) in list"
                               :key="index">
                {{item.meta.title}}
            </a-breadcrumb-item>
        </a-breadcrumb>
    </div>
</template>

<script>
    export default {
        name: "Breadcrumb",
        data() {
            return {
                list: []
            }
        },
        watch: {
            '$route'(to) {
                this.list = to.matched.filter(item => item.path)
            }
        },
        mounted() {
            this.list = this.$route.matched.filter(item => item.path)
        }
    }
</script>

<style lang="scss" scoped>
    .breadcrumb {
        display: flex;
        align-items: center;
        height: 100%;
    }
</style>
