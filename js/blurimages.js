let blurImagesInput = document.getElementById('blurImages')
let blurImages = JSON.parse(localStorage.getItem('blurImages'))
console.log(blurImages)

blurImagesInput.checked = blurImages

blurImagesInput.onchange = function (element) {
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
