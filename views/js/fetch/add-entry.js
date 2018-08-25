const addEntry = (event) => {
  event.preventDefault();
  const token = localStorage.getItem('token');

  const title = document.querySelector('#title').value.trim();
  const description = document.querySelector('#description').value.trim();
  console.log('TITLE BEFORE FETCH', title);
  fetch('http://localhost:3310/api/v1/entries', {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify({
      title, description
    })
  })
    .then(response => response.json())
    .then((data) => {
      let message = '';
      console.log('DATA LOG', data);
      message = 'You have made no input for Diary Entry Title';
      if (data.message === message) {
        Utils.displayMessage(data.message, 'red', 0);
        return;
      }

      message = 'Title field cannot be empty';
      if (data.message === message) {
        Utils.displayMessage(data.message, 'red', 0);
        return;
      }

      message = 'Your title should be 3 to 20 characters long';
      if (data.message === message) {
        Utils.displayMessage(data.message, 'red', 0);
        return;
      }

      message = "Title should not contain special characters except for ! . - @ & '";
      if (data.message === message) {
        Utils.displayMessage(data.message, 'red', 0);
        return;
      }

      message = 'You have made no input for Diary Entry description';
      if (data.message === message) {
        Utils.displayMessage(data.message, 'red', 1);
        return;
      }

      message = 'description field cannot be empty';
      if (data.message === message) {
        Utils.displayMessage(data.message, 'red', 1);
        return;
      }

      message = 'Your description should be 10 to 255 characters long';
      if (data.message === message) {
        Utils.displayMessage(data.message, 'red', 1);
        return;
      }

      message = "description should not contain special characters except for ! . - ' : ; , @ &";
      if (data.message === message) {
        Utils.displayMessage(data.message, 'red', 1);
        return;
      }

      message = 'No token supplied';
      if (data.message === message) {
        Utils.notification(data.message, 'white', 'red');
        return;
      }

      message = 'JsonWebTokenError';
      if (data.message.name === message) {
        Utils.notification(data.message.name, 'white', 'red');
        return;
      }

      message = 'Invalid token supplied';
      if (data.message === message) {
        Utils.notification(data.message, 'white', 'red');
        return;
      }

      message = 'Your entry is recorded!';
      if (data.message === message) {
        message = '&#9989';
        Utils.displayMessage(message, 'lime', 0);
        Utils.displayMessage(message, 'lime', 1);

        setTimeout(() => {
          location.assign('view-entry.html');
        }, 2000);
      }
    })
    .catch((error) => {
      console.log('Info From Catch', error);
    });
};

document.querySelector('#entryForm').addEventListener('submit', addEntry);
