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

    // 还有30s过期，就续签
    if (new Date(Number(expireKey)).getTime() - 1000 < new Date().getTime()) {
        // 自动续签
        try {
            let res = await webPostAuth(openid);
            const msg = res.data as AuthMsg
            setGlobalToken(msg.token)
            localStorage.setItem(tokenExpireKey, msg.token)
            const tokenExpire: number = new Date(msg.expirationAt).getTime()
            localStorage.setItem(tokenExpireKey, tokenExpire.toString())
            setTokenExpire(tokenExpire)
            console.log(msg)
            return true
        } catch (err) {
            console.log(err)
            return false
        }
    } else {

        console.log(new Date(Number(expireKey)).getTime())
        console.log(new Date().getTime())
        console.log("直接获取，无需续签")
        setGlobalToken(token)
        setTokenExpire(new Date(Number(expireKey)).getTime())
        // console.log(expireKey)
        // console.log(new Date(Number(expireKey)).getTime())
        // console.log(Date.now())
        return Promise.resolve(true)
    }


}