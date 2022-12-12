const { Parser } = require('../src/Parser');

describe('variableStatement:', () => {
    const parser = new Parser();

    test('let x = 42;', () => {
        const str = 'let x = 42;';
        expect(parser.parse(str)).toEqual({
            type: "Program",
            body: [
                {
                    type: "VariableStatement",
                    declarations: [
                        {
                            type: "VariableDeclaration",
                            id: {
                                type: "Identifier",
                                name: "x"
                            },
                            init: {
                                type: "NumericLiteral",
                                value: 42
                            }
                        }
                    ]
                }
            ]
        })
    })

    test('let x;', () => {
        const str = 'let x;';
        expect(parser.parse(str)).toEqual({
            type: "Program",
            body: [
                {
                    type: "VariableStatement",
                    declarations: [
                        {
                            type: "VariableDeclaration",
                            id: {
                                type: "Identifier",
                                name: "x"
                            },
                            init: null
                        }
                    ]
                }
            ]
        })
    })

    test('let x, y;', () => {
        const str = 'let x, y;';
        expect(parser.parse(str)).toEqual({
            type: "Program",
            body: [
                {
                    type: "VariableStatement",
                    declarations: [
                        {
                            type: "VariableDeclaration",
                            id: {
                                type: "Identifier",
                                name: "x"
                            },
                            init: null
                        },
                        {
                            type: "VariableDeclaration",
                            id: {
                                type: "Identifier",
                                name: "y"
                            },
                            init: null
                        }
                    ]
                }
            ]
        })
    })

    test('let x, y = 45;', () => {
        const str = 'let x, y = 45;';
        expect(parser.parse(str)).toEqual({
            type: "Program",
            body: [
                {
                    type: "VariableStatement",
                    declarations: [
                        {
                            type: "VariableDeclaration",
                            id: {
                                type: "Identifier",
                                name: "x"
                            },
                            init: null
                        },
                        {
                            type: "VariableDeclaration",
                            id: {
                                type: "Identifier",
                                name: "y"
                            },
                            init: {
                                type: "NumericLiteral",
                                value: 45
                            }
                        }
                    ]
                }
            ]
        })
    })
})