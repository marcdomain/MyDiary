class Utils {
  static displayMessage(message, color, fieldIndex) {
    const authMessage = document.querySelectorAll('.authMessage')[fieldIndex];
    authMessage.innerHTML = message;
    authMessage.style.display = 'inline-block';
    authMessage.style.color = color;

    setTimeout(() => {
      authMessage.style.display = 'none';
    }, 5000);
  }

  static clearSignup() {
    document.querySelector('#name').value = '';
    document.querySelector('#username').value = '';
    document.querySelector('#email').value = '';
    document.querySelector('#password').value = '';
  }

  static clearLogin() {
    document.querySelector('#username1').value = '';
    document.querySelector('#password1').value = '';
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
