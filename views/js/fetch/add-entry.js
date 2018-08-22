const addEntry = (eventBtn) => {
  eventBtn.preventDefault();
  const title = document.querySelector('#title').value.trim();
  const description = document.querySelector('#description').value.trim();

  fetch('http://localhost:3310/api/v1/entries', {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      title,
      description
    })
  })
    .then(response => response.json())
    .then((data) => {
      let message = '';

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
      
    })
}
