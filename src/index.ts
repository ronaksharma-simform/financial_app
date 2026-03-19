import users from "./users.js";
import type { User } from "./types/user.types.js";
import executeTransaction from "./executeTransaction.js";
import type { Transaction } from "./types/transaction.types.js";
const userShowCaseContainer = document.getElementById(
	"userShowcaseSection",
) as HTMLDivElement;
const senderSelectInput = document.getElementById(
	"sender",
) as HTMLSelectElement;
const receiverSelectInput = document.getElementById(
	"receiver",
) as HTMLSelectElement;
const amountInput = document.getElementById("amount") as HTMLInputElement;
const sendAmountButton = document.getElementById(
	"sendAmount",
) as HTMLButtonElement;
const transactionHistoryContainer = document.getElementById(
	"transactionHistory",
) as HTMLTableElement;
const transactions: Transaction[] = [];
function renderUserDetails(): void {
	userShowCaseContainer.innerHTML = "";
	users.forEach((user: User) => {
		const userCard = document.createElement("div");
		userCard.innerHTML += `<strong>Name : </strong> ${user.name}<br>`;
		userCard.innerHTML += `<strong>Age : </strong> ${user.age}<br>`;
		userCard.innerHTML += `<strong>Account Number : </strong> ${user.accountNumber}<br>`;
		userCard.innerHTML += `<strong>Balance : </strong> ${user.balance}<br>`;
		userShowCaseContainer?.appendChild(userCard);
	});
}
renderUserDetails();

users.forEach((user: User) => {
	const senderNameOption = document.createElement("option");
	senderNameOption.value = user.name;
	senderNameOption.innerHTML = user.name;
	senderSelectInput?.appendChild(senderNameOption);
	const receiverNameOption = document.createElement("option");
	receiverNameOption.value = user.name;
	receiverNameOption.innerHTML = user.name;
	receiverSelectInput?.appendChild(receiverNameOption);
});
sendAmountButton?.addEventListener("click", (event) => {
	console.log(amountInput.value);
	// accessing the sender and receiver details;
	const senderIndex = users.findIndex(
		(user: User) => senderSelectInput.value === user.name,
	);

	const receiverIndex = users.findIndex(
		(user: User) => receiverSelectInput.value === user.name,
	);
	if (senderIndex === receiverIndex) return;
	if (amountInput.value !== "") {
		const record = executeTransaction(
			users[senderIndex]!,
			users[receiverIndex]!,
			Number.parseInt(amountInput.value),
		);
		transactions.unshift(record)
		renderUserDetails();
		renderTransactionTable();
		console.log(record);
	}
});
function addTransactionHistoryRow(transaction: Transaction) {
	const newTransaction = document.createElement("tr");
	newTransaction.innerHTML += `<td>${transaction.sender.name}</td>`;
	newTransaction.innerHTML += `<td>${transaction.receiver.name}</td>`;
	newTransaction.innerHTML += `<td>${transaction.amount}</td>`;
	newTransaction.innerHTML += `<td>${extractTime(transaction.time)}</td>`;
	newTransaction.innerHTML += `<td>${extractDate(transaction.time)}</td>`;
	newTransaction.innerHTML += `<td>${transaction.status}</td>`;
	transactionHistoryContainer.appendChild(newTransaction);
}
function renderTransactionTable(){
	createTransactionContainerHeading();
	transactions.forEach((transaction:Transaction)=>{
		addTransactionHistoryRow(transaction)
	})
}
function extractDate(date: Date): string {
	const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
	return formattedDate;
}
function extractTime(date: Date): string {
	const formattedDate = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
	return formattedDate;
}
function createTransactionContainerHeading() {
	transactionHistoryContainer.innerHTML=""
	const tableHeading = document.createElement("tr");
	tableHeading.innerHTML += `<th>Sender</th>`;
	tableHeading.innerHTML += `<th>Receiver</th>`;
	tableHeading.innerHTML += `<th>Amount</th>`;
	tableHeading.innerHTML += `<th>Time</th>`;
	tableHeading.innerHTML += `<th>Date</th>`;
	tableHeading.innerHTML += `<th>Status</th>`;
	transactionHistoryContainer.appendChild(tableHeading)
}
