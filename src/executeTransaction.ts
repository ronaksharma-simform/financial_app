import TransactionStatus from "./types/constants";
import type { Transaction } from "./types/transaction.types";
import type { User } from "./types/user.types";

export default function executeTransaction(
	sender: User,
	reciever: User,
	amount: number,
): Transaction {
	try {
		// validating amount
		if (amount <= 0) {
			throw new Error("Invalid amount");
		}
		// validating the sender have enough balance
		if (sender.balance < amount) {
			throw new Error("Insufficent Balance to make transaction");
		}
		sender.balance -= amount;
		reciever.balance += amount;
		return {
			sender: sender,
			receiver: reciever,
			amount: amount,
            time:new Date(),
			status: TransactionStatus.Completed,
		};
	} catch (error) {
		console.log(error);
		return {
			sender: sender,
			receiver: reciever,
			amount: amount,
            time:new Date(),
			status: TransactionStatus.Failed,
		};
	}
}
