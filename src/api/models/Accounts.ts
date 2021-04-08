import { Document, Model, model, Schema } from 'mongoose';
import { constants } from '../lib/constants';

interface IAccounts extends Document {
  accountNumber: string
  accountOwner: number
  currentBalance: number // this is in kobo
  active?: boolean
  pin: string
  currency?: string
  updatedAt?: any
}
interface IAccountsModel extends Model<IAccounts> {}

const accountsSchema = new Schema(
  {
    accountNumber: {
      type: String,
      required: true,
      length: 11,
    },
    accountOwner: {
      type: Number,
      required: true,
    },
    currentBalance: {
      type: Number,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    pin: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      default: constants.CURRENCY.NGN
    },
  },
  { timestamps: true }
)

const Accounts = model<IAccounts, IAccountsModel>('Accounts', accountsSchema)

export { Accounts, IAccounts }
