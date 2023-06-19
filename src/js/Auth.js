/* eslint-disable prettier/prettier */
import Chat from "./Chat";
import Tooltip from "./Tooltip/Tooltip";

class Auth {

  async handlerSubmit() {
    const modal = document.querySelector(".modal");
    const modalInput = document.querySelector(".modal__input");

    const value = modalInput.value.trim();
    if (!value) return;

    try {
      const response = await fetch('https://ahj-chat-back.onrender.com/auth', {
        method: 'POST',
        body: JSON.stringify({ value }),
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) throw new Error('Failed to login');

      document.querySelector(".tooltip") && new Tooltip(modalInput).removeTooltip();
      modal.style.display = 'none';

      new Chat(value).getChat();
      
    } catch (err) {
      const tooltip = new Tooltip(modalInput)
      tooltip.addTooltip();
      setTimeout(() => tooltip.removeTooltip(), 3000);
    }
  }

  handlerChanged() {
    if (!document.querySelector(".tooltip")) return;
    const modalInput = document.querySelector(".modal__input");
    new Tooltip(modalInput).removeTooltip();
  }
}

export default Auth;
