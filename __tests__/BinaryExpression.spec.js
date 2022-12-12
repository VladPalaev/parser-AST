const { Parser } = require('../src/Parser');

describe('BinaryExpression:', () => {
    const parser = new Parser();

    test('Сложение -> 2 + 2', () => {
        const str = `2 + 2;`

        expect(parser.parse(str)).toEqual({
            "type": "Program",
            "body": [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "BinaryExpression",
                        operator: "+",
                        left: {
                            type: "NumericLiteral",
                            value: 2
                        },
                        right: {
                            type: "NumericLiteral",
                            value: 2
                        }
                    }
                }
            ]
        })
    })

    test('три и более операнд simple операторов -> 3 + 1 - 2', () => {
        const str = `3 + 1 - 2;`;

        expect(parser.parse(str)).toEqual({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "BinaryExpression",
                        "operator": "-",
                        "left": {
                            "type": "BinaryExpression",
                            "operator": "+",
                            "left": {
                                "type": "NumericLiteral",
                                "value": 3
                            },
                            "right": {
                                "type": "NumericLiteral",
                                "value": 1
                            }
                        },
                        "right": {
                            "type": "NumericLiteral",
                            "value": 2
                        }
                    }
                }
            ]
        })
    })

    test('simple умножение, две операнды', () => {
        const str = `3 * 2;`;

        expect(parser.parse(str)).toEqual({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "BinaryExpression",
                        "operator": "*",
                        "left": {
                            "type": "NumericLiteral",
                            "value": 3
                        },
                        "right": {
                            "type": "NumericLiteral",
                            "value": 2
                        }
                    },
                }
            ]
        })
    })

    test('3 операнды, плюс важен приоритет знаков', () => {
        const str = `3 * 2 - 45;`;

        expect(parser.parse(str)).toEqual({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "BinaryExpression",
                        "operator": "-",
                        "left": {
                            "type": "BinaryExpression",
                            "operator": "*",
                            "left": {
                                "type": "NumericLiteral",
                                "value": 3
                            },
                            "right": {
                                "type": "NumericLiteral",
                                "value": 2
                            }
                        },
                        "right": {
                            "type": "NumericLiteral",
                            "value": 45
                        }
                    }
                }
            ]
        })
    })

    test('3 операнды, плюс важен приоритет знаков', () => {
        const str = `2 - 45 * 3;`;

        expect(parser.parse(str)).toEqual({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "BinaryExpression",
                        "operator": "-",
                        "left": {
                            "type": "NumericLiteral",
                            "value": 2
                        },
                        "right": {
                            "type": "BinaryExpression",
                            "operator": "*",
                            "left": {
                                "type": "NumericLiteral",
                                "value": 45
                            },
                            "right": {
                                "type": "NumericLiteral",
                                "value": 3
                            }
                        }
                    }
                }
            ]
        })
    })

    test('3 операнды c использованием скобок, которые меняют приоритет', () => {
        const str = `(2 + 2) * 3;`;

        expect(parser.parse(str)).toEqual({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "BinaryExpression",
                        "operator": "*",
                        "left": {
                            "type": "BinaryExpression",
                            "operator": "+",
                            "left": {
                                "type": "NumericLiteral",
                                "value": 2
                            },
                            "right": {
                                "type": "NumericLiteral",
                                "value": 2
                            }
                        },
                        "right": {
                            "type": "NumericLiteral",
                            "value": 3
                        }
                    }
                }
            ]
        })
    })
})