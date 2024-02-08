import { ServerResponse } from 'http';
import errorHandler from '../errorHandler';
import { errors } from '../../utils/messages';
import { store } from '../../store/store';


export const deleteUser = (id: string, res: ServerResponse) => {
   try {
    const user = store.get(id)
    if (!user) {
      errorHandler(res, 404, errors.idNotExist)
      return
    }

    store.delete(id)
    res.statusCode = 204
    res.end()
    return

   } catch {
      errorHandler(res, 500, errors.deleteServerError)
   }
}