export const messages = {
  listenPort: "Server listen port"
}

export const getMessage = (...args: string[]) => ({
  listenPort: `Server listen port ${args[0]}`
})

export const errors = {
  notFound: 'Not found',
  noResource: 'The requested resource does not exist',
  noId: 'No ID in your request',
  idNotExist: 'User with this ID does not exist',
  wrongBody: "Body does not contain required fields",
  wrongBodyType: "Body has wrong field types"
}