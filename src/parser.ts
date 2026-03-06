import type { Presentation, Slide, SlideElement } from './types'

export function parse(text: string): Presentation {
  const rawSlides = text.split(/^---$/m).map(s => s.trim()).filter(Boolean)
  return { slides: rawSlides.map(parseSlide) }
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
