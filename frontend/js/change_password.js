function changePassword() {
  const old_password = document.getElementById('old_password').value;
  const new_password = document.getElementById('new_password').value;

  fetch('http://127.0.0.1:8000/api/change-password/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access')
    },
    body: JSON.stringify({ old_password, new_password })
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById('message').innerText = data.detail || 'Error changing password.';
  });
}
