<template>
    <div class="operator-group">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'OperatorGroup'
    };
</script>

<style lang="scss" scoped>
    .operator-group {
        margin-bottom: 18px;

        button {
            margin-right: 8px;
        }
    }
</style>
