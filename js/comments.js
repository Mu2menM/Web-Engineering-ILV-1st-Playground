export const initializeComments = () => {
  const showHideBtn = document.querySelector(".show-hide");
  const commentWrapper = document.querySelector(".comment-wrapper");
  const form = document.querySelector(".comment-form");
  const nameField = document.querySelector("#name");
  const commentField = document.querySelector("#comment");
  const list = document.querySelector(".comment-container");

  commentWrapper.style.display = "none";

  showHideBtn.onclick = () => {
    const showHideText = showHideBtn.textContent;
    if (showHideText === "Show comment" || showHideText === "Show comments") {
      showHideBtn.textContent = "Hide comments";
      commentWrapper.style.display = "block";
    } else {
      showHideBtn.textContent = "Show comments";
      commentWrapper.style.display = "none";
    }
  };

  form.onsubmit = (e) => {
    e.preventDefault();

    const nameValue = nameField.value.trim();
    const commentValue = commentField.value.trim();

    if (!nameValue || !commentValue) {
      alert("Please enter both name and comment");
      return;
    }

    const listItem = document.createElement("li");
    const namePara = document.createElement("p");
    const commentPara = document.createElement("p");

    namePara.textContent = nameValue;
    commentPara.textContent = commentValue;

    listItem.appendChild(namePara);
    listItem.appendChild(commentPara);
    list.appendChild(listItem);

    nameField.value = "";
    commentField.value = "";
  };
};
