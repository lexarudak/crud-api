import { ServerResponse } from 'http';
import errorHandler from '../errorHandler';
import { errors } from '../../utils/messages';
import { store } from '../../store/store';


export const put = (id: string, body: any, res: ServerResponse) => {
   try {
    const { username, age, hobbies } = body
    const user = store.get(id)
    if (!user) {
      errorHandler(res, 404, errors.idNotExist)
      return
    }

    if (isBodyCorrect(body)) {
      const newUser = {
        id,
        username: username || user.username,
        age: age || user.age,
        hobbies: hobbies || user.hobbies
      }
      store.set(id, newUser)
      res.statusCode = 200
      res.end(JSON.stringify(newUser))
      return

    } else {
      errorHandler(res, 400, errors.wrongBodyType)
      return
    }
   } catch {
      errorHandler(res, 500, errors.putServerError)
   }
}

const isBodyCorrect = (body: any) => {
  try {
    const isUsernameCorrect  = typeof body.username === 'string' || typeof body.username === 'undefined'
    const isAgeCorrect  = typeof body.age === 'number' || typeof body.age === 'undefined'
    const isHobbiesCorrect = typeof body.hobbies === 'undefined' || body.hobbies.every((item: any) => typeof item === 'string')
    return [isUsernameCorrect, isAgeCorrect, isHobbiesCorrect].every(check => check === true)
  } catch {
    false
  }
}