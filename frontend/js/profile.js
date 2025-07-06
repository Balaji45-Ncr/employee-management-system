document.addEventListener('DOMContentLoaded', getProfile);

function getProfile() {
  fetch('http://127.0.0.1:8000/api/profile/', {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('access')
    }
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById('profile').innerText = `Username: ${data.username}, Email: ${data.email}`;
  });
}

function logout() {
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');
  window.location.href = 'login.html';
}
