const verifyToken = () => {
  const token = localStorage.getItem('token');

  fetch('http://localhost:3310/api/v1/token', {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      Authorization: token
    }
  })
    .then(res => res.json())
    .then((data) => {
      let message = '';

      message = 'No token supplied' || 'Invalid token supplied';
      if (data.message === message || data.message.name === 'JsonWebTokenError') {
        location.assign('../unauthorized.html');
      }
    })
    .catch((error) => {
      console.log('CATCH ERROR', error.message);
    });
};

verifyToken();
