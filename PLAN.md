# Presentor — Text-to-HTML Presentation Builder

A tool that converts markdown-like text files into browser-based slide presentations.

## Tech Stack

- Vite + vanilla TypeScript
- No frameworks — plain DOM manipulation
- CSS for slide styling and transitions

## Architecture

```
[Markdown File] → [Parser] → [Slide Model] → [HTML Renderer] → [Slide Deck in Browser]
```

## Text Format

Slides are written in markdown, separated by `---`:

```markdown
# Slide Title

- Bullet one
- Bullet two

---

# Another Slide

Some paragraph text here.

![diagram](images/diagram.png)
```

- `---` separates slides
- `#` for slide titles
- `-` for bullet points
- Plain text for paragraphs
- `![alt](path)` for images (relative paths or URLs)

## Images

Images are referenced by relative path or URL in the markdown. Users place image files alongside the presentation file:

```
my-presentation/
  slides.md
  images/
    photo.png
    diagram.svg
```

No drag-and-drop, no base64 embedding. Keep it simple and pure markdown.

## Components

1. **Types** (`src/types.ts`) — `Presentation`, `Slide`, `SlideElement` type definitions
2. **Parser** (`src/parser.ts`) — reads markdown text, splits on `---`, classifies lines into titles, bullets, paragraphs, images
3. **Renderer** (`src/renderer.ts`) — takes the slide model, generates DOM elements styled as fullscreen slides
4. **Presenter** (`src/presenter.ts`) — keyboard/click navigation, current slide tracking, fullscreen support
5. **Main** (`src/main.ts`) — wires everything together, loads the markdown file

## Implementation Steps

1. Scaffold project with Vite (`vanilla-ts` template)
2. Define TypeScript types
3. Build the markdown parser
4. Build the HTML/CSS renderer (16:9 aspect ratio slides)
5. Add keyboard navigation (arrow keys, escape for fullscreen)
6. Add input UI — textarea or file upload to load a `.md` file
7. Basic theme — clean typography, dark/light mode

## Future Enhancements

- Export to self-contained static HTML file
- Slide transitions and animations
- Speaker notes (e.g. `> This is a note`)
- Code blocks with syntax highlighting
- Table support
- Live preview while editing
- Multiple themes/templates
- Print/PDF via browser print
- Watch mode (auto-rebuild on file change)
