// localStorage.setItem('blurImages', false)

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

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  // if (tab.url.indexOf('https://boards.4channel.org/') > -1 && changeInfo.url === undefined) {
  if (changeInfo.status == 'complete') {
    chrome.tabs.executeScript(tabId, { file: 'js/blurimages.js' })
  }
})

chrome.action.onClicked.addListener(tab => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    file: 'js/blurimages.js'
  })
})
