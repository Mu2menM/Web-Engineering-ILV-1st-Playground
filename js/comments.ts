interface CommentElements {
  showHideBtn: HTMLDivElement | null;
  commentWrapper: HTMLDivElement | null;
  form: HTMLFormElement | null;
  nameField: HTMLInputElement | null;
  commentField: HTMLInputElement | null;
  list: HTMLUListElement | null;
}

export const initializeComments = (): void => {
  console.log("Initializing comments system...");

  const elements: CommentElements = {
    showHideBtn: document.querySelector<HTMLDivElement>(".show-hide"),
    commentWrapper: document.querySelector<HTMLDivElement>(".comment-wrapper"),
    form: document.querySelector<HTMLFormElement>(".comment-form"),
    nameField: document.querySelector<HTMLInputElement>("#name"),
    commentField: document.querySelector<HTMLInputElement>("#comment"),
    list: document.querySelector<HTMLUListElement>(".comment-container")
  };

  if (!elements.showHideBtn || !elements.commentWrapper || !elements.form ||
      !elements.nameField || !elements.commentField || !elements.list) {
    console.error("Required comment elements not found in DOM");
    return;
  }

  console.log("Found all required comment elements");
  elements.commentWrapper.style.display = "none";

  let isCommentsVisible = false;

  const toggleComments = (): void => {
    isCommentsVisible = !isCommentsVisible;
    elements.commentWrapper!.style.display = isCommentsVisible ? "block" : "none";
    elements.showHideBtn!.textContent = isCommentsVisible ? "Hide comments" : "Show comments";
    console.log(`Comments ${isCommentsVisible ? 'shown' : 'hidden'}`);
  };

  const addComment = (name: string, comment: string, container: HTMLUListElement): void => {
    console.log(`Adding comment to DOM: ${name}`);

    const listItem = document.createElement("li");
    const namePara = document.createElement("p");
    const commentPara = document.createElement("p");

    namePara.textContent = name;
    commentPara.textContent = comment;

    listItem.appendChild(namePara);
    listItem.appendChild(commentPara);
    container.appendChild(listItem);

    console.log("Comment successfully appended to DOM");
  };

  const handleCommentSubmit = (e: SubmitEvent): void => {
    e.preventDefault();
    console.log("Comment submission started...");

    const nameValue = elements.nameField!.value.trim();
    const commentValue = elements.commentField!.value.trim();

    if (!nameValue || !commentValue) {
      console.warn("Comment submission failed: empty fields");
      alert("Please enter both name and comment");
      return;
    }

    console.log(`New comment from: ${nameValue}`);
    addComment(nameValue, commentValue, elements.list!);

    // Clear form fields
    elements.nameField!.value = "";
    elements.commentField!.value = "";
    console.log("Comment added successfully");
  };

  // Use addEventListener instead
  elements.showHideBtn.addEventListener("click", toggleComments);
  elements.form.addEventListener("submit", handleCommentSubmit);
  console.log("Event listeners attached successfully");
};