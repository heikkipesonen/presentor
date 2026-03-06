import { describe, it, expect } from 'vitest'
import { parse } from '../parser'

describe('parser', () => {
  it('splits slides on ---', () => {
    const result = parse('# One\n\n---\n\n# Two')
    expect(result.slides).toHaveLength(2)
  })

  it('parses title', () => {
    const result = parse('# Hello')
    expect(result.slides[0].elements[0]).toEqual({ type: 'title', text: 'Hello' })
  })

  it('parses bullet points', () => {
    const result = parse('- First\n- Second')
    expect(result.slides[0].elements).toEqual([
      { type: 'bullet', text: 'First' },
      { type: 'bullet', text: 'Second' },
    ])
  })

  it('parses paragraphs', () => {
    const result = parse('Some text here')
    expect(result.slides[0].elements[0]).toEqual({ type: 'paragraph', text: 'Some text here' })
  })

  it('parses images', () => {
    const result = parse('![alt text](image.png)')
    expect(result.slides[0].elements[0]).toEqual({ type: 'image', alt: 'alt text', src: 'image.png' })
  })

  it('skips empty lines', () => {
    const result = parse('# Title\n\n\n- Bullet')
    expect(result.slides[0].elements).toHaveLength(2)
  })

  it('extracts theme from first line', () => {
    const result = parse('theme: c64\n\n# Hello')
    expect(result.theme).toBe('c64')
    expect(result.slides[0].elements[0]).toEqual({ type: 'title', text: 'Hello' })
  })

  it('returns null theme when not specified', () => {
    const result = parse('# Hello')
    expect(result.theme).toBeNull()
  })

  it('handles theme with extra whitespace', () => {
    const result = parse('theme:   dark  \n\n# Hello')
    expect(result.theme).toBe('dark')
  })

  it('parses mixed content in a slide', () => {
    const result = parse('# Title\n\nSome text\n\n- Bullet\n\n![img](pic.png)')
    const elements = result.slides[0].elements
    expect(elements).toHaveLength(4)
    expect(elements[0].type).toBe('title')
    expect(elements[1].type).toBe('paragraph')
    expect(elements[2].type).toBe('bullet')
    expect(elements[3].type).toBe('image')
  })

  it('parses columns block', () => {
    const result = parse('Left text\n|||\n![b](b.png)')
    const el = result.slides[0].elements[0]
    expect(el.type).toBe('columns')
    if (el.type === 'columns') {
      expect(el.children).toHaveLength(2)
      expect(el.children[0]).toEqual([{ type: 'paragraph', text: 'Left text' }])
      expect(el.children[1]).toEqual([{ type: 'image', alt: 'b', src: 'b.png' }])
    }
  })

  it('parses columns with mixed content', () => {
    const result = parse('# Title\n- Bullet\n|||\n![img](pic.png)')
    const el = result.slides[0].elements[0]
    expect(el.type).toBe('columns')
    if (el.type === 'columns') {
      expect(el.children[0]).toHaveLength(2)
      expect(el.children[0][0].type).toBe('title')
      expect(el.children[0][1].type).toBe('bullet')
      expect(el.children[1][0].type).toBe('image')
    }
  })
})
