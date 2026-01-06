import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private readonly document: Document;

  constructor(@Inject(DOCUMENT) document: Document) {
    this.document = document;
  }

  performSearch(searchTerm: string): void {
    if (!searchTerm.trim()) {
      this.clearHighlights();
      return;
    }

    this.clearHighlights();

    const regex = new RegExp(
      '(' + searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')',
      'gi'
    );

    const walk = (node: Node): void => {
      if (node.nodeType === 3) {
        const textNode = node as Text;
        if (textNode.nodeValue && regex.test(textNode.nodeValue)) {
          const span = document.createElement('span');
          span.innerHTML = textNode.nodeValue.replace(
            regex,
            '<mark class="highlight">$1</mark>'
          );
          textNode.replaceWith(...Array.from(span.childNodes));
        }
      } else if (
        node.nodeType === 1 &&
        !['SCRIPT', 'STYLE', 'FORM', 'APP-NAV', 'APP-COMMENT-SECTION'].includes(
          node.nodeName
        )
      ) {
        node.childNodes.forEach(walk);
      }
    };

    const article = this.document.querySelector('article');
    if (article) {
      walk(article);
    }
  }

  clearHighlights(): void {
    this.document.querySelectorAll('mark.highlight').forEach((el) => {
      const parent = el.parentNode;
      if (parent) {
        parent.replaceChild(document.createTextNode(el.textContent || ''), el);
        parent.normalize();
      }
    });
  }
}
