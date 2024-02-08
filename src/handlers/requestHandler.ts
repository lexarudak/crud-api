
import { ServerResponse, IncomingMessage } from 'http';
import { getUsers, getUser } from './methods/get'
import { post } from './methods/post'
import { put } from './methods/put'
import { deleteUser } from './methods/delete'
import { getBody } from '../utils/helpers';
import errorHandler from './errorHandler';
import { errors } from '../utils/messages';
import { Store } from '../store/store';

type RequestHandler = {
  [key: string]: (res: ServerResponse, uuid: string, req: IncomingMessage, store: Store) => void
}

const requestHandler: RequestHandler = {
  GET: (res, uuid, _, store) => {
    if (uuid === "") {
      errorHandler(res, 400, errors.noId)
      return
    }
    uuid ? getUser(res, uuid, store) : getUsers(res, store)
  },
  POST: async (res, uuid, req, store) => {
    if (uuid ||uuid === "" ) {
      errorHandler(res, 400, errors.removeId)
      return
    }
    const body = await getBody(req)
    post(body, res, store)
  },
  PUT: async (res, uuid, req, store) => {
    if (!uuid) {
      errorHandler(res, 400, errors.noId)
      return
    }
    const body = await getBody(req)
    put(uuid, body, res, store)
  },
  DELETE: async (res, uuid, _, store) => {
    if (!uuid) {
      errorHandler(res, 400, errors.noId)
      return
    }
    deleteUser(uuid, res, store)
  }

}

export default requestHandler