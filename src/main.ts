import './style.css'
import { parse } from './parser'
import { render } from './renderer'
import { Presenter } from './presenter'

const app = document.querySelector<HTMLDivElement>('#app')!

function showLoader() {
  app.innerHTML = `
    <div class="input-view">
      <h1>Presentor</h1>
      <p>Load a markdown file to start</p>
      <div class="actions">
        <label for="file-input">Open .md file</label>
        <input type="file" id="file-input" accept=".md,.txt">
      </div>
    </div>
  `

  app.querySelector<HTMLInputElement>('#file-input')!.addEventListener('change', (e) => {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (!file) return
    file.text().then(startPresentation)
  })
}

function startPresentation(text: string) {
  const presentation = parse(text)
  if (!presentation.slides.length) return

  app.innerHTML = ''
  render(presentation, app)

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
  fetch(fileParam).then(r => r.text()).then(startPresentation).catch(() => showLoader())
} else {
  showLoader()
}
