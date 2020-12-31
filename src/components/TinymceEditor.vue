<template>
    <div>
        <editor :init="init"
                v-model="content"
                :key="key"/>
    </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
import {upload} from '@/utils/ali'

export default {
    name: 'TinymceEditor',
    components: {
        Editor
    },
    props: {
        value: {
            type: String,
            default: ''
        },
        options: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            init: {
                language: 'zh_CN',
                menubar: false,
                height: 450,
                plugins: 'image media',
                //toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | image',
                toolbar: 'undo redo | alignleft aligncenter alignright alignjustify | outdent indent | image media',
                draggable_modal: true,
                branding: false,
                content_style: `
                        * { margin:0; padding:0; }
                        body { font-family:"PingFang SC"; line-height:1.7; }
                    `,
                images_upload_handler: async (blobInfo, success, failure) => {
                    const {res, name} = await upload(blobInfo.blob(), `/editor`)
                    if (res.status === 200) {
                        success(`${process.env.VUE_APP_OSS_DOMAIN}/${name}`)
                    } else {
                        failure('上传失败')
                    }
                },
                media_alt_source: false,
                media_dimensions: false,
                image_dimensions: false,
                media_poster: false,
                media_live_embeds: true,
                file_picker_callback: (callback, value, meta) => {
                    //文件分类
                    let fileType = ''
                    //为不同插件指定文件类型及后端地址
                    switch (meta.filetype) {
                        case 'image':
                            fileType = '.jpg, .jpeg, .png, .gif'
                            break
                        case 'media':
                            fileType = '.mp4'
                            break
                    }
                    //模拟出一个input用于添加本地文件
                    let input = document.createElement('input')
                    input.setAttribute('type', 'file')
                    input.setAttribute('accept', fileType)
                    input.click()
                    input.onchange = async () => {
                        let file = input.files[0]
                        const {res, name} = await upload(file, `/editor`)
                        if (res.status === 200) {
                            callback(`${process.env.VUE_APP_OSS_DOMAIN}/${name}`)
                        } else {
                            failure('上传失败')
                        }
                    }
                },
                ...this.options
            },
            content: '',
            key: ''
        }
    },
    mounted() {
        this.key = new Date().getTime()
        this.content = this.value
    },
    watch: {
        value(val) {
            this.content = val
        },
        content(val) {
            this.$emit('input', val)
            this.$emit('change', val)
        }
    }
}
</script>

<style scoped>

</style>
