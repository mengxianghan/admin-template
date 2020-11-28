import Mock from 'mockjs2'
import {builder, getBody} from '../util'

/**
 * 登录
 */
Mock.mock(/\/user\/login/, 'post', options => {
    const {username} = getBody(options)

    return builder(Mock.mock({
        'username': username,
        'token': '@id'
    }))
})

