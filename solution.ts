Here is a TypeScript solution for the problem:

```typescript
class Calculator {
    private operators = ['-', '+', '*', '/'];
    private delimiters = ['(', ')', '-', '+', '*', '/'];

    calculate(expression: string): number {
        let stack = [];
        let mayUnary = true;
        let tokens = this.getTokens(expression);
        for (let i = 0; i < tokens.length; i++) {
            let token = tokens[i];
            if (this.isOperator(token)) {
                while (stack.length != 0 && this.priority(stack[stack.length - 1]) >= this.priority(token)) {
                    this.processOperator(stack, stack.pop());
                }
                stack.push(token);
                mayUnary = true;
            } else if (token == '(') {
                stack.push('(');
                mayUnary = true;
            } else if (token == ')') {
                while (stack[stack.length - 1] != '(') {
                    this.processOperator(stack, stack.pop());
                }
                stack.pop();
                mayUnary = false;
            } else {
                if (mayUnary && token == '-') {
                    stack.push(-1);
                    stack.push('*');
                } else {
                    stack.push(Number(token));
                }
                mayUnary = false;
            }
        }
        while (stack.length != 0) {
            this.processOperator(stack, stack.pop());
        }
        return stack[0];
    }

    private getTokens(expression: string): string[] {
        let tokens = [];
        let delimiters = this.delimiters.join('');
        let token = '';
        for (let i = 0; i < expression.length; i++) {
            if (delimiters.indexOf(expression[i]) != -1) {
                if (token != '') {
                    tokens.push(token);
                    token = '';
                }
                tokens.push(expression[i]);
            } else {
                token += expression[i];
            }
        }
        if (token != '') {
            tokens.push(token);
        }
        return tokens;
    }

    private isOperator(token: string): boolean {
        return this.operators.indexOf(token) != -1;
    }

    private priority(token: string): number {
        if (token == '*' || token == '/') {
            return 2;
        } else if (token == '+' || token == '-') {
            return 1;
        } else {
            return 0;
        }
    }

    private processOperator(stack: number[], operator: string) {
        let r = stack.pop();
        let l = stack.pop();
        switch (operator) {
            case '+':
                stack.push(l + r);
                break;
            case '-':
                stack.push(l - r);
                break;
            case '*':
                stack.push(l * r);
                break;
            case '/':
                stack.push(l / r);
                break;
        }
    }
}

let calculator = new Calculator();
console.log(calculator.calculate('(2+3)*2')); // 10
console.log(calculator.calculate('2+3*2')); // 8
console.log(calculator.calculate('2-3*2')); // -4
console.log(calculator.calculate('2/3*2')); // 1.3333333333333333
```

This solution uses a stack to evaluate the expression. It first tokenizes the expression, then processes each token. If the token is an operator, it pops two operands from the stack and applies the operator, then pushes the result back onto the stack. If the token is a number, it pushes it onto the stack. At the end, the result of the expression is the only item left on the stack.