import { ErrorMessage, SuccessMessage } from "./userMessage";
import { FormClientValidation, JSONerrors } from "./formClientValidation";
import * as $ from "jquery";
import { HttpVerb, Exam } from "./sharedTypes";

const form = (document.getElementById("CreateForm") ?? document.getElementById("UpdateForm")) as HTMLFormElement | null;

//När formulär postas 
form?.addEventListener("submit", (event: MouseEvent) =>
{
        event.preventDefault();

        //Ta bort alla tidigare användarmeddelanden
        [...document.querySelectorAll(".userMessage")].forEach(message => message.remove());
        //Ta bort alla tidigare valideringsfel, först texten...
        [...form?.querySelectorAll("div[id$='-error']")].forEach(validationError => validationError.remove());
        //...sedan röd border 
        [...form?.elements].forEach(element => element.classList.remove("input-validation-error"));

        //Nyttjas enbart för uppdatering
        const examId: string | undefined = document.getElementById("ExamId")?.innerText.trim();
        //Används både för skapande och uppdatering
        const examName: string | undefined = (document.getElementById("ExamName") as HTMLInputElement | null)?.value;
        const sendReminderDate: string | undefined = (document.getElementById("SendReminderDate") as HTMLInputElement | null)?.value;
        const randomOrder: boolean | undefined = (document.getElementById("RandomOrder") as HTMLInputElement).checked;
        const examTime: string | undefined = (document.getElementById("ExamTime") as HTMLInputElement | null)?.value;

        $.ajax({
            type: (form.id === "CreateForm") ? HttpVerb.POST : HttpVerb.PUT,
            contentType: "application/json",
            url: "/api/ExamContent/",
            data: JSON.stringify({
                examId,
                examName,
                examTime,
                sendReminderDate,
                randomOrder
            }),
            success: () =>
            {
                const successMessage = new SuccessMessage("Provet har sparats", "saveExamSuccessMsg");
                form.insertAdjacentHTML("beforebegin", successMessage.getMessage);

                (form.id === "CreateForm") ?
                    form.reset() : (document.getElementById("ExamNameHeadline") as HTMLHeadingElement | null)!.innerText = examName!;

                //JQuery 
                $(`#${successMessage.id}`)?.fadeOut(6000);
            },

            error: (response) =>
            {
                if (response.status === 400 && response.responseJSON.title === "One or more validation errors occurred.")
                {
                    const errors: JSONerrors = response.responseJSON.errors;
                    const errorMap: Map<string, HTMLDivElement> = FormClientValidation.getValidationErrorElements(errors);

                    //Placera valideringsfelen i formuläret
                    errorMap.forEach((div: HTMLDivElement, id: string) => {
                        const inputField: HTMLInputElement | null = form?.querySelector(`#${id}`);
                        inputField?.insertAdjacentElement("beforebegin", div);
                        inputField?.classList.add('input-validation-error');
                    });

                }
                else
                {
                    const errorMessage = new ErrorMessage("Någonting gick fel", "saveExamErrorMsg");
                    form.insertAdjacentHTML("beforebegin", errorMessage.getMessage);
                }
            }
        });

    }, false);


