import { ServerResponse } from 'http';

const errorHandler =  (res: ServerResponse, code: number, message: string) => {
    res.statusCode = code
    res.end(message) 
  }


export default errorHandler