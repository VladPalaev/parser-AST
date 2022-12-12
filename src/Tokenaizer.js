const Spec = [
    [/^\s+/, null],
    [/^\blet\b/, 'let'],
    [/^;/, ';'],
    [/^\d+/, 'NUMBER'],
    [/^"[^"]*"/, 'STRING'],
    [/^'[^']*'/, 'STRING'],
    // Reserved keywords
    [/^\blet\b/, 'let'],
    [/^\/\/.*/, null],
    [/^\/\*[\s\S]*?\*\//, null],
    [/^\{/, '{'],
    [/^\}/, '}'],
    [/^[+\-]/, 'ADDITIVE_OPERATOR'],
    [/^[*\/]/, 'MULTIPLICATIVE_OPERATOR'],
    [/^\(/, '('],
    [/^\)/, ')'],
    [/^,/, ','],
    // IDENTIFIER:
    [/^\w+/, 'IDENTIFIER'],
    // Assignment operator: = += -= *= /=
    [/^=/, 'SIMPLE_ASSIGN'],
    [/^[\*\+\/\-]=/, 'COMPLEX_ASSIGN'],


]

class Tokenaizer {
    init(string) {
        this._string = string;
        this._cursor = 0;
    }

    hasMoreTokens() {
        return this._cursor < this._string.length;
    }

    EOF() {
        return this._cursor === this._string.length;
    }

    getNextToken() {
        if (!this.hasMoreTokens()) {
            return null;
        }

        const string = this._string.slice(this._cursor);

        for (const [regExp, tokenType] of Spec) {
            let tokenValue = this._match(regExp, string);

            /**
             * Если какое правило вернуло Null, то ничего страшного, возможно что подойдет другое правило из Spec
             * ну если ни одно не подошло, выкинем ошибку чуть дальше
             */
            if (tokenValue === null) {
                continue;
            }
            /**
             * Сюда мы провалимся, если все такие мы нашли токен по правилу из Spec, наш tokenValue что-то нашел
             * в Spec-e мы определяем не только правило нахождение токена, но еще и его тип (NUMBER | STRING .etc)
             * Есть токены, которые мы хотим пропускать (whiteSpace .etc), то нам нужно не забывать запускать следующий поиск токена
             */

            if (tokenType === null) {
                return this.getNextToken();
            }

            return {
                type: tokenType,
                value: tokenValue
            }
        }
        /**
         * Если мы прошли по всем нашим правилам по поиску типа токена и никакое правило не подошло
         * то мы выбрасываем ошибку что данный вид токена нам не известен и показываем его
         */
        throw new SyntaxError(`Unexpected token: ${string[0]}`)

    }

    _match(regExp, string) {
        let matched = regExp.exec(string);

        if (matched === null) {
            return null;
        }
        this._cursor += matched[0].length;

        return matched[0];
    }
}

module.exports = {
    Tokenaizer,
}