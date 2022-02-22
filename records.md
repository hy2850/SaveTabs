### 8Feb22

- export default + variable definition 안됨

```TS
export default const tabs: chrome.tabs.Tab[] = [...] // 안됨
```
https://stackoverflow.com/questions/36261225/why-is-export-default-const-invalid

- JSON 데이터를 그대로 HTML에 표시 → JSON.stringify 활용

Q. client/server 코드를 초기에 분리해야 할까? ESLint + Prettier setting을 root에 두고, 필요한 package는 FE/BE에 따라 달라지니까

<br>

### 12Feb22

막상 구조 설계하고 코드 짜고 타입 관리하려니까 막막한데, 아직 경험이 많이 부족해서 그런거임. 정상이다!

어렵다고 느껴져도 포기하지 말고 계속 부딪히자. 경험을 쌓자!

아직 공부할 시간 많다! 어려움과 당황에 스스로를 계속 노출시켜서 공부해나가자.



styled component : CSS 번거롭게 수정할 필요 없이, tsx 파일에서 바로 styling 가능 (간단하게 할때 편리)



내가 만든 custom type 관리하는 방법

https://www.notion.so/Typescript-e62add4cdf4e4834b3623b94d8be0869#47ca9ee89f1b48a792ec5a50e07dbb6a

작은 플젝이니까 global 방식으로 관리하자 (src/common/types.ts)



FE개발 플젝에서 썼던 React component typing 정리

Props typing

```typescript
interface ChatProps {
  hasHeader: boolean;
  classUuid: string;
  lectureId: number;
  customHeader?: string;
}

const Chat = ({
  hasHeader,
  classUuid,
  lectureId,
  customHeader = ''
}: ChatProps) => {...};
```



React.PropsWithChildren\<Type>

```typescript
interface ButtonProps {
  onClick: (arg?: any | void) => void;
}

const FlagButton = ({
  children,
  onClick
}: React.PropsWithChildren<ButtonProps>) => (...);
```



React.FC (🤔 deprecated?)

```typescript
interface FlagProps {
  color: string;
}

const FlagSVG: React.FC<FlagProps> = ({ color }) => {...};
```



React.ReactElement

🤔 (Arrow) Functional component typing?

```typescript
const App = (): React.ReactElement<any, any> => {...};
const QuizTestPage = (): React.ReactElement<any, any> => {...};                                                 
```



useState typing

```typescript
// 1. 알아서 type inference
const [value, setValue] = React.useState('1');

export enum ClassAddModalState {
  INIT,
  JOIN,
  CREATE
}
const [modalState, setModalState] = React.useState(ClassAddModalState.INIT);

// 2. 직접 지정
const [slider, setSlider] = React.useState<Slider | null>(null);
```





spreading - esLint rule disable

영상에 나온 innerRef 대신 ref

droppableId, draggableId, index 처럼 id, index 중요

<br>

### 13Feb22

react-beautiful-dnd Doc 보면서 공부

Droppable, Draggable → HTMLElement (custom React component가 아닌, <u>div나 span 같은 basic HTML element</u>)의 **ref** 필요 (아마 DOM node 자유자재로 옮기고 바꾸기 위해서 필요한 듯)
[참고할 doc 부분](https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/guides/using-inner-ref.md#a-common-error-)



Q. list of 'Draggable' -> key needed?
https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/draggable.md#keys-for-a-list-of-draggable-



onDragEnd 함수 result 인자 - 영상 참고 https://egghead.io/lessons/react-persist-list-reordering-with-react-beautiful-dnd-using-the-ondragend-callback



re-ordering - 데이터 구조가 좀 특이한데? taskId?

[예시](https://codesandbox.io/s/mmrp44okvj?file=/index.js:380-387) 보니까, Array에 담긴 element 순서만 바꿔주면 되는 것 같은데.

<br>

### 14Feb22

- re-order persisting 구현



* 🔥 Chrome console에 뜨는 console.log shows only the updated values (lazy eval) 문제

  → console 로딩 전에 출력할 것들 미리 계산해서 queue에 쌓아놓고 나중에 한꺼번에 처리; lazy eval 때문에 발생하는 문제

  `console.log(JSON.parse(JSON.stringify(obj or array)));` 

  https://stackoverflow.com/questions/17320181/console-log-showing-only-the-updated-version-of-the-object-printed
  https://stackoverflow.com/questions/4057440/is-chrome-s-javascript-console-lazy-about-evaluating-objects



* ⭐️ Array.prototype.find 는 결과값으로 copied value가 아닌 reference 넘겨준다! 

```js
const categories = [
    {
      id: '1',
      name: 'Crypto',
      tabs: [1,2,3],
    },
    {
      id: '2',
      name: 'Javascript study',
      tabs: [4, 5, 6],
    },
];
  
const col = categories.find(({ id }) => {
    return id === '1';
});

console.log(col); // [1, 2, 3]
col.tabs[0] = 100;
console.log(col); // [100, 2, 3]
console.log(categories) // 바뀌어있음!
```

굿 참고) https://stackoverflow.com/questions/24304383/javascript-return-reference-to-array-item



* 설치한 type (@types 모듈)에서 Type import 하는 방법?

   https://stackoverflow.com/questions/39818429/how-do-you-import-type-definitions-from-types-typescript-2-0

<br>

### 21Feb22 월

Re-ordering 설계에 따른 DB model 고민 (갤럭시탭 삼성노트)
→ Array 지원되는 mongoDB 써보자. N:M 간단하니까 reference 기능으로 충분할 듯