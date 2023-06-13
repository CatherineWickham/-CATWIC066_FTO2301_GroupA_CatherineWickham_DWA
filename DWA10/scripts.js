const number = document.querySelector('[data-key="number"]');
const subtract = document.querySelector('[data-key="subtract"]');
const add = document.querySelector('[data-key="add"]');

const reset = document.querySelector('[data-key="reset"]');
const resetDialog = document.querySelector(".dialog-width");
const closeResetDialog = resetDialog.querySelector('sl-button[slot="footer"]');

subtract.addEventListener("click", () => {
  number.innerText = Number(number.innerText) - 1;
});

add.addEventListener("click", () => {
  number.innerText = Number(number.innerText) + 1;
});

reset.addEventListener("click", () => {
  number.innerText = 0;
  resetDialog.show();
});

closeResetDialog.addEventListener("click", () => resetDialog.hide());
