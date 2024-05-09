import {openidKey, tokenExpireKey, tokenKey} from "./globalConst.ts";
import {setGlobalToken, setTokenExpire} from "../types/globalData.ts";

import {webPostAuth} from "./auth.ts";
import AuthMsg = Items.AuthMsg;

export const autoLogin = async (): Promise<boolean> => {
    const token = localStorage.getItem(tokenKey)
    const expireKey = localStorage.getItem(tokenExpireKey)
    const openid = localStorage.getItem(openidKey)
    if (token == null || token == ''
        || expireKey == null || expireKey == '' || openid == null || openid == '') {
        // 从来没登录过
        return Promise.resolve(false)
    }


    console.log(Number(expireKey))
    console.log(new Date().getTime() / 1000)


    // 还有30s过期，就续签
    if (Number(expireKey) - 30 < new Date().getTime() / 1000) {
        // 自动续签
        try {
            let res = await webPostAuth(openid);
            const msg = res.data as AuthMsg

            // 本地存储
            localStorage.setItem(tokenKey, msg.token)
            localStorage.setItem(tokenExpireKey, String(msg.expirationAt))

            // 全局变量
            setGlobalToken(msg.token)
            setTokenExpire(msg.expirationAt)
            console.log(msg)
            return true
        } catch (err) {
            console.log(err)
            return false
        }
    } else {

        console.log(Number(expireKey))
        console.log(new Date().getTime() / 1000)
        console.log("token未过期，直接获取，无需续签")
        setGlobalToken(token)
        setTokenExpire(Number(expireKey))
        // console.log(expireKey)
        // console.log(new Date(Number(expireKey)).getTime())
        // console.log(Date.now())
        return Promise.resolve(true)
    }


}