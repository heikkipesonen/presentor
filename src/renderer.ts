import type { Presentation, Slide, SlideElement } from './types'

export function render(presentation: Presentation, container: HTMLElement, basePath = '') {
  container.innerHTML = ''
  container.className = 'slides-container'

  presentation.slides.forEach((slide, i) => {
    const el = renderSlide(slide, basePath)
    el.dataset.index = String(i)
    el.classList.toggle('active', i === 0)
    container.appendChild(el)
  })

  if (presentation.nav) {
    container.appendChild(renderNav(presentation))
  }
}

function renderSlide(slide: Slide, basePath: string): HTMLElement {
  const div = document.createElement('div')
  div.className = 'slide'

  const content = document.createElement('div')
  content.className = 'slide-content'

  for (const el of slide.elements) {
    content.appendChild(renderElement(el, basePath))
  }

  div.appendChild(content)
  return div
}

function renderElement(el: SlideElement, basePath: string): HTMLElement {
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
      img.src = el.src.startsWith('http') ? el.src : `${basePath}/${el.src}`
      img.alt = el.alt
      return img
    }
    case 'columns': {
      const row = document.createElement('div')
      row.className = 'columns'
      for (const column of el.children) {
        const col = document.createElement('div')
        col.className = 'column'
        for (const child of column) {
          col.appendChild(renderElement(child, basePath))
        }
        row.appendChild(col)
      }
      return row
    }
  }
}

function slideTitle(slide: Slide, index: number): string {
  const title = slide.elements.find(e => e.type === 'title')
  return title && 'text' in title ? title.text : `Slide ${index + 1}`
}

function renderNav(presentation: Presentation): HTMLElement {
  const nav = document.createElement('nav')
  nav.className = 'slide-nav'
  presentation.slides.forEach((slide, i) => {
    const btn = document.createElement('button')
    btn.className = 'slide-nav-item'
    btn.textContent = slideTitle(slide, i)
    btn.dataset.index = String(i)
    if (i === 0) btn.classList.add('active')
    nav.appendChild(btn)
  })
  return nav
}
