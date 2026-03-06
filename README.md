# Presentor

A markdown-powered presentation tool. Write slides in a text editor, present them in a browser.

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:5173` to see available presentations, or go directly to one with `http://localhost:5173/?example`.

## Creating a Presentation

Create a folder in `public/` with a `slides.md` file:

```
public/
  my-talk/
    slides.md
    screenshot.png
```

Add it to `public/presentations.json`:

```json
[
  { "name": "my-talk", "title": "My Talk" }
]
```

## Slide Format

Slides are written in markdown, separated by `---`:

```markdown
theme: c64

# First Slide Title

- Bullet point one
- Bullet point two

---

# Second Slide

Some paragraph text here.

![caption](screenshot.png)
```

### Elements

| Syntax | Result |
|--------|--------|
| `# Text` | Slide title |
| `- Text` | Bullet point |
| Plain text | Paragraph |
| `![alt](path)` | Image |
| `---` | Slide separator |

### Theme

Set the theme on the first line of the file:

```
theme: c64
```

Themes are CSS files in `public/themes/`. Omit the line for the default black & white theme.

### Columns

Use `|||` to split a slide into columns:

```markdown
# My Slide

- Some text on the left
- More text

|||

![image on the right](photo.png)
```

### Images

Reference images by relative path (resolved from the presentation folder) or full URL:

```markdown
![local image](diagram.png)
![remote image](https://example.com/photo.png)
```

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| Arrow Right / Space | Next slide |
| Arrow Left | Previous slide |
| F | Toggle fullscreen |
| Escape | Exit presentation / fullscreen |

## Loading a File

You can also load a `.md` or `.txt` file directly from the landing page using the file picker.

## Creating a Theme

Create a CSS file in `public/themes/` that overrides the CSS variables:

```css
:root {
  --bg: #40318d;
  --fg: #c8c8ff;
  --accent: #c8c8ff;
  --slide-bg: #40318d;
}
```

Reference it in your slides with `theme: mytheme` (matching the filename without `.css`).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm test` | Run tests |
