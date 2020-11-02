<!--
 * @Author: 孟祥涵
 * @Date: 2020-10-23
 * @Description: MultiLabel
-->
<template>
    <div class="multi-label">
        <div class="multi-label__btn">
            <a-icon type="left"/>
        </div>
        <a-tabs default-active-key="1"
                type="editable-card"
                hide-add>
            <a-tab-pane key="0"
                        :closable="false">
                <template #tab>
                    <a-icon type="home"
                            :style="{fontSize:'14px',margin:'0'}"/>
                </template>
            </a-tab-pane>
            <a-tab-pane key="1" tab="Tab 1"></a-tab-pane>
            <a-tab-pane key="2" tab="Tab 2"></a-tab-pane>
            <a-tab-pane key="3" tab="Tab 3"></a-tab-pane>
        </a-tabs>
        <div class="multi-label__btn">
            <a-icon type="right"/>
        </div>
        <div class="multi-label__btn">
            <a-icon type="down"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MultiLabel",
        data() {
            return {}
        },
        computed: {},
        watch: {},
        created() {
        },
        mounted() {
        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
    .multi-label {
        $height: 40px;

        background: #fff;
        display: flex;
        align-items: center;

        &__btn {
            height: $height;
            display: flex;
            align-items: center;
            padding: 0 8px;
            cursor: pointer;

            + .multi-label__btn {
                border-left: #ccc solid 1px;
            }
        }

        ::v-deep {
            .ant-tabs {
                flex: 1;

                &-bar {
                    margin: 0;
                    border: 0;
                }

                &.ant-tabs-card {
                    .ant-tabs-card-bar {
                        .ant-tabs-tab {
                            border-bottom: 0;
                            line-height: 1;
                            display: inline-flex;
                            align-items: center;

                            &-active {
                                font-weight: 400;
                            }

                            .anticon {
                                font-size: 10px;
                                // margin: 2px -6px 0 6px;
                            }
                        }
                    }
                }

                .ant-tabs-top-content,
                .ant-tabs .ant-tabs-bottom-content {
                    display: none;
                }
            }
        }
    }
</style>
