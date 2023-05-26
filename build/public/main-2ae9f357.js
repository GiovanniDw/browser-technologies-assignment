const $ = (e) => document.querySelector(e);
let pathArray = window.location.pathname.split("/");
let currentSlug = pathArray[2].toString();
let formID = currentSlug;
const url = location.href;
$("#next-form");
const formIdentifier = `${url} ${formID}`;
let form = $(`#${formID}`);
let formElements = form.elements;
console.log(formElements);
const getFormData = () => {
  let data = { [formIdentifier]: {} };
  for (const element of formElements) {
    if (element.name.length > 0) {
      data[formIdentifier][element.name] = element.value;
    }
  }
  return data;
};
const nextBtn = $("#nextBtn");
const classSubmit = $("#next-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  let data = getFormData();
  localStorage.setItem(formIdentifier, JSON.stringify(data[formIdentifier]));
  const message = "Form draft has been saved!";
  console.log(message);
  console.log("nextBtn.value");
  console.log(nextBtn.value);
});
classSubmit.addEventListener("click", (e) => {
  e.currentTarget.submit();
});
const populateForm = () => {
  if (localStorage.key(formIdentifier)) {
    const savedData = JSON.parse(localStorage.getItem(formIdentifier));
    for (const element of formElements) {
      if (element.name in savedData) {
        element.value = savedData[element.name];
      }
    }
    const message = "Form has been refilled with saved data!";
    console.log(message);
  }
};
const logoutBTN = $("#logOutButton");
logoutBTN.addEventListener("click", () => {
  window.localStorage.clear();
});
document.onload = populateForm();
//# sourceMappingURL=main-2ae9f357.js.map
