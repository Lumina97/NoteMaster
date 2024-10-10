import {
  calculateNoteHeightInPx,
  calculateNoteWidthInPx,
  pageNotes,
} from "../src/main";

addEventListener("resize", (event) => {
  if (pageNotes.length <= 0) return;

  for (const el of pageNotes) {
    if (!el.startContainerHTML || !el.endContainerHTML) continue;
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
    const top =
      el.startContainerHTML.getBoundingClientRect().top + window.scrollY + "px";

    el.wrapperHTML.style.left = left;
    el.wrapperHTML.style.top = top;
    el.wrapperHTML.style.width = width;
    el.wrapperHTML.style.height = height;
  }
});
