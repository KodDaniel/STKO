export type Question = {
    questionId: number,
    query: string,
    answer: string;
};

export type Exam = {
    examId: number,
    examName: string,
    examTime: string,
    createDate:string,
    changeDate: string,
    randomOrder: string,
    sendReminderDate: string,
    userId: string,
    questions?: Question[];
};

export enum HttpVerb {
    GET = "GET",
    POST = "POST",
    DELETE = "DELETE",
    PATCH = "PATCH",
    PUT = "PUT"
};



