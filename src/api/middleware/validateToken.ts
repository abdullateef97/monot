import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { failure } from '../lib/response';
import { decodeToken } from '../lib/utils';
import { getCustomerDetails } from '../services/customer.svc';

declare module 'http' {
  interface IncomingHttpHeaders {
      "customerId"?: string
  }
}

export const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header('x-mono-token');
  if (!token) {
    return failure({ res, message: 'Please Provide a token', httpCode: httpStatus.UNAUTHORIZED});
  }
  const decoded = decodeToken(token);
  if (decoded.type !== 'valid' || !decoded.session) {
    return failure( { res, message: decoded.type, httpCode: httpStatus.UNAUTHORIZED});
  }
  console.log({decoded})

  const session = decoded.session;
  if (!session.customerId) {
    return failure( { res, message: 'token_Error', httpCode: httpStatus.UNAUTHORIZED});
  }
  const customer = await getCustomerDetails({
    customerId: session.customerId
  });
  if (!customer || !customer.active) {
    return failure( { res, message: 'customer is inactive', httpCode: httpStatus.UNAUTHORIZED});
  }
  req.headers.customerId = session.customerId
  return next();
}