import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface AuthState {
	authenticated: boolean;
	userInfo: UserInfo;
}

interface UserInfo {
	email: string;
	name: string;
}

const initialState: AuthState = {
	authenticated: false,
	userInfo: {
		email: "",
		name: "",
	},
};

const authSlice = createSlice({
	name: "auth",
	initialState: initialState,
	reducers: {
		setAuth: (state, action: PayloadAction<AuthState>) => {
			state.authenticated = action.payload.authenticated;
			state.userInfo.email = action.payload.userInfo.email;
			state.userInfo.name = action.payload.userInfo.name;
		},
		clearAuth: (state) => {
			state = initialState;
		},
	},
});

export const { setAuth, clearAuth } = authSlice.actions;

export const selectUserName = (state: RootState) => state.auth.userInfo.name;

export const isAuthenticated = (state: RootState) => state.auth.authenticated;

export default authSlice.reducer;
