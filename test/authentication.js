const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const expect = chai.expect;
const dummyAccounts = require('./testHelpers/dummyAccounts');
chai.use(chaiHttp);

// store token for deletion
let accountToken = '';

describe('Registration', () => {
  it('Should create a new account successfully', (done) => {
    chai
      .request(server)
      .post('/api/auth/register')
      .send(dummyAccounts.validAccount)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an(
          'string',
          'Expected string token from registration'
        );
        accountToken = res.body;
        done();
      });
  });

  it('Should reject attempt to register with a used email', (done) => {
    chai
      .request(server)
      .post('/api/auth/register')
      .send(dummyAccounts.duplicateEmailAccount)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an(
          'object',
          'Expected object containing errors'
        );
        expect(res.body.errors[0].msg).to.equal(
          'This User already exists, try logging in'
        );
        done();
      });
  });

  it('Should trigger all validation errors', (done) => {
    chai
      .request(server)
      .post('/api/auth/register')
      .send(dummyAccounts.failAllAccount)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an(
          'object',
          'Expected object containing errors'
        );
        expect(res.body.errors[0].msg).to.equal('Please provide a name');
        expect(res.body.errors[1].msg).to.equal('Please include a valid email');
        expect(res.body.errors[2].msg).to.equal(
          'Please enter a password between 8 to 24 characters'
        );
        expect(res.body.errors[3].msg).to.equal(
          'Password must contain at least one letter, special character and number'
        );
        done();
      });
  });

  it('Should reject registration using weak password', (done) => {
    chai
      .request(server)
      .post('/api/auth/register')
      .send(dummyAccounts.weakPasswordAccount)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an(
          'object',
          'Expected object containing errors'
        );
        expect(res.body.errors[0].msg).to.equal(
          'Please enter a password between 8 to 24 characters'
        );
        expect(res.body.errors[1].msg).to.equal(
          'Password must contain at least one letter, special character and number'
        );
        done();
      });
  });
});

describe('Login', () => {
  it('Should log in to an existing account', (done) => {
    let { email, password } = dummyAccounts.validAccount;
    chai
      .request(server)
      .post('/api/auth/login')
      .send({ email, password })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an(
          'string',
          'Expected string token from registration'
        );
        done();
      });
  });

  it('Should reject an invalid login attempt', (done) => {
    chai
      .request(server)
      .post('/api/auth/login')
      .send({ email: 'test@test.com', password: 'ddada' })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an(
          'object',
          'Expected object containing errors'
        );
        expect(res.body.errors[0].msg).to.equal('Invalid Credentials');
        done();
      });
  });

  it('Should delete an account', (done) => {
    chai
      .request(server)
      .delete('/api/user/delete')
      .set('x-auth-token', accountToken)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
});
