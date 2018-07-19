import app from '../../app';
import chai from 'chai';
import chaiHttp from 'chai-http';

const { expect } = chai;

chai.use(chaiHttp);

describe('Test Default API Endpoints', () => {
  it('Should return 200 for homepage', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Welcome to Marcodynamics MyDiary App! Create an account and start penning down your Thoughts/Feelings.');
        done();
      });
  });
  
  it('Should return 404 for routes not specified', (done) => {
    chai.request(app)
      .get('/another/undefined/route')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });
  it('Undefined Routes Should Return 404', (done) => {
    chai.request(app)
      .post('/another/undefined/route')
      .send({ random: 'random' })
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

}) // Test Default Ends here

describe('POST Diary Entries', () => {
  
  it('Should return 404 for a post having undefined username field', (done) => {
    chai.request(app)
      .post('/api/v1/entries')
      .send({
        id: 1,
        email: 'marcus2cu@gmail.com',
        title: 'My coding journey',
        description: 'Coding has been an awesome experience so far...'
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal('You have made no input for username');
        done();
      });
  });
  
  it('Should return 406 for a post having empty username field', (done) => {
    chai.request(app)
      .post('/api/v1/entries')
      .send({
        id: 1,
        username: '',
        email: 'marcus2cu@gmail.com',
        title: 'My coding journey',
        description: 'Coding has been an awesome experience so far...'
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal('Username field cannot be empty');
        done();
      });
  });
  
  it('Should return 406 for a post having invalid username length', (done) => {
    chai.request(app)
      .post('/api/v1/entries')
      .send({
        id: 1,
        username: 'ma',
        email: 'marcus2cu@gmail.com',
        title: 'My coding journey',
        description: 'Coding has been an awesome experience so far...'
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal('Your username should be 3 to 25 characters long');
        done();
      });
  });
  
  it('Should return 406 for a non-alphanumeric character in username field', (done) => {
    chai.request(app)
      .post('/api/v1/entries')
      .send({
        id: 1,
        username: 'marc!',
        email: 'marcus2cu@gmail.com',
        title: 'My coding journey',
        description: 'Coding has been an awesome experience so far...'
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal('Only Alphanumeric charaters are allowed for username');
        done();
      });
  });
  
  it('Should return 404 for a post having undefined email field', (done) => {
    chai.request(app)
      .post('/api/v1/entries')
      .send({
        id: 1 ,
        username: 'marcodynamics',
        title: 'My coding journey',
        description: 'Coding has been an awesome experience so far...'
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal('You have made no input for email');
        done();
      });
  });
  
  it('Should return 406 for a post having empty email field', (done) => {
    chai.request(app)
      .post('/api/v1/entries')
      .send({
        id: 1,
        username: 'marcodynamics',
        email: '',
        title: 'My coding journey',
        description: 'Coding has been an awesome experience so far...'
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal('Email field cannot be empty');
        done();
      });
  });
  
  it('Should return 406 for a post having invalid email format', (done) => {
    chai.request(app)
      .post('/api/v1/entries')
      .send({
        id: 1,
        username: 'marcodynamics',
        email: 'marcab',
        title: 'My coding journey',
        description: 'Coding has been an awesome experience so far...'
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal('Your email format is invalid');
        done();
      });
  });
  
  it('Should return 406 for a post having invalid email length', (done) => {
    chai.request(app)
      .post('/api/v1/entries')
      .send({
        id: 1,
        username: 'marcodynamics',
        email: 'ab@b.co',
        title: 'My coding journey',
        description: 'Coding has been an awesome experience so far...'
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal('Your email should be 10 to 50 characters long');
        done();
      });
  });
  
  it('Should return 404 for a post having undefined title field', (done) => {
    chai.request(app)
      .post('/api/v1/entries')
      .send({
        id: 1,
        username: 'marcodynamics',
        email: 'marcus2cu@gmail.com',
        description: 'Coding has been an awesome experience so far...'
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal('You have made no input for Diary Entry Title');
        done();
      });
  });
  
  it('Should return 406 for a post having empty title field', (done) => {
    chai.request(app)
      .post('/api/v1/entries')
      .send({
        id: 1,
        username: 'marcodynamics',
        email: 'marcus2cu@gmail.com',
        title: '',
        description: 'Coding has been an awesome experience so far...'
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal('Title field cannot be empty');
        done();
      });
  });

  it('Should return 406 for a post with invalid title length', (done) => {
    chai.request(app)
      .post('/api/v1/entries')
      .send({
        id: 1,
        username: 'marcodynamics',
        email: 'marcus2cu@gmail.com',
        title: 'ab',
        description: 'Coding has been an awesome experience so far...'
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal('Your title should be 3 to 40 characters long');
        done();
      });
  });

  it('Should return 406 for a post with invalid character in title field', (done) => {
    chai.request(app)
      .post('/api/v1/entries')
      .send({
        id: 1,
        username: 'marcodynamics',
        email: 'marcus2cu@gmail.com',
        title: 'My coding journey^',
        description: 'Coding has been an awesome experience so far...'
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal('Title should not contain special characters except for ! . - @ & ');
        done();
      });
  });  
  
  it('Should return 404 for a post having undefined description field', (done) => {
    chai.request(app)
      .post('/api/v1/entries')
      .send({
        id: 1,
        username: 'marcodynamics',
        email: 'marcus2cu@gmail.com',
        title: 'My coding journey',
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal('You have made no input for Diary Entry description');
        done();
      });
  })
  
  it('Should return 404 for a post having empty description field', (done) => {
    chai.request(app)
      .post('/api/v1/entries')
      .send({
        id: 1,
        username: 'marcodynamics',
        email: 'marcus2cu@gmail.com',
        title: 'My coding journey',
        description: ''
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal('description field cannot be empty');
        done();
      });
  });
  
  it('Should return 406 for a post having invalid description character length', (done) => {
    chai.request(app)
    .post('/api/v1/entries')
    .send({
      id: 1,
      username: 'marcodynamics',
      email: 'marcus2cu@gmail.com',
      title: 'My coding journey',
      description: 'abcd ef'
    })
    .end((err, res) => {
      expect(res).to.have.status(406);
      expect(res.body.message).to.equal('Your description should be 10 to 300 characters long');
      done();
    });
  });
  
  it('Should return 201 for a post that is successful', (done) => {
    chai.request(app)
      .post('/api/v1/entries')
      .send({
        id: 1,
        username: 'marcodynamics',
        email: 'marcus2cu@gmail.com',
        title: 'My coding journey',
        description: 'Coding has been an awesome experience so far...'
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.message).to.equal('Success');
        done();
      });
  });
});
