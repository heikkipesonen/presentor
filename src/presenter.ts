export class Presenter {
  private current = 0;
  private slides: HTMLElement[] = [];
  private navItems: HTMLElement[] = [];
  private container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
    this.bind();
  }

  update() {
    this.slides = Array.from(this.container.querySelectorAll(".slide"));
    this.navItems = Array.from(this.container.querySelectorAll(".slide-nav-item"));
    this.goto(0);
  }

  private bind() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight" || e.key === " ") this.next();
      else if (e.key === "ArrowLeft") this.prev();
      else if (e.key === "f") this.toggleFullscreen();
      else if (e.key === "Escape") this.exitFullscreen();
    });

    this.container.addEventListener("click", (e) => {
      const btn = (e.target as HTMLElement).closest<HTMLElement>(".slide-nav-item");
      if (btn?.dataset.index) this.goto(Number(btn.dataset.index));
    });
  }

  private goto(index: number) {
    if (index < 0 || index >= this.slides.length) return;
    this.slides[this.current]?.classList.remove("active");
    this.navItems[this.current]?.classList.remove("active");
    this.current = index;
    this.slides[this.current]?.classList.add("active");
    this.navItems[this.current]?.classList.add("active");
  }

  next() {
    this.goto(this.current + 1);
  }
  prev() {
    this.goto(this.current - 1);
  }

  private toggleFullscreen() {
    if (!document.fullscreenElement) {
      this.container.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  private exitFullscreen() {
    if (document.fullscreenElement) document.exitFullscreen();
  }
}
