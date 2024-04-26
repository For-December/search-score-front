import {request} from "./myAxois";
import TransDef = Items.TransDef;

export const webGetScoreInfos = (teacherName: string, courseName: string, auth: string)
    : Promise<TransDef> => {
    return request({
        method: 'POST',
        url: '/user/search',
        data: {
            teacherName: teacherName,
            courseName: courseName,
        },
        headers: {
            "Authorization": auth
        }
    })
};

export const webUploadScoreFile = (auth:string)
    : Promise<TransDef> => {
    return request({
        method: 'POST',
        url: '/user/upload',
        headers: {
            "Authorization": auth
        }
    })
};