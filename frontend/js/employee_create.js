document.addEventListener('DOMContentLoaded', loadForms);

let selectedFields = [];

function loadForms() {
  fetch('http://127.0.0.1:8000/api/forms/', {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('access')
    }
  })
  .then(res => res.json())
  .then(data => {
    const selector = document.getElementById('formSelector');
    data.forEach(form => {
      const option = document.createElement('option');
      option.value = form.id;
      option.text = form.name;
      selector.add(option);
    });
  });
}

function loadForm() {
  const formId = document.getElementById('formSelector').value;
  fetch(`http://127.0.0.1:8000/api/forms/${formId}/`, {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('access')
    }
  })
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('dynamicForm');
    container.innerHTML = '';
    selectedFields = data.fields;
    selectedFields.forEach((field, i) => {
      const input = document.createElement('input');
      input.placeholder = field.label;
      input.id = `field_${i}`;
      container.appendChild(input);
    });
  });
}

function submitEmployee() {
  const formId = document.getElementById('formSelector').value;
  const data = {};
  selectedFields.forEach((field, i) => {
    data[field.label] = document.getElementById(`field_${i}`).value;
  });

  fetch('http://127.0.0.1:8000/api/employees/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access')
    },
    body: JSON.stringify({ form: formId, data })
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById('message').innerText = 'Employee created!';
  });
}
