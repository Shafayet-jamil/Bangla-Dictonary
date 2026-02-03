// const { createRef, createElement } = require("react");

const searchBtn = document.querySelector('.searchButton');
let input = document.querySelector('.inputWord'); 
let outputField = document.querySelector('.output-field');
 
 

searchBtn.addEventListener('click', () => {
    let inputText = input.value;
    outputField.innerHTML = "";

    let p = document.createElement('p'); 
    p.innerText = inputText;
    outputField.appendChild(p); 
}); 


