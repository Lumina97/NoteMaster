import { GetPageNotes, SetHTMLClasses } from "./main";
import { ResizeAllElements } from "./resize";

let sidebar: HTMLDivElement;
const CreateSideBar = () => {
  sidebar = document.createElement("div");
  sidebar.classList.add("NoteSideBar", "show");
  document.body.appendChild(sidebar);
  console.log("Created sidebar");
};

export const GetSideBar = () => {
  if (!sidebar) CreateSideBar();
  return sidebar;
};

export enum ENoteOverlayStyle {
  overlay,
  sidebar,
}

let currentNoteOverlayStyle: ENoteOverlayStyle = ENoteOverlayStyle.sidebar;
export const GetCurrentNoteOverlayStyle = () => {
  return currentNoteOverlayStyle;
};

export const ChangeOverlayStyle = (newStyle: ENoteOverlayStyle) => {
  currentNoteOverlayStyle = newStyle;

  for (const note of GetPageNotes()) {
    SetHTMLClasses(note);
  }
  ResizeAllElements();
};

export const ToggleSideBar = (showSideBar: boolean) => {
  if (showSideBar) GetSideBar().classList.add("show");
  else GetSideBar().classList.remove("show");
};
