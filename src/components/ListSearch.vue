<template>
    <div class="list-search">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'ListSearch'
}
</script>

<style lang="scss">
.list-search {
    .ant-form-inline {
        .ant-form-item {
            display: flex;
            margin-bottom: 16px;
            margin-right: 0;

            .ant-form-item-control-wrapper {
                flex: 1 1;
                display: inline-block;
                vertical-align: middle;
            }

            .ant-form-item-label {
                line-height: 32px;
                padding-right: 8px;
                width: auto;
            }

            .ant-form-item-control {
                height: 32px;
                line-height: 32px;
            }
        }
    }

    .table-search-button {
        display: block;
        margin-bottom: 24px;
        white-space: nowrap;
    }
}
</style>
