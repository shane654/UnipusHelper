// import * as CryptoJS from "crypto-js";
function decrypt(json: FirstGrab) {
    if (json) {
        let r = json.content.slice(7),
            o = CryptoJS.enc.Utf8.parse("1a2b3c4d" + json.k),
            i = CryptoJS.enc.Hex.parse(r),
            a = CryptoJS.enc.Base64.stringify(i),
            contentJson = JSON.parse(
                CryptoJS.AES.decrypt(a, o, {
                    mode: CryptoJS.mode.ECB,
                    padding: CryptoJS.pad.ZeroPadding,
                }).toString(CryptoJS.enc.Utf8),
            );
        json = contentJson;
        console.log(json);
    }
    return json;
}

// enum QuestionKeys {
//     shortAnswer = "questions:shortanswer", //大填空（长篇
//     shortAnswer2 = "shortanswer:shortanswer",
//     scoopQuestions = "questions:scoopquestions", //小填空
//     sequence = "questions:sequence", //排序
//     questions = "questions:questions", //选择（多选、单选）、也可能是填空题目
//     scoopSelection = "questions:scoopselection", //下拉
//     textMatch = "questions:textmatch", //大意填空（长篇
//     bankedCloze = "questions:bankedcloze", //单填空，视听说选填A-E
// }

// QuestionKeys.bankedCloze

const QUESTION_KEYS = [
    "questions:shortanswer", //大填空（长篇
    "shortanswer:shortanswer",
    "questions:scoopquestions", //小填空
    "questions:sequence", //排序
    "questions:questions", //选择（多选、单选）、也可能是填空题目
    "questions:scoopselection", //下拉
    "questions:textmatch", //大意填空（长篇
    "questions:bankedcloze", //单填空，视听说选填A-E
];

const QUESTION_SELECTORS = [
    'input[name^="single-"]', //1单选
    'input[class^="MultipleChoice--checkbox-"]', //2多选
    'input[class^="fill-blank--bc-input"]', //3小填空
    'textarea[class^="writing--textarea"]', //4大填空（式1）
    'div[class^="cloze-text-pc--fill-blank"]', //5大意填空（text match）
    'input[class^="cloze-text-pc--bc-input"]', //6单填空
    'pre[class^="writing--pre"]',
];

//content_1:scoopquestions "fillblankScoop"
//content_2:scoopquestions "fillblankScoop"

export function parseAnswers(json: FirstGrab) {
    let decryptedJson = decrypt(json);
    const [key, questionBase] = Object.entries(decryptedJson)[0];

    let answerNetType = 0, //json内定义的题目类型
        answerSheetType = 0;
    // key = Object.keys(json)[0],
    // questionBase = json[key],
    if (Object.entries(json).length > 1) {
    } //todo多页

    //从接口获取到的题目类型
    answerNetType = QUESTION_KEYS.indexOf(key) + 1; //从1开始计算
    for (let [index, selector] of QUESTION_SELECTORS.entries()) {
        if (document.querySelectorAll(selector).length) {
            answerSheetType = index + 1;
            //当前页面上的题目类型
            break; //实际上的题目类型
        }
    }
    console.log({ answerSheetType: answerSheetType, answerNetType: answerNetType });

    let questionType = "";
    let answers: string[] | any = [];
    switch (answerSheetType) {
        case 1:
            if (answerNetType === 5) {
                //真单选
                questionType = "singleChoice";
                for (const question of questionBase.questions) {
                    answers.push(question.answers[0].replace(" ", ""));
                }
            }
            break;

        case 2:
            if (answerNetType === 5) {
                //多选
                questionType = "multiChoice";
                for (const question of questionBase.questions) {
                    //没有标答的情况
                    if (!question.answers) answers = ["A"];
                    else answers.push(question.answers);
                }
            }
            break;

        case 3:
            if (answerNetType === 3 || answerNetType === 5) {
                //3真填空; 5假单选，真填空，未曾见过
                questionType = "input2";
                for (const question of questionBase.questions) {
                    answers.push(question.answers[0]);
                }
            }
            break;

        case 4: //大填空，会闪
            questionType = "textarea";
            for (const question of questionBase.questions) {
                let answer = question.analysis.html;
                if (!answer.length) answer = questionBase.analysis.html;

                answers.push(
                    answer
                        .replace(/<(.+?)>/gm, "") //去除html标签
                        .replace(/&.{1,6}?;/gm, "") //去除&转义
                        .replace(/^\d\.\s*/, ""), //去除序号
                );
            }
            break;

        case 5:
            if (answerNetType == 7) {
                //大意填空，未曾遇到
                questionType = "textarea2";
                for (const question of questionBase.questions) {
                    answers.push(question.answer.replace(" ", ""));
                }
            }
            break;

        case 6:
            if (answerNetType == 8) {
                //单填空，未曾遇到
                questionType = "input3";
                for (const question of questionBase.questions) {
                    answers.push(question.answer.replace(" ", ""));
                }
            }
            break;

        default:
            //也就是sheet==0
            switch (answerNetType) {
                // case 2: //没遇到过
                //     break;
                case 4: //排序，忘了哪里的了answerSheetType为默认，这个自动不了
                    for (const question of questionBase.questions) {
                        answers.push(question.answer);
                    }
                    break;
                    
                case 6: //下拉，未遇到过
                    questionType = "sequence";
                    for (const question of questionBase.questions) {
                        answers.push(question.answers[0]);
                    }
                    break;
            }
    }

    return { questionType: questionType, answers: answers };
}
