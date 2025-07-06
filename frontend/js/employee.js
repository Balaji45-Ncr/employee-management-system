
function addField() {
  const form = document.getElementById('dynamicForm');

  const row = document.createElement('div');
  row.className = 'field-row';

  const labelInput = document.createElement('input');
  labelInput.placeholder = 'Field Label';

  const valueInput = document.createElement('input');
  valueInput.placeholder = 'Field Value';

  row.appendChild(labelInput);
  row.appendChild(valueInput);

  form.appendChild(row);
}

function submitEmployee() {
  const rows = document.getElementsByClassName('field-row');
  const fields = {};

  for (let row of rows) {
    const label = row.children[0].value;
    const value = row.children[1].value;
    fields[label] = value;
  }

  console.log('Collected Employee Data:', fields);

  const access = localStorage.getItem('access');
  if (!access) {
    showMessage("You are not logged in.");
    return;
  }

  fetch('http://127.0.0.1:8000/api/employees/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access}`
    },
    body: JSON.stringify({ data: fields })
  })
  .then(res => {
    if (res.ok) {
      showMessage("Employee created!");
    } else {
      showMessage("Failed to create employee.");
    }
  })
  .catch(err => showMessage("Error: " + err.message));
}

function showMessage(msg) {
  document.getElementById('message').innerText = msg;
}
