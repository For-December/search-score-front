import {request} from "./myAxois";
import SearchReq = Items.SearchReq;
import TransDef = Items.TransDef;

export const webGetScoreInfos = (teacherName: string, courseName: string)
    : Promise<TransDef> => {
    return request({
        method: 'POST',
        url: '/user/search',
        data: {
            teacherName: teacherName,
            courseName: courseName,
        }
    })
};