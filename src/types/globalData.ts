import {ref} from "vue";

export const pageNum = ref(0)
export const pageNums = ref([0, 1, 2])

const globalToken = ref("")
const tokenExpire = ref(0)

export const setTokenExpire = (expire: number) => {
    tokenExpire.value = expire
}

export const getGlobalToken = (): string => {
    return globalToken.value
}

export const setGlobalToken = (token: string) => {
    globalToken.value = token
    return
}
export const isLogin = ref(false)