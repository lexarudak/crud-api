
import { ServerResponse, IncomingMessage } from 'http';
import { getUsers, getUser } from './methods/get'
import { post } from './methods/post'
import { put } from './methods/put'
import { deleteUser } from './methods/delete'
import { getBody } from '../utils/helpers';
import errorHandler from './errorHandler';
import { errors } from '../utils/messages';

type RequestHandler = {
  [key: string]: (res: ServerResponse, uuid: string, req: IncomingMessage) => void
}

const requestHandler: RequestHandler = {
  GET: (res, uuid) => {
    if (uuid === "") {
      errorHandler(res, 400, errors.noId)
      return
    }
    uuid ? getUser(res, uuid) : getUsers(res)
  },
  POST: async (res, uuid, req) => {
    if (uuid ||uuid === "" ) {
      errorHandler(res, 400, errors.removeId)
      return
    }
    const body = await getBody(req)
    post(body, res)
  },
  PUT: async (res, uuid, req) => {
    if (!uuid) {
      errorHandler(res, 400, errors.noId)
      return
    }
    const body = await getBody(req)
    put(uuid, body, res)
  },
  DELETE: async (res, uuid) => {
    if (!uuid) {
      errorHandler(res, 400, errors.noId)
      return
    }
    deleteUser(uuid, res)
  }

}

export default requestHandler