//current limitations:
//If you selected 3 containers and the center one is wider then both of them the note box will not  account for that
//Box will span the entire element the text is in.
//Only works on fullscreen

import { CreateHTMLFromNote } from "./HTMLCreator";
import {
  ENoteOverlayStyle,
  ChangeOverlayStyle,
  GetCurrentNoteOverlayStyle,
  ToggleSideBar,
  GetSideBar,
} from "./noteDisplayOverlay";
import {
  createNoteForSelectedText,
  NoteObj as TNoteObj,
  setAllNotesDisplay,
  GetAreNotesShowing,
  SetAreNotesShowing,
} from "./NoteManager";
import { EMessageTypes } from "./Types";

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
    return true;
  }
});

window.onbeforeunload = function () {
  localStorage.removeItem("Notes");
  if (pageNotes.length > 0) {
    setTimeout(() => {}, 1000);

    const noteStyles = [];
    for (const note of pageNotes) {
      noteStyles.push(JSON.stringify(note));
    }
    localStorage.setItem("Notes", JSON.stringify(noteStyles));
  }
};

window.onload = () => {
  const noteString = localStorage.getItem("Notes");
  if (noteString) {
    const notesArrayJson = JSON.parse(noteString);
    for (const noteJSON of notesArrayJson) {
      console.log(noteJSON);
      let noteObj = JSON.parse(noteJSON);
      noteObj = CreateHTMLFromNote(noteObj);
      GetPageNotes().push(noteObj);
      if (GetCurrentNoteOverlayStyle() === ENoteOverlayStyle.sidebar)
        GetSideBar().appendChild(noteObj.wrapperHTML);
      else document.body.appendChild(noteObj.wrapperHTML);
    }
  }
  sendCurrentNoteStatusToBackend();
};
export { pageNotes };
