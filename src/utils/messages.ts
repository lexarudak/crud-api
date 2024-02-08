export const getMessage = (...args: string[]) => ({
  listenPort: `Server listen port ${args[0]}`,
})

export const errors = {
  notFound: 'Not found',
  noResource: 'The requested resource does not exist',
  noId: 'No ID in your request',
  idNotExist: 'User with this ID does not exist',
  wrongBody: "Body does not contain required fields (age, ",
  wrongBodyType: "Body has wrong field types",
  putServerError: "Server error. PUT operation was not complete",
  deleteServerError: "Server error. DELETE operation was not complete",
  removeId: "Your request contain ID or '/'. Remove it for correct operation"
}