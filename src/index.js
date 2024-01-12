// const parseQuery = require('./queryParser');
// const readCSV = require('./csvReader');

// async function executeSELECTQuery(query){
//     const{fields, table, whereClause} = parseQuery(query);
//     const data = await readCSV(`${table}.csv`);

//     //filter the fields based on the query
//     // return data.map(row=> {
//     //     const filteredRow = {};
//     //     fields.forEach(field => {
//     //         filteredRow[field] = row[field];
//     //     });
//     //     return filteredRow;
//     // });

//     //filtering based on WHERE clause 

//     const filteredData = whereClause
//     ? data.filter(row => {
//         const [field, value] = whereClause.split('=').map(s => s.trim());
//         return row[field] === value;
//     })
//     : data; 

//     //selecting the specified fields 
//     return filteredData.map(row => {
//         const selectedRow = {};
//         fields.forEach(field => {
//             selectedRow[field] = row[field];
//         });
//         return selectedRow;
//     })
// }

// module.exports = executeSELECTQuery; 

// // ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// //explanation

// // const parseQuery = require('./queryParser');
// // This line imports the parseQuery function from the queryParser.js module using the require statement. The parseQuery function is expected to parse an SQL query.

// //const readCSV = require('./csvReader');
// //This line imports the readCSV function from the csvReader.js module using the require statement. The readCSV function is likely designed to read data from a CSV file.

// // const { fields, table } = parseQuery(query);
// // This line calls the parseQuery function with the provided SQL query (query). It destructures the returned object into two variables: fields and table. These variables represent the selected fields and the table name from the SQL query, respectively

// // const data = await readCSV(`${table}.csv`);
// // This line uses the readCSV function to read data from a CSV file. It constructs the filename by appending the .csv extension to the table variable obtained from the parsed SQL query. The await keyword indicates that this operation is asynchronous, and the function will pause until the promise returned by readCSV is resolved.

// // return data.map(row => {
// //     const filteredRow = {};
// //     fields.forEach(field => {
// //         filteredRow[field] = row[field];
// //     });
// //     return filteredRow;
// // });
// // This block processes the data obtained from the CSV file. It uses the map function to iterate over each row in the data array. For each row, it creates a new object (filteredRow) containing only the fields specified in the original SQL query. The result is an array of objects, each representing a row with selected fields.

// // In summary, this module exports an asynchronous function executeSELECTQuery that takes an SQL query, parses it using the parseQuery function, reads data from a corresponding CSV file using the readCSV function, and returns an array of objects containing only the selected fields from the CSV data.


// // const filteredData = whereClause
// //     ? data.filter(row => {
// //         const [field, value] = whereClause.split('=').map(s => s.trim());
// //         return row[field] == value;
// //     })
// //     : data;
// // This block of code checks whether a whereClause exists. If it does, it uses the filter method to create a new array (filteredData) containing only the rows that satisfy the condition specified in the WHERE clause. The condition compares a specific field and value from each row with the values extracted from the WHERE clause.

// // The whereClause.split('=').map(s => s.trim()) line splits the WHERE clause into an array of two elements (field and value) using the '=' as a separator. The map function trims any leading or trailing whitespaces from each element.

// // The condition row[field] == value checks if the field in the current row is equal to the specified value.

// // If there is no WHERE clause (// src/index.js
// //whereClause is falsy), the original data array is assigned to filteredData.


// ------------------------------------------------------------
// till step 7:

const parseQuery = require('./queryParser');
const readCSV = require('./csvReader');

async function executeSELECTQuery(query) {
    const { fields, table, whereClauses, joinTable, joinCondition } = parseQuery(query);
    let data = await readCSV(`${table}.csv`);

    if(joinTable && joinCondition){
        const joinData = await readCSV(`${joinTable}.csv`);
        data = data.flatMap(mainRow => {
            return joinData
                .filter(joinRow => {
                    const mainValue = mainRow[joinCondition.left.split('.')[1]];
                    const joinValue = joinRow[joinCondition.right.split('.')[1]];
                    return mainValue === joinValue;
                })

                .map(joinRow => {
                    return fields.reduce((acc, field) => {
                        const [tableName, fieldName] = field.split('.');
                        acc[field] = tableName === table ? mainRow[fieldName] : joinRow[fieldName];
                        return acc;
                    }, {});
                });
        });
    }

    function evaluateCondition(row, clause){
        const{ field, operator, value} = clause;
        switch(operator){
            case '=' : return row[field] === value;
            case '!=' : return row[field] !== value;
            case '>' : return row[field] > value;
            case '<' : return row[field] < value;
            case '>=' : return row[field] >= value;
            case '<=' : return row[field] <= value;
            default: throw new Error(`Unsupported operator: ${operator}`);
        }
    }

    // Apply WHERE clause filtering
    const filteredData = whereClauses.length > 0
        ? data.filter(row => whereClauses.every(clause => evaluateCondition(row, clause))) 
        : data;

    // Select the specified fields
    return filteredData.map(row => {
        const selectedRow = {};
        fields.forEach(field => {
            selectedRow[field] = row[field];
        });
        return selectedRow;
    });
}

module.exports = executeSELECTQuery;



// --------------------------------------------------------------------
// const filteredData = whereClauses.length > 0
//     ? data.filter(row => whereClauses.every(clause => {
//         // You can expand this to handle different operators
//         return row[clause.field] === clause.value;
//     }))
//     : data;
// whereClauses.length > 0: Checks if there are any elements in the whereClauses array. If there are, it means there are filtering conditions to apply.

// ? data.filter(row => whereClauses.every(clause => {...})) : data;: This is a ternary operator. If there are where clauses (whereClauses.length > 0 is true), it filters the data array using the filter method. The filter method is called on each element (row) in the data array, and it only keeps the rows that satisfy all conditions specified in the whereClauses array.

// whereClauses.every(clause => {...}): This checks if every element in the whereClauses array satisfies a condition specified by the provided function. The condition, in this case, is checking if the value of the field (clause.field) in the current row (row[clause.field]) is equal (===) to the specified value (clause.value).

// If whereClauses.length > 0 is false (there are no filtering conditions), the entire data array is assigned to filteredData without any filtering.