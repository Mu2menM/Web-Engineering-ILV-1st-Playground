const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
      background-color: #def;
      padding: 10px;
      font-family: 'Open Sans Condensed', sans-serif;
      color: #2a2a2a;
    }

    h2 {
      font-family: 'Sonsie One', cursive;
      color: #2a2a2a;
      font-size: 2rem;
      text-align: center;
      margin-bottom: 1rem;
    }

    .comment-wrapper {
      display: none;
    }

    .comment-form {
      margin-bottom: 3rem;
    }

    .flex-pair {
      display: flex;
      padding: 0 3rem 1rem;
    }

    label {
      align-self: center;
      flex: 2;
      text-align: right;
      font-size: 1.6rem;
    }

    input {
      margin-left: 1rem;
      flex: 6;
      font-size: 1.6rem;
      height: 32px;
      font-family: 'Open Sans Condensed', sans-serif;
    }

    input[type='submit'],
    .show-hide {
      background: #333;
      border: 0;
      color: white;
      font-size: 1.6rem;
      line-height: 32px;
      cursor: pointer;
    }

    input[type='submit'] {
      width: 30%;
      display: block;
      margin: 0 auto;
    }

    .show-hide {
      width: 150px;
      display: block;
      margin: 0 auto 10px auto;
      text-align: center;
    }

    .comment-container {
      margin-top: 0;
      padding: 0;
    }

    .comment-container li {
      list-style-type: none;
      display: flex;
      font-size: 1.6rem;
      margin-bottom: 0.5rem;
    }

    .comment-container li p:nth-child(1) {
      flex: 1;
      font-weight: bold;
      margin: 0;
    }

    .comment-container li p:nth-child(2) {
      flex: 5;
      margin: 0;
    }
  </style>

  <button class="show-hide" type="button">Show comments</button>

  <div class="comment-wrapper">
    <h2>Add comment</h2>
    <form class="comment-form">
      <div class="flex-pair">
        <label for="name">Your name:</label>
        <input type="text" name="name" id="name" placeholder="Enter your name" required>
      </div>
      <div class="flex-pair">
        <label for="comment">Your comment:</label>
        <input type="text" name="comment" id="comment" placeholder="Enter your comment" required>
      </div>
      <div>
        <input type="submit" value="Submit comment">
      </div>
    </form>

    <h2>Comments</h2>
    <ul class="comment-container">
      <li>
        <p>Bob Fossil</p>
        <p>Oh I am so glad you taught me all about the big brown angry guys...</p>
      </li>
    </ul>
  </div>
`;

export class CommentSection extends HTMLElement {
  private readonly showHideBtn: HTMLButtonElement | null;
  private readonly commentWrapper: HTMLDivElement | null;
  private readonly form: HTMLFormElement | null;
  private readonly list: HTMLUListElement | null;
  private readonly nameInput: HTMLInputElement | null;
  private readonly commentInput: HTMLInputElement | null;
  private isVisible: boolean = false;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot?.appendChild(template.content.cloneNode(true));

    this.showHideBtn = this.shadowRoot!.querySelector('.show-hide');
    this.commentWrapper = this.shadowRoot!.querySelector('.comment-wrapper');
    this.form = this.shadowRoot!.querySelector('.comment-form');
    this.list = this.shadowRoot!.querySelector('.comment-container');
    this.nameInput = this.shadowRoot!.querySelector('#name');
    this.commentInput = this.shadowRoot!.querySelector('#comment');
  }

  connectedCallback() {
    this.showHideBtn?.addEventListener('click', this.toggleComments.bind(this));
    this.form?.addEventListener('submit', this.handleCommentSubmit.bind(this));
  }

  disconnectedCallback() {
    this.showHideBtn?.removeEventListener(
      'click',
      this.toggleComments.bind(this)
    );
    this.form?.removeEventListener(
      'submit',
      this.handleCommentSubmit.bind(this)
    );
  }

  private toggleComments(): void {
    this.isVisible = !this.isVisible;
    if (this.commentWrapper && this.showHideBtn) {
      this.commentWrapper.style.display = this.isVisible ? 'block' : 'none';
      this.showHideBtn.textContent = this.isVisible
        ? 'Hide comments'
        : 'Show comments';
    }
  }

  private handleCommentSubmit(e: Event): void {
    e.preventDefault();

    if (this.nameInput && this.commentInput && this.list) {
      const name = this.nameInput.value.trim();
      const comment = this.commentInput.value.trim();

      if (name && comment) {
        this.addComment(name, comment);
        this.nameInput.value = '';
        this.commentInput.value = '';
      }
    }
  }

  private addComment(name: string, comment: string): void {
    const listItem = document.createElement('li');

    const namePara = document.createElement('p');
    namePara.textContent = name;

    const commentPara = document.createElement('p');
    commentPara.textContent = comment;

    listItem.appendChild(namePara);
    listItem.appendChild(commentPara);

    this.list?.appendChild(listItem);
  }
}

customElements.define('bear-comment-section', CommentSection);
