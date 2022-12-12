const { Parser } = require("../src/Parser");

describe('EmptyStatement:', () => {
    const parser = new Parser();

    test('пустое expression', () => {
        const str = `
        ;
        `;

        expect(parser.parse(str)).toEqual({
            "type": "Program",
            "body": [
              {
                "type": "EmptyStatement"
              }
            ]
          })
    })
})