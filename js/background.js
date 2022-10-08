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
