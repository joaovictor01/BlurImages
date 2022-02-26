let blurImagesInput = document.getElementById('blurImages')
let blurImages = JSON.parse(localStorage.getItem('blurImages'))
console.log(`blurimages.js - blurImage: ${blurImages}`)

blurImagesInput.checked = blurImages

function checkBlurStatus () {
  let value = this.checked

  localStorage.setItem('blurImages', value)
  console.log(value)

  if (value) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { command: 'init', hide: value },
        function (response) {
          console.log(response.result)
        }
      )
    })
  } else {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { command: 'remove', hide: value },
        function (response) {
          console.log(response.result)
        }
      )
    })
    localStorage.setItem('blurImages', false)
  }
}

blurImagesInput.onchange = function (element) {
  checkBlurStatus()
}

window.onload(() => {
  checkBlurStatus()
})
