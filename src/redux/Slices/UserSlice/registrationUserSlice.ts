import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  login: string;
  password: string;
}

const initialState: UserState = {
  login: "",
  password: "",
};

const registrationUserSlice = createSlice({
  name: "registrationUserSlice",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.login = action.payload.login;
      state.password = action.payload.password;
    },
    clearUser(state) {
      state.login = "";
      state.password = "";
    },
  },
});

export const { setUser, clearUser } = registrationUserSlice.actions;
export default registrationUserSlice.reducer;
