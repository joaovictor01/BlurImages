function blurImage () {
  // $('img').addClass('blur-image')
  let images = document.getElementsByTagName('img')
  let images_len = images.length
  for (let i = 0; i < images_len; i++) {
    images[i].classList.add('blur-image')
  }
}

function unblurImage () {
  $('img').removeClass('blur-image')
}

function getBlurStyle (radiusImage, radiusThumb) {
  return `<style> .blur-image { -webkit-filter: blur(${radiusImage}px); filter: blur(${radiusImage}px) } .blurthumb { -webkit-filter: blur(${radiusThumb}px); -moz-filter: blur(${radiusThumb}px); -o-filter: blur(${radiusThumb}px); -ms-filter: blur(${radiusThumb}px); filter: blur(${radiusThumb}px); width: 100px; height: 100px; background-color: #ccc;}</style>`
}

function addListeners () {
  let blurStyle = getBlurStyle(10, 5)
  $(blurStyle).appendTo('head')
  let blurActivated = JSON.parse(localStorage.getItem('blurImages'))
  blurImage()

  $(window).scroll(function () {
    if (blurActivated) {
      blurImage()
    }
  })

  $('.blur-image').click(function () {
    $(this).removeClass('blur-image')
  })

  // let blurActivated = JSON.parse(localStorage.getItem('blurImages'))
  // if (blurActivated) {
  //   blurImage()
  // }
}

function removeListeners () {
  $(window).unbind('scroll')
  $('.blur-image').unbind('click')
  unblurImage()
}

function blurImagesReceiver (request, sender, sendResponse) {
  // if (localStorage.getItem('blurImages') === true) {
  let blur = JSON.parse(localStorage.getItem('blurImages'))
  if (request.command === 'init') {
    addListeners()
    if (blur) {
      blurImage()
    }
  } else {
    removeListeners()
    unblurImage()
  }
  sendResponse({ result: 'success' })
}
chrome.runtime.onMessage.addListener(blurImagesReceiver)

window.onload = function () {
  let blur = JSON.parse(localStorage.getItem('blurImages'))
  if (blur === true) {
    console.log('entrou aqui')
    console.log(blur)
    addListeners()
  } else {
    removeListeners()
  }
}
