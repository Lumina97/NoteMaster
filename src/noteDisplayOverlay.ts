import { SetHTMLClasses } from "./HTMLCreator";
import { GetPageNotes } from "./main";
import { ResizeAllElements } from "./resize";

let sidebar: HTMLDivElement;
const CreateSideBar = () => {
  sidebar = document.createElement("div");
  sidebar.classList.add("NoteSideBar");
  if (currentNoteOverlayStyle === ENoteOverlayStyle.overlay)
    ToggleSideBar(true);
  document.body.appendChild(sidebar);
};

export const GetSideBar = () => {
  if (!sidebar) CreateSideBar();
  return sidebar;
};

export enum ENoteOverlayStyle {
  overlay,
  sidebar,
}

let currentNoteOverlayStyle: ENoteOverlayStyle = ENoteOverlayStyle.overlay;
export const GetCurrentNoteOverlayStyle = () => {
  return currentNoteOverlayStyle;
};

export const ChangeOverlayStyle = (newStyle: ENoteOverlayStyle) => {
  currentNoteOverlayStyle = newStyle;

  for (const note of GetPageNotes()) {
    SetHTMLClasses(note, GetCurrentNoteOverlayStyle());
    if (newStyle === ENoteOverlayStyle.overlay) {
      document.body.appendChild(note.wrapperHTML);
      ToggleSideBar(true);
    } else {
      GetSideBar().appendChild(note.wrapperHTML);
      ToggleSideBar(false);
    }
  }
  ResizeAllElements();
};

export const ToggleSideBar = (hideSideBar: boolean) => {
  if (hideSideBar) GetSideBar().classList.add("closed");
  else GetSideBar().classList.remove("closed");
};
