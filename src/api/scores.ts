import {Items} from "../types/Items";
import {request} from "./myAxois";

export const webGetScoreInfos = ()
    : Promise<Items.ScoreInfo[]> => {
    return request({
        method: 'POST',
        url: '/user/search',
    })
};