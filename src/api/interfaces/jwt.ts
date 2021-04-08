

export interface Session {
  id: string;
  dateCreated: number;
  customerId: string;
  /**
   * Timestamp indicating when the session was created, in Unix milliseconds.
   */
  issued: number;
  /**
   * Timestamp indicating when the session should expire, in Unix milliseconds.
   */ 
  expires: number;
}

/**
* Identical to the Session type, but without the `issued` and `expires` properties.
*/
export type PartialSession = Omit<Session, "issued" | "expires">;

export interface EncodeResult {
  token: string,
  expires: number,
  issued: number
}

export interface DecodeResult {
  type: string,
  session: Session | null
}
