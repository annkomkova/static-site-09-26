splitText()
showOnScroll()

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
