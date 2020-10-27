// interface Answer {
//     text: string;
//     type: string;
//     element: HTMLElement;
//     index: number;
// }

interface FirstGrab {
    code: number;
    content: string;
    version: number;
    publish_version: number;
    k: string;
}

type ExerciseQuestionType =
    | "questions:shortanswer"
    | "shortanswer:shortanswer"
    | "questions:scoopquestions"
    | "questions:sequence"
    | "questions:questions"
    | "questions:scoopselection"
    | "questions:textmatch"
    | "questions:bankedcloze";

interface QuestionsScoopQuestions {
    //sheet3 net3
    //questions[index].answers[0]
    analysis: { html: string; resources: any[] };
    category: "fillblankScoop";
    content: [{ scoop: { html: string; resources: any[] } }];
    questions: Array<{
        analysis: { html: string; resource: any[] };
        answers: string[];
        content: { html: string; resource: any[]; resources: any[] };
    }>;
}

interface QuestionsScoopShortAnswer {
    //大填空
    //40
    //questions.analysis.html 42也可，40 42格式并不严格，如果这个取不到，直接取.analysis.html
    //一般多个大填空是40，翻译等单独一个大填空的是42
    analysis: {};
    category: "shortanswerScoop";
    content: [{ scoop: { html: string; resources: any[] } }];
    questions: Array<{
        analysis: { html: string; resources: any[] };
        answers: any[];
        content: { html: string; resources: any[] };
        options: any[];
    }>;
}

interface QuestionsQuestions {
    //单选
    //15
    //questions[index].answers[0]
    analysis: { html: string; resources: any[] };
    category: "singlechoice";
    content: [];
    questions: Array<{
        analysis: { html: string; resource: any[] };
        answers: string[];
        content: { html: string; resources: any[] };
        options: Array<{
            caption: string;
            content: {
                html: string;
                resources: [];
            };
        }>;
    }>;
}

interface QuestionsQuestions2 {
    //多选
    //25
    //questions[index].answers 可能有多个选项，也可能为空，需要提供默认值
    analysis: { html: string; resources: any[] };
    category: "multichoice";
    content: [];
    questions: Array<{
        analysis: { html: string; resource: any[] };
        answers: string[];
        content: { html: string; resources: any[] };
        options: Array<{
            caption: string;
            content: {
                html: string;
                resources: [];
            };
        }>;
    }>;
}

interface QuestionsSequence {
    //排序
    //04
    //questions[index].answer
    analysis: {};
    category: "sequence";
    content: [];
    options: Array<{
        caption: string;
        content: {
            html: string;
            resources: [];
        };
    }>;
    questions: Array<{
        analysis: { html: string; resource: any[] };
        answer: string;
        content: { html: string; resources: any[] };
    }>;
}

type DecryptedJson = {
    [key in ExerciseQuestionType]: QuestionsScoopQuestions;
};
