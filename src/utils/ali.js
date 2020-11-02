/**
 * @Author: 孟祥涵
 * @Date: 2020-10-08
 * @Description: 阿里 oss 文件上传
 */

import suffix from 'file-suffix'
import moment from 'moment'
import OSS from 'ali-oss'
import {uuid} from './util'
import {isUrl} from './validate'

/**
 * 文件上传
 * @param blob      文件流
 * @param folder    目录
 * @returns {Promise<void>}
 */
export function upload(blob, folder = '') {
    return new Promise(resolve => {
        const fileSuffix = suffix(blob.name)
        const fileName = `/${uuid()}.${fileSuffix}`
        const folderName = `${process.env.VUE_APP_OSS_UPLOAD_PATH}/${folder}/${moment().format('YYYY-MM-DD')}`
        const filePath = `${folderName}/${fileName}`.replace(/\/\//g, `/`)
        const client = new OSS({
            accessKeyId: process.env.VUE_APP_OSS_ACCESS_KEY_ID,
            accessKeySecret: process.env.VUE_APP_OSS_ACCESS_KEY_SECRET,
            bucket: process.env.VUE_APP_OSS_BUCKET,
            region: process.env.VUE_APP_OSS_REGION
        })
        client.put(filePath, blob).then(data => {
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
    const domain = type === '53' ? process.env.VUE_APP_OSS_DOMAIN : process.env.VUE_APP_OSS_NET_DOMAIN
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
    const domain = type === '53' ? process.env.VUE_APP_OSS_DOMAIN : process.env.VUE_APP_OSS_NET_DOMAIN
    if (typeof path !== 'string') return ''
    return isUrl(path) ? path : `${domain}/${path}`
}
