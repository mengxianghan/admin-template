<template>
    <a-space v-bind="$attrs"
             class="operator-group">
        <slot></slot>
    </a-space>
</template>

<script>
export default {
    name: 'OperatorGroup'
}
</script>

<style lang="scss" scoped>
.operator-group {
    margin-bottom: 16px;
}
</style>
