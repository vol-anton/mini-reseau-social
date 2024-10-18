// FETCH MESSAGES
fetch('data/conversations.json')
  .then(response => response.json())
  .then(conversations => {
    const conversationsContainer = document.getElementById('conversations-container');
    const conversationDetails = document.getElementById('conversation-details');
    const messageHistory = document.getElementById('message-history');
    const participantName = document.getElementById('conversation-participant');
    const newMessageInput = document.getElementById('new-message');
    const sendMessageButton = document.getElementById('send-message');

    // list of conversations
    conversations.forEach(conversation => {
      const convDiv = document.createElement('div');
      convDiv.classList.add('conversation');
      convDiv.innerHTML = `
        <img src="${conversation.profileImage}" alt="${conversation.name}" class="profile-pic">
        <div>
          <p><strong>${conversation.name}</strong></p>
          <p>Last message: ${conversation.lastMessage}</p>
        </div>
      `;

      conversationsContainer.appendChild(convDiv);

      convDiv.addEventListener('click', () => {
        conversationDetails.classList.remove('hidden');
        participantName.textContent = conversation.name;
        messageHistory.innerHTML = ''; // Clear previous messages

        // message history
        conversation.messages.forEach(message => {
          const messageDiv = document.createElement('div');
          messageDiv.classList.add('message');
          messageDiv.innerHTML = `
            <p><strong>${message.sender}</strong> [${message.timestamp}]:</p>
            <p>${message.content}</p>
          `;
          messageHistory.appendChild(messageDiv);
        });

        // send new message
        sendMessageButton.onclick = function () {
          const newMessage = newMessageInput.value.trim();
          if (newMessage !== '') {
            const timestamp = new Date().toLocaleString('fr-FR');
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message');
            messageDiv.innerHTML = `
              <p><strong>Vous</strong> [${timestamp}]:</p>
              <p>${newMessage}</p>
            `;
            messageHistory.appendChild(messageDiv);

            // simulate JSON
            conversation.messages.push({
              timestamp: timestamp,
              sender: 'Vous',
              content: newMessage
            });

            // update last message
            convDiv.querySelector('p:nth-child(2)').textContent = `Last message: ${newMessage}`;
            newMessageInput.value = ''; // clear input
          }
        };
      });
    });
  });
