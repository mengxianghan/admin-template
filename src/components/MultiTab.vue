<!--
 * @Author: 孟祥涵
 * @Date: 2020-10-23
 * @Description: MultiTab
-->
<template>
    <div class="multi-tab">
        <a-tabs :active-key="current"
                type="editable-card"
                hide-add
                @change="onChange"
                @edit="onEdit">
            <a-tab-pane v-for="(item,index) in list"
                        :key="index"
                        :tab="item.meta.title"
                        :closable="list.length > 1"></a-tab-pane>
        </a-tabs>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    name: 'MultiTab',
    data() {
        return {}
    },
    computed: {
        ...mapGetters({
            list: 'multiTab/list',
            current: 'multiTab/current'
        }),
    },
    watch: {
        '$route'(to) {
            this.onPush(to)
        },
    },
    created() {
    },
    mounted() {
        this.onPush(this.$route)
    },
    methods: {
        onPush(route) {
            this.$store.dispatch('multiTab/push', {route})
        },
        onChange(key) {
            this.$router.push(this.list[key])
        },
        onEdit(key, action) {
            switch (action) {
                case 'remove':
                    this.$store.dispatch('multiTab/close', key)
                    break
            }
        },
    },
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
