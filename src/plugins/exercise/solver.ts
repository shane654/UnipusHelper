import { sleep } from "@utils/common";
import { Global } from "@src/global";

function generateRandomInterval() {
    let interval = Math.random() * Global.USER_SETTINGS.solveIntervalMax;
    interval =
        interval < Global.USER_SETTINGS.solveIntervalMin
            ? Global.USER_SETTINGS.solveIntervalMin
            : interval;
    return interval;
}

function handleChoice(element: HTMLInputElement) {
    if (!element.checked) element.click();
}

function handleInput(element: Element, answerText: string) {
    $(element)
        .trigger("click")
        .trigger("focus")
        .trigger("keydown")
        .trigger("input");
    if (/input/i.test(element.tagName)) {
        //todo 这里为什么要这么做呢，是为了触发u校园自己的时间监听吗
        var setValue = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")!
            .set;
        (setValue as Function).call(element, answerText);
        var e = new Event("input", { bubbles: true });
        element.dispatchEvent(e);
    } else {
        // var evt = new InputEvent("input", {
        //     inputType: "insertText",
        //     data: st,
        //     dataTransfer: null,
        //     isComposing: false,
        // });
        // dom.value = st;
        // dom.dispatchEvent(evt);
        (element as HTMLTextAreaElement).value = answerText;
    }
    $(element)
        .trigger("keyup")
        .trigger("change")
        .trigger("blur");
}

export async function solveQuestions(questionType: string, answers: string[]) {
    let inputOnPaper = document.querySelectorAll('input[class^="fill-blank--bc-input"]');
    let inputOnPaper3 = document.querySelectorAll('input[class^="cloze-text-pc--bc-input"]');
    let textareaOnPaper = document.querySelectorAll('textarea[class^="writing--textarea"]');
    let textareaOnPaper2 = document.querySelectorAll('div[class^="cloze-text-pc--fill-blank"]');

    for (const [questionIndex, answerText] of answers.entries()) {
        await sleep(generateRandomInterval());

        switch (questionType) {
            case "singleChoice":
                const index = answerText.toUpperCase().charCodeAt(0) - 65;
                handleChoice(
                    document.querySelectorAll(`[name=single-${questionIndex + 1}]`)[
                        index
                    ] as HTMLInputElement,
                );
                break;

            case "multiChoice":
                for (const option of answerText) {
                    const index = option.toUpperCase().charCodeAt(0) - 65;
                    handleChoice(
                        document.querySelectorAll(`[name=multichoice-${questionIndex + 1}]`)[
                            index
                        ] as HTMLInputElement,
                    );
                }

                break;

            case "input1":
            case "input2":
                handleInput(inputOnPaper[questionIndex], answerText);
                break;

            case "input3":
                handleInput(inputOnPaper3[questionIndex], answerText);
                break;

            case "textarea":
                handleInput(textareaOnPaper[questionIndex], answerText);
                break;

            case "textarea2":
                handleInput(
                    textareaOnPaper2[questionIndex].firstElementChild as Element,
                    answerText,
                );
                break;
        }
    }
}
