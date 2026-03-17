interface User {
	name: string;
	age: number;
	emailId: string;
	accountNumber: number;
	branchCode?: string;
	dateOfBirth: Date;
    isActive:boolean;    
    balance:number;
}
export type {User};