import TransactionStatus from "./types/constants.js";
export default function executeTransaction(sender, reciever, amount) {
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
            time: new Date(),
            status: TransactionStatus.Completed,
        };
    }
    catch (error) {
        console.log(error);
        return {
            sender: sender,
            receiver: reciever,
            amount: amount,
            time: new Date(),
            status: TransactionStatus.Failed,
        };
    }
}
//# sourceMappingURL=executeTransaction.js.map