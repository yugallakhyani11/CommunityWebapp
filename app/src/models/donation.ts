import { Person } from "./user";

export interface Donation {
  amount: number;
  currency: string;
  createdAt: Date;
  createdBy?: Person;
}
