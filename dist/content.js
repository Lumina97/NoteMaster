/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports) => {


//current limitations:
//Does NOT work as soon as you resize the screen
//If you selected 3 containers and the center one is wider then both of them the note box will not  account for that
//Box will span the entire element the text is in.
//will break if page is reloaded in different size
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.calculateNoteWidthInPx = exports.calculateNoteHeightInPx = exports.pageNotes = void 0;
//contains html elements for the notes.
const pageNotes = [];
exports.pageNotes = pageNotes;
// addEventListener("beforeunload ", () => {
//   unloadEvent();
// });
// const unloadEvent = () => {
//   if (pageNotes.length > 0) {
//     const noteStyles = [];
//     for (const el of pageNotes) {
//       noteStyles.push(convertStyleToJson(el));
//     }
//     localStorage.setItem("Notes", JSON.stringify(noteStyles));
//   }
// };
const deleteNote = (noteWrapperElement) => {
    if (noteWrapperElement === undefined)
        return;
    const index = pageNotes.indexOf(noteWrapperElement);
    pageNotes.splice(index, 1);
    noteWrapperElement.wrapperHTML.remove();
};
const toggleNote = (textArea, displayStatus) => {
    if (textArea === undefined)
        return;
    if (displayStatus !== undefined)
        textArea.style.display = displayStatus ? "block" : "none";
    else {
        const display = textArea.style.display;
        textArea.style.display = display === "none" ? "block" : "none";
    }
};
const setAllNotesDisplay = (hideNotesBoolean) => {
    console.log(pageNotes);
    if (pageNotes.length <= 0)
        return;
    for (const note of pageNotes) {
        toggleNote(note.textAreaHTML, hideNotesBoolean);
    }
};
// const convertStyleToJson = (element) => {
//   return JSON.stringify({
//     width: element.style.width,
//     height: element.style.height,
//     top: element.style.top,
//     left: element.style.left,
//     content: element.value,
//   });
// };
///Returns a node obj
const createNewNote = (width, height, left, top, content) => {
    let Note;
    const wrapper = document.createElement("div");
    const noteIcon = document.createElement("button");
    const trashIcon = document.createElement("button");
    const textArea = document.createElement("textarea");
    trashIcon.classList.add("noteTrashIcon");
    noteIcon.classList.add("noteDisplayIcon");
    textArea.classList.add("noteTextArea");
    textArea.value = content ? content : "Enter your note here";
    wrapper.appendChild(noteIcon);
    wrapper.appendChild(trashIcon);
    wrapper.appendChild(textArea);
    wrapper.classList.add(`Note${pageNotes.length}`, `noteWrapperElement`);
    wrapper.style.width = width;
    wrapper.style.height = height;
    wrapper.style.left = left;
    wrapper.style.top = top;
    trashIcon.addEventListener("click", () => {
        deleteNote(Note);
    });
    noteIcon.addEventListener("click", () => {
        toggleNote(textArea);
    });
    textArea.addEventListener("change", (e) => {
        textArea.innerHTML = e.target.value;
    });
    Note = {
        width,
        height,
        top,
        left,
        content: textArea.value,
        wrapperHTML: wrapper,
        textAreaHTML: textArea,
        noteIconHTML: noteIcon,
        trashIconHTML: trashIcon,
    };
    return Note;
};
//TODO Reimplement
// const elementStyleString = localStorage.getItem("Notes");
// if (elementStyleString) {
//   const styleArray = JSON.parse(elementStyleString);
//   for (const el of styleArray) {
//     {
//       const style = JSON.parse(el);
//       const element = createNewNote(
//         style.width,
//         style.height,
//         style.left,
//         style.top,
//         style.content
//       );
//       document.body.appendChild(element);
//     }
//   }
// }
document.body.onkeydown = (e) => {
    if (e.key === "=")
        createNoteForSelectedText();
    // if (e.key === "1") unloadEvent();
    if (e.key === "2")
        setAllNotesDisplay(false);
    if (e.key === "3")
        setAllNotesDisplay(true);
};
const calculateNoteHeightInPx = (startNode, endNode) => {
    const top = startNode.getBoundingClientRect().top + window.scrollY;
    const bottom = endNode.getBoundingClientRect().bottom + window.scrollY;
    return bottom - top + "px";
};
exports.calculateNoteHeightInPx = calculateNoteHeightInPx;
const calculateNoteWidthInPx = (startNode, endNode) => {
    const startWidth = startNode.getBoundingClientRect().width;
    const endWidth = endNode.getBoundingClientRect().width;
    return Math.max(startWidth, endWidth) + "px";
};
exports.calculateNoteWidthInPx = calculateNoteWidthInPx;
const createNoteForSelectedText = () => {
    var _a;
    if (window.getSelection) {
        const sel = window.getSelection();
        //check if anything is selected
        if (sel && sel.rangeCount) {
            //get starting container of selection
            const start = sel.getRangeAt(0).startContainer.parentElement;
            console.log(sel.getRangeAt(0));
            //get ending container - set to start if ending container does not exist
            let end = (_a = sel.getRangeAt(0).endContainer) === null || _a === void 0 ? void 0 : _a.parentElement;
            if (!end)
                end = sel.getRangeAt(0).startContainer.parentElement;
            if (!start || !end)
                return;
            //create new html element
            const width = calculateNoteWidthInPx(start, end);
            const height = calculateNoteHeightInPx(start, end);
            const left = start.getBoundingClientRect().left + window.scrollX + "px";
            const top = start.getBoundingClientRect().top + window.scrollY + "px";
            const NoteObject = createNewNote(width, height, left, top, "");
            NoteObject.startContainerHTML = start;
            NoteObject.endContainerHTML = end;
            pageNotes.push(NoteObject);
            document.body.appendChild(NoteObject.wrapperHTML);
        }
    }
    return null;
};


/***/ }),

/***/ "./src/noteObj.ts":
/*!************************!*\
  !*** ./src/noteObj.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./src/resize.ts":
/*!***********************!*\
  !*** ./src/resize.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const main_1 = __webpack_require__(/*! ../src/main */ "./src/main.ts");
addEventListener("resize", (event) => {
    if (main_1.pageNotes.length <= 0)
        return;
    for (const el of main_1.pageNotes) {
        if (!el.startContainerHTML || !el.endContainerHTML)
            continue;
        const height = (0, main_1.calculateNoteHeightInPx)(el.startContainerHTML, el.endContainerHTML);
        const width = (0, main_1.calculateNoteWidthInPx)(el.startContainerHTML, el.endContainerHTML);
        const left = el.startContainerHTML.getBoundingClientRect().left +
            window.scrollX +
            "px";
        const top = el.startContainerHTML.getBoundingClientRect().top + window.scrollY + "px";
        el.wrapperHTML.style.left = left;
        el.wrapperHTML.style.top = top;
        el.wrapperHTML.style.width = width;
        el.wrapperHTML.style.height = height;
    }
});


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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__("./src/main.ts");
/******/ 	__webpack_require__("./src/noteObj.ts");
/******/ 	var __webpack_exports__ = __webpack_require__("./src/resize.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELDhCQUE4QixHQUFHLCtCQUErQixHQUFHLGlCQUFpQjtBQUNwRjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsaUJBQWlCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNyS2E7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7Ozs7Ozs7Ozs7O0FDRGhEO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGVBQWUsbUJBQU8sQ0FBQyxrQ0FBYTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7OztVQ3BCRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7O1VFdEJBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL25vdGVtYXN0ZXIvLi9zcmMvbWFpbi50cyIsIndlYnBhY2s6Ly9ub3RlbWFzdGVyLy4vc3JjL25vdGVPYmoudHMiLCJ3ZWJwYWNrOi8vbm90ZW1hc3Rlci8uL3NyYy9yZXNpemUudHMiLCJ3ZWJwYWNrOi8vbm90ZW1hc3Rlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9ub3RlbWFzdGVyL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vbm90ZW1hc3Rlci93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vbm90ZW1hc3Rlci93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG4vL2N1cnJlbnQgbGltaXRhdGlvbnM6XG4vL0RvZXMgTk9UIHdvcmsgYXMgc29vbiBhcyB5b3UgcmVzaXplIHRoZSBzY3JlZW5cbi8vSWYgeW91IHNlbGVjdGVkIDMgY29udGFpbmVycyBhbmQgdGhlIGNlbnRlciBvbmUgaXMgd2lkZXIgdGhlbiBib3RoIG9mIHRoZW0gdGhlIG5vdGUgYm94IHdpbGwgbm90ICBhY2NvdW50IGZvciB0aGF0XG4vL0JveCB3aWxsIHNwYW4gdGhlIGVudGlyZSBlbGVtZW50IHRoZSB0ZXh0IGlzIGluLlxuLy93aWxsIGJyZWFrIGlmIHBhZ2UgaXMgcmVsb2FkZWQgaW4gZGlmZmVyZW50IHNpemVcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuY2FsY3VsYXRlTm90ZVdpZHRoSW5QeCA9IGV4cG9ydHMuY2FsY3VsYXRlTm90ZUhlaWdodEluUHggPSBleHBvcnRzLnBhZ2VOb3RlcyA9IHZvaWQgMDtcbi8vY29udGFpbnMgaHRtbCBlbGVtZW50cyBmb3IgdGhlIG5vdGVzLlxuY29uc3QgcGFnZU5vdGVzID0gW107XG5leHBvcnRzLnBhZ2VOb3RlcyA9IHBhZ2VOb3Rlcztcbi8vIGFkZEV2ZW50TGlzdGVuZXIoXCJiZWZvcmV1bmxvYWQgXCIsICgpID0+IHtcbi8vICAgdW5sb2FkRXZlbnQoKTtcbi8vIH0pO1xuLy8gY29uc3QgdW5sb2FkRXZlbnQgPSAoKSA9PiB7XG4vLyAgIGlmIChwYWdlTm90ZXMubGVuZ3RoID4gMCkge1xuLy8gICAgIGNvbnN0IG5vdGVTdHlsZXMgPSBbXTtcbi8vICAgICBmb3IgKGNvbnN0IGVsIG9mIHBhZ2VOb3Rlcykge1xuLy8gICAgICAgbm90ZVN0eWxlcy5wdXNoKGNvbnZlcnRTdHlsZVRvSnNvbihlbCkpO1xuLy8gICAgIH1cbi8vICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIk5vdGVzXCIsIEpTT04uc3RyaW5naWZ5KG5vdGVTdHlsZXMpKTtcbi8vICAgfVxuLy8gfTtcbmNvbnN0IGRlbGV0ZU5vdGUgPSAobm90ZVdyYXBwZXJFbGVtZW50KSA9PiB7XG4gICAgaWYgKG5vdGVXcmFwcGVyRWxlbWVudCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm47XG4gICAgY29uc3QgaW5kZXggPSBwYWdlTm90ZXMuaW5kZXhPZihub3RlV3JhcHBlckVsZW1lbnQpO1xuICAgIHBhZ2VOb3Rlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIG5vdGVXcmFwcGVyRWxlbWVudC53cmFwcGVySFRNTC5yZW1vdmUoKTtcbn07XG5jb25zdCB0b2dnbGVOb3RlID0gKHRleHRBcmVhLCBkaXNwbGF5U3RhdHVzKSA9PiB7XG4gICAgaWYgKHRleHRBcmVhID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybjtcbiAgICBpZiAoZGlzcGxheVN0YXR1cyAhPT0gdW5kZWZpbmVkKVxuICAgICAgICB0ZXh0QXJlYS5zdHlsZS5kaXNwbGF5ID0gZGlzcGxheVN0YXR1cyA/IFwiYmxvY2tcIiA6IFwibm9uZVwiO1xuICAgIGVsc2Uge1xuICAgICAgICBjb25zdCBkaXNwbGF5ID0gdGV4dEFyZWEuc3R5bGUuZGlzcGxheTtcbiAgICAgICAgdGV4dEFyZWEuc3R5bGUuZGlzcGxheSA9IGRpc3BsYXkgPT09IFwibm9uZVwiID8gXCJibG9ja1wiIDogXCJub25lXCI7XG4gICAgfVxufTtcbmNvbnN0IHNldEFsbE5vdGVzRGlzcGxheSA9IChoaWRlTm90ZXNCb29sZWFuKSA9PiB7XG4gICAgY29uc29sZS5sb2cocGFnZU5vdGVzKTtcbiAgICBpZiAocGFnZU5vdGVzLmxlbmd0aCA8PSAwKVxuICAgICAgICByZXR1cm47XG4gICAgZm9yIChjb25zdCBub3RlIG9mIHBhZ2VOb3Rlcykge1xuICAgICAgICB0b2dnbGVOb3RlKG5vdGUudGV4dEFyZWFIVE1MLCBoaWRlTm90ZXNCb29sZWFuKTtcbiAgICB9XG59O1xuLy8gY29uc3QgY29udmVydFN0eWxlVG9Kc29uID0gKGVsZW1lbnQpID0+IHtcbi8vICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHtcbi8vICAgICB3aWR0aDogZWxlbWVudC5zdHlsZS53aWR0aCxcbi8vICAgICBoZWlnaHQ6IGVsZW1lbnQuc3R5bGUuaGVpZ2h0LFxuLy8gICAgIHRvcDogZWxlbWVudC5zdHlsZS50b3AsXG4vLyAgICAgbGVmdDogZWxlbWVudC5zdHlsZS5sZWZ0LFxuLy8gICAgIGNvbnRlbnQ6IGVsZW1lbnQudmFsdWUsXG4vLyAgIH0pO1xuLy8gfTtcbi8vL1JldHVybnMgYSBub2RlIG9ialxuY29uc3QgY3JlYXRlTmV3Tm90ZSA9ICh3aWR0aCwgaGVpZ2h0LCBsZWZ0LCB0b3AsIGNvbnRlbnQpID0+IHtcbiAgICBsZXQgTm90ZTtcbiAgICBjb25zdCB3cmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCBub3RlSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgY29uc3QgdHJhc2hJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBjb25zdCB0ZXh0QXJlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZXh0YXJlYVwiKTtcbiAgICB0cmFzaEljb24uY2xhc3NMaXN0LmFkZChcIm5vdGVUcmFzaEljb25cIik7XG4gICAgbm90ZUljb24uY2xhc3NMaXN0LmFkZChcIm5vdGVEaXNwbGF5SWNvblwiKTtcbiAgICB0ZXh0QXJlYS5jbGFzc0xpc3QuYWRkKFwibm90ZVRleHRBcmVhXCIpO1xuICAgIHRleHRBcmVhLnZhbHVlID0gY29udGVudCA/IGNvbnRlbnQgOiBcIkVudGVyIHlvdXIgbm90ZSBoZXJlXCI7XG4gICAgd3JhcHBlci5hcHBlbmRDaGlsZChub3RlSWNvbik7XG4gICAgd3JhcHBlci5hcHBlbmRDaGlsZCh0cmFzaEljb24pO1xuICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQodGV4dEFyZWEpO1xuICAgIHdyYXBwZXIuY2xhc3NMaXN0LmFkZChgTm90ZSR7cGFnZU5vdGVzLmxlbmd0aH1gLCBgbm90ZVdyYXBwZXJFbGVtZW50YCk7XG4gICAgd3JhcHBlci5zdHlsZS53aWR0aCA9IHdpZHRoO1xuICAgIHdyYXBwZXIuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIHdyYXBwZXIuc3R5bGUubGVmdCA9IGxlZnQ7XG4gICAgd3JhcHBlci5zdHlsZS50b3AgPSB0b3A7XG4gICAgdHJhc2hJY29uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGRlbGV0ZU5vdGUoTm90ZSk7XG4gICAgfSk7XG4gICAgbm90ZUljb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgdG9nZ2xlTm90ZSh0ZXh0QXJlYSk7XG4gICAgfSk7XG4gICAgdGV4dEFyZWEuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoZSkgPT4ge1xuICAgICAgICB0ZXh0QXJlYS5pbm5lckhUTUwgPSBlLnRhcmdldC52YWx1ZTtcbiAgICB9KTtcbiAgICBOb3RlID0ge1xuICAgICAgICB3aWR0aCxcbiAgICAgICAgaGVpZ2h0LFxuICAgICAgICB0b3AsXG4gICAgICAgIGxlZnQsXG4gICAgICAgIGNvbnRlbnQ6IHRleHRBcmVhLnZhbHVlLFxuICAgICAgICB3cmFwcGVySFRNTDogd3JhcHBlcixcbiAgICAgICAgdGV4dEFyZWFIVE1MOiB0ZXh0QXJlYSxcbiAgICAgICAgbm90ZUljb25IVE1MOiBub3RlSWNvbixcbiAgICAgICAgdHJhc2hJY29uSFRNTDogdHJhc2hJY29uLFxuICAgIH07XG4gICAgcmV0dXJuIE5vdGU7XG59O1xuLy9UT0RPIFJlaW1wbGVtZW50XG4vLyBjb25zdCBlbGVtZW50U3R5bGVTdHJpbmcgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIk5vdGVzXCIpO1xuLy8gaWYgKGVsZW1lbnRTdHlsZVN0cmluZykge1xuLy8gICBjb25zdCBzdHlsZUFycmF5ID0gSlNPTi5wYXJzZShlbGVtZW50U3R5bGVTdHJpbmcpO1xuLy8gICBmb3IgKGNvbnN0IGVsIG9mIHN0eWxlQXJyYXkpIHtcbi8vICAgICB7XG4vLyAgICAgICBjb25zdCBzdHlsZSA9IEpTT04ucGFyc2UoZWwpO1xuLy8gICAgICAgY29uc3QgZWxlbWVudCA9IGNyZWF0ZU5ld05vdGUoXG4vLyAgICAgICAgIHN0eWxlLndpZHRoLFxuLy8gICAgICAgICBzdHlsZS5oZWlnaHQsXG4vLyAgICAgICAgIHN0eWxlLmxlZnQsXG4vLyAgICAgICAgIHN0eWxlLnRvcCxcbi8vICAgICAgICAgc3R5bGUuY29udGVudFxuLy8gICAgICAgKTtcbi8vICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4vLyAgICAgfVxuLy8gICB9XG4vLyB9XG5kb2N1bWVudC5ib2R5Lm9ua2V5ZG93biA9IChlKSA9PiB7XG4gICAgaWYgKGUua2V5ID09PSBcIj1cIilcbiAgICAgICAgY3JlYXRlTm90ZUZvclNlbGVjdGVkVGV4dCgpO1xuICAgIC8vIGlmIChlLmtleSA9PT0gXCIxXCIpIHVubG9hZEV2ZW50KCk7XG4gICAgaWYgKGUua2V5ID09PSBcIjJcIilcbiAgICAgICAgc2V0QWxsTm90ZXNEaXNwbGF5KGZhbHNlKTtcbiAgICBpZiAoZS5rZXkgPT09IFwiM1wiKVxuICAgICAgICBzZXRBbGxOb3Rlc0Rpc3BsYXkodHJ1ZSk7XG59O1xuY29uc3QgY2FsY3VsYXRlTm90ZUhlaWdodEluUHggPSAoc3RhcnROb2RlLCBlbmROb2RlKSA9PiB7XG4gICAgY29uc3QgdG9wID0gc3RhcnROb2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArIHdpbmRvdy5zY3JvbGxZO1xuICAgIGNvbnN0IGJvdHRvbSA9IGVuZE5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuYm90dG9tICsgd2luZG93LnNjcm9sbFk7XG4gICAgcmV0dXJuIGJvdHRvbSAtIHRvcCArIFwicHhcIjtcbn07XG5leHBvcnRzLmNhbGN1bGF0ZU5vdGVIZWlnaHRJblB4ID0gY2FsY3VsYXRlTm90ZUhlaWdodEluUHg7XG5jb25zdCBjYWxjdWxhdGVOb3RlV2lkdGhJblB4ID0gKHN0YXJ0Tm9kZSwgZW5kTm9kZSkgPT4ge1xuICAgIGNvbnN0IHN0YXJ0V2lkdGggPSBzdGFydE5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gICAgY29uc3QgZW5kV2lkdGggPSBlbmROb2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuICAgIHJldHVybiBNYXRoLm1heChzdGFydFdpZHRoLCBlbmRXaWR0aCkgKyBcInB4XCI7XG59O1xuZXhwb3J0cy5jYWxjdWxhdGVOb3RlV2lkdGhJblB4ID0gY2FsY3VsYXRlTm90ZVdpZHRoSW5QeDtcbmNvbnN0IGNyZWF0ZU5vdGVGb3JTZWxlY3RlZFRleHQgPSAoKSA9PiB7XG4gICAgdmFyIF9hO1xuICAgIGlmICh3aW5kb3cuZ2V0U2VsZWN0aW9uKSB7XG4gICAgICAgIGNvbnN0IHNlbCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgLy9jaGVjayBpZiBhbnl0aGluZyBpcyBzZWxlY3RlZFxuICAgICAgICBpZiAoc2VsICYmIHNlbC5yYW5nZUNvdW50KSB7XG4gICAgICAgICAgICAvL2dldCBzdGFydGluZyBjb250YWluZXIgb2Ygc2VsZWN0aW9uXG4gICAgICAgICAgICBjb25zdCBzdGFydCA9IHNlbC5nZXRSYW5nZUF0KDApLnN0YXJ0Q29udGFpbmVyLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzZWwuZ2V0UmFuZ2VBdCgwKSk7XG4gICAgICAgICAgICAvL2dldCBlbmRpbmcgY29udGFpbmVyIC0gc2V0IHRvIHN0YXJ0IGlmIGVuZGluZyBjb250YWluZXIgZG9lcyBub3QgZXhpc3RcbiAgICAgICAgICAgIGxldCBlbmQgPSAoX2EgPSBzZWwuZ2V0UmFuZ2VBdCgwKS5lbmRDb250YWluZXIpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgaWYgKCFlbmQpXG4gICAgICAgICAgICAgICAgZW5kID0gc2VsLmdldFJhbmdlQXQoMCkuc3RhcnRDb250YWluZXIucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgIGlmICghc3RhcnQgfHwgIWVuZClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAvL2NyZWF0ZSBuZXcgaHRtbCBlbGVtZW50XG4gICAgICAgICAgICBjb25zdCB3aWR0aCA9IGNhbGN1bGF0ZU5vdGVXaWR0aEluUHgoc3RhcnQsIGVuZCk7XG4gICAgICAgICAgICBjb25zdCBoZWlnaHQgPSBjYWxjdWxhdGVOb3RlSGVpZ2h0SW5QeChzdGFydCwgZW5kKTtcbiAgICAgICAgICAgIGNvbnN0IGxlZnQgPSBzdGFydC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0ICsgd2luZG93LnNjcm9sbFggKyBcInB4XCI7XG4gICAgICAgICAgICBjb25zdCB0b3AgPSBzdGFydC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyB3aW5kb3cuc2Nyb2xsWSArIFwicHhcIjtcbiAgICAgICAgICAgIGNvbnN0IE5vdGVPYmplY3QgPSBjcmVhdGVOZXdOb3RlKHdpZHRoLCBoZWlnaHQsIGxlZnQsIHRvcCwgXCJcIik7XG4gICAgICAgICAgICBOb3RlT2JqZWN0LnN0YXJ0Q29udGFpbmVySFRNTCA9IHN0YXJ0O1xuICAgICAgICAgICAgTm90ZU9iamVjdC5lbmRDb250YWluZXJIVE1MID0gZW5kO1xuICAgICAgICAgICAgcGFnZU5vdGVzLnB1c2goTm90ZU9iamVjdCk7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKE5vdGVPYmplY3Qud3JhcHBlckhUTUwpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBtYWluXzEgPSByZXF1aXJlKFwiLi4vc3JjL21haW5cIik7XG5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIChldmVudCkgPT4ge1xuICAgIGlmIChtYWluXzEucGFnZU5vdGVzLmxlbmd0aCA8PSAwKVxuICAgICAgICByZXR1cm47XG4gICAgZm9yIChjb25zdCBlbCBvZiBtYWluXzEucGFnZU5vdGVzKSB7XG4gICAgICAgIGlmICghZWwuc3RhcnRDb250YWluZXJIVE1MIHx8ICFlbC5lbmRDb250YWluZXJIVE1MKVxuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIGNvbnN0IGhlaWdodCA9ICgwLCBtYWluXzEuY2FsY3VsYXRlTm90ZUhlaWdodEluUHgpKGVsLnN0YXJ0Q29udGFpbmVySFRNTCwgZWwuZW5kQ29udGFpbmVySFRNTCk7XG4gICAgICAgIGNvbnN0IHdpZHRoID0gKDAsIG1haW5fMS5jYWxjdWxhdGVOb3RlV2lkdGhJblB4KShlbC5zdGFydENvbnRhaW5lckhUTUwsIGVsLmVuZENvbnRhaW5lckhUTUwpO1xuICAgICAgICBjb25zdCBsZWZ0ID0gZWwuc3RhcnRDb250YWluZXJIVE1MLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQgK1xuICAgICAgICAgICAgd2luZG93LnNjcm9sbFggK1xuICAgICAgICAgICAgXCJweFwiO1xuICAgICAgICBjb25zdCB0b3AgPSBlbC5zdGFydENvbnRhaW5lckhUTUwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgd2luZG93LnNjcm9sbFkgKyBcInB4XCI7XG4gICAgICAgIGVsLndyYXBwZXJIVE1MLnN0eWxlLmxlZnQgPSBsZWZ0O1xuICAgICAgICBlbC53cmFwcGVySFRNTC5zdHlsZS50b3AgPSB0b3A7XG4gICAgICAgIGVsLndyYXBwZXJIVE1MLnN0eWxlLndpZHRoID0gd2lkdGg7XG4gICAgICAgIGVsLndyYXBwZXJIVE1MLnN0eWxlLmhlaWdodCA9IGhlaWdodDtcbiAgICB9XG59KTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvbWFpbi50c1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9ub3RlT2JqLnRzXCIpO1xudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvcmVzaXplLnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9