/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
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
/*!******************************************!*\
  !*** ./wwwroot/scripts/ts/sortTuples.ts ***!
  \******************************************/
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

/******/ })()
;
//# sourceMappingURL=sortTuples.js.map