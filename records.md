### 8Feb22

- export default + variable definition 안됨

```TS
export default const tabs: chrome.tabs.Tab[] = [...] // 안됨
```
https://stackoverflow.com/questions/36261225/why-is-export-default-const-invalid

- JSON 데이터를 그대로 HTML에 표시 → JSON.stringify 활용
