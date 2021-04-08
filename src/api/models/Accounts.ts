import { Document, Model, model, Schema } from 'mongoose';
import { constants } from '../lib/constants';

interface IAccounts extends Document {
  accountNumber: string
  accountOwner: string
  currentBalance: number // this is in kobo
  active?: boolean
  currency?: string
  updatedAt?: any
  phoneNumber: string
}
interface IAccountsModel extends Model<IAccounts> {}

const accountsSchema = new Schema(
  {
    accountNumber: {
      type: String,
      required: true,
      length: 11,
      unique: true,
    },
    accountOwner: {
      type: String,
      required: true,
    },
    currentBalance: { // in kobo
      type: Number,
      default: 0.00
    },
    active: {
      type: Boolean,
      default: true,
    },
    currency: {
      type: String,
      default: constants.CURRENCY.NGN
    },
    phoneNumber: {
      type: String
    }
  },
  { timestamps: true }
)

accountsSchema.index({ accountNumber: 1 })
accountsSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform(_doc, ret) {
    delete ret._id;
  }
});

const Accounts = model<IAccounts, IAccountsModel>('Accounts', accountsSchema)

export { Accounts, IAccounts }
