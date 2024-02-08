import { ServerResponse } from 'http';
import errorHandler from '../errorHandler';
import { errors } from '../../utils/messages';
import { Store } from '../../store/store';
import { v4 } from "uuid"


export const post = (body: any, res: ServerResponse, store: Store) => {
  try {
    const { username, age, hobbies } = body
    
    const user = {
      id: v4(),
      username,
      age,
      hobbies
    }

    if (isUserCorrect(user)) {
      store.set(user.id, user)
      res.statusCode = 201
      res.end(JSON.stringify(user))
    } else {
      errorHandler(res, 400, errors.wrongBodyType)
    }
    
  } catch {
    errorHandler(res, 400, errors.wrongBody)
  }

}

function isUserCorrect (user: any) {
  try {
     return ([typeof user.username === "string", typeof user.age === "number", user.hobbies.every((item: any) => typeof item === 'string')].every(check => check === true))
  } catch {
    return false
  }
}