// scripts.js

const form = document.querySelector("[data-form]");
const result = document.querySelector("[data-result]");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  
  try {
    const entries = new FormData(event.target);
    const { dividend, divider } = Object.fromEntries(entries);

    if ((!dividend) || (!divider)) {
      result.innerText = 'Division not performed. Both values are required in inputs. Try again';
      return;
    }

    if ((dividend < 0) || (divider <= 0)) {
      result.innerText = 'Division not performed. Invalid number provided. Try again';
      throw new Error ('Invalid number');
    }

    if (Number.isNaN(Number(dividend)) || Number.isNaN(Number(divider))) {
      document.querySelector('body').innerText = 'Something critical went wrong. Please reload the page';
      throw new Error ('(CRITICAL) Input not a number');
    }
  
    result.innerText = Math.floor(dividend / divider);

  } catch(err) {
    result.innerText = 'Division not performed. Invalid number provided. Try again';
    console.log(err.stack);
  } 
});