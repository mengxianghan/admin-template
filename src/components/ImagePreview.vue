<template>
    <a-modal v-model="visible"
             :footer="null"
             :body-style="{padding:'8px'}"
             @cancel="hide">
        <img :src="src" class="image-preview__image"/>
    </a-modal>
</template>

<script>
export default {
    name: 'ImagePreview',
    data() {
        return {
            visible: false,
            src: ''
        }
    },
    methods: {
        show(src) {
            this.visible = true
            this.src = src
        },
        hide() {
            this.visible = false
        }
    }
}
</script>

<style lang="scss" scoped>
.image-preview {
    &__image {
        width: 100%;
        border-radius: 4px;
    }
}
</style>
