interface CreateAccountInput {
  accountOwner: string
  initialDeposit?: number // this is in kobo
  phoneNumber?: string
}

interface CreateAccountOutput {
  accountNumber: string
  accountOwner: string
  currentBalance: number // this is in kobo
  active?: boolean
  currency?: string
  updatedAt?: any
  phoneNumber: string
}


interface accounts {
  accountNumber: string
  accountOwner: string
  phoneNumber: string
  currentBalance?: number
}

export {
  CreateAccountInput,
  accounts,
  CreateAccountOutput
}