import {openidKey, tokenExpireKey, tokenKey} from "./globalConst.ts";
import {globalToken, pageNum} from "../types/globalData.ts";

import {webPostAuth} from "./auth.ts";
import AuthMsg = Items.AuthMsg;

export const autoLogin = async (): Promise<boolean> => {
    const token = localStorage.getItem(tokenKey)
    const expireKey = localStorage.getItem(tokenExpireKey)
    const openid = localStorage.getItem(openidKey)
    if (token == null || token == '') {
        // 从来没登录过
        return Promise.resolve(false)
    }


    console.log(Number(expireKey))
    if (new Date(Number(expireKey)).getTime() < Date.now()) {
        // 自动续签
        try {
            let res = await webPostAuth(openid);
            const msg = res.data as AuthMsg
            globalToken.value = msg.token
            localStorage.setItem(tokenExpireKey, msg.token)
            localStorage.setItem(tokenExpireKey,new Date(msg.expirationAt).getTime().toString())
            console.log(msg)
            return true
        } catch (err) {
            console.log(err)
            return false
        }
    }else {
        console.log(expireKey)
        console.log(new Date(Number(expireKey)).getTime())
        console.log(Date.now())
        return Promise.resolve(true)
    }



}