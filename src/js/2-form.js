const STORAGE_KEY = '"feedback-form-state"';
const form = document.querySelector('.feedback-form');

form.addEventListener('input', () => {
  const userMail = form.elements.email.value;
  const userText = form.elements.message.value;

  const data = {
    mail: userMail,
    text: userText,
  };

  saveInLS(STORAGE_KEY, data);
});

function loadFromLS(key) {
  const data = localStorage.getItem(key);
  try {
    const result = JSON.parse(data);
    return result;
  } catch {
    return data;
  }
}

function saveInLS(key, value) {
  const jsonSave = JSON.stringify(value);
  localStorage.setItem(key, jsonSave);
}

function loadData() {
  const { mail, text } = loadFromLS(STORAGE_KEY) || {};
  form.elements.email.value = mail || '';
  form.elements.message.value = text || '';
}

loadData();

form.addEventListener('submit', e => {
  e.preventDefault();

  if (form.elements.email.value || form.elements.message.value !== '') {
    const data = loadFromLS(STORAGE_KEY) || {};
    localStorage.removeItem(STORAGE_KEY);
    form.reset();
    const sendData = {
      email: data.mail.trim(),
      message: data.text.trim(),
    };
    console.log(sendData);
  } else {
    alert(`Please fill in all form fields before submitting.`);
  }
});