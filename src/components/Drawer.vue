<template>
    <div>
        <a-drawer class="drawer"
                  v-bind="$attrs"
                  v-on="$listeners"
                  @close="onClose">
            <div class="drawer__content">
                <slot></slot>
            </div>
            <div class="drawer__footer" v-if="footer">
                <slot name="footer">
                    <slot name="cancelText">
                        <a-button @click="onClose">{{ cancelText }}</a-button>
                    </slot>
                    <slot name="okText">
                        <a-button :type="okType" @click="onOk"
                                  :loading="confirmLoading">{{ okText }}
                        </a-button>
                    </slot>
                </slot>
            </div>
        </a-drawer>
    </div>
</template>

<script>
export default {
    name: 'Drawer',
    props: {
        cancelText: {
            type: String,
            default: '取消'
        },
        okText: {
            type: String,
            default: '确定'
        },
        okType: {
            type: String,
            default: 'primary'
        },
        confirmLoading: {
            type: Boolean,
            default: false
        },
        footer: {
            type: [String, Object],
            default: () => ({})
        }
    },
    data() {
        return {}
    },
    methods: {
        onOk() {
            this.$emit('ok')
        },
        onClose() {
            this.$emit('cancel')
            this.$emit('input', !this.value)
        }
    }
}
</script>

<style lang="scss" scoped>
.drawer {
    ::v-deep {
        .ant-drawer-wrapper-body {
            display: flex;
            flex-direction: column;

            .ant-drawer-body {
                flex: 1;
                padding: 0;
                display: flex;
                flex-direction: column;
                overflow: hidden;
            }
        }
    }

    &__content {
        flex: 1;
        overflow-y: auto;
        padding: 24px;
    }

    &__footer {
        padding: 10px 16px;
        text-align: right;
        background: transparent;
        border-top: 1px solid #e8e8e8;

        button + button {
            margin-left: 8px
        }
    }
}
</style>
