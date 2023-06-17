/* eslint-disable prettier/prettier */
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
    const ws = new WebSocket('ws://localhost:7070/ws');
    const chat = document.querySelector(".chat__container");
    const chatUsers = document.querySelector(".chat__users");

    ws.addEventListener('message', (e) => {
      const data = JSON.parse(e.data);
      const users = [];
      
      const { chat: messages } = data;
      
      messages.forEach(message => {
        const item = document.createElement('div');

        item.className = message.name === this.name ? "chat__item_right" : "chat__item";
        item.innerHTML = `
          <span class="chat__name">${message.name}</span>
          <span class="chat__date">${new Date(message.date).toLocaleString()}</span>
          <div class="chat__item-text">${message.body}</div>
        `;
        chat.append(item);

        !users.includes(message.name) && users.push(message.name)
      });

      users.forEach(user => {
        if (chatUsers.textContent.includes(user)) return;

        const userItem = document.createElement('li');
        userItem.className = user === this.name ? "chat__user_me" : "chat__user";
        userItem.textContent = user;
        chatUsers.append(userItem);
      })

      chat.scrollTo(0, chat.scrollHeight)
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