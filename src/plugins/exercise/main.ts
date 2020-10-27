import { Global, DEBUG_MODE } from "@src/global";
import { addMessage, sleep } from "@src/utils/common";

import { parseAnswers } from "./parser";
import { solveQuestions } from "./solver";

async function outputAnswers(answers: string[]) {
    Global.messages = [];
    let index = 1;
    for (const answer of answers) {
        //因为答案的显示与答题被分离，所以要同步答案的输出和答题，还得另写一套，算了
        // if (Global.USER_SETTINGS.autoSolveNormal) {
        //     await sleep(Global.USER_SETTINGS.solveInterval);
        // }

        addMessage(`${String(index).padStart(2, "0")}、${answer}`);

        index++;
    }
}

export async function handleQuestions(encryptedJson: FirstGrab) {

    let { questionType, answers } = parseAnswers(encryptedJson);

    console.log(answers);
    outputAnswers(answers);

    if (Global.USER_SETTINGS.autoSolveNormal) {
        solveQuestions(questionType, answers);
    }
}
