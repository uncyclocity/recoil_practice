# ๐พ Recoil ์ฌ์ฉํ๊ธฐ

> References <br> <a href="https://recoiljs.org/ko/docs/introduction/getting-started">Recoil ์์ํ๊ธฐ</a> _.meta inc._ <br> <a href="https://tech.osci.kr/2022/06/16/recoil-state-management-of-react/?fbclid=IwAR3QRp7UwcmeWpPp0pAIyI4exbwK4gvqCKF2LXCSSupnKwEV-vI2j7xPbVw">Recoil, ๋ฆฌ์กํธ์ ์ํ๊ด๋ฆฌ ๋ผ์ด๋ธ๋ฌ๋ฆฌ</a> _._

## ๐ ์ฃผ์ ๊ฐ๋

```javascript
export const textState = atom({
  key: "textState", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});
```

- **Atoms**
  - **์ํ์ ๋จ์**์ด๋ค.
  - atom์ด ์๋ฐ์ดํธ ๋๋ฉด ํด๋น atom์ ์ฐธ์กฐํ๋ ์ปดํฌ๋ํธ๋ค์ ๋ฆฌ๋ ๋๋ง์ด ๋๋ค.
  - ์ฌ๋ฌ ์ปดํฌ๋ํธ์์ ์ฌ์ฉํ  ๊ฒฝ์ฐ ์ํ๊ฐ ๊ณต์ ๋๋ค.

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
  - ์ํ๋ฅผ ๊ธฐ๋ฐ์ผ๋ก ํ **ํ์ ๋ฐ์ดํฐ**๋ฅผ ๊ณ์ฐํ๋๋ฐ ์ฌ์ฉ๋๋ค.
  - ์์๋ก ์ง์ ํ `get` ํจ์๋ฅผ ํตํด atom์ด๋ ๋ค๋ฅธ Selector๋ฅผ ์ ์ ํ ์ฐ์ฐํ ๋ฐ์ดํฐ๋ฅผ ๋์ถํ๋ค.
  - `set` ํจ์๋ ์๋ก์ด ๊ฐ์ ๋ฐ์ ํน์  ์ํ์ ๊ฐ์ ๋ณ๊ฒฝํ๋ค.

## ๐ป ์ฌ์ฉํ๊ธฐ

- ์์ <<์ฃผ์ ๊ฐ๋>>์์ ์์๋ก ๋  Atom๊ณผ Selector์ ์ฌ์ฉํ์ฌ ์ฑ์ ๋ง๋ค์ด ๋ณด์.
- ๋ฃจํธ ์ปดํฌ๋ํธ์ `RecoilRoot`๋ฅผ ๋ฃ๋๋ค. `RecoilRoot`์ ์์ ์ปดํฌ๋ํธ์์ Recoil์ ์ฌ์ฉํ  ์ ์๋ค.

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
    selector์ setter ์ฌ์ฉํ์ฌ ์๋ ฅ ๊ฐ ๋ณ๊ฒฝ
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

## โฑ ๋น๋๊ธฐ ํต์  selectors

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

// ์ปดํฌ๋ํธ์์ ์ฌ์ฉ ์

const user = useRecoilValue < IUser > selectUser(id);
```

- Atom์ ๋ณ๋๋ก ์ ์ธํ์ฌ ํ๋ผ๋ฏธํฐ๋ฅผ ๋ฐ์์ค ์๋ ์์ง๋ง, `selectorFamily`๋ฅผ ํ์ฉํด get ๋ฉ์๋ ๋ด๋ถ์์ ์ง์  ํ๋ผ๋ฏธํฐ๋ฅผ ๋ฐ์์ค ์ ์๋ค.
- ํ๋ฒ ๋น๋๊ธฐ ํต์ ์ ํ ์ดํ ๊ฐ์ ํต์ ์ ํ  ๋ ์บ์ฑ๋์ด ์๋ ๊ฐ์ ์ถ์ ํ์ฌ ์ด๋ฅผ ์ฌ์ฉํ๋ฉฐ, ์ด๋ฅผ **์บ์ฑ**์ด๋ผ๊ณ  ํ๋ค.

```javascript
root.render(
  <RecoilRoot>
    <Suspense>
      <App />
    </Suspense>
  </RecoilRoot>
);
```

- `Suspense`๋ฅผ ํตํด ๋น๋๊ธฐ ํต์  Pending ์ํ์์ ๊ฐ์ด ๋์ฐฉํ์ง ์์๊ธฐ์ ๋ฐ์ํ๋ ์ค๋ฅ๋ฅผ ํด๊ฒฐํ  ์ ์๋ค.
