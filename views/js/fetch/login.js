const login = (eventBtn) => {
  eventBtn.preventDefault();
  const username = document.querySelector('#user').value.trim();
  const password = document.querySelector('#pass').value.trim();

  fetch('http://localhost:3310/api/v1/auth/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  })
    .then(response => response.json())
    .then((result) => {
      let message = '';

      message = 'You have made no input for username';
      if (result.message === message) {
        Utils.displayMessage(result.message, 'red', 4);
        return;
      }

      message = 'username field cannot be empty';
      if (result.message === message) {
        Utils.displayMessage(result.message, 'red', 4);
        return;
      }

      message = 'User not found. Please signup';
      if (result.message === message) {
        Utils.displayMessage(result.message, 'red', 4);
        return;
      }

      message = 'You have made no input for password';
      if (result.message === message) {
        Utils.displayMessage(result.message, 'red', 5);
        return;
      }

      message = 'password field cannot be empty';
      if (result.message === message) {
        Utils.displayMessage(result.message, 'red', 5);
        return;
      }

      message = 'Incorrect password';
      if (result.message === message) {
        Utils.displayMessage(result.message, 'red', 5);
        return;
      }

      message = '&#9989';
      Utils.displayMessage(message, 'lime', 4);
      Utils.displayMessage(message, 'lime', 5);
      localStorage.setItem('token', result.yourToken);
      setTimeout(() => {
        location.assign('view-all-entries.html');
      }, 2000);
    })
    .catch((error) => {
      console.log('Info From Catch', error);
    });
};

document.querySelector('#signinForm').addEventListener('submit', login);
