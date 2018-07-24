import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import users from '../dummyModels/users';

const { expect } = chai;

chai.use(chaiHttp);

describe('Test Post user Signup API', () => {
  it('Should return 406 for a signup having undefined fullName', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({
        id: 1,
        username: 'marc',
        email: 'marc@gmail.com',
        password: 'marcpass'
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal('You have made no input for fullName');
        done();
      });
  });

  it('Should return 406 for an empty fullName field', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({
        id: 1,
        fullName: '',
        username: 'marc',
        email: 'marc@gmail.com',
        password: 'marcpass'
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal('fullName field cannot be empty');
        done();
      });
  });

  it('Should return 406 for an invalid fullName character length', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({
        id: 1,
        fullName: 'marc',
        username: 'marc',
        email: 'marc@gmail.com',
        password: 'marcpass'
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal('fullName should be 5 to 25 characters long');
        done();
      });
  });

  it('Should return 406 for invalid characters in fullName field', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({
        id: 1,
        fullName: 'marc #%',
        username: 'marc',
        email: 'marc@gmail.com',
        password: 'marcpass'
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal('fullName can only contain alphabets and whitespace');
        done();
      });
  });

  it('Should return 406 for an undefined username field', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({
        id: 1,
        fullName: 'king marc',
        email: 'marc@gmail.com',
        password: 'marcpass'
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal('You have made no input for username');
        done();
      });
  });

  it('Should return 406 for an empty username field', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({
        id: 1,
        fullName: 'king marc',
        username: '',
        email: 'marc@gmail.com',
        password: 'marcpass'
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal('Username field cannot be empty');
        done();
      });
  });

  it('Should return 406 for an invalid username character length', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({
        id: 1,
        fullName: 'king marc',
        username: 'm',
        email: 'marc@gmail.com',
        password: 'marcpass'
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal('username should be 2 to 15 characters long');
        done();
      });
  });

  it('Should return 406 for a username having whitespace', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({
        id: 1,
        fullName: 'king marc',
        username: 'marc marc',
        email: 'marc@gmail.com',
        password: 'marcpass'
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal('Remove whitespace from your username');
        done();
      });
  });


  it('Should return 406 for a username having non-alphanumeric characters', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({
        id: 1,
        fullName: 'king marc',
        username: '#marc',
        email: 'marc@gmail.com',
        password: 'marcpass'
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal('Only Alphanumeric charaters are allowed for username');
        done();
      });
  });

  it('Should return 409 for an existing username', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({
        id: 1,
        fullName: 'king marc',
        username: 'marc',
        email: 'marc@gmail.com',
        password: 'marcpass'
      })
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body.message).to.equal('Username taken! Login if it is yours or sign up with a new username');
        done();
      });
  });

  it('Should return 406 for undefined email field', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({
        id: 1,
        fullName: 'king marc',
        username: 'marco',
        password: 'marcpass'
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal('You have made no input for email');
        done();
      });
  });

  it('Should return 406 for signup having empty email field', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({
        id: 1,
        fullName: 'king marc',
        username: 'marco',
        email: '',
        password: 'marcpass'
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal('Email field cannot be empty');
        done();
      });
  });

  it('Should return 406 for signup having invalid email format', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({
        id: 1,
        fullName: 'king marc',
        username: 'marco',
        email: 'marc#gmail.com',
        password: 'marcpass'
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal('Your email format is invalid');
        done();
      });
  });

  it('Should return 406 for signup having invalid email character length', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({
        id: 1,
        fullName: 'king marc',
        username: 'marco',
        email: 'ab@h.com',
        password: 'marcpass'
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal('Your email should be 10 to 50 characters long');
        done();
      });
  });

  it('Should return 409 for an existing email address', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({
        id: 1,
        fullName: 'king marc',
        username: 'marco',
        email: 'marc@gmail.com',
        password: 'marcpass'
      })
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body.message).to.equal('Email taken! Login if it is yours or sign up with a new email');
        done();
      });
  });

  it('Should return 406 for a signup having undefined password', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({
        id: 1,
        fullName: 'king marc',
        username: 'marco',
        email: 'marc@yahoo.com',
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal('You have made no input for password');
        done();
      });
  });

  it('Should return 406 for a signup having empty password field', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({
        id: 1,
        fullName: 'king marc',
        username: 'marco',
        email: 'marc@yahoo.com',
        password: ''
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal('Password field cannot be empty');
        done();
      });
  });

  it('Should return 406 for invalid password length', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({
        id: 1,
        fullName: 'king marc',
        username: 'marco',
        email: 'marc@yahoo.com',
        password: 'mar'
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal('Password should be 4 to 16 characters long');
        done();
      });
  });

  it('Should return 406 for a password having whitespace', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({
        id: 1,
        fullName: 'king marc',
        username: 'marco',
        email: 'marc@yahoo.com',
        password: 'marc pass'
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal('Remove whitespace from your password');
        done();
      });
  });

  it('Should return 201 for success', (done) => {
    const newLength = users.length + 1;
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({
        id: 1,
        fullName: 'king marc',
        username: 'marcman',
        email: 'marcus@yahoo.com',
        password: 'marcpass'
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.message).to.equal('Signup was successful');
        expect(users).to.have.length(newLength);
        done();
      });
  });
}); // User signup test ends here

describe('Test Post user Signin API', () => {
  it('Should return 406 for an undefined username field', (done) => {
    chai.request(app)
      .post('/api/v1/users/signin')
      .send({
        password: 'marcpass'
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal('You have made no input for username');
        done();
      });
  });

  it('Should return 406 for an empty username field', (done) => {
    chai.request(app)
      .post('/api/v1/users/signin')
      .send({
        username: '',
        password: 'marcpass'
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal('username field cannot be empty');
        done();
      });
  });

  it('Should return 401 for a non-existing username', (done) => {
    chai.request(app)
      .post('/api/v1/users/signin')
      .send({
        username: 'lorem',
        password: 'marcpass'
      })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.message).to.equal('username does not exist. Input your correct username or Signup!');
        done();
      });
  });

  it('Should return 406 for a signin having undefined password', (done) => {
    chai.request(app)
      .post('/api/v1/users/signin')
      .send({
        username: 'marc',
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal('You have made no input for password');
        done();
      });
  });

  it('Should return 406 for a signin having empty password field', (done) => {
    chai.request(app)
      .post('/api/v1/users/signin')
      .send({
        username: 'marc',
        password: ''
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal('password field cannot be empty');
        done();
      });
  });

  it('Should return 401 for a comibination of correct username and incorrect password', (done) => {
    chai.request(app)
      .post('/api/v1/users/signin')
      .send({
        username: 'marc',
        password: 'marc#pass'
      })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.message).to.equal('Incorrect password');
        done();
      });
  });

  it('Should return 200 for success', (done) => {
    const newLength = users.length;
    chai.request(app)
      .post('/api/v1/users/signin')
      .send({
        username: 'marc',
        password: 'marcpass'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.be.a('string');
        expect(users).to.have.length(newLength);
        done();
      });
  });
}); // User signin test ends here
