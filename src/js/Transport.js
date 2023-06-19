/* eslint-disable prettier/prettier */

class Transport {
  static handlerMessages(messages, userName) {
    const chat = document.querySelector(".chat__container");
    const chatUsers = document.querySelector(".chat__users");
    const users = [userName];
            
    messages.forEach(message => {
      const item = document.createElement('div');
      item.className = message.name === userName ? "chat__item_right" : "chat__item";
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
      userItem.className = user === userName ? "chat__user_me" : "chat__user";
      userItem.textContent = user;
      chatUsers.append(userItem);
    })

    chat.scrollTo(0, chat.scrollHeight)
  }
}

export default Transport;