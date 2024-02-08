import { IncomingMessage } from 'http';

const BASE_PATH = 'api/users'

export const splitUrl = (url = '') => {
  const [, api, users, uuid, other] = url.split("/")
  return {
    uuid,
    isUrlValid: [api, users].join('/') === BASE_PATH && !other
    }
}

export const getBody = (req: IncomingMessage) => new Promise((res) => {
  let str = '';

  req.on('data', chunk => {
    str += chunk.toString();
  });

  req.on('end', () => {
    try {
      const body = JSON.parse(str)
      res(body);
    } catch {
      res(null)
    }
  });
})