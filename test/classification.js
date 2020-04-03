const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();
const dummyAccounts = require('./dummyAccounts');
chai.use(chaiHttp);

