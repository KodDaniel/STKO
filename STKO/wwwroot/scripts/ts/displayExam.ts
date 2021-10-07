import {HttpVerb,Question } from "./sharedTypes";

const questionLink = document.getElementById("QuestionLink") as HTMLLinkElement | null;
const questionDiv = document.getElementById("Questions") as HTMLDivElement | null;
const settingsLink = document.getElementById("SettingsLink") as HTMLLinkElement | null;
const settingsDiv = document.getElementById("Settings") as HTMLDivElement | null;


//Hämta från Html eller URL
const examId =  document.getElementById("ExamId")?.innerText ?? window.location.pathname.split("/")[3];

questionLink?.addEventListener("click", (event: MouseEvent) =>
{
    event.preventDefault();

        //Om frågorna laddas för första gången
        if (questionDiv?.innerHTML.trim() === "")
        {
            $.ajax({
                type: HttpVerb.GET,
                url: `/api/ExamContent/GetQuestions/${examId}`,
                //Kom ihåg: En shape type matchar även om vi har FLER egenskaper i objektet än de som finns i constraint-typen
                success: (questions: Question[]) =>
                {
                    insertQuestions(questions);

                    settingsDiv?.classList.add("d-none");
                    questionDiv.classList.remove("d-none");
                },
                error: (response) =>
                {
                //    console.log(response.responseText);
                }
            });
        }
        //Annars: visa det tidigare innehållet (gör ingen ny AJAX-request)
        else
        {
            settingsDiv?.classList.add("d-none");
            questionDiv?.classList.remove("d-none");
        }

}, false);


const insertQuestions = (questions: Question[]): void =>
{
    //Om vi har frågor att hämta från servern
    if (questions.length > 0)
    {
        const questionAndAnswerArr: string[] = questions.map(question =>
        {
            const { questionId, query, answer }: Question = question;

            const queryHtml: string = `<div class="card-text font-weight-bold" id="query">${query}</div>`;

            const answerHtml: string =
                (answer !== null) ? `<div class="card-text" id="answer">${answer}</div>` :
                    "<div class='card-text bg-secondary' id='answer'>Svar saknas</div>";

            return `<div class="card border-primary">
                          <div class="card-body text-center" questionId=${questionId}">
                                 ${queryHtml}
                                  <p></p>
                                 ${answerHtml}
                        </div>
                    </div>`;

        });
        questionDiv?.classList.add("card-columns");
            questionAndAnswerArr.forEach(questionAndAnswer =>
            {
                questionDiv?.insertAdjacentHTML("afterbegin", questionAndAnswer);
            });
    }
    else
    {
        questionDiv?.classList.remove("card-columns");
        questionDiv!.innerHTML = "<h3 id='NoQuestions'class='text-center'>Provet har inga frågor</h3>";
        
    }
};

settingsLink?.addEventListener("click", (event) =>
{
        event.preventDefault();
        questionDiv?.classList.add("d-none");
        settingsDiv?.classList.remove("d-none");
}, false);




/*const questions = document.querySelectorAll(".card.border-primary.mb-3 .card-body [questionId]");*/

//questionDiv?.addEventListener("click", (event) => {
//    if (event.target && event.target) {

//        //const question = event.target.closest("[questionId]");
//        //const query = question.querySelector("#query").innerText;
//        //const answer = question.querySelector("#answer").innerText;

//        //question.innerHTML = `<form id="UpdateQuestion">
//        //                        <div class="form-group">
//        //                               <label class="font-weight-bold">Fråga</label>
//        //                                <div><span class="text-danger"></span></div>
//        //                                <textarea class="form-control" rows="9">${query}</textarea>
//        //                            </div>
//        //                            <div class="form-group">
//        //                               <label class="font-weight-bold">Svar</label>
//        //                                <div><span  class="text-danger"></span></div>
//        //                                <textarea class="form-control" rows="9">${answer}</textarea>
//        //                            </div>
//        //                        </form>`;
//    }

//}); 