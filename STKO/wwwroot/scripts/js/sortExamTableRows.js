/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
/*!*************************************************!*\
  !*** ./wwwroot/scripts/ts/sortExamTableRows.ts ***!
  \*************************************************/
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

})();

/******/ })()
;
//# sourceMappingURL=sortExamTableRows.js.map