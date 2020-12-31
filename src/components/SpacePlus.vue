<!--
 * @author: 孟祥涵
 * @email: 1056811341@qq.com
 * @date: 2020-12-30
 * @description: 间距
-->
<script>
export default {
    name: 'SpacePlus',
    props: {
        divider: {
            type: Boolean,
            default: true
        },
        size: {
            type: Number,
            default: 8
        }
    },
    data() {
        return {
            nodes: []
        }
    },
    render(createElement, context) {
        const {divider, size} = this
        const nodes = this.$slots.default
        return createElement('a-space', {
            attrs: {
                size: divider ? 0 : size
            }
        }, nodes.map((node, index) => {
            return createElement('div', [
                node,
                divider && (index + 1 < nodes.length) ? createElement('a-divider', {
                    attrs: {
                        type: 'vertical'
                    }
                }) : ''
            ])
        }))
    }
}
</script>

<style lang="scss" scoped>
.action {
    display: inline;

    &--block {
        display: block;
    }
}
</style>
