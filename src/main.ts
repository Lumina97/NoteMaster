//current limitations:
//Does NOT work as soon as you resize the screen
//If you selected 3 containers and the center one is wider then both of them the note box will not  account for that
//Box will span the entire element the text is in.
//will break if page is reloaded in different size

import { NoteObj } from "../src/noteObj";

//contains html elements for the notes.
const pageNotes: NoteObj[] = [];

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

const deleteNote = (noteWrapperElement: NoteObj) => {
  if (noteWrapperElement === undefined) return;
  const index = pageNotes.indexOf(noteWrapperElement);
  pageNotes.splice(index, 1);
  noteWrapperElement.wrapperHTML.remove();
};

const toggleNote = (textArea: HTMLTextAreaElement, displayStatus?: boolean) => {
  if (textArea === undefined) return;
  if (displayStatus !== undefined)
    textArea.style.display = displayStatus ? "block" : "none";
  else {
    const display = textArea.style.display;
    textArea.style.display = display === "none" ? "block" : "none";
  }
};

const setAllNotesDisplay = (hideNotesBoolean: boolean) => {
  console.log(pageNotes);
  if (pageNotes.length <= 0) return;

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
const createNewNote = (
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
    textArea.innerHTML = (e.target as HTMLTextAreaElement).value;
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
  if (e.key === "=") createNoteForSelectedText();
  // if (e.key === "1") unloadEvent();
  if (e.key === "2") setAllNotesDisplay(false);
  if (e.key === "3") setAllNotesDisplay(true);
};

const calculateNoteHeightInPx = (
  startNode: HTMLElement,
  endNode: HTMLElement
) => {
  const top = startNode.getBoundingClientRect().top + window.scrollY;
  const bottom = endNode.getBoundingClientRect().bottom + window.scrollY;

  return bottom - top + "px";
};

const calculateNoteWidthInPx = (
  startNode: HTMLElement,
  endNode: HTMLElement
) => {
  const startWidth = startNode.getBoundingClientRect().width;
  const endWidth = endNode.getBoundingClientRect().width;

  return Math.max(startWidth, endWidth) + "px";
};

const createNoteForSelectedText = () => {
  if (window.getSelection) {
    const sel = window.getSelection();
    //check if anything is selected
    if (sel && sel.rangeCount) {
      //get starting container of selection
      const start = sel.getRangeAt(0).startContainer.parentElement;
      console.log(sel.getRangeAt(0));
      //get ending container - set to start if ending container does not exist
      let end = sel.getRangeAt(0).endContainer?.parentElement;
      if (!end) end = sel.getRangeAt(0).startContainer.parentElement;
      if (!start || !end) return;
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

export { pageNotes, calculateNoteHeightInPx, calculateNoteWidthInPx };
