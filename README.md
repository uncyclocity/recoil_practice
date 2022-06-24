# 💾 Recoil 사용하기

> References <br> <a href="https://jforj.tistory.com/154">[React] 함수형 컴포넌트에서 Mobx 사용하기</a> _.J4J_

## 📃 주요 개념

```javascript
export const textState = atom({
  key: "textState", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});
```

- **Atoms**
  - **상태의 단위**이다.
  - atom이 업데이트 되면 해당 atom을 참조하는 컴포넌트들은 리렌더링이 된다.
  - 여러 컴포넌트에서 사용할 경우 상태가 공유된다.

```javascript
const charCountState = selector({
  key: "charCountState", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const text = get(textState);

    return text.length;
  },
  set: ({ set }, newValue) => set(textState, newValue),
});
```

- **Selectors**
  - 상태를 기반으로 한 **파생 데이터**를 계산하는데 사용된다.
  - 임의로 지정한 `get` 함수를 통해 atom이나 다른 Selector를 적절히 연산한 데이터를 도출한다.
  - `set` 함수는 새로운 값을 받아 특정 상태의 값을 변경한다.

## 💻 사용하기

- 위의 <<주요 개념>>에서 예시로 든 Atom과 Selector을 사용하여 앱을 만들어 보자.
- 루트 컴포넌트에 `RecoilRoot`를 넣는다. `RecoilRoot`의 자식 컴포넌트에서 Recoil을 사용할 수 있다.

```javascript
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RecoilRoot } from "recoil";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
    <RecoilRoot>
        <App />
    </RecoilRoot>
);
```

```javascript
import { textState } from "./atom"
import { charCountState } from "./atom"

function App() {
    const [text, setText] = useRecoilState(textState)

    const count = useRecoilValue(charCountState)

    const onChange = (e) => {
        setText(e.target.value)
    }

    /*
    selector의 setter 사용하여 입력 값 변경
    const setNewText = useSetRecoilState(charCountState)

    const onChange = (e) => {
        setNewText(e.target.value)
    }
    */

    return (
        <div>
            <input type="text" value={text} onChange={onChange}>
            <br />
            <p>Character Count : {count}</p>
        </div>
    )
}
```

## ⏱ 비동기 통신 selectors

준비중입니다...
