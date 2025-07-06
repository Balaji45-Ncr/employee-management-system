function loadEmployees() {
  const search = document.getElementById('search').value;
  let url = 'http://127.0.0.1:8000/api/employees/';
  if (search) url += '?search=' + encodeURIComponent(search);

  fetch(url, {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('access')
    }
  })
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('employeeList');
    container.innerHTML = '';
    data.forEach(emp => {
      const div = document.createElement('div');
      div.innerHTML = `
        <pre>${JSON.stringify(emp.data, null, 2)}</pre>
        <button onclick="deleteEmployee(${emp.id})">Delete</button>
      `;
      container.appendChild(div);
    });
  });
}

function deleteEmployee(id) {
  fetch(`http://127.0.0.1:8000/api/employees/${id}/`, {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('access')
    }
  })
  .then(() => {
    loadEmployees();
  });
}
