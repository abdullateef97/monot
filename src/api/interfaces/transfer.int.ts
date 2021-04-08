import { ITransfers } from "../models";

interface MoveFundsInput {
  amount: number // this is in naira
  currency?: string
  sourceAccountNumber: string
  destAccountNumber: string
  narration?: string
  sourcePin?: string
  customerId: string
}

interface MoveFundsOutput {
  debit: ITransfers
  credit: ITransfers
}

export {
  MoveFundsInput,
  MoveFundsOutput
}