/* eslint-disable prettier/prettier */
import Auth from "./Auth";

const submit = document.querySelector(".modal__submit");
const modalInput = document.querySelector(".modal__input");
const auth = new Auth();

submit.addEventListener("click", auth.handlerSubmit);

modalInput.addEventListener("keydown", e => {
  if (e.key !== "Enter") return;
  auth.handlerSubmit();
});

modalInput.addEventListener('input', auth.handlerChanged);
