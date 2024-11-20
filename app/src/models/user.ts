export interface BaseUser {
  _id: any;
  username?: string;
  email: string;
  password: string;
  name: string;
  location?: string;
  userType: "Person" | "Organization" | "NGO";
}

export interface Person extends BaseUser {
  age: number;
  interests?: string[];
  bio?: string;
  totalDonation?: number;
  totalVolunteerHours: number;
}

export interface Organization extends BaseUser {
  orgName: string;
  rating: number;
  organizationType:
    | "Restaurant"
    | "Community Kitchen"
    | "School"
    | "Corporation";
}

export interface NGO extends BaseUser {
  ngoName: string;
  focus?: string;
  foundingYear?: number;
}
