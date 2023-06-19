/* eslint-disable prettier/prettier */
import Transport from "./Transport";

class Chat {
  constructor (name) {
    this.name = name;
  }

  getChat() {
    const chatEl = document.createElement('div');
    chatEl.className = 'chat';
    chatEl.innerHTML = `
      <ul class="chat__users">
      </ul>
      <div class="chat__body">
        <div class="chat__container"></div>
        <input type="text" class="chat__input" placeholder="Type your message here">
      </div>
    `;
    document.body.appendChild(chatEl);

    this.ws();
  }

  async ws() {
    const ws = new WebSocket('wss://ahj-chat-back.onrender.com/ws');

    ws.onopen = event => console.log(event);
    ws.onerror = event => console.log(event);

    ws.addEventListener('message', (e) => {
      const { chat: messages } = JSON.parse(e.data);
      Transport.handlerMessages(messages, this.name);
    });

    const input = document.querySelector('.chat__input');
    
    input.addEventListener("keydown", e => {
      if (e.key !== "Enter") return;
      const message = input.value.trim();
      if (!message) return;
      
      ws.send(JSON.stringify({
        name: this.name,
        date: new Date(),
        body: message
      }));

      input.value = '';
    });
  }
}

export default Chat;