/**
 * @Author: 孟祥涵
 * @Date: 2020-10-08
 * @Description: getters.js
 */

export default {
    appComplete: state => state.app.complete,
    isLogin: state => state.user.isLogin,
    userInfo: state => state.user.userInfo,
    token: state => state.user.token
}
