import { GetPageNotes } from "./main";
import {
  GetCurrentNoteOverlayStyle,
  ENoteOverlayStyle,
  GetSideBar,
} from "./noteDisplayOverlay";
import {
  calculateNoteHeightInPx,
  calculateNoteWidthInPx,
  convertAbsoluteToRelativePosition,
} from "./NoteManager";

const onPageScroll = () => {
  if (GetCurrentNoteOverlayStyle() === ENoteOverlayStyle.overlay) return;
  const notes = GetPageNotes();
  for (const note of notes) {
    if (!note.startContainerHTML || !note.endContainerHTML) continue;
    const top = note.startContainerHTML.getBoundingClientRect().top + "px";
    note.top = top;
    convertAbsoluteToRelativePosition(note, GetSideBar());
  }
};

export const ResizeAllElements = () => {
  if (GetPageNotes().length <= 0) return;

  for (const el of GetPageNotes()) {
    if (!el.startContainerHTML || !el.endContainerHTML) continue;
    const top =
      GetCurrentNoteOverlayStyle() === ENoteOverlayStyle.sidebar
        ? el.startContainerHTML.getBoundingClientRect().top + "px"
        : el.startContainerHTML.getBoundingClientRect().top +
          window.scrollY +
          "px";

    el.wrapperHTML.style.top = top;

    if (GetCurrentNoteOverlayStyle() === ENoteOverlayStyle.sidebar) {
      continue;
    }

    const height = calculateNoteHeightInPx(
      el.startContainerHTML,
      el.endContainerHTML
    );

    const width = calculateNoteWidthInPx(
      el.startContainerHTML,
      el.endContainerHTML
    );

    const left =
      el.startContainerHTML.getBoundingClientRect().left +
      window.scrollX +
      "px";

    el.wrapperHTML.style.left = left;
    el.wrapperHTML.style.width = width;
    el.wrapperHTML.style.height = height;
  }
};

addEventListener("resize", () => {
  ResizeAllElements();
});

addEventListener("scroll", () => {
  onPageScroll();
});
