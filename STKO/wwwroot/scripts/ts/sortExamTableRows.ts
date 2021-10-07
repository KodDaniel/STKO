export enum SortOrder { ASC = "ASC", DESC = "DESC" };
export type ExamColumnNames = "ExamName" | "ExamTime" | "RandomOrder" | "ChangeDate" | "CreateDate" | "SendReminderDate";
import SortTableRows from "./sortTableRows";

/**
*A class that sorts an exam table
*/
export class SortExamTableRows extends SortTableRows
{
    constructor(tupleToSort: [string, HTMLTableRowElement][], columnToSort: ExamColumnNames, sortOrder: SortOrder)
    {
        
        switch (columnToSort)
        {
             
            case "ExamName":
                SortTableRows.sortPredicate = (sortOrder === SortOrder.DESC) ? SortExamTableRows.sortExamNameDESC : SortExamTableRows.sortExamNameASC;
                break;
            case "ExamTime":
                SortTableRows.sortPredicate = (sortOrder === SortOrder.DESC) ? SortExamTableRows.sortExamTimeDESC : SortExamTableRows.sortExamTimeASC;
                break;
            case
                "RandomOrder": SortTableRows.sortPredicate = (sortOrder === SortOrder.DESC) ? SortExamTableRows.sortRandomOrderDESC : SortExamTableRows.sortRandomOrderASC;
                break;

            case "SendReminderDate":
            case "CreateDate":
            case "ChangeDate":
                SortTableRows.sortPredicate = (sortOrder === SortOrder.DESC) ? SortExamTableRows.sortDateDESC : SortExamTableRows.sortDateASC;
                break;

        }

        super(tupleToSort);
    }

    //Varje sorteringsfunktion extraherar det första värden i tuplen, varav detta värde fungerar som bas för sorteringen ...
    //...(detta värde är det som sorteras på)
    private static sortExamNameDESC = (colValue1: [string, HTMLTableRowElement], colValue2: [string, HTMLTableRowElement]): 1 | -1 | 0 =>
    {
        if (colValue1[0] < colValue2[0]) return -1;
        if (colValue1[0] > colValue2[0]) return 1;
        return 0;
    };

    private static sortExamNameASC = (colValue1: [string, HTMLTableRowElement], colValue2: [string, HTMLTableRowElement]): 1 | -1 | 0 =>
    {
        if (colValue1[0] < colValue2[0]) return 1;
        if (colValue1[0] > colValue2[0]) return -1;
        return 0;
    };

    private static sortRandomOrderDESC = (colValue1: [string, HTMLTableRowElement], colValue2: [string, HTMLTableRowElement]): 1 | -1 | 0 =>
    {
        if (colValue1[0] < colValue2[0]) return -1;
        if (colValue1[0] > colValue2[0]) return 1;
        return 0;
    };

    private static sortRandomOrderASC = (colValue1: [string, HTMLTableRowElement], colValue2: [string, HTMLTableRowElement]): 1 | -1 | 0 =>
    {
        if (colValue1[0] < colValue2[0]) return 1;
        if (colValue1[0] > colValue2[0]) return -1;
        return 0;
    };

    private static sortExamTimeDESC = (colValue1: [string, HTMLTableRowElement], colValue2: [string, HTMLTableRowElement]): 1 | -1 | 0 =>
    {
        // Om colValue1[0] inte är ett nummer (i detta fall "Ingen")
        if (!parseInt(colValue1[0])) return 1;
        // Om colValue2[0] inte är ett nummer (i detta fall "Ingen")
        if (!parseInt(colValue2[0])) return -1;
        // Om  både colValue1[0] och colValue2[0] inte är ett nummer (i detta fall "Ingen")
        if (!parseInt(colValue1[0]) && !parseInt(colValue2[0])) return 0;
        // Annars - sortera på nummer - (notera konverteringen från string till integer) - i fallande ordning
        return parseInt(colValue1[0]) > parseInt(colValue2[0]) ? -1 : 1;

    };

    private static sortExamTimeASC = (colValue1: [string, HTMLTableRowElement], colValue2: [string, HTMLTableRowElement]): 1 | -1 | 0 =>
    {

        if (!parseInt(colValue1[0])) return -1;
        // Om colValue2[0] inte är ett nummer (i detta fall "Ingen")
        if (!parseInt(colValue2[0])) return 1;
        // Om  både colValue1[0] och colValue2[0] inte är ett nummer (i detta fall "Ingen")
        if (!parseInt(colValue1[0]) && !parseInt(colValue2[0])) return 0;
        // Annars - sortera på nummer - (notera konverteringen från string till integer) - i stigande ordning
        return parseInt(colValue1[0]) > parseInt(colValue2[0]) ? 1 : -1;
    };

    //Tryck på denna länk för att förstå varför vi använder type assertion (as-operatorn) i sorteringsfunktion för datum:
    // https://docs.google.com/document/d/1ZZkkeaaiFfnY1Ujsms5EpsBL88YcuavVsP2YTgYtxhk/edit#heading=h.cfnw4c1xhjip

    private static sortDateDESC = (colValue1: [string, HTMLTableRowElement], colValue2: [string, HTMLTableRowElement]): 1 | -1 | 0 =>
    {
        //Om både colValue1[0] och colValue2[0] är "Nej"
        if (!Date.parse(colValue1[0]) && !Date.parse(colValue2[0])) return 0;
        // Om colValue1[0] = "Nej"
        if (!Date.parse(colValue1[0])) return 1;
        // Om colValue2[0] = "Nej"
        if (!Date.parse(colValue2[0])) return -1;
        // Om både colValue1[0] och colValue2[0] är giltiga datum, sortera fallande
        //Se länk varför vi använder valueOf: https://stackoverflow.com/posts/60688789/timeline
        return new Date(colValue2[0]).valueOf() - new Date(colValue1[0]).valueOf() as 1 | -1 | 0;
    };

    private static sortDateASC = (colValue1: [string, HTMLTableRowElement], colValue2: [string, HTMLTableRowElement]): 1 | -1 | 0 =>
    {
        //Om både colValue1[0] och colValue2[0] är "Nej"
        if (!Date.parse(colValue1[0]) && !Date.parse(colValue2[0])) return 0;
        // Om colValue1[0] = "Nej" 
        if (!Date.parse(colValue1[0])) return -1;
        // Om colValue2[0] = "Nej"
        if (!Date.parse(colValue2[0])) return 1;
        // Om både colValue1[0] och colValue2[0] är giltiga datum, sortera stigande
        //Se länk varför vi använder valueOf: https://stackoverflow.com/posts/60688789/timeline
        return new Date(colValue1[0]).valueOf() - new Date(colValue2[0]).valueOf() as 1 | -1 | 0;
    };

}









