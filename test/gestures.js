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
let middleFingerImage = '';

describe('Gesture Detection', () => {
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
    middleFingerImage =
      'data:image/jpeg;base64,' +
      fs.readFileSync(jsonPath + '/middle_finger.jpg', {
        encoding: 'base64'
      });

    done();
  });

  it('Should detect a middle finger in image', done => {
    chai
      .request(server)
      .post('/api/classifier/custom-scan')
      .set('x-auth-token', accountToken)
      .send({
        models: ['gestures'],
        image: middleFingerImage
      })
      .end((err, res) => {
        expect(res.status).to.equal(200, 'Expected API call to return 200');
        expect(res.body).to.be.an(
          'object',
          'Expected result returned from scan to be an object'
        );
        expect(res.body.gestures.length).to.be.greaterThan(
          0,
          'Expected length of gestures array to be greater than 0 '
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
