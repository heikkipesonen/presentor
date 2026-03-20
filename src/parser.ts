import type { Presentation, Slide, SlideElement } from './types'

export function parse(text: string): Presentation {
  const lines = text.trim().split('\n')
  let theme: string | null = null
  let nav = false
  let consumed = 0

  for (const line of lines) {
    const themeMatch = line.match(/^theme:\s*(.+)$/i)
    const navMatch = line.match(/^nav:\s*(.+)$/i)
    if (themeMatch) { theme = themeMatch[1].trim(); consumed++ }
    else if (navMatch) { nav = navMatch[1].trim().toLowerCase() === 'true'; consumed++ }
    else break
  }

  const body = lines.slice(consumed).join('\n')
  const rawSlides = body.split(/^---$/m).map(s => s.trim()).filter(Boolean)
  return { slides: rawSlides.map(parseSlide), theme, nav }
}

function parseSlide(raw: string): Slide {
  const columns = raw.split(/^\|\|\|$/m)

  if (columns.length > 1) {
    return {
      elements: [{
        type: 'columns',
        children: columns.map(col => parseElements(col.trim())),
      }],
    }
  }

  return { elements: parseElements(raw) }
}

function parseElements(raw: string): SlideElement[] {
  const elements: SlideElement[] = []
  for (const line of raw.split('\n')) {
    const parsed = parseLine(line.trim())
    if (parsed) elements.push(parsed)
  }
  return elements
}

function parseLine(trimmed: string): SlideElement | null {
  if (!trimmed) return null

  if (trimmed.startsWith('# ')) {
    return { type: 'title', text: trimmed.slice(2) }
  } else if (trimmed.startsWith('- ')) {
    return { type: 'bullet', text: trimmed.slice(2) }
  } else {
    const imgMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/)
    if (imgMatch) {
      return { type: 'image', alt: imgMatch[1], src: imgMatch[2] }
    }
    return { type: 'paragraph', text: trimmed }
  }
}
