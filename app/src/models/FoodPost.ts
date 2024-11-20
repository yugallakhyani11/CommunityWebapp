// models/FoodPost.ts

import { NGO } from "./user";

export interface FoodPost {
    _id?: string;
    name: string;
    numOfPeople: number;
    shelfLife: number;
    location: string;
    image: string;
    email?: string;
    timestamp?: string;
    status: boolean;
    description: string;
    user?: NGO;
  }
  