import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import authReducer from "./slices/auth/auth.slice";
import usersReducer from "./slices/users/users.slice";

export const makeStore = () => {
	return configureStore({
		reducer: {
			auth: authReducer,
			users: usersReducer,
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(thunk),
	});
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
