import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CssService {
  private renderer: Renderer2;
  constructor(private readonly rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null);

  }
  addDinamicClass(className: string, styles: { [key: string]: string }): void {
    const styleElement = this.renderer.createElement('style');
    let styleContent = `.${className} {`;
    Object.entries(styles).forEach(([key, value]) => {
      styleContent += `${key}: ${value};`;
    });
    styleContent += '}';
    const styleText = this.renderer.createText(styleContent);
    this.renderer.appendChild(styleElement, styleText);
    this.renderer.appendChild(document.head, styleElement);
  }
}