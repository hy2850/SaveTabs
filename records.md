### 8Feb22

- export default + variable definition 안됨

```TS
export default const tabs: chrome.tabs.Tab[] = [...] // 안됨
```
https://stackoverflow.com/questions/36261225/why-is-export-default-const-invalid

- JSON 데이터를 그대로 HTML에 표시 → JSON.stringify 활용

Q. client/server 코드를 초기에 분리해야 할까? ESLint + Prettier setting을 root에 두고, 필요한 package는 FE/BE에 따라 달라지니까