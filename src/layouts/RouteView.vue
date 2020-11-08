<template>
    <keep-alive>
        <router-view :key="key"/>
    </keep-alive>
</template>

<script>
    export default {
        name: 'RouteView',
        computed: {
            key() {
                return this.$route.name
            }
        },
    }
</script>

<style scoped>

</style>
