import { Document, Model, model, Schema } from 'mongoose';
import { constants } from '../lib/constants';

interface ITransfers  {
  amount: number // this is in kobo
  direction: number,
  accountNumber: string
  accountOwner: string
  currency?: string
  balanceBefore: number
  balanceAfter: number
  narration?: string
  reference: string
}
interface ITransfersModel extends Model<ITransfers & Document> {}

const transferSchema = new Schema(
  {
    amount: {
      type: Number, // kobo
      required: true,
    },
    direction: {
      type: Number,
      required: true,
      enum: [constants.DIRECTION.CREDIT, constants.DIRECTION.DEBIT]
    },
    accountOwner: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      default: constants.CURRENCY.NGN
    },
    balanceBefore: {
      type: Number,
      required: true,
    },
    balanceAfter: {
      type: Number,
      required: true,
    },
    narration: {
      type: String,
    },
    reference: {
      type: String,
      required: true,
      unique: true
    }
  },
  { timestamps: true }
)

transferSchema.index({ accountNumber: 1 })
transferSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform(_doc, ret) {
    delete ret._id;
  }
});

const Transfers = model<ITransfers & Document, ITransfersModel>('Transfers', transferSchema)

export { Transfers, ITransfers }
