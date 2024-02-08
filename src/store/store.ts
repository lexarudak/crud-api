export type User = {
  id: string,
  username: string,
  age: number,
  hobbies: string[]
}

export type Store = Map<string, User>

export const store:Store = new Map<string, User>()

store.set("TEST_ID", {
      id: "TEST_ID",
      username: "testUsername",
      age: 40,
      hobbies: [
        "1 hobby",
        "2 hobby"
      ]
    })