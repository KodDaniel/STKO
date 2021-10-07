
/**
*An abstract superclass that brings together common behaviors for a user message
*/
export abstract class UserMessage
{
    private message: string;
    abstract text: string;
    abstract readonly id: string;
    abstract readonly classes: string[];
    
    get getMessage(): string
    {
        return this.message;
    };

    protected createUserMessage(text: string, id: string, classes: string[]): void
    {
        this.message = `<div class='userMessage ${classes.join(" ")}' id=${id}>
                             ${text}
                      </div>`;
    }
}

/**
*A specific class for error messages
*/
export class ErrorMessage extends UserMessage
{
    constructor(public text: string, public id: string, public classes: string[] = ["errorMessage", "alert", "alert-danger"])
    {
        super();
        this.createUserMessage(text, id, classes);
    }
}

/**
*A specific class for success messages
*/
export class SuccessMessage extends UserMessage
{
    constructor(public text: string, public id: string, public classes: string[] = ["successMessage", "alert", "alert-success"])
    {
        super();
        this.createUserMessage(text, id, classes);
    }

}





