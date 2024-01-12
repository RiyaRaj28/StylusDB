// Write a function that takes a SQL query
//  string and parses it using regex to identify the 
//  SELECT fields and the FROM table name.


// src/queryParser.js

// src/queryParser.js



// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// explanation

// function parseQuery(query) {
//     This line declares a function named parseQuery that takes a single parameter, query. This function is designed to parse an SQL query and extract information about the selected fields and the table.
    

// const selectRegex = /SELECT (.+) FROM (.+)/i;
// This line declares a regular expression (selectRegex) using the RegExp constructor. The regular expression is designed to match a SELECT statement in SQL. It has two capturing groups for the selected fields and the table name.

// const match = query.match(selectRegex);
// This line uses the match method of the query string to attempt to match it against the selectRegex. The result is stored in the match variable, which will be an array if a match is found.

// const [, fields, table] = match;
// If there is a match, this line uses destructuring assignment to extract the values of the capturing groups (fields and table) from the match array. The first element of the array is skipped (hence the empty first slot in the array pattern).

// In summary, this module exports a function parseQuery that takes an SQL query as input, attempts to match it against a SELECT statement pattern using a regular expression, and returns an object with information about the selected fields and the table if the query is in the expected format. If the query doesn't match the expected format, it throws an error.

// return {
//     fields: fields.split(',').map(field => field.trim()),
//     table: table.trim(),
//     whereClause: whereClause ? whereClause.trim() : null
// };
// This block is executed if there is a match. It returns an object with three properties:
// fields: An array obtained by splitting the fields string at commas and trimming each field.
// table: The trimmed table string.
// whereClause: The trimmed whereClause string if it exists, or null if not.




// const whereClauses = whereString ? parseWhereClause(whereString) : [];
// whereString seems to be a variable or parameter that presumably contains a string representing a WHERE clause in a SQL query or a similar context.
// parseWhereClause appears to be a function that is called with whereString as an argument when whereString is truthy (not null, undefined, empty, or false). The result of this function call is assigned to the constant variable whereClauses.
// If whereString is falsy (null, undefined, empty, or false), an empty array ([]) is assigned to whereClauses.

// function parseQuery(query) {
//     const selectRegex = /SELECT (.+?) FROM (.+?)(?: WHERE (.*))?$/i;
//     const match = query.match(selectRegex);

//     if (match) {
//         const [, fields, table, whereString] = match;
//         const whereClauses = whereString ? parseWhereClause(whereString) : [];
//         return {
//             fields: fields.split(',').map(field => field.trim()),
//             table: table.trim(),
//             whereClauses
//         };
//     } else {
//         throw new Error('Invalid query format');
//     }
// }

// function parseWhereClause(whereString) {
//     const conditionRegex = /(.*?)(=|!=|>|<|>=|<=)(.*)/;
//     return whereString.split(/ AND | OR /i).map(conditionString => {
//         const match = conditionString.match(conditionRegex);
//         if(match){
//             const [, field, operator, value] = match;
//             return{ field: field.trim(), operator, value: value.trim()};
//         }
//         throw new Error('Invalid WHERE clause format');
//     });
// }

// module.exports = parseQuery;



 
function parseQuery(query){
    //trim the query to remove leading/trailing whitespaces
    query = query.trim();

    //initialize variables for different parts of the query
    let selectPart, fromPart;

    //split the query at the WHERE clause if it exists
    const whereClause = whereSplit.length > 1 ? whereSplit[1].trim() : null;

    //split the remaining query at the JOIN claue if it exists 
    const joinSplit = query.split(/\sINNER JOIN\s/i);
    selectPart = joinSplit[0].trim(); //everything before JOIN clause

    //JOIN clause is the second part after splitting, if it exits
    const joinPart = joinSplit.length > 1 ? joinSplit[1].trim() : null;

    //parse the SELECT part 
    const selectRegex = /^SELECT\s(.+?)\sFROM\s(.+)/i;
    const selectMatch = selectPart.match(selectRegex);
    if(!selectMatch){
        throw new Error('Invalid SELECT format');
    }

    const[, fields, table] = selectMatch;

    //Parse the JOIN part if it exits
    let joinTable =  null, joinCondition = null;
    if(joinPart){
        const joinRegex = /^(.+?)\sON\s([\w.]+)\s*=\s*([\w.]+)/i;
        const joinMatch = joinPart.match(joinRegex);
        if(!joinMatch){
            throw new Error('Invalid JOIN format');
        }

        joinTable = joinMatch[1].trim();
        joinCondition = {
            left: joinMatch[2].trim(),
            right: joinMatch[3].trim()
        };

        }

        //parse the WHERE part if it exits 
        let whereClauses = [];
        if(whereClause) {
            whereClauses = parseWhereClause(whereClause);
        }

        return{
            fields: fields.split(',').map(field => field.trim()),
            table: table.trim(),
            whereClauses,
            joinTable,
            joinCondition
        };
    }


    
// Certainly! Let's break down the provided parseQuery function line by line:

// javascript
// Copy code
// // src/queryParser.js

// function parseQuery(query) {
//     // First, let's trim the query to remove any leading/trailing whitespaces
//     query = query.trim();
// Trimming the Query:
// query = query.trim();: Removes leading and trailing whitespaces from the input query.
// javascript
// Copy code
//     // Initialize variables for different parts of the query
//     let selectPart, fromPart;
// Variable Initialization:
// let selectPart, fromPart;: Declares variables to store the SELECT and FROM parts of the query.
// javascript
// Copy code
//     // Split the query at the WHERE clause if it exists
//     const whereSplit = query.split(/\sWHERE\s/i);
//     query = whereSplit[0]; // Everything before WHERE clause
// Splitting at WHERE Clause:
// const whereSplit = query.split(/\sWHERE\s/i);: Splits the query at the WHERE clause, case-insensitive.
// query = whereSplit[0];: Updates the query variable with everything before the WHERE clause.
// javascript
// Copy code
//     // WHERE clause is the second part after splitting, if it exists
//     const whereClause = whereSplit.length > 1 ? whereSplit[1].trim() : null;
// Extracting WHERE Clause:
// const whereClause = whereSplit.length > 1 ? whereSplit[1].trim() : null;: Stores the WHERE clause separately, trimming whitespaces.
// javascript
// Copy code
//     // Split the remaining query at the JOIN clause if it exists
//     const joinSplit = query.split(/\sINNER JOIN\s/i);
//     selectPart = joinSplit[0].trim(); // Everything before JOIN clause
// Splitting at INNER JOIN:
// const joinSplit = query.split(/\sINNER JOIN\s/i);: Splits the remaining query at the INNER JOIN clause, case-insensitive.
// selectPart = joinSplit[0].trim();: Stores everything before the INNER JOIN clause in selectPart.
// javascript
// Copy code
//     // JOIN clause is the second part after splitting, if it exists
//     const joinPart = joinSplit.length > 1 ? joinSplit[1].trim() : null;
// Extracting JOIN Clause:
// const joinPart = joinSplit.length > 1 ? joinSplit[1].trim() : null;: Stores the JOIN clause separately, trimming whitespaces.
// javascript
// Copy code
//     // Parse the SELECT part
//     const selectRegex = /^SELECT\s(.+?)\sFROM\s(.+)/i;
//     const selectMatch = selectPart.match(selectRegex);
//     if (!selectMatch) {
//         throw new Error('Invalid SELECT format');
//     }
// Parsing SELECT Part:
// const selectRegex = /^SELECT\s(.+?)\sFROM\s(.+)/i;: Defines a regex to match the SELECT part.
// const selectMatch = selectPart.match(selectRegex);: Attempts to match the SELECT part using the regex.
// if (!selectMatch) { throw new Error('Invalid SELECT format'); }: Throws an error if the SELECT part doesn't match the expected format.
// javascript
// Copy code
//     const [, fields, table] = selectMatch;
// Destructuring SELECT Match:
// const [, fields, table] = selectMatch;: Destructures the matched array to extract fields and the table from the SELECT part.
// javascript
// Copy code
//     // Parse the JOIN part if it exists
//     let joinTable = null, joinCondition = null;
//     if (joinPart) {
//         const joinRegex = /^(.+?)\sON\s([\w.]+)\s*=\s*([\w.]+)/i;
//         const joinMatch = joinPart.match(joinRegex);
//         if (!joinMatch) {
//             throw new Error('Invalid JOIN format');
//         }
// Parsing JOIN Part:
// let joinTable = null, joinCondition = null;: Initializes variables for JOIN table and condition.
// if (joinPart) { ... }: Checks if a JOIN clause exists.
// const joinRegex = /^(.+?)\sON\s([\w.]+)\s*=\s*([\w.]+)/i;: Defines a regex to match the JOIN part.
// const joinMatch = joinPart.match(joinRegex);: Attempts to match the JOIN part using the regex.
// if (!joinMatch) { throw new Error('Invalid JOIN format'); }: Throws an error if the JOIN part doesn't match the expected format.
// javascript
// Copy code
//         joinTable = joinMatch[1].trim();
//         joinCondition = {
//             left: joinMatch[2].trim(),
//             right: joinMatch[3].trim()
//         };
//     }
// Extracting JOIN Information:
// joinTable = joinMatch[1].trim();: Extracts the JOIN table.
// joinCondition = { left: joinMatch[2].trim(), right: joinMatch[3].trim() };: Creates a JOIN condition object.
// javascript
// Copy code
//     // Parse the WHERE part if it exists
//     let whereClauses = [];






