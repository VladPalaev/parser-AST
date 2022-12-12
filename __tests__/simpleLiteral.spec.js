const { Parser } = require("../src/Parser")


describe('Literal:', () => {
    const parser = new Parser();

    test('NumericLiteral', () => {
        const str = `45;`
        expect(parser.parse(str)).toEqual({
            "type": "Program",
            "body": [
              {
                "type": "ExpressionStatement",
                "expression": {
                  "type": "NumericLiteral",
                  "value": 45
                }
              }
            ]
          })
    })

    test('StringLiteral', () => {
        const str = `"hello";`
        expect(parser.parse(str)).toEqual({
            "type": "Program",
            "body": [
              {
                "type": "ExpressionStatement",
                "expression": {
                  "type": "StringLiteral",
                  "value": "hello"
                }
              }
            ]
          })
    })
    
    // test('Error, пустая строка или строка с пробелами', () => {
    //     expect(parser.parse('   ')).toBeInstanceOf(Error);
    // })



})