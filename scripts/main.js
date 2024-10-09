//current limitations:
//Does NOT work as soon as you resize the screen
//If you selected 3 containers and the center one is wider then both of them the note box will not  account for that
//Box will span the entire element the text is in.
//will break if page is reloaded in different size

//contains html elements for the notes.
const pageNotes = [];

addEventListener("beforeunload ", () => {
  unloadEvent();
});

const unloadEvent = () => {
  if (pageNotes.length > 0) {
    const noteStyles = [];
    for (const el of pageNotes) {
      noteStyles.push(convertStyleToJson(el));
    }
    localStorage.setItem("Notes", JSON.stringify(noteStyles));
  }
};

const deleteNote = (noteWrapperElement) => {
  if (noteWrapperElement === undefined) return;
  const index = pageNotes.indexOf(noteWrapperElement);
  pageNotes.pop(index);
  noteWrapperElement.remove();
};

const convertStyleToJson = (element) => {
  return JSON.stringify({
    width: element.style.width,
    height: element.style.height,
    top: element.style.top,
    left: element.style.left,
    content: element.value,
  });
};

const createHTMLElement = (width, height, left, top, content) => {
  const wrapper = document.createElement("div");
  const noteIcon = document.createElement("button");
  // const trashIcon = document.createElement("button");

  const element = document.createElement("textarea");
  element.value = content ? content : "Enter your note here";

  wrapper.appendChild(noteIcon);
  // wrapper.appendChild(trashIcon);
  wrapper.appendChild(element);

  element.style.width = "100%";
  element.style.height = "100%";
  element.style.backgroundColor = "transparent";
  element.style.color = "white";
  element.style.borderColor = "none";

  wrapper.classList.add(`Note${pageNotes.length}`);
  wrapper.style.backgroundColor = "black";
  wrapper.style.color = "white";
  wrapper.style.resize = "both";
  wrapper.style.position = "absolute";

  wrapper.style.width = width;
  wrapper.style.height = height;
  wrapper.style.left = left;
  wrapper.style.top = top;

  noteIcon.addEventListener("click", () => {
    deleteNote(wrapper);
  });

  element.addEventListener("change", (e) => {
    element.innerHTML = e.target.value;
  });

  return wrapper;
};

const elementStyleString = localStorage.getItem("Notes");
if (elementStyleString) {
  const styleArray = JSON.parse(elementStyleString);
  for (const el of styleArray) {
    {
      const style = JSON.parse(el);
      const element = createHTMLElement(
        style.width,
        style.height,
        style.left,
        style.top,
        style.content
      );
      document.body.appendChild(element);
    }
  }
}

document.body.onkeydown = (e) => {
  if (e.key === "=") createNoteForSelectedText();
  if (e.key === "1") unloadEvent();
};

const calculateNoteHeightInPx = (startNode, endNode) => {
  const top = startNode.getBoundingClientRect().top + window.scrollY;
  const bottom = endNode.getBoundingClientRect().bottom + window.scrollY;

  return bottom - top + "px";
};

const calculateNoteWidthInPx = (startNode, endNode) => {
  const startWidth = startNode.getBoundingClientRect().width;
  const endWidth = endNode.getBoundingClientRect().width;

  return Math.max(startWidth, endWidth) + "px";
};

const createNoteForSelectedText = () => {
  if (window.getSelection) {
    const sel = window.getSelection();
    //check if anything is selected
    if (sel.rangeCount) {
      //get starting container of selection
      const start = sel.getRangeAt(0).startContainer.parentElement;
      //get ending container - set to start if ending container does not exist
      const end = sel.getRangeAt(0).endContainer?.parentElement;
      if (!end) end = sel.getRangeAt(0).startContainer.parentElement;
      //create new html element
      const width = calculateNoteWidthInPx(start, end);
      const height = calculateNoteHeightInPx(start, end);
      const left = start.getBoundingClientRect().left + window.scrollX + "px";
      const top = start.getBoundingClientRect().top + window.scrollY + "px";
      const element = createHTMLElement(width, height, left, top);
      pageNotes.push(element);
      document.body.appendChild(element);
      return element;
    }
  }
  return null;
};
