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
})
