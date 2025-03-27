import axios from 'axios';
import { hideAlert, show_alert } from './alert';

export const anomaly = async (algo) => {
  try {
    const fileInput = document.getElementById('fileInput');
    const chatMessages = document.querySelector('.chat-messages');

    if (!fileInput.files.length) {
      show_alert('error', 'Please select a file before sending.');
      return;
    }

    const file = fileInput.files[0];

    const userMessage = document.createElement('div');
    userMessage.classList.add('message', 'sent');
    userMessage.textContent = `📂 ${file.name}`;
    chatMessages.appendChild(userMessage);
    // CHANGE IF NOT WORK

    const analyzingMessage = document.createElement('div');
    analyzingMessage.id = 'analyzingMessage';
    analyzingMessage.classList.add('message', 'received');
    analyzingMessage.textContent = 'Processing';
    analyzingMessage.style.color = '#f5e677';
    chatMessages.appendChild(analyzingMessage);

    let dotIndex = 0;
    const dots = [' .', ' . .', ' . . .'];

    function animateDots() {
      dotIndex = (dotIndex + 1) % dots.length;
      analyzingMessage.textContent = 'Processing' + dots[dotIndex];
      setTimeout(animateDots, 500);
    }

    animateDots(); // Start animating the dots

    //--------------------------------------------------------------------

    const formData = new FormData();
    formData.append('file', file);
    // show_alert('success', 'Uploading and ');

    const res = await axios({
      method: 'POST',
      url: `/api/v1/anomaly/${algo}`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('did i trigger myself?');
    analyzingMessage.style.display = 'none';
    if (res.data.status === 'success') {
      const responseList = res.data.data.result.data;
      const serverMessage = document.createElement('div');
      serverMessage.style.color = '#ddd9e7';
      serverMessage.classList.add('message', 'received');
      serverMessage.textContent = `Total count: ${res.data.data.result.count}`;
      chatMessages.appendChild(serverMessage);

      responseList.forEach((item, index) => {
        const formattedMessage = `
            Outlier ${index + 1}<br>
            ${JSON.stringify(item, null, 2)}
          `;

        const serverMessage = document.createElement('div');
        serverMessage.classList.add('message', 'received');
        serverMessage.innerHTML = formattedMessage;
        chatMessages.appendChild(serverMessage);
      });
      //   hideAlert();
    }
  } catch (err) {
    console.log('an error triggered');
    // const analyzingMessage = document.getElementById('analyzingMessage');
    const analyzingMessage = document.getElementById('analyzingMessage');
    if (analyzingMessage) analyzingMessage.remove();
    show_alert('error', `${err.response.data.message}`);
    const errorMessage = document.createElement('div');
    errorMessage.classList.add('message', 'received');
    errorMessage.textContent = '⚠️ Error: Could not process the file';
    document.querySelector('.chat-messages').appendChild(errorMessage);
  }
};
