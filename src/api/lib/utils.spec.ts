import { bcryptCompareCredential, bcryptHashCredential, decodeToken, encodeToken, generateAccountNumber, sanitizePhoneNumberToIntlFormat, trimPhoneNumber } from './utils';

describe('Encrypt and Decrypt Password', () => {
  it('should encrypt password', async () => {
    const password = 'password';
    const hashed = await bcryptHashCredential(password);
    expect(hashed).not.toEqual(password);
  });

  it('should encrypt pin', async () => {
    const pin = 'pin';
    const hashed = await bcryptHashCredential(pin);
    expect(hashed).not.toEqual(pin);
  });

  it('should not return an empty string', async () => {
    const pin = 'pin';
    const hashed = await bcryptHashCredential(pin);
    expect(hashed).not.toEqual('');
  });

  it('should return true if password is correct', async () => {
    const password = 'password';
    const hashed = await bcryptHashCredential(password);
    const isPasswordCorrect = await bcryptCompareCredential(hashed, password)
    expect(isPasswordCorrect).toBe(true)
  });

  it('should return false if password is incorrect', async () => {
    const password = 'password';
    const hashed = await bcryptHashCredential(password);
    const incorrectPassword = 'password1'
    const isPasswordCorrect = await bcryptCompareCredential(hashed, incorrectPassword)
    expect(isPasswordCorrect).toBe(false)
  });
})

describe('trim phone number', () => {
  it('should trim phone number if no trim is provided', () => {
    const phoneNumber = '08132400456';
    const expected = '8132400456';

    const response = trimPhoneNumber(phoneNumber)
    expect(response).toEqual(expected)
  })

  it('should trim phone number if phone number starts with +234', () => {
    const phoneNumber = '+2348132400456';
    const expected = '8132400456';

    const response = trimPhoneNumber(phoneNumber, '+234')
    expect(response).toEqual(expected)
  })

  it('should trim phone number if phone number starts with 234', () => {
    const phoneNumber = '2348132400456';
    const expected = '8132400456';

    const response = trimPhoneNumber(phoneNumber, '234')
    expect(response).toEqual(expected)
  })
})

describe('sanitize phone number', () => {
  it('should return the sanitized phone number when it starts with 0', () => {
    const phoneNumber = '08132400456';
    const expected = '+2348132400456';

    const response = sanitizePhoneNumberToIntlFormat(phoneNumber)
    expect(response).toEqual(expected)
  })

  it('should return the sanitized phone number when it starts with 234', () => {
    const phoneNumber = '2348132400456';
    const expected = '+2348132400456';

    const response = sanitizePhoneNumberToIntlFormat(phoneNumber)
    expect(response).toEqual(expected)
  })

  it('should return the sanitized phone number when it starts with +234', () => {
    const phoneNumber = '+2348132400456';
    const expected = '+2348132400456';

    const response = sanitizePhoneNumberToIntlFormat(phoneNumber)
    expect(response).toEqual(expected)
  })
})

describe('encode and decode token', () => {
  it('should return an encoded token', () => {
    const encoded = encodeToken('8123456789');
    expect(encoded.token.length).toBeGreaterThan(0)
  })

  it('should return a decoded token', () => {
    const customerId = '8123456789';
    const encoded = encodeToken(customerId);

    const decoded = decodeToken(encoded.token);
    expect(decoded.session?.customerId).toEqual(customerId)

  })
})

describe('generateAccountNumber', () => {
  it('should return an string of 11 length', () => {
    const accountNumber = generateAccountNumber('+2348132400456');
    expect(accountNumber.length).toEqual(11);
  })
})