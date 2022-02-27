let blurIntensity

async function getFromStorage (key) {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(key, resolve)
  }).then(result => {
    if (key == null) return result
    else return result[key]
  })
}

function blurImage () {
  let images = document.getElementsByTagName('img')
  let images_len = images.length
  for (let i = 0; i < images_len; i++) {
    images[i].classList.add('blur-image')
  }
}

function unblurImage () {
  $('img').removeClass('blur-image')
}

function blurStyleCss () {
  return `<style class="blur-style"> .blur-image { -webkit-filter: blur(${blurIntensity ||
    5}px); filter: blur(${blurIntensity ||
    5}px) } .blurthumb { -webkit-filter: blur(${blurIntensity ||
    5}px); -moz-filter: blur(${blurIntensity || 5}px); -o-filter: blur(${blurIntensity ||
    5}px); -ms-filter: blur(${blurIntensity || 5}px); filter: blur(${blurIntensity ||
    5}px); width: 100px; height: 100px; background-color: #ccc;}</style>`
}

function setBlurStyle () {
  $('style.blur-style').remove()
  $(blurStyleCss()).appendTo('head')
}

async function addListeners () {
  let blurStyle = blurStyleCss()
  $(blurStyle).appendTo('head')
  let blurActivated = await getFromStorage('blurImages')
  blurImage()
  $(window).scroll(function () {
    if (blurActivated) {
      blurImage()
    }
  })
  $('.blur-image').click(function () {
    $(this).removeClass('blur-image')
  })
}

function removeListeners () {
  $(window).unbind('scroll')
  $('.blur-image').unbind('click')
  unblurImage()
}

/* Receive the status or the intensity of the blur */
async function blurImagesReceiver (request, sender, sendResponse) {
  let blur = await getFromStorage('blurImages')
  if (request.command === 'init') {
    addListeners()
    if (blur) {
      blurImage()
    }
  } else if (request.command === 'setBlurIntensity' && request.intensity) {
    blurIntensity = request.intensity
  } else {
    removeListeners()
    unblurImage()
  }
  sendResponse({ result: 'success' })
}
chrome.runtime.onMessage.addListener(blurImagesReceiver)

window.onload = async function () {
  let blurActive = await getFromStorage('blurImages')
  blurIntensity = await getFromStorage('blurIntensity')
  if (blurIntensity) {
    setBlurStyle()
  }
  if (blurActive === true) {
    addListeners()
  } else {
    removeListeners()
  }
}
