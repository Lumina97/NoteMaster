import { createNewNoteHTML } from "./HTMLCreator";
import { GetPageNotes, sendCurrentNoteStatusToBackend } from "./main";
import {
  ENoteOverlayStyle,
  GetCurrentNoteOverlayStyle,
  GetSideBar,
  ToggleSideBar,
} from "./noteDisplayOverlay";

export type NoteObj = {
  width: string;
  height: string;
  top: string;
  left: string;
  content: string;
  wrapperHTML: HTMLDivElement;
  textAreaHTML: HTMLTextAreaElement;
  noteIconHTML: HTMLElement;
  trashIconHTML: HTMLElement;
  startContainerHTML?: HTMLElement;
  endContainerHTML?: HTMLElement;
  initialScrollPosition: number;
};

let areNotesShowing = false;
export const GetAreNotesShowing = () => {
  return areNotesShowing;
};
export const SetAreNotesShowing = (showNotes: boolean) => {
  areNotesShowing = showNotes;
  sendCurrentNoteStatusToBackend();
};

export const deleteNote = (noteWrapperElement: NoteObj) => {
  if (noteWrapperElement === undefined) return;

  const index = GetPageNotes().indexOf(noteWrapperElement);
  GetPageNotes().splice(index, 1);
  noteWrapperElement.wrapperHTML.remove();
};

export const toggleNote = (element: HTMLElement, showNotes: boolean) => {
  if (element === undefined) return;
  if (showNotes) element.classList.remove("closedOverlay");
  else element.classList.add("closedOverlay");
};

export const setAllNotesDisplay = (showNotes: boolean) => {
  if (GetCurrentNoteOverlayStyle() === ENoteOverlayStyle.sidebar) {
    ToggleSideBar(showNotes);
  } else {
    const pageNotes = GetPageNotes();
    if (pageNotes.length <= 0) return;
    for (const note of pageNotes) {
      toggleNote(note.textAreaHTML, showNotes);
    }
  }
};

export const createNoteForSelectedText = () => {
  if (window.getSelection) {
    const sel = window.getSelection();
    if (sel && sel.rangeCount) {
      const start = sel.getRangeAt(0).startContainer.parentElement;
      let end = sel.getRangeAt(0).endContainer?.parentElement;
      if (!end) end = sel.getRangeAt(0).startContainer.parentElement;
      if (!start || !end) return;
      const width = calculateNoteWidthInPx(start, end);
      const height = calculateNoteHeightInPx(start, end);
      const left = start.getBoundingClientRect().left + window.scrollX + "px";
      const top =
        GetCurrentNoteOverlayStyle() === ENoteOverlayStyle.sidebar
          ? start.getBoundingClientRect().top + "px"
          : start.getBoundingClientRect().top + window.scrollY + "px";

      const NoteObject = createNewNoteHTML(width, height, left, top, "");
      NoteObject.initialScrollPosition = window.scrollY;
      NoteObject.startContainerHTML = start;
      NoteObject.endContainerHTML = end;
      GetPageNotes().push(NoteObject);
      if (GetCurrentNoteOverlayStyle() === ENoteOverlayStyle.sidebar)
        GetSideBar().appendChild(NoteObject.wrapperHTML);
      else document.body.appendChild(NoteObject.wrapperHTML);
    }
  }
  return null;
};

export const calculateNoteHeightInPx = (
  startNode: HTMLElement,
  endNode: HTMLElement
) => {
  const top = startNode.getBoundingClientRect().top + window.scrollY;
  const bottom = endNode.getBoundingClientRect().bottom + window.scrollY;

  return bottom - top + "px";
};

export const calculateNoteWidthInPx = (
  startNode: HTMLElement,
  endNode: HTMLElement
) => {
  const startWidth = startNode.getBoundingClientRect().width;
  const endWidth = endNode.getBoundingClientRect().width;

  return Math.max(startWidth, endWidth) + "px";
};

export const convertAbsoluteToRelativePosition = (
  top: number,
  newParent: HTMLElement
) => {
  const parentTop = newParent.getBoundingClientRect().top;
  return top - parentTop;
};
