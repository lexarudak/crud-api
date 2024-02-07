
import { ServerResponse, IncomingMessage } from 'http';
import { getUsers, getUser } from './methods/get'
import { post } from './methods/post'
import { getBody } from '../utils/helpers';

type RequestHandler = {
  [key: string]: (res: ServerResponse, uuid: string, req: IncomingMessage) => void
}

const requestHandler: RequestHandler = {
  GET: (res, uuid) => {
    uuid ? getUser(res, uuid) : getUsers(res)
  },
  POST: async (res, _, req) => {
    const body = await getBody(req)
    post(body, res)
  }
}

export default requestHandler