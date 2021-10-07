import { Exam, HttpVerb } from "./sharedTypes";
enum InitialCall { false, true }
import { SortOrder, SortExamTableRows, ExamColumnNames } from "./sortExamTableRows";
 
const contentDiv = document.getElementById("Content") as HTMLDivElement | null;
const tbody = document.getElementById("Examtbody") as HTMLTableElement | null;
const table = document.querySelector("Table") as HTMLTableElement | null;
 
const loadExamsFromServer = (callOrder: InitialCall): void =>
{
    $.ajax({ 
        type: HttpVerb.GET,
        contentType: "application/json",
        url: "/api/ExamContent/GetExamsForUser",
        success: (exams: Exam[]) =>
        {
            //Om vi har prov i databasen
            if (exams.length > 0)
            {
                table?.removeAttribute("hidden");

                (InitialCall.true) ? contentDiv?.removeAttribute("hidden") : tbody!.innerHTML = "";

                //Första anropet
                if (callOrder === InitialCall.true)
                {
                    contentDiv?.removeAttribute("hidden");
                    insertInTable(exams);
                    //Simulera ett klick för att initialt sortera på CreateDate
                    (document.getElementById("SortByCreateDateLink") as HTMLAnchorElement | null)?.click();
                }
                //Alla andra anrop
                if (callOrder === InitialCall.false)
                {
                    tbody!.innerHTML = "";
                    insertInTable(exams);
                }
            }
            //Inga prov finns i databasen
            else
            {
                table?.setAttribute("hidden", "true");
                contentDiv?.removeAttribute("hidden");
                const headlineDiv = document.getElementById("Headline") as HTMLDivElement | null;
                headlineDiv?.insertAdjacentHTML("beforeend",
                    "<h3 class='text-white text-center bg-dark'>Det finns inga prov att visa</h3>");
            }

        },
        error: (response) =>
        {
        //    console.log(response.responseText);
        }
    }); 
};

const insertInTable = (exams: Exam[]): void =>
{
    const rows: string[] = exams.map(exam =>
    {
        const { examId, examName, examTime, createDate, changeDate, sendReminderDate, randomOrder }: Exam = exam;
        return `<tr> 
                    <td id="ExamNameCol"><a href="/Exam/DisplayExam/${examId}">${examName}</a></td>
                    <td id="CreateDateCol">${createDate}</td>
                    <td id="ChangeDateCol">${changeDate}</td>
                    <td id="ExamTimeCol">${examTime}</td>
                    <td id="RandomOrderCol">${randomOrder}</td>
                    <td id="SendReminderDateCol">${sendReminderDate}</td>
                    <td>
                        <button id="DeleteBtn" examId=${examId} class="btn-danger">Radera</button>
                    </td>
                </tr>`;

    });

    rows.forEach(row =>
    {
        tbody?.insertAdjacentHTML("beforeend", row);
    });
};


tbody?.addEventListener("click", (event: MouseEvent) => {

        const deleteBtn = event.target as HTMLButtonElement | null;

        //Vi vi säkerställa att det är en HTMLBUTTON vi klickat på med ID:et "DeleteBtn" 
        //Om elementet vi klickat på INTE är av av typen "HTMLButtonElement" kommer villkoret till vänster bli false...
        //...eftersom deleteBtn då är null
        if (deleteBtn && deleteBtn.id === "DeleteBtn")
        {
            if (!confirm("Är du säker på att du vill radera provet?"))
            {
                event.preventDefault();
            }
            else
            { 
                const examId:string|null = deleteBtn.getAttribute("examId");

                $.ajax({
                    type: HttpVerb.DELETE,
                    url: `/api/ExamContent/${examId}`,
                    success: () =>
                    {
                        loadExamsFromServer(InitialCall.false);
                    },
                    error: (response) =>
                    {
                    //    console.log(response.responseText);
                    }
                });
            }

        }
    });

//När sidan laddas in från servern första gången 
loadExamsFromServer(InitialCall.true);

//SORTERING NEDAN
//--------------------------------------------------------------------------------------------------------------------------------------
const sortColumns = (document.getElementsByClassName("fa fa-sort")) as HTMLCollectionOf<HTMLAnchorElement> | null;

for (let sortColumn of sortColumns!)
{
    sortColumn.addEventListener("click", (event): void =>
    {

        event.preventDefault();
            //Hämta den ordning som kolumnen ska sorteras på.
            const sortOrder: SortOrder = determineSortOrderForColumn(sortColumn?.closest("th")?.getAttribute("sortOrder") as SortOrder);

            const rows: NodeListOf<HTMLTableRowElement> | null = document.querySelectorAll("#Examtbody tr");

            // Hämta namn på den kolumn som ska sorteras
            const columnNameToSortBy = sortColumn?.previousElementSibling?.getAttribute("for") as ExamColumnNames;

            // Hämta arrayen med tuples som utgör grunden för påföljande sortering
            const tupleArray: [string, HTMLTableRowElement][] = getColumnValueWithRowTuplesArray(columnNameToSortBy, rows);

            //Sortera
            const sortRows = new SortExamTableRows(tupleArray, columnNameToSortBy, sortOrder);

            //Extrahera de sorterade raderna 
            const sortedRows: HTMLTableRowElement[] = sortRows.sortedRelatedValues;

            if (sortedRows.length === rows.length)
            {
                //Uppdaterar sorteringsordningen för kolumnen
                sortColumn?.closest("th")?.setAttribute("sortOrder", sortOrder);
            }
            else
            { 
                throw Error("Row length does not match");
            }

            //Sätt in de sorterade raderna i tabellen
            insertSortedRows(sortedRows, rows);
        });
}

const determineSortOrderForColumn = (currentSortOrder: SortOrder): SortOrder =>
    currentSortOrder === SortOrder.DESC ? SortOrder.ASC : SortOrder.DESC;


//Returnerar samtliga värden i vertikal riktning för den specifika kolumnen (som ska sorteras på)
const getColumnValues = (columnNameToSortBy: string | undefined | null, rows: HTMLTableRowElement[]): string[] =>
{
    const columnValues: string[] = [];

    for (let row of rows)
    {
        columnValues.push(getColumnValue(columnNameToSortBy,row)!);
    }
    return columnValues;
};
 
//Stödfunktion för att undvika att fortsätta loopa genom cellerna på en specifik rad i tabellen NÄR VI REDAN hittat vårt värde
//Åstadkommer detta genom att bryta ut loopen till funktionen nedan vilket möjliggör nyttjandet av ett return-statement (vi avbryter loopen)
const getColumnValue = (columnNameToSortBy: string | undefined|null, row: HTMLTableRowElement): string | undefined =>
{
    for (let i = 0; i < row.cells.length; i++)
    {
        const column = row.cells[i];

        if (column.getAttribute("id") === `${columnNameToSortBy}Col`)
        {
            //returnera värdet och avbryt loop(gå ur funktionen)
            return column.innerText.trim();
        }
    }
    //Ingen matchning
    return undefined;
};  

//Notera: returvärdet för denna funktionen är en array av tuples
const getColumnValueWithRowTuplesArray = (columnNameToSortBy: string | undefined | null, rows: NodeListOf<HTMLTableRowElement>): [string, HTMLTableRowElement][] =>
{ 
   // Hämta kolumnvärden som ska sorteras
    const columnValues:string[] = getColumnValues(columnNameToSortBy, [...rows]);

    const columnValueWithRowTuples: [string, HTMLTableRowElement][] =[];

    for (let i = 0; i < rows.length; i++) 
    {
        const columnValue: string = columnValues[i];
        const relatedtRow = rows[i];

        const tuple: [string, HTMLTableRowElement] = [columnValue, relatedtRow];

        columnValueWithRowTuples.push(tuple);
    }

    return columnValueWithRowTuples;
};

const insertSortedRows = (sortedRows: HTMLTableRowElement[], rows: NodeListOf<HTMLTableRowElement>): void =>
{
    for (let rowNumber = 0; rowNumber < rows.length; rowNumber++)
    {
        rows[rowNumber].outerHTML = sortedRows[rowNumber].outerHTML;
    }

} 
//const setUserName = () =>
//{
//    //Hämta användarnamn från navbar
//    const loggedInLink = document.getElementById("LoggedInLink") as HTMLAnchorElement | null;
//    const username: string | undefined = loggedInLink?.innerText.split(" ")[2].trim();
//    const usernamePosition = contentDiv?.querySelector("#Headline") as HTMLHeadingElement | null;

//    if (username && usernamePosition) {
//        usernamePosition.insertAdjacentHTML("afterbegin",
//            `<h2 class="text text-center"><i>Prov för ${username}</i></h2></br>`);
//    }

//};


