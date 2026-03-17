import TransactionStatus from "./constants";
import type { User } from "./user.types"

interface Transaction{
    sender: User,
    receiver:User,
    amount:Number,
    time:Date,
    status:TransactionStatus
}
export type {Transaction};