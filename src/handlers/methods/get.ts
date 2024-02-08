import { ServerResponse } from 'http';
import errorHandler from '../errorHandler';
import { errors } from '../../utils/messages';
import { Store } from '../../store/store';

export const getUsers = (res: ServerResponse, store: Store) => {
  res.statusCode = 200
  res.end(JSON.stringify(Array.from(store.values())))
}

export const getUser = (res: ServerResponse, uuid: string, store: Store) => {
  const user = store.get(uuid)
  if (!user) {
    errorHandler(res, 404, errors.idNotExist)
    return
  }
  res.statusCode = 200
  res.end(JSON.stringify(user))
}