'use strict';
// When mocking out embedded modules like fs or buffer, you have to tell jest to mock it
// For 3rd party modules, you can "auto" mock them by simply putting them in the correct __mocks__ folder
jest.mock('fs');

const reader = require('../lib/edit-file.js');
describe('fs Read/Write Module ', () => {

  describe('Using Callback ', () => {
    it('when given a bad file returns an error ', () => {
      let file = `${__dirname}/data/person.json`;
      return reader.readWithCallBack(file, (error, data) => {
        expect(error).toBeFalsy();
      });
    });
    it('when given a real file, returns the contents without an error', () => {
      let file = `${__dirname}/data/person.json`;
      return reader.readWithCallBack(file, (error, data) => {
        expect(typeof data).toBe('object');
        expect(error).toBeDefined();;
      });
    });
  });

describe('Using Promise ', () => {
    it('when given a real file, returns the contents without an error ', () => {
      let file = `${__dirname}/../../data/person.json`;
      reader.readWithPromise(file)
        .then(data => expect(data).toBeDefined())
        .catch(error => expect(error).not.toBeDefined());
    });


    it('Write to File without errors  ', () => {
      let file = `${__dirname}/../../data/person.json`;
      let person = { "firstName": "mu", "lastName": "sh", "hair": { "type": "wavy", "color": "brown" }, "favoriteFoods": ["pizza", "cupcakes"], "married": true, "kids": 1 };
      reader.readWithPromise(file)
        .then(data => expect(data).toBeDefined())
        .then(data => expect(data.firstName).toBe(person.firstName))
        .catch(error => expect(error).not.toBeDefined());
    });

  });

});