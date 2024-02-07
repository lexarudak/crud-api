import { ServerResponse } from 'http';
import errorHandler from '../errorHandler';
import { errors } from '../../utils/messages';
import { store } from '../../store/store';
import { v4 } from "uuid"


export const post = (body: any, res: ServerResponse) => {
  try {
    const { username, age, hobbies } = body
    
    const user = {
      id: v4(),
      username,
      age,
      hobbies
    }
    const isUserCorrect = checkUser(user)

    if (isUserCorrect) {
      store.users.push(user)
      res.statusCode = 201
      res.end(JSON.stringify(user))
    } else {
      errorHandler(res, 400, errors.wrongBodyType)
    }
    
  } catch {
    errorHandler(res, 400, errors.wrongBody)
  }

}

function checkUser (user: any) {
  return ([typeof user.username === "string", typeof user.age === "number", user.hobbies.every((item: any) => typeof item === 'string')].every(check => check === true))
}