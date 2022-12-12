const { Tokenaizer } = require("./Tokenaizer");

class Parser {

    constructor() {
        this._string = '';
        this._tokenizer = new Tokenaizer();
    }

    parse(string) {
        this._string = string;
        this._tokenizer.init(string);
        /**
         * После того как нам передали строку для парсинга
         * мы уже имеем первый токен, именно с класса парсера отсюда будем дальше толкать
         * наш токенайзер на следующие токены и тут монтировать их согласна нашей грамматике
         */
        this.lookahead = this._tokenizer.getNextToken();

        return this.Program();
    }

    Program() {
        return {
            type: "Program",
            body: this.StatementList()
        }
    }

    StatementList(stopLookahead = null) {
        // Первый statement кладем сразу в список, так как lookahead при инициализации уже имеет токен
        const statementList = [this.Statement()];

        while (this.lookahead !== null && this.lookahead.type !== stopLookahead) {
            statementList.push(this.Statement())
        }

        return statementList;
    }
    /**
     * ExpressionStatement
     * BlockStatement
     * EmptyStatement
     * VariableStatement
     * IfStatement
     */
    Statement() {
        switch (this.lookahead.type) {
            case 'let':
                return this.VariableStatement()
            case ';':
                return this.EmptyStatement();
            case 'if':
                return this.IfStatement();
            case '{':
                return this.BlockStatement();
            default:
                return this.ExpressionStatement();
        }
    }
    /**
     * IfStatement
     *  : 'if' '(' Expression ')' Statement
     *  : 'if' '(' Expression ')' Statement 'else' Statement
     */
    IfStatement() {
        this._eat('if')
        this._eat('(');
        const test = this.Expression();
        this._eat(')');

        const consequent = this.Statement();

        const alternate = this.lookahead !== null && this.lookahead.type === 'else'
                    ? this._eat('else') && this.Statement()
                    : null;
        
        return {
            type: "IfStatement",
            test,
            consequent,
            alternate
        }
    }

    BlockStatement() {
        // проталкиваем следующие токены, нам не интересен "}"
        this._eat('{')

        const body = this.lookahead.type !== '}' ? this.StatementList('}') : [];

        // проталкиваем следующие токены, нам не интересен "}"
        this._eat('}') 

        return {
            type: "BlockStatement",
            body
        }

    }

    EmptyStatement() {
        this._eat(';');
        
        return {
            type: "EmptyStatement"
        }
    }

    VariableStatement() {
        this._eat('let');

        const declarations = this.VariableDeclarationList();
        this._eat(';')

        return {
            type: 'VariableStatement',
            declarations,
        }
    }

    VariableDeclarationList() {
        const declarations = [];

        do {
            declarations.push(this.VariableDeclaration())
        } while (this.lookahead.type === ',' && this._eat(','))

        return declarations;
    }

    VariableDeclaration() {
        const id = this.Identifier();

        const init = this.lookahead.type !== ',' && this.lookahead.type !== ';'
                ? this.VariableInitializer()
                : null;
        return {
            type: "VariableDeclaration",
            id,
            init,
        }
    }

    VariableInitializer() {
        this._eat('SIMPLE_ASSIGN');

        return this.AssignmentExpression();
    }

    ExpressionStatement() {
        const expression = this.Expression();
        this._eat(';');

        return {
            type: "ExpressionStatement",
            expression
        }
    }

    Expression() {
        return this.AssignmentExpression();
    }

    AssignmentExpression() {
        const left = this.AdditiveExpression();

        if (!this._isAssignmentOperator(this.lookahead.type)) {
            return left;
        }

        return {
            type: "AssignmentExpression",
            operator: this.AssignmentOperator().value,
            left: this._checkValueAssingmentExpression(left),
            right: this.AssignmentExpression(),
        }
    }

    LeftHandSideExpression() {
        return this.Identifier()
    }

    Identifier() {
        const name = this._eat('IDENTIFIER').value;

        return {
            type: 'Identifier',
            name
        }
    }

    _checkValueAssingmentExpression(node) {
        if (node.type == 'Identifier') {
            return node;
        }

        throw new SyntaxError('Invalid left-hard side in assigment expression');
    }

    _isAssignmentOperator(tokenType) {
        return tokenType === 'SIMPLE_ASSIGN' || tokenType === 'COMPLEX_ASSIGN';
    }

    AssignmentOperator() {
        if (this.lookahead.type === 'SIMPLE_ASSIGN') {
            return this._eat('SIMPLE_ASSIGN');
        }

        return this._eat('COMPLEX_ASSIGN');
    }

    _BinaryExpession(builderName, operatorToken) {
        let left = this[builderName]();

        while (this.lookahead.type === operatorToken) {

            const operator = this._eat(operatorToken).value;

            const right = this[builderName]();
            
            left = {
                type: "BinaryExpression",
                operator,
                left,
                right
            }
        }

        return left;
    }

    AdditiveExpression() {
        return this._BinaryExpession('MultiplicativeExpression', 'ADDITIVE_OPERATOR');
    }
    // так как у нас умножение выше приоритет, то если 
    MultiplicativeExpression() {
        return this._BinaryExpession('PrimaryExpression', 'MULTIPLICATIVE_OPERATOR');
    }

    PrimaryExpression() {
        if (this._isLiteral(this.lookahead.type)) {
            return this.Literal();
        }

        switch (this.lookahead.type) {
            case '(':
                return this.ParenthesizedExpression();
            default:
                return this.LeftHandSideExpression();
        }
    }

    _isLiteral(tokenType) {
        return tokenType === 'NUMBER' || tokenType === 'STRING';
    }

    ParenthesizedExpression() {
        this._eat('(');

        const expression = this.Expression();

        this._eat(')');

        return expression;
    }

    Literal() {
        switch (this.lookahead.type) {
            case "NUMBER":
                return this.NumericLiteral();
            case "STRING":
                return this.StringLiteral();
        }

        throw new SyntaxError('Literal: unexpected literal production')
    }

    NumericLiteral() {
        const token = this._eat('NUMBER');

        return {
            type: "NumericLiteral",
            value: Number(token.value)
        }
    }

    StringLiteral() {
        const token = this._eat('STRING');

        return {
            type: "StringLiteral",
            value: token.value.slice(1, -1)
        }
    }

    _eat(tokenType) {
        const token = this.lookahead;

        if (token === null) {
            throw new SyntaxError(`Unexpected end of input: ${tokenType}`);
        }

        if (token.type !== tokenType) {
            throw new SyntaxError(`Unexpected token: ${token.value}, expected: ${tokenType}`);
        }

        this.lookahead = this._tokenizer.getNextToken();

        return token;
    }
}

module.exports = {
    Parser
}