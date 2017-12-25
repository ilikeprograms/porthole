import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class ClipboardService {
  private dom: Document;

  constructor(
    @Inject(DOCUMENT) dom: Document,
  ) {
    this.dom = dom;
  }

  public copyToClipboard(text: string) {
    const textArea: HTMLTextAreaElement = this.dom.createElement('textArea') as HTMLTextAreaElement;
    textArea.style.height = '0';
    textArea.style.position = 'absolute';
    textArea.style.left = '-1000px';
    textArea.tabIndex = -1;
    textArea.setAttribute('aria-hidden', 'true');

    textArea.value = text;

    this.dom.body.appendChild(textArea);

    textArea.focus();
    textArea.select();

    this.dom.execCommand('copy');

    this.dom.body.removeChild(textArea);
  }
}
