import { ServerResponse } from 'http';
import { errors } from '../utils/messages';

const errorHandler =  (res: ServerResponse, code: number, message: string) => {
    res.statusCode = code
    res.end(message) 
  }


export default errorHandler