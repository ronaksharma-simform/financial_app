import users from "./users.js";
import executeTransaction from "./executeTransaction.js";
const userShowCaseContainer = document.getElementById("userShowcaseSection");
const senderSelectInput = document.getElementById("sender");
const receiverSelectInput = document.getElementById("receiver");
const amountInput = document.getElementById("amount");
const sendAmountButton = document.getElementById("sendAmount");
const transactionHistoryContainer = document.getElementById("transactionHistory");
const transactions = [];
function renderUserDetails() {
    userShowCaseContainer.innerHTML = "";
    users.forEach((user) => {
        const userCard = document.createElement("div");
        userCard.innerHTML += `<strong>Name : </strong> ${user.name}<br>`;
        userCard.innerHTML += `<strong>Age : </strong> ${user.age}<br>`;
        userCard.innerHTML += `<strong>Account Number : </strong> ${user.accountNumber}<br>`;
        userCard.innerHTML += `<strong>Balance : </strong> ${user.balance}<br>`;
        userShowCaseContainer === null || userShowCaseContainer === void 0 ? void 0 : userShowCaseContainer.appendChild(userCard);
    });
}
renderUserDetails();
users.forEach((user) => {
    const senderNameOption = document.createElement("option");
    senderNameOption.value = user.name;
    senderNameOption.innerHTML = user.name;
    senderSelectInput === null || senderSelectInput === void 0 ? void 0 : senderSelectInput.appendChild(senderNameOption);
    const receiverNameOption = document.createElement("option");
    receiverNameOption.value = user.name;
    receiverNameOption.innerHTML = user.name;
    receiverSelectInput === null || receiverSelectInput === void 0 ? void 0 : receiverSelectInput.appendChild(receiverNameOption);
});
sendAmountButton === null || sendAmountButton === void 0 ? void 0 : sendAmountButton.addEventListener("click", (event) => {
    console.log(amountInput.value);
    // accessing the sender and receiver details;
    const senderIndex = users.findIndex((user) => senderSelectInput.value === user.name);
    const receiverIndex = users.findIndex((user) => receiverSelectInput.value === user.name);
    if (senderIndex === receiverIndex)
        return;
    if (amountInput.value !== "") {
        const record = executeTransaction(users[senderIndex], users[receiverIndex], Number.parseInt(amountInput.value));
        transactions.unshift(record);
        renderUserDetails();
        renderTransactionTable();
        console.log(record);
    }
});
function addTransactionHistoryRow(transaction) {
    const newTransaction = document.createElement("tr");
    newTransaction.innerHTML += `<td>${transaction.sender.name}</td>`;
    newTransaction.innerHTML += `<td>${transaction.receiver.name}</td>`;
    newTransaction.innerHTML += `<td>${transaction.amount}</td>`;
    newTransaction.innerHTML += `<td>${extractTime(transaction.time)}</td>`;
    newTransaction.innerHTML += `<td>${extractDate(transaction.time)}</td>`;
    newTransaction.innerHTML += `<td>${transaction.status}</td>`;
    transactionHistoryContainer.appendChild(newTransaction);
}
function renderTransactionTable() {
    createTransactionContainerHeading();
    transactions.forEach((transaction) => {
        addTransactionHistoryRow(transaction);
    });
}
function extractDate(date) {
    const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    return formattedDate;
}
function extractTime(date) {
    const formattedDate = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    return formattedDate;
}
function createTransactionContainerHeading() {
    transactionHistoryContainer.innerHTML = "";
    const tableHeading = document.createElement("tr");
    tableHeading.innerHTML += `<th>Sender</th>`;
    tableHeading.innerHTML += `<th>Receiver</th>`;
    tableHeading.innerHTML += `<th>Amount</th>`;
    tableHeading.innerHTML += `<th>Time</th>`;
    tableHeading.innerHTML += `<th>Date</th>`;
    tableHeading.innerHTML += `<th>Status</th>`;
    transactionHistoryContainer.appendChild(tableHeading);
}
//# sourceMappingURL=index.js.map