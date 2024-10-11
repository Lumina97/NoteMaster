import {
  calculateNoteHeightInPx,
  calculateNoteWidthInPx,
  GetPageNotes,
} from "../src/main";
import {
  GetCurrentNoteOverlayStyle,
  ENoteOverlayStyle,
} from "./noteDisplayOverlay";

export const ResizeAllElements = () => {
  if (GetPageNotes().length <= 0) return;

  for (const el of GetPageNotes()) {
    if (!el.startContainerHTML || !el.endContainerHTML) continue;
    const top =
      el.startContainerHTML.getBoundingClientRect().top + window.scrollY + "px";
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
