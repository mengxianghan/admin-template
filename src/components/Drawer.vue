<template>
    <div>
        <a-drawer class="drawer"
                  :closable="closable"
                  :destroy-on-close="destroyOnClose"
                  :get-container="getContainer"
                  :mask-closable="maskClosable"
                  :mask="mask"
                  :mask-style="maskStyle"
                  :title="title"
                  :visible="value || visible"
                  :wrap-class-name="wrapClassName"
                  :wrap-style="wrapStyle"
                  :drawer-style="drawerStyle"
                  :header-style="headerStyle"
                  :body-style="bodyStyle"
                  :width="width"
                  :height="height"
                  :z-index="zIndex"
                  :placement="placement"
                  :handle="handle"
                  :after-visible-change="afterVisibleChange"
                  :keyboard="keyboard"
                  @close="onClose">
            <div class="drawer__content">
                <slot></slot>
            </div>
            <div class="drawer__footer" v-if="footer">
                <slot name="footer">
                    <slot name="cancelText">
                        <a-button @click="onClose">{{cancelText}}</a-button>
                    </slot>
                    <slot name="okText">
                        <a-button :type="okType" @click="onOk"
                                  :loading="confirmLoading">{{okText}}
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
            closable: {
                type: Boolean,
                default: true
            },
            destroyOnClose: {
                type: Boolean,
                default: false
            },
            getContainer: {
                type: String,
                default: 'body'
            },
            maskClosable: {
                type: Boolean,
                default: true
            },
            mask: {
                type: Boolean,
                default: true
            },
            maskStyle: {
                type: Object,
                default: () => ({})
            },
            title: {
                type: String,
                default: ''
            },
            visible: {
                type: Boolean,
                default: false
            },
            wrapClassName: {
                type: String,
                default: ''
            },
            wrapStyle: {
                type: Object,
                default: () => ({})
            },
            drawerStyle: {
                type: Object,
                default: () => ({})
            },
            headerStyle: {
                type: Object,
                default: () => ({})
            },
            bodyStyle: {
                type: Object,
                default: () => ({})
            },
            width: {
                type: [String, Number],
                default: 256
            },
            height: {
                type: [String, Number],
                default: 256
            },
            zIndex: {
                type: Number,
                default: 1000
            },
            placement: {
                type: String,
                default: 'right'
            },
            handle: {
                type: [Object, Array],
                default: () => ({})
            },
            afterVisibleChange: {
                type: Function,
                default: () => {
                }
            },
            keyboard: {
                type: Boolean,
                default: true
            },
            value: {
                type: Boolean,
                default: false
            },
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
