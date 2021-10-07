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
/*!*******************************************!*\
  !*** ./wwwroot/scripts/ts/userMessage.ts ***!
  \*******************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserMessage": () => (/* binding */ UserMessage),
/* harmony export */   "ErrorMessage": () => (/* binding */ ErrorMessage),
/* harmony export */   "SuccessMessage": () => (/* binding */ SuccessMessage)
/* harmony export */ });
/**
*An abstract superclass that brings together common behaviors for a user message
*/
class UserMessage {
    message;
    get getMessage() {
        return this.message;
    }
    ;
    createUserMessage(text, id, classes) {
        this.message = `<div class='userMessage ${classes.join(" ")}' id=${id}>
                             ${text}
                      </div>`;
    }
}
/**
*A specific class for error messages
*/
class ErrorMessage extends UserMessage {
    text;
    id;
    classes;
    constructor(text, id, classes = ["errorMessage", "alert", "alert-danger"]) {
        super();
        this.text = text;
        this.id = id;
        this.classes = classes;
        this.createUserMessage(text, id, classes);
    }
}
/**
*A specific class for success messages
*/
class SuccessMessage extends UserMessage {
    text;
    id;
    classes;
    constructor(text, id, classes = ["successMessage", "alert", "alert-success"]) {
        super();
        this.text = text;
        this.id = id;
        this.classes = classes;
        this.createUserMessage(text, id, classes);
    }
}

/******/ })()
;
//# sourceMappingURL=userMessage.js.map