(()=>{"use strict";var e={853:(e,t)=>{var s;Object.defineProperty(t,"__esModule",{value:!0}),t.EMessageTypes=void 0,function(e){e[e.overlay=0]="overlay",e[e.sidebar=1]="sidebar",e[e.create=2]="create",e[e.none=3]="none"}(s||(t.EMessageTypes=s={}))}},t={};function s(r){var a=t[r];if(void 0!==a)return a.exports;var n=t[r]={exports:{}};return e[r](n,n.exports,s),n.exports}(()=>{const e=s(853),t=e=>{chrome.tabs.sendMessage(e.tabId.id,e.message)};chrome.contextMenus.onClicked.addListener(((s,r)=>{if(!r||!s)return;const a={message:JSON.stringify({type:e.EMessageTypes.none}),info:s,tabId:r};switch(s.menuItemId){case"Create Note":a.message=JSON.stringify({type:e.EMessageTypes.create}),t(a);break;case"overlay":a.message=JSON.stringify({type:e.EMessageTypes.overlay}),t(a);break;case"sidebar":a.message=JSON.stringify({type:e.EMessageTypes.sidebar}),t(a)}})),chrome.runtime.onInstalled.addListener((()=>{chrome.contextMenus.create({title:"Create Note",contexts:["selection"],id:"Create Note"});const e=chrome.contextMenus.create({title:"NoteMaster",id:"parent"});chrome.contextMenus.create({title:"Overlay notes",parentId:e,id:"overlay"}),chrome.contextMenus.create({title:"Sidebar notes",parentId:e,id:"sidebar"})}))})()})();
//# sourceMappingURL=background.js.map