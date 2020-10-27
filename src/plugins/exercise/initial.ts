let window = unsafeWindow; //unsafeWindow是必须的，不然装饰器无法正常hack

import { handleQuestions } from "./main";

const realFetch = window.fetch;
window.fetch = (url, init = undefined) =>
    realFetch(url, init).then((response) => {
        if (/.*\/course\/api\/v3\/content\//.test(url as string)) {
            let res = response.clone();
            res.json().then((json) => {
                setTimeout(() => {
                    handleQuestions(json);
                }, 1000); //等待页面加载完，因为要确定answerSheetType
            });
        }
        return response;
    });
