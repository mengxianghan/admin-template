/**
 * @Author: 孟祥涵
 * @Date: 2020-10-08
 * @Description: storage.js
 */

import {upperFirst} from 'lodash'

/**
 * local        localstorage
 * session      sessionstorage
 * cookie       cookie
 */
const storageMap = [
    {key: 'token', type: 'local'},
    {key: 'userInfo', type: 'local', dataType: 'object'},
    {key: 'isLogin', type: 'local'},
    {key: 'permission', type: 'local', dataType: 'object'}
]

const storage = {}

storageMap.forEach(item => {
    //set
    storage[`set${upperFirst(item.key)}`] = (val) => {
        let res
        val = item.dataType && item.dataType === 'object' ? JSON.stringify(val) : val
        switch (item.type) {
            case 'session':
                res = sessionStorage.setItem(item.key, val)
                break
            case 'local':
                res = localStorage.setItem(item.key, val)
                break
            case 'cookie':
                res = Cookies.set(item.key, val, item.config || {})
                break
        }
        return res
    }

    //get
    storage[`get${upperFirst(item.key)}`] = () => {
        let res
        switch (item.type) {
            case 'session':
                res = sessionStorage.getItem(item.key)
                break
            case 'local':
                res = localStorage.getItem(item.key)
                break
            case 'cookie':
                res = Cookies.get(item.key, item.config || {})
                break
        }
        if (item.dataType && item.dataType === 'object') {
            res = JSON.parse(res)
        } else {
            res = res === 'true' || res === 'false' ? eval(res) : res
        }

        return res
    }

    //remove
    storage[`remove${upperFirst(item.key)}`] = () => {
        let res
        switch (item.type) {
            case 'session':
                res = sessionStorage.removeItem(item.key)
                break
            case 'local':
                res = localStorage.removeItem(item.key)
                break
            case 'cookie':
                res = Cookies.remove(item.key, item.config || {})
                break
        }
        return res
    }
})

export default storage

