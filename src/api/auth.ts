import {request} from "./myAxois";
import TransDef = Items.TransDef;

export const webPostAuth = (code:string)
    : Promise<TransDef> => {
    return request({
        method: 'POST',
        url: '/auth/web',
        data:{
            code:code
        }
    })
};