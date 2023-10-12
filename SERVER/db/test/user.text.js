const chai = require('chai');
const expect = chai.expect;
const mongoose = require('mongoose');
const User = require('../db/index.js'); // Import your User model
// const { User, Exercise, Progress } = require('../db'); // Adjust the path as needed

describe('User Model', () => {
  before((done) => {
    mongoose.connect('mongodb://localhost/test_db', { useNewUrlParser: true });
    mongoose.connection.once('open', () => {
      done();
    }).on('error', (error) => {
      console.error('Error connecting to test database:', error);
    });
  });

  it('Should create a new user', (done) => {
    const newUser = new User({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
      InterestedInlanguages: ['english'],
      resetProgress: false,
    });

    newUser.save()
      .then(() => {
        expect(newUser.isNew).to.be.false;
        done();
      })
      .catch((error) => {
        console.error('Error creating user:', error);
        done(error);
      });
  });

  // Add more test cases for other CRUD operations and edge cases
});
