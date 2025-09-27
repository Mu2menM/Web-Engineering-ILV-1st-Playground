console.log("Using addEventListener for proper event management");
export const initializeComments = () => {
  console.log("Initializing comments system...");
  
  const showHideBtn = document.querySelector(".show-hide");
  const commentWrapper = document.querySelector(".comment-wrapper");
  const form = document.querySelector(".comment-form");
  const nameField = document.querySelector("#name");
  const commentField = document.querySelector("#comment");
  const list = document.querySelector(".comment-container");

  if (!showHideBtn || !commentWrapper || !form || !nameField || !commentField || !list) {
    console.error("Required comment elements not found in DOM");
    return;
  }

  console.log("Found all required comment elements");
  commentWrapper.style.display = "none";

  // Use addEventListener instead
  showHideBtn.addEventListener("click", toggleComments);
  form.addEventListener("submit", handleCommentSubmit);
  console.log("Event listeners attached successfully");

  let isCommentsVisible = false;

  function toggleComments() {
    isCommentsVisible = !isCommentsVisible;
    commentWrapper.style.display = isCommentsVisible ? "block" : "none";
    showHideBtn.textContent = isCommentsVisible ? "Hide comments" : "Show comments";
    console.log(`Comments ${isCommentsVisible ? 'shown' : 'hidden'}`);
  }

  function handleCommentSubmit(e) {
    e.preventDefault();
    console.log("Comment submission started...");
    
    const nameValue = nameField.value.trim();
    const commentValue = commentField.value.trim();

    if (!nameValue || !commentValue) {
      console.warn("Comment submission failed: empty fields");
      alert("Please enter both name and comment");
      return;
    }

    console.log(`New comment from: ${nameValue}`);
    
    // FIX: Use the existing list variable and create elements properly
    addComment(nameValue, commentValue, list);
    
    // Clear form fields
    nameField.value = "";
    commentField.value = "";
    console.log("Comment added successfully");
  }

  // FIX: Define the missing addComment function
  function addComment(name, comment, container) {
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
  }
};