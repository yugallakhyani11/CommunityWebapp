import { Donation } from "./donation";
import { NGO, Person } from "./user";

export interface Event {
  _id: any,
  title: string;
  description: string;
  keywords: string[];
  date: Date;
  location: string;
  createdBy: NGO;
  volunteers: Person[];
  donations: Donation[];
  currentDonation: number;
  targetDonation: number;
  currentVolunteers: number;
  targetVolunteers: number;
  imageUrl?: string;
}
