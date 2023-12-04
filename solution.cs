Here is a JavaScript solution using a recursive function to evaluate the string:

```javascript
function evaluate(expression) {
    const operators = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => a / b
    };

    function parse(str) {
        for (let i = str.length - 1; i >= 0; i--) {
            if (str[i] === '+' || str[i] === '-') {
                return operators[str[i]](parse(str.slice(0, i)), parseFloat(str.slice(i + 1)));
            }
        }
        for (let i = str.length - 1; i >= 0; i--) {
            if (str[i] === '*' || str[i] === '/') {
                return operators[str[i]](parse(str.slice(0, i)), parseFloat(str.slice(i + 1)));
            }
        }
        return parseFloat(str);
    }

    let bracketContent, result;
    while (expression.includes('(')) {
        bracketContent = expression.match(/\(([^()]+)\)/)[1];
        result = parse(bracketContent);
        expression = expression.replace(`(${bracketContent})`, result.toString());
    }

    return parse(expression);
}

console.log(evaluate('2*(3+5)/4'));
```

This code will evaluate a string expression that contains numbers, the four basic arithmetic operators (+, -, *, /), and parentheses. It uses a recursive function to parse the string and apply the operators in the correct order of operations. It also handles parentheses by finding and evaluating the innermost parenthetical expression first, then replacing it in the original string with its result. This process repeats until there are no more parentheses in the string.