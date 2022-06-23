import React, { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  selectStatus,
  selectToDo,
  ToDo,
  toDos,
  selectId,
  getUser,
} from "./atom";

function App() {
  const [status, setStatus] = useRecoilState(selectStatus);
  const selectToDos = useRecoilValue(selectToDo);
  const toDoAtom = useRecoilValue(toDos);
  const [contents, setContents] = useState("");
  const setNewToDos = useSetRecoilState(selectToDo);

  const [id, setId] = useRecoilState(selectId);
  const getUsers = useRecoilValue(getUser);
  const [inputedId, setInputedId] = useState(id);

  const handleStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value as any);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContents(e.target.value as any);
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (contents) {
      const newToDoList: ToDo[] = [
        ...toDoAtom,
        {
          contents,
          status: "DOING",
        },
      ];
      setNewToDos(newToDoList);
      setContents("");
    }
  };

  const handleInputIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputedId(e.target.value as any);
  };

  const handleIdSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputedId) {
      setId(+inputedId);
      setInputedId(0);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input value={contents} onChange={handleInputChange} />
          <button>SubmitDetsu</button>
        </form>
        <select value={status} onChange={handleStatus}>
          <option value="DOING">DOING</option>
          <option value="DONE">DONE</option>
        </select>
        <ul>
          {selectToDos.map((toDo, index) => (
            <li key={index}>
              <span>status: {toDo.status}</span>
              <br />
              <span>content: {toDo.contents}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <>User : {getUsers.name}</>
        <br />
        <form onSubmit={handleIdSubmit}>
          <input value={inputedId} onChange={handleInputIdChange} />
          <button>submitDetsu</button>
        </form>
      </div>
    </>
  );
}

export default App;
