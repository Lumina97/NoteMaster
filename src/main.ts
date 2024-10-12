//current limitations:
//If you selected 3 containers and the center one is wider then both of them the note box will not  account for that
//Box will span the entire element the text is in.
//will break if page is reloaded in different size

import {
  ENoteOverlayStyle,
  GetSideBar,
  ChangeOverlayStyle,
} from "./noteDisplayOverlay";
import {
  createNoteForSelectedText,
  NoteObj,
  setAllNotesDisplay,
} from "./NoteManager";
import { EMessageTypes } from "./Types";

//contains html elements for the notes.
const pageNotes: NoteObj[] = [];
export const GetPageNotes = () => {
  return pageNotes;
};
GetSideBar();

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const message = JSON.parse(request);
  if (message.type === EMessageTypes.overlay) {
    console.log("overlay");
    ChangeOverlayStyle(ENoteOverlayStyle.overlay);
  } else if (message.type === EMessageTypes.sidebar) {
    console.log("side");
    ChangeOverlayStyle(ENoteOverlayStyle.sidebar);
  } else if (message.type === EMessageTypes.create) {
    console.log("create");
    createNoteForSelectedText();
  }
});

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

// const convertStyleToJson = (element) => {
//   return JSON.stringify({
//     width: element.style.width,
//     height: element.style.height,
//     top: element.style.top,
//     left: element.style.left,
//     content: element.value,
//   });
// };

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
  if (e.key === "=") createNoteForSelectedText();
  if (e.key === "4") ChangeOverlayStyle(ENoteOverlayStyle.overlay);
  if (e.key === "5") ChangeOverlayStyle(ENoteOverlayStyle.sidebar);

  if (e.key === "2") setAllNotesDisplay(false);
  if (e.key === "3") setAllNotesDisplay(true);
};

export { pageNotes };
