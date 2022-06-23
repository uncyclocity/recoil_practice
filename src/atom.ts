import { atom, selector } from "recoil";

export type Status = "DONE" | "DOING";

export interface ToDo {
  status: Status;
  contents: string;
}

export const selectStatus = atom<Status>({
  key: "nowStatus",
  default: "DOING",
});

export const selectId = atom<number>({
  key: "selectId",
  default: 1,
});

export const toDos = atom<ToDo[]>({
  key: "toDos",
  default: [
    { status: "DOING", contents: "default 1" },
    { status: "DONE", contents: "default 2" },
    { status: "DONE", contents: "default 3" },
    { status: "DOING", contents: "default 4" },
    { status: "DOING", contents: "default 5" },
  ],
});

export const selectToDo = selector<ToDo[]>({
  key: "selectToDos",
  get: ({ get }) => {
    const originalToDos = get(toDos);
    const nowStatus = get(selectStatus);
    return originalToDos.filter((toDo) => toDo.status === nowStatus);
  },
  set: ({ set }, newToDo) => set(toDos, newToDo),
});

export const getUser = selector({
  key: "getUser",
  get: async ({ get }) => {
    const id = get(selectId);
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    return res.json();
  },
});
