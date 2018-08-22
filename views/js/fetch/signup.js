const signup = (event) => {
  event.preventDefault();
  const name = document.querySelector('#name').value.trim();
  const username = document.querySelector('#username').value.trim();
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value.trim();

  fetch('http://localhost:3310/api/v1/auth/signup', {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      name, username, email, password
    })
  })
    .then(response => response.json())
    .then((data) => {
      let message = '';

      message = 'You have made no input for name';
      if (data.message === message) {
        Utils.displayMessage(data.message, 'red', 0);
        return;
      }

      message = 'name field cannot be empty';
      if (data.message === message) {
        Utils.displayMessage(data.message, 'red', 0);
        return;
      }

      message = 'name should be 5 to 50 characters long';
      if (data.message === message) {
        Utils.displayMessage(data.message, 'red', 0);
        return;
      }

      message = 'name can only contain alphabets and whitespace';
      if (data.message === message) {
        Utils.displayMessage(data.message, 'red', 0);
        return;
      }

      message = 'You have made no input for username';
      if (data.message === message) {
        Utils.displayMessage(data.message, 'red', 1);
        return;
      }

      message = 'Username field cannot be empty';
      if (data.message === message) {
        Utils.displayMessage(data.message, 'red', 1);
        return;
      }

      message = 'username should be 2 to 25 characters long';
      if (data.message === message) {
        Utils.displayMessage(data.message, 'red', 1);
        return;
      }

      message = 'Remove whitespace from your username';
      if (data.message === message) {
        Utils.displayMessage(data.message, 'red', 1);
        return;
      }

      message = 'Only Alphanumeric charaters are allowed for username';
      if (data.message === message) {
        Utils.displayMessage(data.message, 'red', 1);
        return;
      }

      message = 'Username taken! Login if it is yours or signup with a new username';
      if (data.message === message) {
        Utils.displayMessage(data.message, 'red', 1);
        return;
      }

      message = 'You have made no input for email';
      if (data.message === message) {
        Utils.displayMessage(data.message, 'red', 2);
        return;
      }

      message = 'Email field cannot be empty';
      if (data.message === message) {
        Utils.displayMessage(data.message, 'red', 2);
        return;
      }

      message = 'Your email format is invalid';
      if (data.message === message) {
        Utils.displayMessage(data.message, 'red', 2);
        return;
      }

      message = 'Your email should be 10 to 50 characters long';
      if (data.message === message) {
        Utils.displayMessage(data.message, 'red', 2);
        return;
      }

      message = 'Email taken! Login if it is yours or signup with a new email';
      if (data.message === message) {
        Utils.displayMessage(data.message, 'red', 2);
        return;
      }

      message = 'You have made no input for password';
      if (data.message === message) {
        Utils.displayMessage(data.message, 'red', 3);
        return;
      }

      message = 'Password field cannot be empty';
      if (data.message === message) {
        Utils.displayMessage(data.message, 'red', 3);
        return;
      }

      message = 'Password should be 4 to 16 characters long';
      if (data.message === message) {
        Utils.displayMessage(data.message, 'red', 3);
        return;
      }

      message = 'Remove whitespace from your password';
      if (data.message === message) {
        Utils.displayMessage(data.message, 'red', 3);
        return;
      }

      localStorage.setItem('token', data.yourToken);
      setTimeout(() => {
        location.assign('add-entry.html');
      }, 2000);
    })
    .catch((error) => {
      console.log('Info From Catch', error);
    });
};

document.querySelector('#signupForm').addEventListener('submit', signup);
