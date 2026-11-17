splitText()
showOnScroll()
headerScroll()
moveMarquee()

// разбиваем текст на буквы и слова
function splitText() {
  let elements = document.querySelectorAll('.split')

  elements.forEach((element) => {
    let html = ''
    let i = 0
    let delay = 150
    let words = element.innerText.split(' ')

    words.forEach((word) => {
      html += '<span class="split__word">'

      if (element.classList.contains('split--chars')) {
        for (let k = 0; k < word.length; k++) {
          html += `<span class="split__item" style="transition-delay: ${delay}">${word[k]}</span>`
          i++
        }
      } else {
        html += ` ${word}`
      }

      html += '</span>'
    })

    element.innerHTML = html
  })
}

// показывам элементы, когда доскроллим до них
function showOnScroll() {
  checkElements()
  window.addEventListener('scroll', checkElements)
}

function checkElements() {
  let elements = document.querySelectorAll('.split, .reveal')

  elements.forEach((element) => {
    let rect = element.getBoundingClientRect()

    if (rect.top < window.innerHeight * 0.9) {
      if (element.classList.contains('split')) {
        element.classList.add('split--visible')
      }
      if (element.classList.contains('reveal')) {
        element.classList.add('reveal--visible')
      }
    }
  })
}

// показываем-скрываем верхнее меню во время скролла
function headerScroll() {
  const header = document.querySelector('.header')
  let lastScroll = 0

  window.addEventListener('scroll', () => {
    let scroll = window.scrollY

    if (scroll > 20) {
      header.classList.add('header--scrolled')
    } else {
      header.classList.remove('header--scrolled')
    }

    if (scroll > 160 && scroll > lastScroll) {
      header.classList.add('header--hidden')
    } else {
      header.classList.remove('header--hidden')
    }

    lastScroll = scroll
  })
}

// анимация бегущих строк
function moveMarquee() {
  let marquee = document.querySelector('.marquee')
  let rows = marquee.querySelectorAll('.marquee__row')
  let position = 0,
    direction = 1,
    speed = 1,
    timer
  let lastScroll = window.scrollY

  window.addEventListener('scroll', () => {
    let delta = window.scrollY - lastScroll
    lastScroll = window.scrollY

    if (delta > 0) {
      direction = 1
    } else {
      direction = -1
    }

    speed = Math.min(delta / 10, 4) + 1

    let skew = Math.max(-8, delta * 0.9)
    marquee.style.transform = `skewX(${skew}deg)`

    clearTimeout(timer)
    timer = setTimeout(() => {
      marquee.style.transform = `skewX(0deg)`
      speed = 1
    }, 150)
  })

  setInterval(() => {
    position = position - 0.05 * speed * direction

    if (position < -100) {
      position = position + 100
    }
    if (position > 0) {
      position = position - 100
    }
    rows.forEach((row) => {
      let tracks = row.querySelectorAll('.marquee__track')

      tracks.forEach((track) => {
        track.style.transform = `translateX(${position}%)`
      })
    })
  }, 16)
}
