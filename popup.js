

//grabs all tabs
// const [tab] = await chrome.tabs.query({
//     lastFocusedWindow: true
//   });
  

//   const tabId = tab.id;
//   const button = document.getElementById('openSidePanel');
//   button.addEventListener('click', async () => {
//     await chrome.sidePanel.open({ tabId });
//     await chrome.sidePanel.setOptions({
//       tabId,
//       path: 'sidepanel.html',
//       enabled: true
//     });
//   });

  
const window = await chrome.windows.getLastFocused();
const windowID = window.id;
const button = document.getElementById('openSidePanel');
button.addEventListener('click', async () => {
  await chrome.sidePanel.open({ windowId: windowID });
  await chrome.sidePanel.setOptions({
    path: 'sidepanel.html',
    enabled: true
  });
});
