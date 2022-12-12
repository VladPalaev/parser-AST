const { Parser } = require('../src/Parser');

describe('variableStatement:', () => {
    const parser = new Parser();

    test('x = 42;', () => {
        const str = 'x = 42;';
        expect(parser.parse(str)).toEqual({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "operator": "=",
                        "left": {
                            "type": "Identifier",
                            "name": "x"
                        },
                        "right": {
                            "type": "NumericLiteral",
                            "value": 42
                        }
                    }
                }
            ]
        })
    })

    test('x = y = 42;', () => {
        const str = 'x = y = 42;';
        expect(parser.parse(str)).toEqual({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "operator": "=",
                        "left": {
                            "type": "Identifier",
                            "name": "x"
                        },
                        "right": {
                            "type": "AssignmentExpression",
                            "operator": "=",
                            "left": {
                                "type": "Identifier",
                                "name": "y"
                            },
                            "right": {
                                "type": "NumericLiteral",
                                "value": 42
                            }
                        }
                    }
                }
            ]
        })
    })

    test('x = y + 42;', () => {
        const str = 'x = y + 42;';
        expect(parser.parse(str)).toEqual({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "operator": "=",
                        "left": {
                            "type": "Identifier",
                            "name": "x"
                        },
                        "right": {
                            "type": "BinaryExpression",
                            "operator": "+",
                            "left": {
                                "type": "Identifier",
                                "name": "y"
                            },
                            "right": {
                                "type": "NumericLiteral",
                                "value": 42
                            }
                        }
                    }
                }
            ]
        })
    })
})