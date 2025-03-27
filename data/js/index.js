import { anomaly } from './req_anomaly';

const chatBtn = document.getElementById('sendButton');
const reportType = document.getElementById('reportType');

if (chatBtn) {
  console.log('chat btn present');
  chatBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    console.log('send hit');

    // const file = document.getElementById('fileInput').files[0];
    await anomaly(`${reportType.value}`);
  });
}
