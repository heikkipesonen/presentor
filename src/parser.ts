import type { Presentation, Slide, SlideElement } from './types'

export function parse(text: string): Presentation {
  const lines = text.trim().split('\n')
  const themeMatch = lines[0]?.match(/^theme:\s*(.+)$/i)
  const theme = themeMatch ? themeMatch[1].trim() : null
  const body = themeMatch ? lines.slice(1).join('\n') : text

  const rawSlides = body.split(/^---$/m).map(s => s.trim()).filter(Boolean)
  return { slides: rawSlides.map(parseSlide), theme }
}

function parseSlide(raw: string): Slide {
  const lines = raw.split('\n')
  const elements: SlideElement[] = []

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) continue

    if (trimmed.startsWith('# ')) {
      elements.push({ type: 'title', text: trimmed.slice(2) })
    } else if (trimmed.startsWith('- ')) {
      elements.push({ type: 'bullet', text: trimmed.slice(2) })
    } else {
      const imgMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/)
      if (imgMatch) {
        elements.push({ type: 'image', alt: imgMatch[1], src: imgMatch[2] })
      } else {
        elements.push({ type: 'paragraph', text: trimmed })
      }
    }
  }

  return { elements }
}
