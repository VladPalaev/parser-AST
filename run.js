const { Parser } = require('./src/Parser');

const str = `
    let vlad = 45;
`;

const parser = new Parser();

let result = parser.parse(str);
console.log(JSON.stringify(result, null, 2));
