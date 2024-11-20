import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Person, NGO, Organization } from "../../models/user";

type LoggedInUser = Person | NGO | Organization | null;

// const initialState: LoggedInUser = null;
const initialState: LoggedInUser = null as LoggedInUser;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state: LoggedInUser, action: PayloadAction<LoggedInUser>) => {
      return action.payload;
    },
    logout: () => {
      return null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
