
/**
* A generic class that allows us to sort tuples
*/
//Tuples istället för Map tillåter oss att hålla identiska sorteringsvärden (t.ex flera av "Ja")
//Typen T kan vidgas/utökas vid behov
//Du skulle även kunna använda en conditional type för att t.ex se till att arrayer inte används som T
export default class SortTuples<T extends string, K> 
{
    readonly sortedTuples: [T, K][];
    readonly sortedRelatedValues: K[] = []; 
     
    //sortPredicate är en funktion som vi skickar som argument till constructorn 
    constructor(tuplesToSort: [T, K][], sortPredicate: (compare1: [T, K], compare2: [T, K]) => 1 | -1 | 0)
    {
        this.sortedTuples = tuplesToSort.sort(sortPredicate);

        this.sortedTuples.forEach(tuple =>
        {
            const [, relatedValue] = tuple;
            this.sortedRelatedValues.push(relatedValue);

        });
    }
}