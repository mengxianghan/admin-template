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

/**
 * 数据映射
 * @param list 数据源
 * @param structure 新结构
 *          {
 *              新字段名称: 对应数据中的字段名
 *          }
 * @param expand 拓展数据
 * @returns {[]}
 */
export function mapping(list, structure = {}, expand = {}) {
    let newList = []
    if (!Array.isArray(list)) return []
    list.forEach((item) => {
        let temp = {...expand}
        for (let key in structure) {
            if (structure[key] instanceof Function) {
                temp[key] = structure[key](item)
            } else {
                let value = item[structure[key]]
                if ((value instanceof Array) && value.length) {
                    temp[key] = mapping(value, structure, expand)
                } else {
                    temp[key] = (typeof value !== 'undefined') && value !== '' ? value : ''
                }
            }
        }
        newList.push(temp)
    })
    return newList
}
