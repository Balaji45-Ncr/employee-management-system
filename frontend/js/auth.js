function showMessage(msg) {
  document.getElementById('message').innerText = msg;
}

function registerUser() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  fetch('http://127.0.0.1:8000/api/register/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
  .then(res => {
    if (res.ok) {
      showMessage('Registration successful! Go to Login.');
    } else {
      showMessage('Registration failed.');
    }
  });
}

function loginUser() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

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
      showMessage('Login successful!');
      window.location.href = 'profile.html';
    } else {
      showMessage('Login failed.');
    }
  });
}
