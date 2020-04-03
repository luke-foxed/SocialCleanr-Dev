const validAccount = {
  name: 'Jane Doe',
  email: 'jane@doe.com',
  password: '!iubdfiubeDD22'
};

const validAccount2 = {
  name: 'Luke Doe',
  email: 'luke@doe.com',
  password: '!iubdfiubeDD22'
};

const duplicateEmailAccount = {
  name: 'John Doe',
  email: 'jane@doe.com',
  password: '!h!huawddfiAWE131'
};

// will trigger all validations when registering
const failAllAccount = {
  name: '',
  email: 'test',
  password: '123456'
};

// missing special characters and length
const weakPasswordAccount = {
  name: 'John Doe',
  email: 'john@doe.com',
  pass: 'If663J'
};

module.exports = {
  validAccount,
  validAccount2,
  duplicateEmailAccount,
  failAllAccount,
  weakPasswordAccount
};
