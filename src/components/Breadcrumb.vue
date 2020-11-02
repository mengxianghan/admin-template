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
            <a-breadcrumb-item v-for="(item,index) in breadcrumbList"
                               :key="index">
                {{item.meta.title}}
            </a-breadcrumb-item>
        </a-breadcrumb>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'

    export default {
        name: "Breadcrumb",
        data() {
            return {}
        },
        computed: {
            ...mapState({
                breadcrumbList: state => state.breadcrumb.breadcrumbList
            })
        },
        watch: {
            '$route'(to, from) {
                this.setBreadcrumbList({
                    to,
                    from
                })
            }
        },
        created() {
        },
        mounted() {
            this.setBreadcrumbList({
                to: this.$route
            })
        },
        methods: {
            ...mapActions({
                setBreadcrumbList: 'breadcrumb/setBreadcrumbList'
            })
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
