import { createNewNoteHTML } from "./HTMLCreator";
import { GetPageNotes } from "./main";
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
};

export const deleteNote = (noteWrapperElement: NoteObj) => {
  if (noteWrapperElement === undefined) return;

  const index = GetPageNotes().indexOf(noteWrapperElement);
  GetPageNotes().splice(index, 1);
  noteWrapperElement.wrapperHTML.remove();
};

export const toggleNote = (element: HTMLElement, hideNotes: boolean) => {
  if (element === undefined) return;
  if (hideNotes) element.classList.add("closedOverlay");
  else element.classList.remove("closedOverlay");
};

export const setAllNotesDisplay = (hideNotesBoolean: boolean) => {
  if (GetCurrentNoteOverlayStyle() === ENoteOverlayStyle.sidebar) {
    ToggleSideBar(hideNotesBoolean);
  } else {
    const pageNotes = GetPageNotes();
    if (pageNotes.length <= 0) return;
    for (const note of pageNotes) {
      toggleNote(note.textAreaHTML, hideNotesBoolean);
    }
  }
};

export const createNoteForSelectedText = () => {
  if (window.getSelection) {
    const sel = window.getSelection();
    //check if anything is selected
    if (sel && sel.rangeCount) {
      //get starting container of selection
      const start = sel.getRangeAt(0).startContainer.parentElement;
      //get ending container - set to start if ending container does not exist
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
  Note: NoteObj,
  newParent: HTMLElement
) => {
  const parentTop = newParent.getBoundingClientRect().top;
  const relativeTop = parseInt(Note.top) - parentTop;
  Note.wrapperHTML.style.top = relativeTop + "px";
};
