const { Parser } = require('./src/Parser');

const str = `
    if (x) {
        x = 1;
    }
    x = 45;
`;

const parser = new Parser();

let result = parser.parse(str);
console.log(JSON.stringify(result, null, 2));
// todo реализовать поддержку операторов >=