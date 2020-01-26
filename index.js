'use strict';

const fs = require('fs');   //file systam i/o module

const util = require('util')

const reader = require('./lib/edit-file.js'); // acsess to edit-file.js

let file = `${__dirname}/data/person.json`;    //Reads in the contents of the file specified  absolute bath 


// read Callback Style

fs.readFile(file , (err,data) => {
    if(err) {throw err;}
    console.log('fs.readFile data :', JSON.parse(data.toString()));
});


// Promisify
let readFilePromise = util.promisify(fs.readFile);

readFilePromise(file)
    .then(data => 
        {   console.log( 'data Buffer',data);
            console.log( 'data.toString()',data.toString());
            console.log('readFilePromise data',JSON.parse(data.toString()))//JSON.parse to read the file
            return JSON.parse(data.toString());
        })
    .then(data => writeFile( file, data))
    .catch(error => console.error(error))


// async function
async function readFileAsync (file) {
    try
    {
        let data = await readFilePromise(file);
    }
    catch(error) 
    {
        console.error(error)
    }
}

readFileAsync(file);


let writeFilepromisify = util.promisify(fs.writeFile); 

const writeFile = (file,data) =>
{
    console.log('data read', data);
    data.firstName = 'Muna ';
    data.lastName = 'alshorman';
    console.log('data write ', data);
    let dataSt = JSON.stringify(data);
    writeFilepromisify(file,dataSt)
}