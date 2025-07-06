let fieldCount = 0;

function addField() {
  const fieldsDiv = document.getElementById('fields');
  const div = document.createElement('div');
  div.className = 'field-row';
  div.innerHTML = `
    <input placeholder="Label" id="label_${fieldCount}">
    <select id="type_${fieldCount}">
      <option value="text">Text</option>
      <option value="number">Number</option>
      <option value="date">Date</option>
      <option value="password">Password</option>
    </select>
  `;
  fieldsDiv.appendChild(div);
  fieldCount++;
}

function saveForm() {
  const name = document.getElementById('formName').value;
  const fields = [];
  for (let i = 0; i < fieldCount; i++) {
    const label = document.getElementById(`label_${i}`).value;
    const field_type = document.getElementById(`type_${i}`).value;
    fields.push({ label, field_type, order: i });
  }

  fetch('http://127.0.0.1:8000/api/forms/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access')
    },
    body: JSON.stringify({ name, fields })
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById('message').innerText = 'Form saved!';
  });
}
