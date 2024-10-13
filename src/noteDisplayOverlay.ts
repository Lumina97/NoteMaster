import { SetHTMLClasses } from "./HTMLCreator";
import { GetPageNotes } from "./main";
import { GetAreNotesShowing, SetAreNotesShowing } from "./NoteManager";
import { ResizeAllElements } from "./resize";

export enum ENoteOverlayStyle {
  overlay,
  sidebar,
}
let sidebar: HTMLDivElement;
let sidebarButton: HTMLDivElement;
let currentNoteOverlayStyle: ENoteOverlayStyle = ENoteOverlayStyle.sidebar;

const CreateSideBar = () => {
  sidebar = document.createElement("div");
  sidebar.classList.add("NoteSideBar");

  sidebarButton = document.createElement("div");
  sidebar.appendChild(sidebarButton);
  sidebarButton.classList.add("NoteSidebarButton");
  sidebarButton.addEventListener("click", () => {
    SetAreNotesShowing(!GetAreNotesShowing());
    ToggleSideBar(GetAreNotesShowing());
  });

  if (currentNoteOverlayStyle === ENoteOverlayStyle.overlay) {
    ToggleSideBar(true);
    sidebarButton.style.display = "none";
  }

  document.body.appendChild(sidebar);
};

export const GetSideBar = () => {
  if (!sidebar) CreateSideBar();
  return sidebar;
};

export const GetCurrentNoteOverlayStyle = () => {
  return currentNoteOverlayStyle;
};

export const ChangeOverlayStyle = (newStyle: ENoteOverlayStyle) => {
  currentNoteOverlayStyle = newStyle;

  if (currentNoteOverlayStyle === ENoteOverlayStyle.overlay) {
    ToggleSideBar(false);
    sidebarButton.style.display = "none";
  } else {
    ToggleSideBar(true);
    sidebarButton.style.display = "block";
  }

  for (const note of GetPageNotes()) {
    SetHTMLClasses(note, GetCurrentNoteOverlayStyle());
    if (newStyle === ENoteOverlayStyle.overlay)
      document.body.appendChild(note.wrapperHTML);
    else GetSideBar().appendChild(note.wrapperHTML);
  }
  ResizeAllElements();
};

export const ToggleSideBar = (showSideBar: boolean) => {
  if (showSideBar) GetSideBar().classList.remove("closed");
  else GetSideBar().classList.add("closed");
};
