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

```javascript
export const selectUser = selectorFamily({
  key: "selectOne",
  get: (id: number) => async () => {
    const user = fetch(`https://jsonplaceholder.typicode.com/users/${id}`).then(
      (res) => res.json()
    );
    return user;
  },
});

// 컴포넌트에서 사용 시

const user = useRecoilValue < IUser > selectUser(id);
```

- Atom을 별도로 선언하여 파라미터를 받아줄 수도 있지만, `selectorFamily`를 활용해 get 메서드 내부에서 직접 파라미터를 받아줄 수 있다.
- 한번 비동기 통신을 한 이후 같은 통신을 할 때 캐싱되어 있는 값을 추적하여 이를 사용하며, 이를 **캐싱**이라고 한다.

```javascript
root.render(
  <RecoilRoot>
    <Suspense>
      <App />
    </Suspense>
  </RecoilRoot>
);
```

- `Suspense`를 통해 비동기 통신 Pending 상태에서 값이 도착하지 않았기에 발생하는 오류를 해결할 수 있다.
