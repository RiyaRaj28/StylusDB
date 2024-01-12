//to read data from csv file using the 'fs' and csv-parser module

// const fs = require('fs');
// const csv = require('csv-parser');
// //csv-parser is a library used for parsing CSV data.

// function readCSV(filePath){  //filePath, which represents the path to the CSV file that needs to be read.
//     const results = [];

//     return new Promise((resolve, reject) => {
//         fs.createReadStream(filePath)
//         .pipe(csv())
//         .on('data', (data) => results.push(data))
//         .on('end', () => {
//             resolve(results);
//         })
//         .on('error', (error) =>{
//             reject(error);
//         });
//     });
// }

// module.exports = readCSV; 


// src/csvReader.js

const fs = require('fs');
const csv = require('csv-parser');

function readCSV(filePath) {
    const results = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                resolve(results);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
}

module.exports = readCSV;