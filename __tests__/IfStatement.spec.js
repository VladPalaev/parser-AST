const { Parser } = require("../src/Parser")

describe('IfStatement', () => {
    const parser = new Parser();

    test('Есть и if и else', () => {
        const str = `if (x) {
            x = 1;
        } else {
            x = 34;
        }`;

        expect(parser.parse(str)).toEqual({
            "type": "Program",
            "body": [
                {
                    "type": "IfStatement",
                    "test": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "consequent": {
                        "type": "BlockStatement",
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
                                        "value": 1
                                    }
                                }
                            }
                        ]
                    },
                    "alternate": {
                        "type": "BlockStatement",
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
                                        "value": 34
                                    }
                                }
                            }
                        ]
                    }
                }
            ]
        })
    })

    test('Есть только if блок', () => {
        const str = `if (x) {
            x = 1;
        }
        x = 45;
    `;

        expect(parser.parse(str)).toEqual({
            "type": "Program",
            "body": [
                {
                    "type": "IfStatement",
                    "test": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "consequent": {
                        "type": "BlockStatement",
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
                                        "value": 1
                                    }
                                }
                            }
                        ]
                    },
                    "alternate": null
                },
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
                            "value": 45
                        }
                    }
                }
            ]
        })
    })
})