import bcrypt from 'bcrypt';
import { encode, TAlgorithm, decode } from "jwt-simple";
import { format } from 'date-fns';
import { Request } from 'express';
import { v4 as uuid } from 'uuid';
import { logger } from '../../config/winston';
import { DecodeResult, EncodeResult, Session } from '../interfaces/jwt';
import { constants } from './constants';


export const bcryptHashCredential = async (cred: string) : Promise<string> => {
  try {
    const hashedCred = await bcrypt.hash(cred, 10);
    return Promise.resolve(hashedCred)
  } catch (error) {
    logger.error('Error Hashing Cred')
    logger.error(error)
    throw new Error('Error Hashing Credentials')
  }
}

export const bcryptCompareCredential = async (hashedCred: string, cred: string) : Promise<boolean> => {
  
  try {
    const isCredValid = await bcrypt.compare(cred, hashedCred)
    return Promise.resolve(isCredValid)
  } catch (error) {
    logger.error('Error Comparing Cred')
    logger.error(error)
    throw new Error('Error Comparing Credentials')
  }
}

export const trimPhoneNumber = (phoneNumber: string, trim = '0') => phoneNumber.substring(phoneNumber.indexOf(trim) + trim.length, phoneNumber.length);


export const sanitizePhoneNumberToIntlFormat = (phoneNumber: string) : string => {
    if (phoneNumber.length === 14 && phoneNumber.startsWith('+234')) return phoneNumber;
    if (phoneNumber.length === 13 && phoneNumber.startsWith('234')) {
      return `+${phoneNumber}`;
    }
    if (phoneNumber.length === 11 && phoneNumber.startsWith('0')) {
      const trim = trimPhoneNumber(phoneNumber);
      return `+234${trim}`;
    }

    if (phoneNumber.length === 10) {
      return `+234${phoneNumber}`;
    }
    return phoneNumber;
}

export const encodeToken = (customerId: string): EncodeResult => {
  const algorithm: TAlgorithm = "HS512";
    // Determine when the token should expire
    const issued = Date.now();
    const fifteenMinutesInMs = 15 * 60 * 1000;
    const expires = issued + fifteenMinutesInMs;
    const session: Session = {
        customerId,
        issued: issued,
        expires: expires,
        dateCreated: issued,
        id: uuid().toString(),
    };

    return {
        token: encode(session, constants.JWT.SECRET, algorithm),
        issued: issued,
        expires: expires
    };
}

export const decodeToken = (token: string) : DecodeResult => {
  // Always use HS512 to decode the token
  const algorithm: TAlgorithm = "HS512";

  let result: Session;

  try {
      result = decode(token, constants.JWT.SECRET, false, algorithm);
  } catch (_e) {
      const e: Error = _e;

      // These error strings can be found here:
      // https://github.com/hokaccha/node-jwt-simple/blob/c58bfe5e5bb049015fcd55be5fc1b2d5c652dbcd/lib/jwt.js
      if (e.message === "No token supplied" || e.message === "Not enough or too many segments") {
          return {
              type: "invalid-token",
              session: null,
          };
      }

      if (e.message === "Signature verification failed" || e.message === "Algorithm not supported") {
          return {
              type: "integrity-error",
              session: null,
          };
      }

      // Handle json parse errors, thrown when the payload is nonsense
      if (e.message.indexOf("Unexpected token") === 0) {
          return {
              type: "invalid-token",
              session: null,
          };
      }

      throw e;
  }

  return {
      type: "valid",
      session: result
  }
}

export const generateAccountNumber = (phoneNumber: string, currency?: string): string => {
  if (!currency || currency.length <= 0) {
    currency = constants.CURRENCY.NGN;
  }
  const last4 = phoneNumber.substring(phoneNumber.length-4, phoneNumber.length)
  const currDate = Date.now().toString();
  const timeSuffix = currDate.substring(currDate.length-4, currDate.length)
  return `${currency}${last4}${timeSuffix}`
}

export const convertToNairaDecimal = (number: number) : number => parseInt((number / 100).toFixed(2), 10);

export const convertToKobos = (number: number) => parseInt((number * 100).toFixed(0), 10);

export const extractCustomerId = (req: Request) => req.headers.customerId