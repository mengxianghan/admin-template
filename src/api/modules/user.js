/**
 * @Author: 孟祥涵
 * @Date: 2020-11-28
 * @Description: user
 */

import request from '@/utils/request'

export default {
    login: params => request.api.post('/user/login', params)
}
