/**
 * @Author: 孟祥涵
 * @Date: 2020-10-08
 * @Description: index
 */

export const decorator = {
    data() {
        return {
            decorator: {
                title: [
                    'title',
                    {
                        rules: [
                            {required: true, message: '请输入标题'}
                        ]
                    }
                ],
                content: ['richText',
                    {
                        initialValue: '',
                        rules: [
                            {required: true, message: '请输入内容'}
                        ]
                    }
                ]
            }
        }
    },
}
