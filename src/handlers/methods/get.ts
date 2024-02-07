import { ServerResponse } from 'http';
import { store } from '../../store/store';
import errorHandler from '../errorHandler';
import { errors } from '../../utils/messages';

export const getUsers = (res: ServerResponse) => {
  res.statusCode = 200
  res.end(JSON.stringify(store.users))
}

export const getUser = (res: ServerResponse, uuid: string) => {
  const user = store.users.find(({id}) => id === uuid)
  if (!user) {
    errorHandler(res, 404, errors.idNotExist)
    return
  }
  res.statusCode = 200
  res.end(JSON.stringify(user))
}