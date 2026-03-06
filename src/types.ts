export type SlideElement =
  | { type: 'title'; text: string }
  | { type: 'bullet'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'image'; src: string; alt: string }
  | { type: 'columns'; children: SlideElement[][] }

export interface Slide {
  elements: SlideElement[]
}

export interface Presentation {
  slides: Slide[]
  theme: string | null
}
