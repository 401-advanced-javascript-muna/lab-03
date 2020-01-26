'use strict';

const fs = require('fs');
const util = require('util');

//read a file with callback
const readWithCallBack = (file, callback) => {
  fs.readFile(file, (err, data) => {
    if (err) { callback(err);}
    callback(null, data);
  });
};


// As a promise
const readFilePromise = util.promisify(fs.readFile);

const readWithPromise = (file) =>{ return readFilePromise(file)
  .then(contents=> JSON.parse(contents.toString()))  // read the file then write on the file
  .then(data => writeFile(file, data)).catch(err=>console.error(err));
};
 
const writeFile = (file, data) => {
  console.log('data ', data);
  data.firstName = 'a ';
  data.lastName = 'b';
  // "firstName":"Edward","lastName":"Scissorhands"
  console.log('edited Data: ', data);
  let dataSt = JSON.stringify(data);  // json file need to JSON.stringify(data)
  return dataSt;
};


module.exports = {readWithCallBack, readWithPromise, writeFile};








