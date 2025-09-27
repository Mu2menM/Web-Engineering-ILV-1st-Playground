import { initializeSearchHighlighter } from "./search.js";
import { initializeComments } from "./comments.js";
import { initializeBearData } from "./bears.js";

document.addEventListener("DOMContentLoaded", () => {
  initializeSearchHighlighter();
  initializeComments();
  initializeBearData();
});
