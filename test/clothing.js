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
let clothingImageMale = '';
let clothingImageFemale = '';

describe('Clothing Detection', () => {
  before((done) => {
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

  before((done) => {
    // load images and add headers
    clothingImageMale =
      'data:image/jpeg;base64,' +
      fs.readFileSync(jsonPath + '/clothing_male.jpg', {
        encoding: 'base64',
      });

    clothingImageFemale =
      'data:image/jpeg;base64,' +
      fs.readFileSync(jsonPath + '/clothing_female.jpg', {
        encoding: 'base64',
      });
    done();
  });

  it('Should detect man with little clothing', (done) => {
    chai
      .request(server)
      .post('/api/scan/custom-scan')
      .set('x-auth-token', accountToken)
      .send({
        models: ['clothing'],
        image: clothingImageMale,
        type: 'image',
      })
      .end((err, res) => {
        expect(res.status).to.equal(200, 'Expected API call to return 200');
        expect(res.body).to.be.an(
          'array',
          'Expected result returned from scan to be an array'
        );
        expect(res.body.length).to.be.greaterThan(
          0,
          'Expected length of array to be greater than 0 '
        );

        done();
      });
  });

  it('Should detect women with little clothing', (done) => {
    chai
      .request(server)
      .post('/api/scan/custom-scan')
      .set('x-auth-token', accountToken)
      .send({
        models: ['clothing'],
        image: clothingImageFemale,
        type: 'image',
      })
      .end((err, res) => {
        expect(res.status).to.equal(200, 'Expected API call to return 200');
        expect(res.body).to.be.an(
          'array',
          'Expected result returned from scan to be an array'
        );
        expect(res.body.length).to.be.greaterThan(
          0,
          'Expected length of array to be greater than 0 '
        );

        done();
      });
  });

  after((done) => {
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
