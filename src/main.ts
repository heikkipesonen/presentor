import './style.css'
import { parse } from './parser'
import { render } from './renderer'
import { Presenter } from './presenter'

const app = document.querySelector<HTMLDivElement>('#app')!

function loadTheme(theme: string | null) {
  document.querySelector('#presentor-theme')?.remove()
  if (!theme) return
  const link = document.createElement('link')
  link.id = 'presentor-theme'
  link.rel = 'stylesheet'
  link.href = `/themes/${theme}.css`
  document.head.appendChild(link)
}

function showLoader() {
  loadTheme(null)
  app.innerHTML = `
    <div class="input-view">
      <h1>Presentor</h1>
      <p>Select a presentation or load a file</p>
      <ul id="presentation-list"></ul>
      <div class="actions">
        <label for="file-input">Open .md file</label>
        <input type="file" id="file-input" accept=".md,.txt">
      </div>
    </div>
  `

  fetch('/presentations.json')
    .then(r => r.json())
    .then((presentations: { name: string; title: string }[]) => {
      const list = app.querySelector('#presentation-list')!
      for (const p of presentations) {
        const li = document.createElement('li')
        const a = document.createElement('a')
        a.href = `?${p.name}`
        a.textContent = p.title
        li.appendChild(a)
        list.appendChild(li)
      }
    })
    .catch(() => console.error('Could not load presentations.json'))

  app.querySelector<HTMLInputElement>('#file-input')!.addEventListener('change', (e) => {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (!file) return
    file.text().then(text => startPresentation(text))
  })
}

function startPresentation(text: string, basePath = '') {
  const presentation = parse(text)
  if (!presentation.slides.length) return

  loadTheme(presentation.theme)
  app.innerHTML = ''
  render(presentation, app, basePath)

  const presenter = new Presenter(app)
  presenter.update()

  document.addEventListener('keydown', function escape(e) {
    if (e.key === 'Escape' && !document.fullscreenElement) {
      document.removeEventListener('keydown', escape)
      showLoader()
    }
  })
}

const fileParam = location.search.slice(1)
if (fileParam) {
  fetch(`/${fileParam}/slides.md`).then(r => r.text()).then(text => {
    startPresentation(text, `/${fileParam}`)
  }).catch(() => showLoader())
} else {
  showLoader()
}
