import { Injectable, Renderer2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CssService {
  constructor(private readonly renderer: Renderer2) {}

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