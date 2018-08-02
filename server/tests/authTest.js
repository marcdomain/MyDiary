import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

const { expect } = chai;

chai.use(chaiHttp);

describe('Test Post user Signup API', () => {
  it('Should return 201 for success', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        name: 'valid user',
        username: 'testuser',
        email: 'testuser@gmail.com',
        password: 'testuser'
      })
      .end((error, response) => {
        expect(response).to.have.status(201);
        expect(response.body.message).to.be.a('string');
        done();
      });
  });

  it('Should return 406 for a signup having undefined name', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        id: 1,
        username: 'marc4',
        email: 'marc4@gmail.com',
        password: 'marcpass'
      })
      .end((error, response) => {
        expect(response).to.have.status(406);
        expect(response.body.message).to.equal('You have made no input for name');
        done();
      });
  });

  it('Should return 406 for an empty name field', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        id: 1,
        name: '',
        username: 'marc2',
        email: 'marc2@gmail.com',
        password: 'marcpass'
      })
      .end((error, response) => {
        expect(response).to.have.status(406);
        expect(response.body.message).to.equal('name field cannot be empty');
        done();
      });
  });

  it('Should return 406 for an invalid name character length', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        name: 'marc',
        username: 'marc3',
        email: 'marc3@gmail.com',
        password: 'marcpass'
      })
      .end((error, response) => {
        expect(response).to.have.status(406);
        expect(response.body.message).to.equal('name should be 5 to 50 characters long');
        done();
      });
  });

  it('Should return 406 for invalid characters in name field', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        id: 1,
        name: 'marc #%',
        username: 'marc6',
        email: 'marc6@gmail.com',
        password: 'marcpass'
      })
      .end((error, response) => {
        expect(response).to.have.status(406);
        expect(response.body.message).to.equal('name can only contain alphabets and whitespace');
        done();
      });
  });

  it('Should return 406 for an undefined username field', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        id: 1,
        name: 'king marc',
        email: 'marc7@gmail.com',
        password: 'marcpass'
      })
      .end((error, response) => {
        expect(response).to.have.status(406);
        expect(response.body.message).to.equal('You have made no input for username');
        done();
      });
  });

  it('Should return 406 for an empty username field', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        id: 1,
        name: 'king marc',
        username: '',
        email: 'marc8@gmail.com',
        password: 'marcpass'
      })
      .end((error, response) => {
        expect(response).to.have.status(406);
        expect(response.body.message).to.equal('Username field cannot be empty');
        done();
      });
  });

  it('Should return 406 for an invalid username character length', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        id: 1,
        name: 'king marc',
        username: 'm',
        email: 'marc9@gmail.com',
        password: 'marcpass'
      })
      .end((error, response) => {
        expect(response).to.have.status(406);
        expect(response.body.message).to.equal('username should be 2 to 25 characters long');
        done();
      });
  });

  it('Should return 406 for a username having whitespace', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        id: 1,
        name: 'marc space',
        username: 'marc marc',
        email: 'marc10@gmail.com',
        password: 'marcpass'
      })
      .end((error, response) => {
        expect(response).to.have.status(406);
        expect(response.body.message).to.equal('Remove whitespace from your username');
        done();
      });
  });

  it('Should return 406 for a username having non-alphanumeric characters', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        id: 1,
        name: 'king marc',
        username: '#marc',
        email: 'marc13@gmail.com',
        password: 'marcpass'
      })
      .end((error, response) => {
        expect(response).to.have.status(406);
        expect(response.body.message).to.equal('Only Alphanumeric charaters are allowed for username');
        done();
      });
  });

  it('Should return 409 for an existing username', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        name: 'valid user',
        username: 'testuser',
        email: 'testuser222@gmail.com',
        password: 'testuser'
      })
      .end((err, res) => {
        expect(res).to.have.status(409);
        done();
      });
  });

  it('Should return 406 for undefined email field', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        id: 1,
        name: 'king marc',
        username: 'marco',
        password: 'marcpass'
      })
      .end((error, response) => {
        expect(response).to.have.status(406);
        expect(response.body.message).to.equal('You have made no input for email');
        done();
      });
  });

  it('Should return 406 for signup having empty email field', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        id: 1,
        name: 'king marc',
        username: 'marcooo',
        email: '',
        password: 'marcpass'
      })
      .end((error, response) => {
        expect(response).to.have.status(406);
        expect(response.body.message).to.equal('Email field cannot be empty');
        done();
      });
  });

  it('Should return 406 for signup having invalid email format', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        id: 1,
        name: 'king marc',
        username: 'marco1',
        email: 'marc#gmail.com',
        password: 'marcpass'
      })
      .end((error, response) => {
        expect(response).to.have.status(406);
        expect(response.body.message).to.equal('Your email format is invalid');
        done();
      });
  });

  it('Should return 406 for signup having invalid email character length', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        id: 1,
        name: 'king marc',
        username: 'marco3',
        email: 'ab@h.com',
        password: 'marcpass'
      })
      .end((error, response) => {
        expect(response).to.have.status(406);
        expect(response.body.message).to.equal('Your email should be 10 to 50 characters long');
        done();
      });
  });

  it('Should return 409 for an existing email address', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        id: 1,
        name: 'king marc',
        username: 'marccco',
        email: 'testuser@gmail.com',
        password: 'marcpass'
      })
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body.message).to.equal('Email taken! Login if it is yours or signup with a new email');
        done();
      });
  });

  it('Should return 406 for a signup having undefined password', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        id: 1,
        name: 'king marc',
        username: 'marco4',
        email: 'marc4@yahoo.com',
      })
      .end((error, response) => {
        expect(response).to.have.status(406);
        expect(response.body.message).to.equal('You have made no input for password');
        done();
      });
  });

  it('Should return 406 for a signup having empty password field', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        id: 1,
        name: 'king marc',
        username: 'marco5',
        email: 'marc5@yahoo.com',
        password: ''
      })
      .end((error, response) => {
        expect(response).to.have.status(406);
        expect(response.body.message).to.equal('Password field cannot be empty');
        done();
      });
  });

  it('Should return 406 for invalid password length', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        id: 1,
        name: 'king marc',
        username: 'marco6',
        email: 'marc6@yahoo.com',
        password: 'mar'
      })
      .end((error, response) => {
        expect(response).to.have.status(406);
        expect(response.body.message).to.equal('Password should be 4 to 16 characters long');
        done();
      });
  });

  it('Should return 406 for a password having whitespace', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        id: 1,
        name: 'king marc',
        username: 'marco7',
        email: 'marc7@yahoo.com',
        password: 'marc pass'
      })
      .end((error, response) => {
        expect(response).to.have.status(406);
        expect(response.body.message).to.equal('Remove whitespace from your password');
        done();
      });
  });
}); // User signup test ends here

describe('Test Post user Signin API', () => {
  it('Should return 406 for an undefined username field', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        password: 'marcpass'
      })
      .end((error, response) => {
        expect(response).to.have.status(406);
        expect(response.body.message).to.equal('You have made no input for username');
        done();
      });
  });

  it('Should return 406 for an empty username field', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        username: '',
        password: 'marcpass'
      })
      .end((error, response) => {
        expect(response).to.have.status(406);
        expect(response.body.message).to.equal('username field cannot be empty');
        done();
      });
  });

  it('Should return 404 for a non-existing username', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        username: 'testuser2',
        password: 'marcpass'
      })
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body.message).to.equal('User not found. Please signup');
        done();
      });
  });

  it('Should return 406 for a signin having undefined password', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        username: 'marc55',
      })
      .end((error, response) => {
        expect(response).to.have.status(406);
        expect(response.body.message).to.equal('You have made no input for password');
        done();
      });
  });

  it('Should return 406 for a signin having empty password field', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        username: 'marc',
        password: ''
      })
      .end((error, response) => {
        expect(response).to.have.status(406);
        expect(response.body.message).to.equal('password field cannot be empty');
        done();
      });
  });

  it('Should return 401 for a comibination of correct username and incorrect password', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        username: 'testuser',
        password: 'marc#pass'
      })
      .end((error, response) => {
        expect(response).to.have.status(401);
        expect(response.body.message).to.equal('Incorrect password');
        done();
      });
  });

  it('Should return 200 for success', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        username: 'testuser',
        password: 'testuser'
      })
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body.message).to.be.a('string');
        done();
      });
  });
}); // User signin test ends here
