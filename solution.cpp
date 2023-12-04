```cpp
#include <iostream>
#include <string>
#include <stack>

using namespace std;

int calculate(string s) {
    int n = s.size();
    stack<int> st;
    char sign = '+';
    int num = 0;
    for (int i = 0; i < n; ++i) {
        if (isdigit(s[i])) {
            num = num * 10 + (s[i] - '0');
        }
        if ((!isdigit(s[i]) && s[i] != ' ') || i == n - 1) {
            if (sign == '+') {
                st.push(num);
            } else if (sign == '-') {
                st.push(-num);
            } else {
                int tmp = (sign == '*') ? st.top() * num : st.top() / num;
                st.pop();
                st.push(tmp);
            }
            sign = s[i];
            num = 0;
        }
    }
    int res = 0;
    while (!st.empty()) {
        res += st.top();
        st.pop();
    }
    return res;
}

int main() {
    string s;
    cout << "Enter the expression: ";
    getline(cin, s);
    cout << "Result: " << calculate(s) << endl;
    return 0;
}
```