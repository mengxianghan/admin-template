/**
 * @Author: 孟祥涵
 * @Date: 2020-10-08
 * @Description: util
 */

/**
 * uuid
 * @returns {string}
 */
export function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
    })
}
