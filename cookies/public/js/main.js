document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
  
    if (loginForm) {
      loginForm.addEventListener('submit', function (e) {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
  
        if (username === '' || password === '') {
          e.preventDefault();
          alert('Both fields are required');
        }
      });
    }
  
    if (signupForm) {
      signupForm.addEventListener('submit', function (e) {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
  
        if (username === '' || password === '') {
          e.preventDefault();
          alert('Both fields are required');
        }
      });
    }
  });
  