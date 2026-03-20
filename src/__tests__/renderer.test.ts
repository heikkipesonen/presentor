import { describe, it, expect } from 'vitest'
import { render } from '../renderer'

describe('renderer', () => {
  it('creates slide elements with correct classes', () => {
    const container = document.createElement('div')
    render({ slides: [{ elements: [{ type: 'title', text: 'Hi' }] }], theme: null, nav: false }, container)

    expect(container.className).toBe('slides-container')
    expect(container.querySelectorAll('.slide')).toHaveLength(1)
  })

  it('sets first slide as active', () => {
    const container = document.createElement('div')
    render({
      slides: [
        { elements: [{ type: 'title', text: 'One' }] },
        { elements: [{ type: 'title', text: 'Two' }] },
      ],
      theme: null,
      nav: false,
    }, container)

    const slides = container.querySelectorAll('.slide')
    expect(slides[0].classList.contains('active')).toBe(true)
    expect(slides[1].classList.contains('active')).toBe(false)
  })

  it('renders title as h1', () => {
    const container = document.createElement('div')
    render({ slides: [{ elements: [{ type: 'title', text: 'Hello' }] }], theme: null, nav: false }, container)
    expect(container.querySelector('h1')?.textContent).toBe('Hello')
  })

  it('renders bullet as li', () => {
    const container = document.createElement('div')
    render({ slides: [{ elements: [{ type: 'bullet', text: 'Item' }] }], theme: null, nav: false }, container)
    expect(container.querySelector('li')?.textContent).toBe('Item')
  })

  it('renders paragraph as p', () => {
    const container = document.createElement('div')
    render({ slides: [{ elements: [{ type: 'paragraph', text: 'Text' }] }], theme: null, nav: false }, container)
    expect(container.querySelector('p')?.textContent).toBe('Text')
  })

  it('renders image with src and alt', () => {
    const container = document.createElement('div')
    render({ slides: [{ elements: [{ type: 'image', src: 'pic.png', alt: 'photo' }] }], theme: null, nav: false }, container)
    const img = container.querySelector('img')
    expect(img?.src).toContain('pic.png')
    expect(img?.alt).toBe('photo')
  })

  it('sets data-index on slides', () => {
    const container = document.createElement('div')
    render({
      slides: [
        { elements: [{ type: 'title', text: 'A' }] },
        { elements: [{ type: 'title', text: 'B' }] },
      ],
      theme: null,
      nav: false,
    }, container)

    const slides = container.querySelectorAll('.slide')
    expect(slides[0].getAttribute('data-index')).toBe('0')
    expect(slides[1].getAttribute('data-index')).toBe('1')
  })

  it('clears container before rendering', () => {
    const container = document.createElement('div')
    container.innerHTML = '<p>old content</p>'
    render({ slides: [{ elements: [{ type: 'title', text: 'New' }] }], theme: null, nav: false }, container)
    expect(container.querySelector('p.old')).toBeNull()
    expect(container.querySelector('h1')?.textContent).toBe('New')
  })

  it('renders columns as flex container', () => {
    const container = document.createElement('div')
    render({ slides: [{ elements: [{ type: 'columns', children: [
      [{ type: 'paragraph', text: 'Left' }],
      [{ type: 'image', src: 'a.png', alt: 'a' }],
    ] }] }], theme: null, nav: false }, container)
    const columns = container.querySelector('.columns')
    expect(columns).not.toBeNull()
    expect(columns?.querySelectorAll('.column')).toHaveLength(2)
    expect(columns?.querySelector('p')?.textContent).toBe('Left')
    expect(columns?.querySelector('img')).not.toBeNull()
  })

  it('renders nav bar when nav is true', () => {
    const container = document.createElement('div')
    render({ slides: [
      { elements: [{ type: 'title', text: 'First' }] },
      { elements: [{ type: 'title', text: 'Second' }] },
    ], theme: null, nav: true }, container)
    const nav = container.querySelector('.slide-nav')
    expect(nav).not.toBeNull()
    const items = nav!.querySelectorAll('.slide-nav-item')
    expect(items).toHaveLength(2)
    expect(items[0].textContent).toBe('First')
    expect(items[1].textContent).toBe('Second')
  })

  it('does not render nav bar when nav is false', () => {
    const container = document.createElement('div')
    render({ slides: [{ elements: [{ type: 'title', text: 'Hi' }] }], theme: null, nav: false }, container)
    expect(container.querySelector('.slide-nav')).toBeNull()
  })

  it('falls back to Slide N for untitled slides in nav', () => {
    const container = document.createElement('div')
    render({ slides: [
      { elements: [{ type: 'paragraph', text: 'no title' }] },
    ], theme: null, nav: true }, container)
    const item = container.querySelector('.slide-nav-item')
    expect(item?.textContent).toBe('Slide 1')
  })
})
