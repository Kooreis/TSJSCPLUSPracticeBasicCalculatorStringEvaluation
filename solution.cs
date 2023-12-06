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