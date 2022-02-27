const blurImagesInput = document.getElementById('blurImages')
const blurIntensityInput = document.getElementById('blurIntensity')
const blurIntensitySpan = document.getElementById('blurIntensityValue')

async function getFromStorage (key) {
  return new Promise((resolve, _reject) => {
    chrome.storage.sync.get(key, resolve)
  }).then(result => {
    if (key == null) return result
    return result[key]
  })
}

$('#blurIntensity').change(function () {
  rangeSlide(this.value)
})

/* Set the blur status input with stored value */
chrome.storage.sync.get('blurImages', function (data) {
  try {
    blurImagesInput.checked = data.blurImages
  } catch (error) {
    console.log(error)
  }
})

/* Set the blur intensity input and span with stored value */
chrome.storage.sync.get('blurIntensity', function (data) {
  try {
    blurIntensityInput.value = data.blurIntensity
    blurIntensitySpan.innerHTML = data.value
  } catch (error) {
    console.log(error)
  }
})

/* Check the blur status and apply it */
async function checkBlurStatus (element) {
  let blurActive = await getFromStorage('blurImages')
  try {
    blurActive = element.checked
  } catch (error) {
    console.log(error)
  }
  chrome.storage.sync.set({ blurImages: blurActive }, function () {})
  if (blurActive) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { command: 'init', hide: blurActive }, function (
        _response
      ) {
        console.log(_response)
      })
    })
  } else {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { command: 'remove', hide: blurActive }, function (
        _response
      ) {
        console.log(_response)
      })
    })
  }
}

/* Check the blur intensity and apply it */
async function checkBlurIntensity (value) {
  let blurIntensity = await getFromStorage('blurIntensity')
  try {
    blurIntensity = value
  } catch (error) {
    console.log(error)
  }
  chrome.storage.sync.set({ blurIntensity: blurIntensity }, function () {})
  if (blurIntensity) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { command: 'setBlurIntensity', intensity: blurIntensity },
        function (_response) {
          console.log(_response)
        }
      )
    })
  }
}

blurImagesInput.onchange = function (_element) {
  checkBlurStatus(this)
}

window.onload = function () {
  checkBlurStatus(blurImagesInput)
}

function rangeSlide (value) {
  document.getElementById('blurIntensityValue').innerHTML = value
  blurIntensity = value
  checkBlurIntensity(blurIntensity)
}
