import { Document, Model, model, Schema } from 'mongoose';

interface ICustomer extends Document {
  username: string
  password: string
  transactionPin: string
  active?: boolean
  customerId: string
  phoneNumber: string
  firstName: string
  lastName: string
  fullName: string
  updatedAt?: any
}
interface ICustomerModel extends Model<ICustomer> {}

const customerSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    transactionPin: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    customerId: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

customerSchema.index({ customerId: 1 })
customerSchema.index({ username: 1 })
customerSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform(_doc, ret) {
    delete ret._id;
    delete ret.password;
    delete ret.transactionPin;
  }
});

const Customers = model<ICustomer, ICustomerModel>('Customers', customerSchema)

export { Customers, ICustomer }
