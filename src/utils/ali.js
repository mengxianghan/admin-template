import moment from 'moment'
import OSS from 'ali-oss'
import {last} from 'lodash'
import {guid} from './util'
import {isUrl} from './validate'

/**
 * 默认配置
 * @type {{headers: {"Cache-Control": string}}}
 */
const defaultOptions = {
    headers: {
        'Cache-Control': 'public'
    }
}

/**
 * 生成文件路径
 * @param blob  文件流
 * @return {string}
 */
function generateFilePath(blob, folder) {
    const fileSuffix = last(blob.name.split('.'))
    const fileName = `/${guid()}.${fileSuffix}`
    const folderName = `${process.env.VUE_APP_OSS_UPLOAD_PATH}/${folder}/${moment().format('YYYY-MM-DD')}`
    const filePath = `${folderName}/${fileName}`.replace(/\/\//g, `/`)

    return filePath
}

/**
 * 获取 oss 域名
 * @param type
 */
function getDomain(type = '53') {
    return type === '53' ? process.env.VUE_APP_OSS_DOMAIN : process.env.VUE_APP_OSS_NET_DOMAIN
}

/**
 * 获取实例
 * @return {Client}
 */
function client() {
    return new OSS({
        accessKeyId: process.env.VUE_APP_OSS_ACCESS_KEY_ID,
        accessKeySecret: process.env.VUE_APP_OSS_ACCESS_KEY_SECRET,
        bucket: process.env.VUE_APP_OSS_BUCKET,
        region: process.env.VUE_APP_OSS_REGION,
    })
}

/**
 * 文件上传
 * @param blob      文件流
 * @param folder    目录
 * @param options   配置
 * @returns {Promise<void>}
 */
export function upload(blob, folder = '', options = {}) {
    return new Promise(resolve => {
        const filePath = generateFilePath(blob, folder)
        client().put(filePath, blob, {
            ...defaultOptions,
            ...options
        }).then(data => {
            resolve(data)
        })
    })
}

/**
 * 大文件上传
 * @param blob      文件流
 * @param folder    目录
 * @param options   配置
 * @returns {Promise<void>}
 */
export function multipartUpload(blob, folder = '', options = {}) {
    return new Promise(resolve => {
        const filePath = generateFilePath(blob, folder)
        client().multipartUpload(filePath, blob, {
            ...defaultOptions,
            ...options
        }).then(data => {
            resolve(data)
        })
    })
}

/**
 * 获取相对路径
 * @param path
 * @param type
 * @returns {*}
 */
export function getRelativePath(path, type = '53') {
    const domain = getDomain(type)
    if (typeof path !== 'string') return ''
    return path ? path.replace(`${domain}/`, '') : ''
}

/**
 * 获取完整路径
 * @param path
 * @param type
 * @returns {*}
 */
export function getFullPath(path, type = '53') {
    const domain = getDomain(type)
    if (typeof path !== 'string') return ''
    return isUrl(path) ? path : `${domain}/${path}`
}
