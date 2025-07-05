function showMessage(msg) {
  document.getElementById('message').innerText = msg;
}

function registerUser() {
  const username = document.getElementById('registerUsername').value;
  const password = document.getElementById('registerPassword').value;

  fetch('http://127.0.0.1:8000/api/register/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
  .then(res => {
    if (res.ok) {
      showMessage('Registration successful! Please login.');
    } else {
      showMessage('Registration failed. Username may be taken.');
    }
  });
}

function loginUser() {
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;

  fetch('http://127.0.0.1:8000/api/token/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
  .then(res => res.json())
  .then(data => {
    if (data.access) {
      localStorage.setItem('access', data.access);
      localStorage.setItem('refresh', data.refresh);
      showMessage('Login successful! Token saved in localStorage.');
    } else {
      showMessage('Login failed. Check your username/password.');
    }
  });
}
