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
/*!****************************************************!*\
  !*** ./wwwroot/scripts/ts/formClientValidation.ts ***!
  \****************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FormClientValidation": () => (/* binding */ FormClientValidation)
/* harmony export */ });
class FormClientValidation {
    static getValidationErrorElements(errors) {
        const map = new Map();
        //Namnen på alla input-fält som har en misslyckad validering
        const propertyNames = Object.keys(errors);
        //Alla errors för respektive fält
        const propertyErrors = Object.values(errors);
        for (let index = 0; index < propertyNames.length; index++) {
            const div = this.createDiv(propertyNames[index]);
            //Om vi har flera fel får vi ett UL-element, annars ett Span-element 
            const errorElement = (propertyErrors[index].length > 1) ?
                this.createErrorMessage(propertyErrors[index]) : this.createErrorMessage(propertyErrors[index][0]);
            div.insertAdjacentElement("afterbegin", errorElement);
            map.set(propertyNames[index], div);
        }
        return map;
    }
    static createDiv(propertyName) {
        const div = document.createElement("div");
        div.classList.add("text-danger");
        div.setAttribute("id", `${propertyName}-error`);
        return div;
    }
    static createErrorMessage(errors) {
        //Om vi endast har 1 fel kopplat till det specifika input-elementet
        if (typeof errors === "string") {
            const spanElement = document.createElement("span");
            spanElement.insertAdjacentText("afterbegin", errors);
            return spanElement;
        }
        //Om vi har flera fel kopplat till det specifika input-elementet
        else {
            const ulElement = document.createElement("ul");
            for (let i = 0; i < errors.length; i++) {
                const liElement = document.createElement("li");
                liElement.insertAdjacentText("afterbegin", errors[i]);
                ulElement.insertAdjacentElement("beforeend", liElement);
            }
            return ulElement;
        }
    }
}

/******/ })()
;
//# sourceMappingURL=formClientValidation.js.map