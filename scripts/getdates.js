
const currentYearSpan = document.querySelector("#currentyear");
currentYearSpan.textContent = new Date().getFullYear();

const lastModifiedPara = document.querySelector("#lastModified");
lastModifiedPara.textContent = `Last Modified: ${document.lastModified}`;
