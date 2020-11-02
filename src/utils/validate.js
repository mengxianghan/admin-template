/**
 * @Author: 孟祥涵
 * @Date: 2020-10-08
 * @Description: 验证类
 */

/**
 * 验证 url
 * @param {String} str
 */
export function isUrl(str) {
    return /^(https?:|mailto:|tel:)/.test(str)
}

