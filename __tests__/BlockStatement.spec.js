const { Parser } = require("../src/Parser")


describe('BlockStatement:', () => {
    const parser = new Parser();

    test('empty Block', () => {
        const str = `{

        }`;

        expect(parser.parse(str)).toEqual({
            "type": "Program",
            "body": [
                {
                    "type": "BlockStatement",
                    "body": []
                }
            ]
        })
    })

    test('one ExpressionStatement in BlockStatement', () => {
        const str = `{
            45;
        }`;

        expect(parser.parse(str)).toEqual({
            "type": "Program",
            "body": [
                {
                    "type": "BlockStatement",
                    "body": [
                        {
                            "type": "ExpressionStatement",
                            "expression": {
                                "type": "NumericLiteral",
                                "value": 45
                            }
                        }
                    ]
                }
            ]
        })
    })

    test('two and more ExpressionStatement in BlockStatement', () => {
        const str = `{
            45;
            "hello";
        }`;

        expect(parser.parse(str)).toEqual({
            "type": "Program",
            "body": [
                {
                    "type": "BlockStatement",
                    "body": [
                        {
                            "type": "ExpressionStatement",
                            "expression": {
                                "type": "NumericLiteral",
                                "value": 45
                            }
                        },
                        {
                            "type": "ExpressionStatement",
                            "expression": {
                                "type": "StringLiteral",
                                "value": "hello"
                            }
                        }
                    ]
                }
            ]
        })
    })

    test('?????????????????? BlockStatement ?? ???????? ??????????', () => {
        const str = `{
            {
                45;
            }
        }`;

        expect(parser.parse(str)).toEqual({
            "type": "Program",
            "body": [
                {
                    "type": "BlockStatement",
                    "body": [
                        {
                            "type": "BlockStatement",
                            "body": [
                                {
                                    "type": "ExpressionStatement",
                                    "expression": {
                                        "type": "NumericLiteral",
                                        "value": 45
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        })
    })

    test('?????????????????? BlockStatement ?? ???????? ?????????? ?? ???? ???????????? ???????????? ???????? ExpressionStatement', () => {
        const str = `{
            'hello';
            {
                45;
            }
            "hello";
        }`;

        expect(parser.parse(str)).toEqual({
            "type": "Program",
            "body": [
                {
                    "type": "BlockStatement",
                    "body": [
                        {
                            "type": "ExpressionStatement",
                            "expression": {
                                "type": "StringLiteral",
                                "value": "hello"
                            }
                        },
                        {
                            "type": "BlockStatement",
                            "body": [
                                {
                                    "type": "ExpressionStatement",
                                    "expression": {
                                        "type": "NumericLiteral",
                                        "value": 45
                                    }
                                }
                            ]
                        },
                        {
                            "type": "ExpressionStatement",
                            "expression": {
                                "type": "StringLiteral",
                                "value": "hello"
                            }
                        }
                    ]
                }
            ]
        })
    })

    test('?????? ?????????????????? BlockStatement ?? ???? ???????????? ???????????? ???????? ???????? StatementExpression', () => {
        const str = `{
            'hello';
            {
                45;
                {
                    'hello world';
                }
            }
            "hello";
        }`;

        expect(parser.parse(str)).toEqual({
            "type": "Program",
            "body": [
                {
                    "type": "BlockStatement",
                    "body": [
                        {
                            "type": "ExpressionStatement",
                            "expression": {
                                "type": "StringLiteral",
                                "value": "hello"
                            }
                        },
                        {
                            "type": "BlockStatement",
                            "body": [
                                {
                                    "type": "ExpressionStatement",
                                    "expression": {
                                        "type": "NumericLiteral",
                                        "value": 45
                                    }
                                },
                                {
                                    "type": "BlockStatement",
                                    "body": [
                                        {
                                            "type": "ExpressionStatement",
                                            "expression": {
                                                "type": "StringLiteral",
                                                "value": "hello world"
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "ExpressionStatement",
                            "expression": {
                                "type": "StringLiteral",
                                "value": "hello"
                            }
                        }
                    ]
                }
            ]
        })
    })

})