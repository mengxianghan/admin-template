/**
 * @Author: 孟祥涵
 * @Date: 2020-10-08
 * @Description: request.js
 */


import jschardet from 'jschardet'
import axios from 'axios'
import {message} from 'ant-design-vue'
import store from '@/store'

const instance = axios.create()
const CancelToken = axios.CancelToken
let pending = []

/**
 * 取消请求
 * @param config
 */
/*const cancelPending = (config) => {
    pending.forEach((item, index) => {
        if (config) {
            if (item.umet === `${config.url}&${config.method}`) {
                item.cancel() // 取消请求
                pending.splice(index, 1) // 移除当前请求记录
            }
        } else {
            item.cancel() // 取消请求
            pending.splice(index, 1) // 移除当前请求记录
        }
    })
}*/

/**
 * 请求拦截
 */
instance.interceptors.request.use(request => {
    const {isLogin, token} = store.getters

    if(isLogin){
        request.headers['AUTH-TOKEN'] = `Bearer ${token}`
    }

    // cancelPending(req)
    // req.cancelToken = new CancelToken((c) => {
    //     pending.push({
    //         umet: `${req.url}&${req.method}`,
    //         cancel: c
    //     })
    // })

    return request
}, err => {
    return Promise.reject(err)
})

/**
 * 响应拦截
 */
instance.interceptors.response.use(response => {
    // 错误处理
    const {code, msg} = response.data || {}
    if (code && code !== '200') {
        if (msg) {
            message.error(msg)
        }
    }
    // cancelPending(res.config)
    return response
}, err => {
    return Promise.reject(err)
})

class Http {
    constructor(config = {}) {
        this.config = {
            timeout: 0,
            transformResponse: [function transformResponse(data) {
                if (typeof data === 'string') {
                    try {
                        let c1 = data.toString().replace(/:\d{17,}/g, ':"@rr$&"').replace(/@rr:\s/g, '').replace(/@rr:/g, '')
                        let c2 = c1.replace(/:\d{1,}\.\d+/g, ':"@rr$&"').replace(/@rr:\s/g, '').replace(/@rr:/g, '')
                        data = JSON.parse(c2)
                    } catch (e) {
                    }
                }
                return data
            }],
            ...config
        }
    }

    /**
     * 请求
     * @param config
     * @returns {Promise<unknown>}
     */
    request(config = {}) {
        return new Promise((resolve, reject) => {
            instance
                .request({
                    ...this.config,
                    ...config
                })
                .then(res => {
                    resolve(res.data)
                }, err => {
                    reject(err)
                }).catch(err => {
                reject(err)
            })
        })
    }

    /**
     * POST 请求
     * @param url
     * @param data
     * @param config
     * @returns {Promise<unknown>}
     */
    post(url = '', data = {}, config = {}) {
        return this.request({
            url: url,
            method: 'post',
            data,
            ...config
        })
    }

    /**
     * GET 请求
     * @param url
     * @param params
     * @param config
     * @returns {Promise<unknown>}
     */
    get(url = '', params = {}, config = {}) {
        return this.request({
            url: url,
            method: 'get',
            params: params,
            ...config
        })
    }

    /**
     * 上传
     * @param url
     * @param formData
     * @param config
     * @returns {Promise<unknown>}
     */
    upload(url = '', formData = {}, config = {}) {
        return this.post(url, formData, {
            headers: {
                'content-type': 'multipart/form-data'
            },
            ...config
        })
    }

    /**
     * 下载
     * @param url
     * @param config
     * @returns {Promise<unknown>}
     */
    download(url = '', config = {}) {
        return this.request({
            url: url,
            baseURL: '',
            method: 'get',
            responseType: 'blob',
            ...config
        })
    }
}

class ReadFile extends Http {
    constructor() {
        super({
            baseURL: '',
            responseType: 'blob',
            transformResponse: [async (data) => {
                const encoding = await this._encoding(data)
                return new Promise((resolve, reject) => {
                    let reader = new FileReader()
                    reader.readAsText(data, encoding)
                    reader.onload = function (e) {
                        resolve(reader.result)
                    }
                })
            }]
        })
    }

    /**
     * 文本编码
     * @param data
     * @returns {Promise<unknown>}
     * @private
     */
    _encoding(data) {
        return new Promise((resolve, reject) => {
            let reader = new FileReader()
            reader.readAsBinaryString(data)
            reader.onload = function (e) {
                resolve(jschardet.detect(reader.result).encoding)
            }
        })
    }
}

class Api extends Http {
    constructor(gateway = '') {
        super({
            baseURL: `${process.env.VUE_APP_BASE_URL}${gateway}`
        })
    }
}

export default {
    readFile: new ReadFile(),
    api: new Api()
}

