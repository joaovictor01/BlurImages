localStorage.setItem('blurImages', true)

function messageTab (tabs) {
  browser.tabs.sendMessage(tabs[0].id, {
    command: 'init',
    blurImages: true
  })
}

function onExecuted (result) {
  let querying = browser.tabs.query({
    active: true,
    currentWindow: true
  })
  querying.then(messageTab)
}

// chrome.contextMenus.onClicked.addListener(function (info, tab) {
//   if (info.menuItemId == 'blur-images') {
//     chrome.tabs.executeScript({
//       file: 'blurimages.js'
//     })
//   }
// })