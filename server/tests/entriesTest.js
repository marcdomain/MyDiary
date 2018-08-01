import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

const { expect } = chai;

chai.use(chaiHttp);
let getToken;

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

describe('Get your token', () => {
  it('return token for successful signin', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        username: 'testuser',
        password: 'testuser'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        getToken = res.body.yourToken;
        done();
      });
  });
});

describe('POST Diary Entries', () => {
  it('Should return 201 for a post that is successful', (done) => {
    chai.request(app)
      .post('/api/v1/entries')
      .set('authorization', getToken)
      .send({
        id: 1,
        username: 'testuser',
        email: 'testuser@gmail.com',
        title: 'My coding journey',
        description: 'Coding has been an awesome experience so far...'
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.message).to.equal('Success');
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
        expect(res.body.message).to.equal('Your title should be 3 to 20 characters long');
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
        expect(res.body.message).to.equal('Your description should be 10 to 255 characters long');
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
}); // Post entries test ends here

describe('GET all diary entries', () => {
  it('Should return 200 for success', (done) => {
    chai.request(app)
      .get('/api/v1/entries')
      .set('authorization', getToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('all entries successfully served');
        done();
      });
  });
}); // Get all entries test end here

describe('GET A specific diary entry', () => {
  it('Should return 200 for success', (done) => {
    chai.request(app)
      .get('/api/v1/entries/1')
      .set('authorization', getToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('entry successfully served');
        done();
      });
  });

  it('Should return 404 for an invalid diary entry id', (done) => {
    chai.request(app)
      .get('/api/v1/entries/500')
      .set('authorization', getToken)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal('Entry id is invalid');
        done();
      });
  });
}); // Get a specific diary entry ends here

describe('Modify specific diary entry API', () => {
  it('Should return 404 for an invalid entry id', (done) => {
    chai.request(app)
      .put('/api/v1/entries/3')
      .set('authorization', getToken)
      .send({
        title: 'My coding journey',
        description: 'Coding has been an awesome experience so far...'
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal('Entry not found');
        done();
      });
  });

  it('Should return 406 for an undefined title field', (done) => {
    chai.request(app)
      .put('/api/v1/entries/:entryId')
      .set('authorization', getToken)
      .send({
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
      .put('/api/v1/entries/:entryId')
      .set('authorization', getToken)
      .send({
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
      .put('/api/v1/entries/:entryId')
      .set('authorization', getToken)
      .send({
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
      .put('/api/v1/entries/:entryId')
      .set('authorization', getToken)
      .send({
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
      .put('/api/v1/entries/:entryId')
      .set('authorization', getToken)
      .send({
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
      .put('/api/v1/entries/:entryId')
      .set('authorization', getToken)
      .send({
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
      .put('/api/v1/entries/:entryId')
      .set('authorization', getToken)
      .send({
        title: 'My coding journey',
        description: 'Coding ha'
      })
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.message).to.equal('Your description should be 10 to 255 characters long');
        done();
      });
  });

  it('Should return 406 for an invalid description character', (done) => {
    chai.request(app)
      .put('/api/v1/entries/:entryId')
      .set('authorization', getToken)
      .send({
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
    chai.request(app)
      .put('/api/v1/entries/1')
      .set('authorization', getToken)
      .send({
        title: 'My coding journey',
        description: 'Coding has been an awesome experience so far...'
      })
      .end((err, res) => {
        expect(res).to.have.status(205);
        expect(res.body.message).to.equal('Entry modified successfully');
        done();
      });
  });
}); // Modify Diary Entry ends here
