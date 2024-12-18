
const STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');

form.addEventListener('input', () => {
  const userMail = form.elements.email.value.trim();
  const userText = form.elements.message.value.trim();

  const data = {
    mail: userMail,
    text: userText,
  };

  saveInLS(STORAGE_KEY, data);
});

function saveInLS(key, value) {
  const jsonSave = JSON.stringify(value);
  localStorage.setItem(key, jsonSave);
}

function loadFromLS(key) {
  const data = localStorage.getItem(key);
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

function loadData() {
  const data = loadFromLS(STORAGE_KEY);
  if (data) {
    const { mail = '', text = '' } = data;
    form.elements.email.value = mail;
    form.elements.message.value = text;
  }
}

form.addEventListener('submit', e => {
  e.preventDefault();

  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();

  if (!email || !message) {
    alert('Please fill in all form fields before submitting.');
    return;
  }

  const sendData = { email, message };
  console.log(sendData);

 
  localStorage.removeItem(STORAGE_KEY);
  form.reset();

  alert('Form successfully submitted!');
});


loadData();
