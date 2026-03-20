import { describe, it, expect } from 'vitest'
import { Presenter } from '../presenter'

function createSlides(count: number): HTMLElement {
  const container = document.createElement('div')
  for (let i = 0; i < count; i++) {
    const slide = document.createElement('div')
    slide.className = 'slide'
    container.appendChild(slide)
  }
  return container
}

function createSlidesWithNav(count: number): HTMLElement {
  const container = createSlides(count)
  const nav = document.createElement('nav')
  nav.className = 'slide-nav'
  for (let i = 0; i < count; i++) {
    const btn = document.createElement('button')
    btn.className = 'slide-nav-item'
    btn.dataset.index = String(i)
    btn.textContent = `Slide ${i + 1}`
    nav.appendChild(btn)
  }
  container.appendChild(nav)
  return container
}

describe('presenter', () => {
  it('sets first slide as active on update', () => {
    const container = createSlides(3)
    const presenter = new Presenter(container)
    presenter.update()

    const slides = container.querySelectorAll('.slide')
    expect(slides[0].classList.contains('active')).toBe(true)
    expect(slides[1].classList.contains('active')).toBe(false)
  })

  it('navigates to next slide', () => {
    const container = createSlides(3)
    const presenter = new Presenter(container)
    presenter.update()
    presenter.next()

    const slides = container.querySelectorAll('.slide')
    expect(slides[0].classList.contains('active')).toBe(false)
    expect(slides[1].classList.contains('active')).toBe(true)
  })

  it('navigates to previous slide', () => {
    const container = createSlides(3)
    const presenter = new Presenter(container)
    presenter.update()
    presenter.next()
    presenter.prev()

    const slides = container.querySelectorAll('.slide')
    expect(slides[0].classList.contains('active')).toBe(true)
    expect(slides[1].classList.contains('active')).toBe(false)
  })

  it('does not go past last slide', () => {
    const container = createSlides(2)
    const presenter = new Presenter(container)
    presenter.update()
    presenter.next()
    presenter.next()
    presenter.next()

    const slides = container.querySelectorAll('.slide')
    expect(slides[1].classList.contains('active')).toBe(true)
  })

  it('does not go before first slide', () => {
    const container = createSlides(2)
    const presenter = new Presenter(container)
    presenter.update()
    presenter.prev()

    const slides = container.querySelectorAll('.slide')
    expect(slides[0].classList.contains('active')).toBe(true)
  })

  it('updates nav item active state on navigation', () => {
    const container = createSlidesWithNav(3)
    const presenter = new Presenter(container)
    presenter.update()

    const items = container.querySelectorAll('.slide-nav-item')
    expect(items[0].classList.contains('active')).toBe(true)
    presenter.next()
    expect(items[0].classList.contains('active')).toBe(false)
    expect(items[1].classList.contains('active')).toBe(true)
  })

  it('navigates when nav item is clicked', () => {
    const container = createSlidesWithNav(3)
    const presenter = new Presenter(container)
    presenter.update()

    const items = container.querySelectorAll('.slide-nav-item')
    items[2].dispatchEvent(new MouseEvent('click', { bubbles: true }))

    const slides = container.querySelectorAll('.slide')
    expect(slides[2].classList.contains('active')).toBe(true)
    expect(items[2].classList.contains('active')).toBe(true)
  })
})
