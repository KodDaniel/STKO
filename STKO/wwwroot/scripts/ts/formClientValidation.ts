export type JSONerrors = { [index: string]: string[]; };


export class FormClientValidation
{
    static getValidationErrorElements(errors: JSONerrors): Map<string, HTMLDivElement>
    {
        const map = new Map<string, HTMLDivElement>();

        //Namnen på alla input-fält som har en misslyckad validering
        const propertyNames = Object.keys(errors);

        //Alla errors för respektive fält
        const propertyErrors: string[][] = Object.values(errors);


        for (let index = 0; index < propertyNames.length; index++)
        {
            const div: HTMLDivElement = this.createDiv(propertyNames[index]);

            //Om vi har flera fel får vi ett UL-element, annars ett Span-element 
            const errorElement: HTMLUListElement | HTMLSpanElement = (propertyErrors[index].length > 1) ?
                this.createErrorMessage(propertyErrors[index]) : this.createErrorMessage(propertyErrors[index][0]);

            div.insertAdjacentElement("afterbegin", errorElement);

            map.set(propertyNames[index], div);
        }

        return map;
    }

    private static createDiv(propertyName: string): HTMLDivElement
    {
        const div: HTMLDivElement = document.createElement("div");
        div.classList.add("text-danger");
        div.setAttribute("id", `${propertyName}-error`);
        return div;
    }

    //Type Overloads
    private static createErrorMessage(propertyError: string): HTMLSpanElement;
    private static createErrorMessage(propertyErrors: string[]): HTMLUListElement;

    private static createErrorMessage(errors: string[] | string): HTMLUListElement | HTMLSpanElement
    {
        //Om vi endast har 1 fel kopplat till det specifika input-elementet
        if (typeof errors === "string")
        {
            const spanElement = document.createElement("span");
            spanElement.insertAdjacentText("afterbegin", errors);
            return spanElement;
        }
        //Om vi har flera fel kopplat till det specifika input-elementet
        else
        {
            const ulElement: HTMLUListElement = document.createElement("ul");

            for (let i = 0; i < errors.length; i++)
            {
                const liElement: HTMLLIElement = document.createElement("li");
                liElement.insertAdjacentText("afterbegin", errors[i]);
                ulElement.insertAdjacentElement("beforeend", liElement);
            }

            return ulElement;
        }

    }
}