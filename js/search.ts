interface NodeTypes {
  ELEMENT: number;
  TEXT: number;
}

const NODE_TYPE: NodeTypes = {
  ELEMENT: 1,
  TEXT: 3,
};

export const initializeSearchHighlighter = (): void => {
  const searchForm = document.querySelector<HTMLFormElement>('.search');

  if (!searchForm) {
    console.error('Search form not found');
    return;
  }

  searchForm.addEventListener('submit', (e: SubmitEvent): void => {
    e.preventDefault();

    // Remove existing highlights
    document
      .querySelectorAll<HTMLElement>('.highlight')
      .forEach((el: HTMLElement): void => {
        const parent = el.parentNode;
        if (parent) {
          parent.replaceChild(
            document.createTextNode(el.textContent ?? ''),
            el
          );
          parent.normalize();
        }
      });

    const target = e.target as HTMLFormElement;
    const searchInput =
      target.querySelector<HTMLInputElement>('input[name="q"]');
    const searchKey = searchInput?.value.trim() ?? '';

    if (!searchKey) return;

    const regex = new RegExp(
      '(' + searchKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')',
      'gi'
    );

    const walk = (node: Node): void => {
      if (node.nodeType === NODE_TYPE.TEXT) {
        const textNode = node as Text;
        if (regex.test(textNode.nodeValue ?? '')) {
          const span = document.createElement('span');
          span.innerHTML = (textNode.nodeValue ?? '').replace(
            regex,
            '<mark class="highlight">$1</mark>'
          );
          textNode.replaceWith(...Array.from(span.childNodes));
        }
      } else if (
        node.nodeType === NODE_TYPE.ELEMENT &&
        node.nodeName !== 'SCRIPT' &&
        node.nodeName !== 'STYLE' &&
        node.nodeName !== 'FORM'
      ) {
        const element = node as Element;
        const article = document.querySelector('article');
        if (article?.contains(element)) {
          node.childNodes.forEach(walk);
        }
      }
    };

    const article = document.querySelector('article');
    if (article) {
      walk(article);
    }
  });
};
