/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./wwwroot/scripts/ts/sharedTypes.ts":
/*!*******************************************!*\
  !*** ./wwwroot/scripts/ts/sharedTypes.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HttpVerb": () => (/* binding */ HttpVerb)
/* harmony export */ });
var HttpVerb;
(function (HttpVerb) {
    HttpVerb["GET"] = "GET";
    HttpVerb["POST"] = "POST";
    HttpVerb["DELETE"] = "DELETE";
    HttpVerb["PATCH"] = "PATCH";
    HttpVerb["PUT"] = "PUT";
})(HttpVerb || (HttpVerb = {}));
;


/***/ }),

/***/ "./wwwroot/scripts/ts/sortExamTableRows.ts":
/*!*************************************************!*\
  !*** ./wwwroot/scripts/ts/sortExamTableRows.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SortOrder": () => (/* binding */ SortOrder),
/* harmony export */   "SortExamTableRows": () => (/* binding */ SortExamTableRows)
/* harmony export */ });
/* harmony import */ var _sortTableRows__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sortTableRows */ "./wwwroot/scripts/ts/sortTableRows.ts");
var SortOrder;
(function (SortOrder) {
    SortOrder["ASC"] = "ASC";
    SortOrder["DESC"] = "DESC";
})(SortOrder || (SortOrder = {}));
;

/**
*A class that sorts an exam table
*/
class SortExamTableRows extends _sortTableRows__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor(tupleToSort, columnToSort, sortOrder) {
        switch (columnToSort) {
            case "ExamName":
                _sortTableRows__WEBPACK_IMPORTED_MODULE_0__.default.sortPredicate = (sortOrder === SortOrder.DESC) ? SortExamTableRows.sortExamNameDESC : SortExamTableRows.sortExamNameASC;
                break;
            case "ExamTime":
                _sortTableRows__WEBPACK_IMPORTED_MODULE_0__.default.sortPredicate = (sortOrder === SortOrder.DESC) ? SortExamTableRows.sortExamTimeDESC : SortExamTableRows.sortExamTimeASC;
                break;
            case "RandomOrder":
                _sortTableRows__WEBPACK_IMPORTED_MODULE_0__.default.sortPredicate = (sortOrder === SortOrder.DESC) ? SortExamTableRows.sortRandomOrderDESC : SortExamTableRows.sortRandomOrderASC;
                break;
            case "SendReminderDate":
            case "CreateDate":
            case "ChangeDate":
                _sortTableRows__WEBPACK_IMPORTED_MODULE_0__.default.sortPredicate = (sortOrder === SortOrder.DESC) ? SortExamTableRows.sortDateDESC : SortExamTableRows.sortDateASC;
                break;
        }
        super(tupleToSort);
    }
    //Varje sorteringsfunktion extraherar det första värden i tuplen, varav detta värde fungerar som bas för sorteringen (detta värde är det som sorteras på)
    static sortExamNameDESC = (colValue1, colValue2) => {
        if (colValue1[0] < colValue2[0])
            return -1;
        if (colValue1[0] > colValue2[0])
            return 1;
        return 0;
    };
    static sortExamNameASC = (colValue1, colValue2) => {
        if (colValue1[0] < colValue2[0])
            return 1;
        if (colValue1[0] > colValue2[0])
            return -1;
        return 0;
    };
    static sortRandomOrderDESC = (colValue1, colValue2) => {
        if (colValue1[0] < colValue2[0])
            return -1;
        if (colValue1[0] > colValue2[0])
            return 1;
        return 0;
    };
    static sortRandomOrderASC = (colValue1, colValue2) => {
        if (colValue1[0] < colValue2[0])
            return 1;
        if (colValue1[0] > colValue2[0])
            return -1;
        return 0;
    };
    static sortExamTimeDESC = (colValue1, colValue2) => {
        // Om colValue1[0] inte är ett nummer (i detta fall "Ingen")
        if (!parseInt(colValue1[0]))
            return 1;
        // Om colValue2[0] inte är ett nummer (i detta fall "Ingen")
        if (!parseInt(colValue2[0]))
            return -1;
        // Om  både colValue1[0] och colValue2[0] inte är ett nummer (i detta fall "Ingen")
        if (!parseInt(colValue1[0]) && !parseInt(colValue2[0]))
            return 0;
        // Annars - sortera på nummer - (notera konverteringen från string till integer) - i fallande ordning
        return parseInt(colValue1[0]) > parseInt(colValue2[0]) ? -1 : 1;
    };
    static sortExamTimeASC = (colValue1, colValue2) => {
        if (!parseInt(colValue1[0]))
            return -1;
        // Om colValue2[0] inte är ett nummer (i detta fall "Ingen")
        if (!parseInt(colValue2[0]))
            return 1;
        // Om  både colValue1[0] och colValue2[0] inte är ett nummer (i detta fall "Ingen")
        if (!parseInt(colValue1[0]) && !parseInt(colValue2[0]))
            return 0;
        // Annars - sortera på nummer - (notera konverteringen från string till integer) - i stigande ordning
        return parseInt(colValue1[0]) > parseInt(colValue2[0]) ? 1 : -1;
    };
    //Tryck på denna länk för att förstå varför vi använder type assertion (as-operatorn) i sorteringsfunktion för datum:
    // https://docs.google.com/document/d/1ZZkkeaaiFfnY1Ujsms5EpsBL88YcuavVsP2YTgYtxhk/edit#heading=h.cfnw4c1xhjip
    static sortDateDESC = (colValue1, colValue2) => {
        //Om både colValue1[0] och colValue2[0] är "Nej"
        if (!Date.parse(colValue1[0]) && !Date.parse(colValue2[0]))
            return 0;
        // Om colValue1[0] = "Nej"
        if (!Date.parse(colValue1[0]))
            return 1;
        // Om colValue2[0] = "Nej"
        if (!Date.parse(colValue2[0]))
            return -1;
        // Om både colValue1[0] och colValue2[0] är giltiga datum, sortera fallande
        //Se länk varför vi använder valueOf: https://stackoverflow.com/posts/60688789/timeline
        return new Date(colValue2[0]).valueOf() - new Date(colValue1[0]).valueOf();
    };
    static sortDateASC = (colValue1, colValue2) => {
        //Om både colValue1[0] och colValue2[0] är "Nej"
        if (!Date.parse(colValue1[0]) && !Date.parse(colValue2[0]))
            return 0;
        // Om colValue1[0] = "Nej" 
        if (!Date.parse(colValue1[0]))
            return -1;
        // Om colValue2[0] = "Nej"
        if (!Date.parse(colValue2[0]))
            return 1;
        // Om både colValue1[0] och colValue2[0] är giltiga datum, sortera stigande
        //Se länk varför vi använder valueOf: https://stackoverflow.com/posts/60688789/timeline
        return new Date(colValue1[0]).valueOf() - new Date(colValue2[0]).valueOf();
    };
}


/***/ }),

/***/ "./wwwroot/scripts/ts/sortTableRows.ts":
/*!*********************************************!*\
  !*** ./wwwroot/scripts/ts/sortTableRows.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SortTableRows)
/* harmony export */ });
/* harmony import */ var _sortTuples__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sortTuples */ "./wwwroot/scripts/ts/sortTuples.ts");

/**
*An abstract superclass that brings together common behaviors for specific table sorting classes
*/
class SortTableRows extends _sortTuples__WEBPACK_IMPORTED_MODULE_0__.default {
    //Vi lagrar en funktion (sorteringspredikatet) i ett fält
    static sortPredicate;
    constructor(colValuesWithRows) {
        super(colValuesWithRows, SortTableRows.sortPredicate);
    }
}


/***/ }),

/***/ "./wwwroot/scripts/ts/sortTuples.ts":
/*!******************************************!*\
  !*** ./wwwroot/scripts/ts/sortTuples.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SortTuples)
/* harmony export */ });
/**
* A generic class that allows us to sort tuples
*/
//Tuples istället för Map tillåter oss att hålla identiska sorteringsvärden (t.ex flera av "Ja")
//Typen T kan vidgas/utökas vid behov
//Du skulle även kunna använda en conditional type för att t.ex se till att arrayer inte används som T
class SortTuples {
    sortedTuples;
    sortedRelatedValues = [];
    //sortPredicate är en funktion som vi skickar som argument till constructorn 
    constructor(tuplesToSort, sortPredicate) {
        this.sortedTuples = tuplesToSort.sort(sortPredicate);
        this.sortedTuples.forEach(tuple => {
            const [, relatedValue] = tuple;
            this.sortedRelatedValues.push(relatedValue);
        });
    }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*****************************************!*\
  !*** ./wwwroot/scripts/ts/listExams.ts ***!
  \*****************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sharedTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sharedTypes */ "./wwwroot/scripts/ts/sharedTypes.ts");
/* harmony import */ var _sortExamTableRows__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sortExamTableRows */ "./wwwroot/scripts/ts/sortExamTableRows.ts");

var InitialCall;
(function (InitialCall) {
    InitialCall[InitialCall["false"] = 0] = "false";
    InitialCall[InitialCall["true"] = 1] = "true";
})(InitialCall || (InitialCall = {}));

const contentDiv = document.getElementById("Content");
const tbody = document.getElementById("Examtbody");
const table = document.querySelector("Table");
const loadExamsFromServer = (callOrder) => {
    $.ajax({
        type: _sharedTypes__WEBPACK_IMPORTED_MODULE_0__.HttpVerb.GET,
        contentType: "application/json",
        url: "/api/ExamContent/GetExamsForUser",
        success: (exams) => {
            //Om vi har prov i databasen
            if (exams.length > 0) {
                table?.removeAttribute("hidden");
                (InitialCall.true) ? contentDiv?.removeAttribute("hidden") : tbody.innerHTML = "";
                //Första anropet
                if (callOrder === InitialCall.true) {
                    contentDiv?.removeAttribute("hidden");
                    insertInTable(exams);
                    //Simulera ett klick för att initialt sortera på CreateDate
                    document.getElementById("SortByCreateDateLink")?.click();
                }
                //Alla andra anrop
                if (callOrder === InitialCall.false) {
                    tbody.innerHTML = "";
                    insertInTable(exams);
                }
            }
            //Inga prov finns i databasen
            else {
                table?.setAttribute("hidden", "true");
                contentDiv?.removeAttribute("hidden");
                const headlineDiv = document.getElementById("Headline");
                headlineDiv?.insertAdjacentHTML("beforeend", "<h3 class='text-white text-center bg-dark'>Det finns inga prov att visa</h3>");
            }
        },
        error: (response) => {
            console.log(response.responseText);
        }
    });
};
const insertInTable = (exams) => {
    const rows = exams.map(exam => {
        const { examId, examName, examTime, createDate, changeDate, sendReminderDate, randomOrder } = exam;
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
    rows.forEach(row => {
        tbody?.insertAdjacentHTML("beforeend", row);
    });
};
tbody?.addEventListener("click", (event) => {
    const deleteBtn = event.target;
    //Vi vi säkerställa att det är en HTMLBUTTON vi klickat på med ID:et "DeleteBtn" 
    //Om elementet vi klickat på INTE är av av typen "HTMLButtonElement" kommer villkoret till vänster bli false...
    //...eftersom deleteBtn då är null
    if (deleteBtn && deleteBtn.id === "DeleteBtn") {
        if (!confirm("Är du säker på att du vill radera provet?")) {
            event.preventDefault();
        }
        else {
            const examId = deleteBtn.getAttribute("examId");
            $.ajax({
                type: _sharedTypes__WEBPACK_IMPORTED_MODULE_0__.HttpVerb.DELETE,
                url: `/api/ExamContent/${examId}`,
                success: (response) => {
                    loadExamsFromServer(InitialCall.false);
                },
                error: (response) => {
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
const sortColumns = document.getElementsByClassName("fa fa-sort");
for (let sortColumn of sortColumns) {
    sortColumn.addEventListener("click", (event) => {
        event.preventDefault();
        //Hämta den ordning som kolumnen ska sorteras på.
        const sortOrder = determineSortOrderForColumn(sortColumn?.closest("th")?.getAttribute("sortOrder"));
        const rows = document.querySelectorAll("#Examtbody tr");
        // Hämta namn på den kolumn som ska sorteras
        const columnNameToSortBy = sortColumn?.previousElementSibling?.getAttribute("for");
        // Hämta arrayen med tuples som utgör grunden för påföljande sortering
        const tupleArray = getColumnValueWithRowTuplesArray(columnNameToSortBy, rows);
        //Sortera
        const sortRows = new _sortExamTableRows__WEBPACK_IMPORTED_MODULE_1__.SortExamTableRows(tupleArray, columnNameToSortBy, sortOrder);
        //Extrahera de sorterade raderna 
        const sortedRows = sortRows.sortedRelatedValues;
        if (sortedRows.length === rows.length) {
            //Uppdaterar sorteringsordningen för kolumnen
            sortColumn?.closest("th")?.setAttribute("sortOrder", sortOrder);
        }
        else {
            throw Error("Row length does not match");
        }
        //Sätt in de sorterade raderna i tabellen
        insertSortedRows(sortedRows, rows);
    });
}
const determineSortOrderForColumn = (currentSortOrder) => currentSortOrder === _sortExamTableRows__WEBPACK_IMPORTED_MODULE_1__.SortOrder.DESC ? _sortExamTableRows__WEBPACK_IMPORTED_MODULE_1__.SortOrder.ASC : _sortExamTableRows__WEBPACK_IMPORTED_MODULE_1__.SortOrder.DESC;
//Returnerar samtliga värden i vertikal riktning för den specifika kolumnen (som ska sorteras på)
const getColumnValues = (columnNameToSortBy, rows) => {
    const columnValues = [];
    for (let row of rows) {
        columnValues.push(getColumnValue(columnNameToSortBy, row));
    }
    return columnValues;
};
//Stödfunktion för att undvika att fortsätta loopa genom cellerna på en specifik rad i tabellen NÄR VI REDAN hittat vårt värde
//Åstadkommer detta genom att bryta ut loopen till funktionen nedan vilket möjliggör nyttjandet av ett return-statement (vi avbryter loopen)
const getColumnValue = (columnNameToSortBy, row) => {
    for (let i = 0; i < row.cells.length; i++) {
        let column = row.cells[i];
        if (column.getAttribute("id") === `${columnNameToSortBy}Col`) {
            //returnera värdet och avbryt loop(gå ur funktionen)
            return column.innerText.trim();
        }
    }
    //Ingen matchning
    return undefined;
};
//Notera: returvärdet för denna funktionen är en array av tuples
const getColumnValueWithRowTuplesArray = (columnNameToSortBy, rows) => {
    // Hämta kolumnvärden som ska sorteras
    const columnValues = getColumnValues(columnNameToSortBy, [...rows]);
    const columnValueWithRowTuples = [];
    for (let i = 0; i < rows.length; i++) {
        const columnValue = columnValues[i];
        const relatedtRow = rows[i];
        const tuple = [columnValue, relatedtRow];
        columnValueWithRowTuples.push(tuple);
    }
    return columnValueWithRowTuples;
};
const insertSortedRows = (sortedRows, rows) => {
    for (let rowNumber = 0; rowNumber < rows.length; rowNumber++) {
        rows[rowNumber].outerHTML = sortedRows[rowNumber].outerHTML;
    }
};
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

})();

/******/ })()
;
//# sourceMappingURL=listExams.js.map