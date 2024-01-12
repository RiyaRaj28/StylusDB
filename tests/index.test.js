//test1

// test('Basic Jest Test', () => {
//     expect(1).toBe(1);;
// }

//-----------------------------------------------------------
// test2

// const readCSV = require('../src/csvReader');

// test('Read CSV File', async () => {
//     const data = await readCSV('./sample.csv');
//     expect(data.length).toBeGreaterThan(0);
//     expect(data.length).toBe(3);
//     expect(data[0].name).toBe('John');
//     expect(data[0].age).toBe('30'); //ignore the string type here, we will fix this later
// });


// -----------------------------------------------------------
//test3

// const parseQuery = require('../src/queryParser');

// test('Parse SQL Query', () => {
//     const query = 'SELECT id, name FROM sample';
//     const parsed = parseQuery(query);
//     expect(parsed).toEqual({
//         fields: ['id', 'name'],
//         table: 'sample'
//     });
// });



//  test('Parse SQL Query', () => {
    // This line starts a test block using a testing framework 
    // like Jest. The test function takes two parameters: a description 
    // of the test (in this case, 'Parse SQL Query') and a function 
    // containing the actual test code.

// ---------------------------------------------------------------------

// test4

// const executeSELECTQuery = require('../src/index');

// test('Execute SQL Query', async()=> {
//     const query = 'SELECT id, name FROM sample';
//     const result = await executeSELECTQuery(query);
//     expect(result.length).toBeGreaterThan(0);
//     expect(result[0]).toHaveProperty('id');
//     expect(result[0]).toHaveProperty('name');
//     expect(result[0]).not.toHaveProperty('age');
//     expect(result[0]).toEqual({ id: '1', name:'John'});
// });

//------------------------------------------------------------------------------------------
// test5

// tests/index.test.js

// const executeSELECTQuery = require('../src/index');

// test('Execute SQL Query with WHERE Clause', async () => {
//     const query = 'SELECT id, name FROM sample WHERE age = 25';
//     const result = await executeSELECTQuery(query);
//     expect(result.length).toBe(1);
//     expect(result[0]).toHaveProperty('id');
//     expect(result[0]).toHaveProperty('name');
//     expect(result[0].id).toBe('2');
// });

// -------------------------------------------------------------------------------------
// // test6
// import { parseQuery } from './src/queryParser.js'; 
// import { executeSELECTQuery } from './src/index.js';

//import these functions first before using 


// test('Parse SQL Query with Multiple WHERE Clauses', () => {
//     const query = 'SELECT id, name FROM sample WHERE age = 30 AND name = John';
//     const parsed = parseQuery(query);
//     expect(parsed).toEqual({
//         fields: ['id', 'name'],
//         table: 'sample',
//         whereClauses: [{
//             "field": "age",
//             "operator": "=",
//             "value": "30",
//         }, {
//             "field": "name",
//             "operator": "=",
//             "value": "John",
//         }]
//     });
// });

// test('Execute SQL Query with Multiple WHERE Clause', async () => {
//     const query = 'SELECT id, name FROM sample WHERE age = 30 AND name = John';
//     const result = await executeSELECTQuery(query);
//     expect(result.length).toBe(1);
//     expect(result[0]).toEqual({ id: '1', name: 'John' });
// });

// --------------------------------------------------------------------------------------------------------
// test7

const parseQuery = require('../src/queryParser.js');
const executeSELECTQuery = require('../src/index.js');

test('Execute SQL Query with Greater Than', async()=> {
    const queryWithGT = 'SELECT id FROM student WHERE age> 22';
    const result = await executeSELECTQuery(queryWithGT);
    expect(result.length).toEqual(2);
    expect(result[0]).toHaveProperty('id');
});

test('Execute SQL Query with Not Equal to', async() => {
    const queryWithGT = 'SELECT name FROM student WHERE age != 25';
    const result = await executeSELECTQuery(queryWithGT);
    expect(result.length).toEqual(2);
    expect(result[0]).toHaveProperty('name');
});

