let blurImagesInput = document.getElementById('blurImages')
let blurImages = JSON.parse(localStorage.getItem('blurImages'))

async function getFromStorage (key) {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(key, resolve)
  }).then(result => {
    if (key == null) return result
    else return result[key]
  })
}

chrome.storage.sync.get('blurImages', function (data) {
  try {
    blurImagesInput.checked = data.blurImages
  } catch (error) {
    console.log(error)
  }
})

async function checkBlurStatus (element) {
  let value = await getFromStorage('blurImages')
  try {
    value = element.checked
  } catch (error) {
    console.log(error)
  }

  chrome.storage.sync.set({ blurImages: value }, function () {})

  if (value) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { command: 'init', hide: value }, function (response) {
        // console.log(response.result)
      })
    })
  } else {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { command: 'remove', hide: value }, function (response) {
        // console.log(response.result)
      })
    })
  }
}

blurImagesInput.onchange = function (element) {
  checkBlurStatus(this)
}

window.onload = function () {
  checkBlurStatus(blurImagesInput)
}
