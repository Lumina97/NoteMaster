import { GetPageNotes } from "./main";
import {
  ENoteOverlayStyle,
  GetCurrentNoteOverlayStyle,
} from "./noteDisplayOverlay";
import { deleteNote, NoteObj, toggleNote } from "./NoteManager";

export const SetHTMLClasses = (
  note: NoteObj,
  CurrentNoteOverlayStyle: ENoteOverlayStyle
) => {
  note.trashIconHTML.className = "";
  note.noteIconHTML.className = "";
  note.textAreaHTML.className = "";
  note.wrapperHTML.className = "";
  note.wrapperHTML.style.cssText = "";
  note.wrapperHTML.classList.add(`Note${GetPageNotes().length}`);

  if (CurrentNoteOverlayStyle === ENoteOverlayStyle.sidebar) {
    note.trashIconHTML.classList.add("noteTrashIconSideBar");
    note.noteIconHTML.classList.add("noteDisplayIconSideBar");
    note.textAreaHTML.classList.add("noteTextAreaSideBar");
    note.wrapperHTML.classList.add("noteWrapperElementSideBar");
  } else {
    note.trashIconHTML.classList.add("noteTrashIcon");
    note.noteIconHTML.classList.add("noteDisplayIcon");
    note.textAreaHTML.classList.add("noteTextArea");
    note.wrapperHTML.classList.add("noteWrapperElement");

    note.wrapperHTML.style.width = note.width;
    note.wrapperHTML.style.height = note.height;
    note.wrapperHTML.style.left = note.left;
  }

  note.wrapperHTML.style.top = note.top;
};

///Returns a note obj
export const createNewNoteHTML = (
  width: string,
  height: string,
  left: string,
  top: string,
  content: string
) => {
  let Note: NoteObj;
  const wrapper = document.createElement("div");
  const noteIcon = document.createElement("button");
  const trashIcon = document.createElement("button");
  const textArea = document.createElement("textarea");
  textArea.value = content ? content : "Enter your note here";

  trashIcon.addEventListener("click", () => {
    deleteNote(Note);
  });

  noteIcon.addEventListener("click", () => {
    const toggle = textArea.classList.contains("closedOverlay");
    toggleNote(textArea, !toggle);
  });

  textArea.addEventListener("change", (e) => {
    textArea.innerHTML = (e.target as HTMLTextAreaElement).value;
  });

  wrapper.appendChild(noteIcon);
  wrapper.appendChild(trashIcon);
  wrapper.appendChild(textArea);

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
  SetHTMLClasses(Note, GetCurrentNoteOverlayStyle());

  return Note;
};
