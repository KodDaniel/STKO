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
/*!*******************************************!*\
  !*** ./wwwroot/scripts/ts/displayExam.ts ***!
  \*******************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sharedTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sharedTypes */ "./wwwroot/scripts/ts/sharedTypes.ts");

const questionLink = document.getElementById("QuestionLink");
const questionDiv = document.getElementById("Questions");
const settingsLink = document.getElementById("SettingsLink");
const settingsDiv = document.getElementById("Settings");
//Hämta från Html eller URL
const examId = document.getElementById("ExamId")?.innerText ?? window.location.pathname.split("/")[3];
questionLink?.addEventListener("click", (event) => {
    event.preventDefault();
    //Om frågorna laddas för första gången
    if (questionDiv?.innerHTML.trim() === "") {
        $.ajax({
            type: _sharedTypes__WEBPACK_IMPORTED_MODULE_0__.HttpVerb.GET,
            url: `/api/ExamContent/GetQuestions/${examId}`,
            //Kom ihåg: En shape type matchar även om vi har FLER egenskaper i objektet än de som finns i constraint-typen
            success: (questions) => {
                insertQuestions(questions);
                settingsDiv?.classList.add("d-none");
                questionDiv.classList.remove("d-none");
            },
            error: (response) => {
                console.log(response.responseText);
            }
        });
    }
    //Annars: visa det tidigare innehållet (gör ingen ny AJAX-request)
    else {
        settingsDiv?.classList.add("d-none");
        questionDiv?.classList.remove("d-none");
    }
}, false);
const insertQuestions = (questions) => {
    //Om vi har frågor att hämta från servern
    if (questions.length > 0) {
        const questionAndAnswerArr = questions.map(question => {
            const { questionId, query, answer } = question;
            const queryHtml = `<div class="card-text font-weight-bold" id="query">${query}</div>`;
            const answerHtml = (answer !== null) ? `<div class="card-text" id="answer">${answer}</div>` :
                "<div class='card-text bg-secondary' id='answer'>Svar saknas</div>";
            return `<div class="card border-primary">
                          <div class="card-body text-center" questionId=${questionId}">
                                 ${queryHtml}
                                  <p></p>
                                 ${answerHtml}
                        </div>
                    </div>`;
        });
        questionDiv?.classList.add("card-columns");
        questionAndAnswerArr.forEach(questionAndAnswer => {
            questionDiv?.insertAdjacentHTML("afterbegin", questionAndAnswer);
        });
    }
    else {
        questionDiv?.classList.remove("card-columns");
        questionDiv.innerHTML = "<h3 id='NoQuestions'class='text-center'>Provet har inga frågor</h3>";
    }
};
settingsLink?.addEventListener("click", (event) => {
    event.preventDefault();
    questionDiv?.classList.add("d-none");
    settingsDiv?.classList.remove("d-none");
}, false);
///*const questions = document.querySelectorAll(".card.border-primary.mb-3 .card-body [questionId]");*/
//questionDiv?.addEventListener("click", (event) => {
//    if (event.target && event.target) {
//        //const question = event.target.closest("[questionId]");
//        //const query = question.querySelector("#query").innerText;
//        //const answer = question.querySelector("#answer").innerText;
//        //question.innerHTML = `<form id="UpdateQuestion">
//        //                        <div class="form-group">
//        //                               <label class="font-weight-bold">Fråga</label>
//        //                                <div><span class="text-danger"></span></div>
//        //                                <textarea class="form-control" rows="9">${query}</textarea>
//        //                            </div>
//        //                            <div class="form-group">
//        //                               <label class="font-weight-bold">Svar</label>
//        //                                <div><span  class="text-danger"></span></div>
//        //                                <textarea class="form-control" rows="9">${answer}</textarea>
//        //                            </div>
//        //                        </form>`;
//    }
//}); 

})();

/******/ })()
;
//# sourceMappingURL=displayExam.js.map