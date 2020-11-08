<!--
 * @Author: 孟祥涵
 * @Date: 2020-10-23
 * @Description: MultiTab
-->
<template>
    <div class="multi-tab">
        <a-tabs :active-key="active"
                type="editable-card"
                hide-add
                @change="onChange"
                @edit="onEdit">
            <a-tab-pane v-for="(item,index) in list"
                        :key="index" :tab="item.meta.title"
                        :closable="list.length > 1"></a-tab-pane>
        </a-tabs>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "MultiTab",
        data() {
            return {}
        },
        computed: {
            ...mapGetters({
                list: 'multiTab/list',
                active: 'multiTab/active'
            })
        },
        watch: {
            '$route'(to, from) {
                this.init()
            }
        },
        created() {
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                this.$store.dispatch('multiTab/init', {
                    route: this.$route
                })
            },
            onChange(activeKey) {
                const route = this.list[activeKey]
                this.$store.dispatch('multiTab/change', {
                    index: activeKey
                })
                this.$router.push(route)
            },
            onEdit(targetKey, action) {
                if (action === 'remove') {
                    this.$store.dispatch('multiTab/remove', {
                        index: targetKey
                    })
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .multi-tab {
        $height: 40px;

        ::v-deep {
            .ant-tabs-bar {
                margin: 0;
            }

            .ant-tabs-nav .ant-tabs-tab-active {
                font-weight: normal;
            }
        }
    }
</style>
