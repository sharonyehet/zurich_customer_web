import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUserEmail } from "../../actions/fetch-users";
import { AppDispatch, RootState } from "../../store";

interface IUserEmail {
	id: number;
	email: string;
}

interface UsersState {
	[id: number]: string;
}

const initialState: UsersState = {};

const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		setUserEmail: (state, action: PayloadAction<IUserEmail>) => {
			const userId = action.payload.id;
			state[userId] = action.payload.email;
		},
		clearUserEmail: (state, action: PayloadAction<number>) => {
			const userId = action.payload;
			delete state[userId];
		},
	},
});

const { setUserEmail, clearUserEmail } = usersSlice.actions;

export const getEmail = createAsyncThunk<
	void,
	number,
	{ dispatch: AppDispatch; state: RootState }
>("users/getEmail", async (userId: number, { dispatch, getState }) => {
	const state = getState();

	if (state.users[userId]) {
		dispatch(clearUserEmail(userId));
	} else {
		getUserEmail(userId)
			.then((email) => {
				dispatch(setUserEmail({ id: userId, email }));
			})
			.catch();
	}
});

export default usersSlice.reducer;
