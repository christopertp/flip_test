import { StatusTransactionType } from "./StatusTransactionType";

export interface ITransactionItem {
    id: string;
    amount: number;
    unique_code: number;
    status: StatusTransactionType;
    sender_bank: string;
    account_number: string;
    beneficiary_name: string;
    beneficiary_bank: string;
    remark: string;
    created_at: string;
    completed_at: string;
    fee: number
}
