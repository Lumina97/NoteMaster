import { EMessageTypes } from "./Types";

type TMessageType = {
  message: string;
  info: chrome.contextMenus.OnClickData;
  tabId: chrome.tabs.Tab;
};

let areNotesShowing: boolean = false;
const genericOnClick = (
  info?: chrome.contextMenus.OnClickData,
  tab?: chrome.tabs.Tab
) => {
  if (!tab || !info) return;

  const dataToSend: TMessageType = {
    message: JSON.stringify({ type: EMessageTypes.none }),
    info: info,
    tabId: tab,
  };

  switch (info.menuItemId) {
    case "Create Note":
      dataToSend.message = JSON.stringify({ type: EMessageTypes.create });
      sendMessage(dataToSend);
      break;
    case "overlay":
      dataToSend.message = JSON.stringify({ type: EMessageTypes.overlay });
      sendMessage(dataToSend);
      break;
    case "sidebar":
      dataToSend.message = JSON.stringify({ type: EMessageTypes.sidebar });
      sendMessage(dataToSend);
      break;
    case "toggle":
      dataToSend.message = JSON.stringify({
        type: EMessageTypes.toggleNoteVisibility,
      });
      sendMessage(dataToSend).then((result) => {
        console.log("got response");
        updateContextMenu("toggle");
      });
      break;
  }
};

chrome.runtime.onMessage.addListener((request) => {
  const message = JSON.parse(request);
  console.log("updated status backend");
  if (message.type === EMessageTypes.updateIsNoteShowing) {
    areNotesShowing = message.result;
    updateContextMenu("toggle");
  }
});

const sendMessage = (message: TMessageType) => {
  return chrome.tabs.sendMessage(message.tabId.id!, message.message);
};

const updateContextMenu = (contextMenuID: string) => {
  chrome.contextMenus.update(contextMenuID, {
    title: `${areNotesShowing ? "Hide" : "Show"} Notes`,
  });
};

chrome.contextMenus.onClicked.addListener(genericOnClick);

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    title: "Create Note",
    contexts: ["selection"],
    id: "Create Note",
  });

  const main = chrome.contextMenus.create({
    title: "NoteMaster",
    id: "parent",
  });

  chrome.contextMenus.create({
    title: `${areNotesShowing ? "Hide" : "Show"} Notes`,
    parentId: main,
    id: "toggle",
  });

  chrome.contextMenus.create({
    title: "Overlay notes",
    parentId: main,
    id: "overlay",
  });

  chrome.contextMenus.create({
    title: "Sidebar notes",
    parentId: main,
    id: "sidebar",
  });
});
