// import "./assets/base.css";
// import "./assets/main.css";
// import "./assets/form.css";

const $ = (e) => document.querySelector(e);
const $$ = (e) => document.querySelectorAll(e);

import { courseData } from "./server/helpers/courseData.js";

let pathArray = window.location.pathname.split('/');
let currentSlug = pathArray[2].toString();
let formID = currentSlug;
const url = location.href;
let nextButton = $('#next-form');

const formIdentifier = `${url} ${formID}`;
console.log(currentSlug)

let form = $(`#${formID}`);
let formElements = form.elements;


console.log(formElements)




// courseData.forEach(element => {
//   let formID = element.slug;
// if (!formID) return;



// console.log(form)
// let url = location.href;
// let formElements = form.elements

// console.log(url)
// console.log(formElements)
  
// });


const getFormData = () => {
  let data = { [formIdentifier]: {} };
  for (const element of formElements) {
    if (element.name.length > 0) {
      data[formIdentifier][element.name] = element.value;
    }
  }
  return data;
};

form.onclick = event => {
  event.preventDefault();
  let data = getFormData();
  localStorage.setItem(formIdentifier, JSON.stringify(data[formIdentifier]));
  const message = "Form draft has been saved!";
  console.log(message);
};

const populateForm = () => {
  if (localStorage.key(formIdentifier)) {
    const savedData = JSON.parse(localStorage.getItem(formIdentifier)); // get and parse the saved data from localStorage
    for (const element of formElements) {
      if (element.name in savedData) {
        element.value = savedData[element.name];
      }
    }
    const message = "Form has been refilled with saved data!";
    console.log(message);
  }
};

document.onload = populateForm(); 