import { NoteObj } from "../src/noteObj";
declare const pageNotes: NoteObj[];
declare const calculateNoteHeightInPx: (startNode: HTMLElement, endNode: HTMLElement) => string;
declare const calculateNoteWidthInPx: (startNode: HTMLElement, endNode: HTMLElement) => string;
export { pageNotes, calculateNoteHeightInPx, calculateNoteWidthInPx };
