const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();
const dummyAccounts = require('./testHelpers/dummyAccounts');
chai.use(chaiHttp);

// store token for deletion
let accountToken = '';

describe('Registration', () => {
  it('Should create a new account successfully', done => {
    chai
      .request(server)
      .post('/api/auth/register')
      .send(dummyAccounts.validAccount)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('string');
        accountToken = res.body;
        done();
      });
  });

  it('Should reject attempt to register with a used email', done => {
    chai
      .request(server)
      .post('/api/auth/register')
      .send(dummyAccounts.duplicateEmailAccount)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.errors[0].msg.should.equal(
          'This User already exists, try logging in'
        );
        done();
      });
  });

  it('Should trigger all validation errors', done => {
    chai
      .request(server)
      .post('/api/auth/register')
      .send(dummyAccounts.failAllAccount)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.errors[0].msg.should.equal('Please provide a name');
        res.body.errors[1].msg.should.equal('Please include a valid email');
        res.body.errors[2].msg.should.equal(
          'Please enter a password between 8 to 24 characters'
        );
        res.body.errors[3].msg.should.equal(
          'Password must contain at least one letter, special character and number'
        );
        done();
      });
  });

  it('Should reject registration using weak password', done => {
    chai
      .request(server)
      .post('/api/auth/register')
      .send(dummyAccounts.weakPasswordAccount)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.errors[0].msg.should.equal(
          'Please enter a password between 8 to 24 characters'
        );
        res.body.errors[1].msg.should.equal(
          'Password must contain at least one letter, special character and number'
        );
        done();
      });
  });
});

describe('Login', () => {
  it('Should log in to an existing account', done => {
    let { email, password } = dummyAccounts.validAccount;
    chai
      .request(server)
      .post('/api/auth/login')
      .send({ email, password })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('string');
        done();
      });
  });

  it('Should reject an invalid login attempt', done => {
    chai
      .request(server)
      .post('/api/auth/login')
      .send({ email: 'test@test.com', password: 'ddada' })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.errors[0].msg.should.equal('Invalid Credentials');
        done();
      });
  });

  it('Should delete an account', done => {
    chai
      .request(server)
      .delete('/api/user/delete')
      .set('x-auth-token', accountToken)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
