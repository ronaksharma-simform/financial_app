import type { Transaction } from "./transaction.types";
interface User {
	name: string;
	age: number;
	emailId: string;
	accountNumber: number;
	branchCode?: string;
	dateOfBirth: Date;
    isActive:boolean;    
    balance:number;
	transactions:Transaction[]
}
export type {User};