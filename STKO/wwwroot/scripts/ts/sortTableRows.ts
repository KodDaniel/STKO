import SortTuples from "./sortTuples";

/**
*An abstract superclass that brings together common behaviors for specific table sorting classes
*/
export default abstract class SortTableRows extends SortTuples<string, HTMLTableRowElement>
{
   //Vi lagrar en funktion (sorteringspredikatet) i ett fält
   protected static sortPredicate: (compare1: [string, HTMLTableRowElement], compare2: [string, HTMLTableRowElement]) => 1 | -1 | 0;

   protected constructor(colValuesWithRows: [string, HTMLTableRowElement][])
    {
        super(colValuesWithRows, SortTableRows.sortPredicate);
    }
}  