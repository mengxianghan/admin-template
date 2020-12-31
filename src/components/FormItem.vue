<!--
 * @Author: 孟祥涵
 * @Email: 1056811341@qq.com
 * @Date: 2020-12-15
 * @Description: FormItem
-->
<template>
    <a-form-item v-bind="$attrs"
                 v-on="$listeners">
        <a-row :gutter="gutter">
            <a-col :span="span">
                <template v-for="(_,key,index) in $slots">
                    <slot v-if="key!=='tip'"
                          :name="key"></slot>
                </template>
            </a-col>
            <a-col :span="24 - span">
                <slot v-if="$slots.tip"
                      name="tip"></slot>
                <div class="form-item__tip">
                    {{ tip }}
                </div>
            </a-col>
        </a-row>
    </a-form-item>
</template>

<script>
export default {
    name: 'FormItem',
    props: {
        gutter: {
            type: [String, Number],
            default: 24
        },
        span: {
            type: [String, Number],
            default: 12
        },
        tip: {
            type: String,
            default: ''
        }
    },
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
.form-item {
    &__tip {
        color: $text-secondary-color;
        line-height: 20px;
        padding: 10px 0 0 0;
    }
}
</style>
