import { EMessageTypes } from "./Types";

type TMessageType = {
  message: string;
  info: chrome.contextMenus.OnClickData;
  tabId: chrome.tabs.Tab;
};

//@ts-ignore
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
  }
};

const sendMessage = (message: TMessageType) => {
  chrome.tabs.sendMessage(message.tabId.id!, message.message);
};

chrome.contextMenus.onClicked.addListener(genericOnClick);

chrome.runtime.onInstalled.addListener(() => {
  //   // Create one test item for each context type.
  //   let contexts = ["page", "selection", "link", "editable"];

  chrome.contextMenus.create({
    title: "Create Note",
    //@ts-ignore
    contexts: ["selection"],
    id: "Create Note",
  });

  const main = chrome.contextMenus.create({
    title: "NoteMaster",
    id: "parent",
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

  // chrome.contextMenus.create(
  //   { title: "Oops", parentId: 999, id: "errorItem" },
  //   function () {
  //     if (chrome.runtime.lastError) {
  //       console.log("Got expected error: " + chrome.runtime.lastError.message);
  //     }
  //   }
  // );
});
