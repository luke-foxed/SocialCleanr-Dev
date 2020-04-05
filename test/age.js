const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const expect = chai.expect;
const dummyAccounts = require('./testHelpers/dummyAccounts');
const fs = require('fs');
const path = require('path');
chai.use(chaiHttp);

const jsonPath = path.join(__dirname, 'testHelpers', 'images');

let accountToken = '';

// initialise images for scanning
let toddlerImage = '';
let teenagerImage = '';

describe('Age Detection', () => {
  before(done => {
    chai
      .request(server)
      .post('/api/auth/register')
      .send(dummyAccounts.validAccount2)
      .end((err, res) => {
        expect(res.status).to.equal(200, 'Expected API call to return 200');
        expect(res.body).to.be.an(
          'string',
          'Expected result returned from scan to be an object'
        );
        accountToken = res.body;
        done();
      });
  });

  before(done => {
    // load images and add headers
    toddlerImage =
      'data:image/jpeg;base64,' +
      fs.readFileSync(jsonPath + '/toddler.jpg', {
        encoding: 'base64'
      });

    teenagerImage =
      'data:image/jpeg;base64,' +
      fs.readFileSync(jsonPath + '/teenager.jpg', {
        encoding: 'base64'
      });

    done();
  });

  it('Should detect a toddler in image', done => {
    chai
      .request(server)
      .post('/api/classifier/custom-scan')
      .set('x-auth-token', accountToken)
      .send({
        models: ['age'],
        image: toddlerImage
      })
      .end((err, res) => {
        expect(res.status).to.equal(200, 'Expected API call to return 200');
        expect(res.body).to.be.an(
          'object',
          'Expected result returned from scan to be an object'
        );
        expect(res.body.age[0].age).to.be.lessThan(
          10,
          'Expected age of person to be below 10'
        );
        done();
      });
  });

  it('Should not flag a teenager as being a toddler', done => {
    chai
      .request(server)
      .post('/api/classifier/custom-scan')
      .set('x-auth-token', accountToken)
      .send({
        models: ['age'],
        image: teenagerImage
      })
      .end((err, res) => {
        expect(res.status).to.equal(200, 'Expected API call to return 200');
        expect(res.body).to.be.an(
          'object',
          'Expected result returned from scan to be an object'
        );
        expect(res.body.age[0].age).to.be.greaterThan(
          12,
          'Expected age of person to be above 12'
        );
        done();
      });
  });

  after(done => {
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
