/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
/*!*********************************************!*\
  !*** ./wwwroot/scripts/ts/sortTableRows.ts ***!
  \*********************************************/
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

})();

/******/ })()
;
//# sourceMappingURL=sortTableRows.js.map