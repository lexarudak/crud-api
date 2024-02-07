type User = {
  id: string,
  username: string,
  age: string,
  hobbies: string[]
}

type Store = {
  users: User[]
}

export const store: Store = {
  users: [
    {
      id: "TEST_ID",
      username: "testUsername",
      age: 'testAge',
      hobbies: [
        "1 hobby",
        "2 hobby"
      ]
    }
  ]
}