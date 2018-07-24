import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import entries from '../dummyModels/entries';

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
}); // Test Default Ends here

describe('POST Diary Entries', () => {
  it('Should return 406 for a post having undefined username field', (done) => {
    chai.request(app)
      .post('/api/v1/entries')
      .send({
        id: 1,
        email: 'marcus2cu@gmail.com',
        title: 'My coding journey',
        description: 'Coding has been an awesome experience so far...'
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
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

  it('Should return 406 for a post having undefined email field', (done) => {
    chai.request(app)
      .post('/api/v1/entries')
      .send({
        id: 1,
        username: 'marcodynamics',
        title: 'My coding journey',
        description: 'Coding has been an awesome experience so far...'
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
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

  it('Should return 406 for a post having undefined title field', (done) => {
    chai.request(app)
      .post('/api/v1/entries')
      .send({
        id: 1,
        username: 'marcodynamics',
        email: 'marcus2cu@gmail.com',
        description: 'Coding has been an awesome experience so far...'
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
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
        expect(res.body.message).to.equal("Title should not contain special characters except for ! . - @ & '");
        done();
      });
  });

  it('Should return 406 for a post having undefined description field', (done) => {
    chai.request(app)
      .post('/api/v1/entries')
      .send({
        id: 1,
        username: 'marcodynamics',
        email: 'marcus2cu@gmail.com',
        title: 'My coding journey',
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal('You have made no input for Diary Entry description');
        done();
      });
  });

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

  it('Should return 406 for an invalid description character', (done) => {
    chai.request(app)
      .post('/api/v1/entries')
      .send({
        id: 1,
        username: 'marcodynamics',
        email: 'marcus2cu@gmail.com',
        title: 'My coding journey',
        description: 'Coding ha^^^'
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal("description should not contain special characters except for ! . - ' : ; , @ &");
        done();
      });
  });

  it('Should return 201 for a post that is successful', (done) => {
    const newLength = entries.length + 1;
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
        expect(entries).to.have.length(newLength);
        done();
      });
  });
}); // Post entries test ends here

describe('GET all diary entries', () => {
  it('Should return 200 for success', (done) => {
    chai.request(app)
      .get('/api/v1/entries')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('All diary entries served');
        done();
      });
  });
}); // Get all entries test end here

describe('GET A specific diary entry', () => {
  it('Should return 200 for success', (done) => {
    chai.request(app)
      .get('/api/v1/entries/1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Entry fetched successfully');
        done();
      });
  });

  it('Should return 404 for an invalid diary entry id', (done) => {
    chai.request(app)
      .get('/api/v1/entries/500')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal('Entry not found');
        done();
      });
  });
}); // Get a specific diary entry ends here

describe('Modify specific diary entry API', () => {
  it('Should return 404 for an invalid entry id', (done) => {
    chai.request(app)
      .put('/api/v1/entries/50')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal('Invalid Entry Id');
        done();
      });
  });

  it('Should return 406 for an undefined username', (done) => {
    chai.request(app)
      .put('/api/v1/entries/1')
      .send({
        id: 1,
        email: 'marcus2cu@gmail.com',
        title: 'My coding journey',
        description: 'Coding has been an awesome experience so far...'
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal('You have made no input for username');
        done();
      });
  });

  it('Should return 404 for an empty username field', (done) => {
    chai.request(app)
      .put('/api/v1/entries/1')
      .send({
        id: 1,
        username: '',
        email: 'marcus2cu@gmail.com',
        title: 'My coding journey',
        description: 'Coding has been an awesome experience so far...'
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal('Username field cannot be empty');
        done();
      });
  });

  it('Should return 406 for an invalid username character length', (done) => {
    chai.request(app)
      .put('/api/v1/entries/1')
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

  it('Should return 406 for non-alphanumeric characters in username field', (done) => {
    chai.request(app)
      .put('/api/v1/entries/1')
      .send({
        id: 1,
        username: 'king marc',
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

  it('Should return 406 for an undefined email field', (done) => {
    chai.request(app)
      .put('/api/v1/entries/1')
      .send({
        id: 1,
        username: 'marcodynamics',
        title: 'My coding journey',
        description: 'Coding has been an awesome experience so far...'
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal('You have made no input for email');
        done();
      });
  });

  it('Should return 404 for an empty email field', (done) => {
    chai.request(app)
      .put('/api/v1/entries/1')
      .send({
        id: 1,
        username: 'marcodynamics',
        email: '',
        title: 'My coding journey',
        description: 'Coding has been an awesome experience so far...'
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal('Email field cannot be empty');
        done();
      });
  });

  it('Should return 406 for an invalid email format', (done) => {
    chai.request(app)
      .put('/api/v1/entries/1')
      .send({
        id: 1,
        username: 'marcodynamics',
        email: 'm@ab.com',
        title: 'My coding journey',
        description: 'Coding has been an awesome experience so far...'
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal('Your email format is invalid');
        done();
      });
  });

  it('Should return 406 for an invalid email character length', (done) => {
    chai.request(app)
      .put('/api/v1/entries/1')
      .send({
        id: 1,
        username: 'marcodynamics',
        email: 'ab@ba.co',
        title: 'My coding journey',
        description: 'Coding has been an awesome experience so far...'
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal('Your email should be 10 to 50 characters long');
        done();
      });
  });

  it('Should return 406 for an undefined title field', (done) => {
    chai.request(app)
      .put('/api/v1/entries/1')
      .send({
        id: 1,
        username: 'marcodynamics',
        email: 'marcus2cu@gmail.com',
        description: 'Coding has been an awesome experience so far...'
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal('You have made no input for Diary Entry Title');
        done();
      });
  });

  it('Should return 404 for an empty title field', (done) => {
    chai.request(app)
      .put('/api/v1/entries/1')
      .send({
        id: 1,
        username: 'marcodynamics',
        email: 'marcus2cu@gmail.com',
        title: '',
        description: 'Coding has been an awesome experience so far...'
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal('Title field cannot be empty');
        done();
      });
  });

  it('Should return 406 for an empty title field', (done) => {
    chai.request(app)
      .put('/api/v1/entries/1')
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

  it('Should return 406 for an invalid title field character', (done) => {
    chai.request(app)
      .put('/api/v1/entries/1')
      .send({
        id: 1,
        username: 'marcodynamics',
        email: 'marcus2cu@gmail.com',
        title: 'abcd ef^^',
        description: 'Coding has been an awesome experience so far...'
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal("Title should not contain special characters except for ! . - @ & '");
        done();
      });
  });

  it('Should return 406 for an undefined description field', (done) => {
    chai.request(app)
      .put('/api/v1/entries/1')
      .send({
        id: 1,
        username: 'marcodynamics',
        email: 'marcus2cu@gmail.com',
        title: 'My coding journey',
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal('You have made no input for Diary Entry description');
        done();
      });
  });

  it('Should return 404 for an empty description field', (done) => {
    chai.request(app)
      .put('/api/v1/entries/1')
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

  it('Should return 406 for invalid description character length', (done) => {
    chai.request(app)
      .put('/api/v1/entries/1')
      .send({
        id: 1,
        username: 'marcodynamics',
        email: 'marcus2cu@gmail.com',
        title: 'My coding journey',
        description: 'Coding ha'
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal('Your description should be 10 to 300 characters long');
        done();
      });
  });

  it('Should return 406 for an invalid description character', (done) => {
    chai.request(app)
      .put('/api/v1/entries/1')
      .send({
        id: 1,
        username: 'marcodynamics',
        email: 'marcus2cu@gmail.com',
        title: 'My coding journey',
        description: 'Coding ha^^^'
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal("description should not contain special characters except for ! . - ' : ; , @ &");
        done();
      });
  });

  it('Should return 205 for success', (done) => {
    const newLength = entries.length;
    chai.request(app)
      .put('/api/v1/entries/1')
      .send({
        id: 1,
        username: 'marcodynamics',
        email: 'marcus2cu@gmail.com',
        title: 'My coding journey',
        description: 'Coding has been an awesome experience so far...'
      })
      .end((err, res) => {
        expect(res).to.have.status(205);
        expect(res.body.message).to.equal('Entry modified successfully');
        expect(entries).to.have.length(newLength);
        done();
      });
  });
}); // Modify Diary Entry ends here
