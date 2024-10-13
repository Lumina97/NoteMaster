//current limitations:
//If you selected 3 containers and the center one is wider then both of them the note box will not  account for that
//Box will span the entire element the text is in.
//will break if page is reloaded in different size

import {
  ENoteOverlayStyle,
  ChangeOverlayStyle,
  GetCurrentNoteOverlayStyle,
  ToggleSideBar,
} from "./noteDisplayOverlay";
import {
  createNoteForSelectedText,
  NoteObj as TNoteObj,
  setAllNotesDisplay,
  GetAreNotesShowing,
  SetAreNotesShowing,
} from "./NoteManager";
import { EMessageTypes } from "./Types";

//contains html elements for the notes.
const pageNotes: TNoteObj[] = [];
export const GetPageNotes = () => {
  return pageNotes;
};

export const sendCurrentNoteStatusToBackend = async () => {
  return chrome.runtime.sendMessage(
    JSON.stringify({
      type: EMessageTypes.updateIsNoteShowing,
      result: GetAreNotesShowing(),
    })
  );
};

//listens to messages from the context menu background worker
chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  const message = JSON.parse(request);
  if (message.type === EMessageTypes.overlay) {
    ChangeOverlayStyle(ENoteOverlayStyle.overlay);
  } else if (message.type === EMessageTypes.sidebar) {
    ChangeOverlayStyle(ENoteOverlayStyle.sidebar);
  } else if (message.type === EMessageTypes.create) {
    createNoteForSelectedText();
  } else if (message.type === EMessageTypes.toggleNoteVisibility) {
    SetAreNotesShowing(!GetAreNotesShowing());
    if (GetCurrentNoteOverlayStyle() === ENoteOverlayStyle.sidebar)
      ToggleSideBar(GetAreNotesShowing());
    else setAllNotesDisplay(GetAreNotesShowing());
    sendCurrentNoteStatusToBackend().then(() => {
      sendResponse();
    });
    console.log(`notes: ${GetAreNotesShowing()}`);
    return true;
  }
});

window.onbeforeunload = function (e) {
  if (pageNotes.length > 0) {
    // const noteStyles = [];
    for (const note of pageNotes) {
      // console.log(note.startContainerHTML?.);
      // noteStyles.push(JSON.stringify(note));
    }
    // localStorage.setItem("Notes", JSON.stringify(noteStyles));
  }
};

window.onload = (e) => {
  sendCurrentNoteStatusToBackend();
  //   const elementStyleString = localStorage.getItem("Notes");
  //   if (elementStyleString) {
  //     const notes = JSON.parse(elementStyleString);
  //     console.log(notes);
  //     for (const note of notes) {
  //       console.log(note);
  //       // GetPageNotes().push(note);
  //     }
  //   }
};

document.body.onkeydown = (e) => {
  if (e.key === "=") createNoteForSelectedText();
  if (e.key === "4") ChangeOverlayStyle(ENoteOverlayStyle.overlay);
  if (e.key === "5") ChangeOverlayStyle(ENoteOverlayStyle.sidebar);
  if (e.key === "1") {
    if (pageNotes.length > 0) {
      // const noteStyles = [];
      for (const note of pageNotes) {
        console.log(note.startContainerHTML?.outerHTML);
      }
    }
  }
  if (e.key === "2") setAllNotesDisplay(false);
  if (e.key === "3") setAllNotesDisplay(true);
};

export { pageNotes };
