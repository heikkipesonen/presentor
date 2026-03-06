import type { Presentation, Slide, SlideElement } from './types'

export function render(presentation: Presentation, container: HTMLElement) {
  container.innerHTML = ''
  container.className = 'slides-container'

  presentation.slides.forEach((slide, i) => {
    const el = renderSlide(slide)
    el.dataset.index = String(i)
    el.classList.toggle('active', i === 0)
    container.appendChild(el)
  })
}

function renderSlide(slide: Slide): HTMLElement {
  const div = document.createElement('div')
  div.className = 'slide'

  const content = document.createElement('div')
  content.className = 'slide-content'

  for (const el of slide.elements) {
    content.appendChild(renderElement(el))
  }

  div.appendChild(content)
  return div
}

function renderElement(el: SlideElement): HTMLElement {
  switch (el.type) {
    case 'title': {
      const h = document.createElement('h1')
      h.textContent = el.text
      return h
    }
    case 'bullet': {
      const li = document.createElement('li')
      li.textContent = el.text
      return li
    }
    case 'paragraph': {
      const p = document.createElement('p')
      p.textContent = el.text
      return p
    }
    case 'image': {
      const img = document.createElement('img')
      img.src = el.src
      img.alt = el.alt
      return img
    }
  }
}
