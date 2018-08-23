class Utils {
  static displayMessage(message, color, fieldIndex) {
    const formFeedback = document.querySelectorAll('.formFeedback')[fieldIndex];
    formFeedback.innerHTML = message;
    formFeedback.style.display = 'inline-block';
    formFeedback.style.color = color;

    setTimeout(() => {
      formFeedback.style.display = 'none';
    }, 5000);
  }

  static clearSignup() {
    document.querySelector('#name').value = '';
    document.querySelector('#username').value = '';
    document.querySelector('#email').value = '';
    document.querySelector('#password').value = '';
  }

  static clearLogin() {
    document.querySelector('#user').value = '';
    document.querySelector('#pass').value = '';
  }

  static clearAddEntry() {
    document.querySelector('#title').value = '';
    document.querySelector('#description').value = '';
    document.querySelector('#image').value = '';
  }

  static clearCreateReminder() {
    document.querySelector('#title').value = '';
    document.querySelector('#date').value = '';
    document.querySelector('#time').value = '00:00';
  }
}
