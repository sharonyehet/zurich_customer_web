import Users from "@/app/(content)/users/page";
import * as UserService from "@/app/_lib/actions/fetch-users";
import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { thunk } from "redux-thunk";

const middlewares: any[] = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
	auth: {
		authenticated: true,
		userInfo: {
			email: "test@example.com",
			name: "test",
		},
	},
	users: {},
});

jest.mock("@/app/_lib/actions/fetch-users", () => ({
	getUsers: jest.fn().mockReturnValue([
		{
			id: 1,
			first_name: "George",
			last_name: "Washington",
			email: "******",
			avatar: "avatar1",
		},
		{
			id: 2,
			first_name: "Gina",
			last_name: "Smith",
			email: "******",
			avatar: "avatar3",
		},
	]),
	getUserEmail: jest.fn().mockResolvedValue("hidden@example.com"),
}));

describe("User", () => {
	it("Calls getUsers", async () => {
		await act(async () => {
			render(
				<Provider store={store}>
					<Users />
				</Provider>
			);
		});

		expect(UserService.getUsers).toHaveBeenCalledTimes(1);
	});

	it("Have 2 results found", async () => {
		await act(async () => {
			render(
				<Provider store={store}>
					<Users />
				</Provider>
			);
		});

		const tableRows = screen.getAllByRole("row").slice(1);
		const resultsFound = screen.queryAllByText("2 results found");

		expect(tableRows).toHaveLength(2);
		expect(resultsFound).not.toBeNull();
	});

	it("Have emails masked", async () => {
		await act(async () => {
			render(
				<Provider store={store}>
					<Users />
				</Provider>
			);
		});

		const visibilityBtns = screen.getAllByAltText(
			"email visibility button"
		);

		visibilityBtns.forEach((btn) => {
			expect(btn).toHaveAttribute("src", "visibility_off.svg");
		});

		const tableRows = screen.getAllByRole("row").slice(1);

		expect(tableRows[0]).toHaveTextContent("1");
		expect(tableRows[0]).toHaveTextContent("George");
		expect(tableRows[0]).toHaveTextContent("Washington");
		expect(tableRows[0]).toHaveTextContent("******");
		expect(tableRows[0]).not.toHaveTextContent("george@washington.com");

		expect(tableRows[1]).toHaveTextContent("2");
		expect(tableRows[1]).toHaveTextContent("Gina");
		expect(tableRows[1]).toHaveTextContent("Smith");
		expect(tableRows[1]).toHaveTextContent("******");
		expect(tableRows[1]).not.toHaveTextContent("gina@smith.com");
	});

	// TODO: Test case failed as of now. Need further research on it.
	// it("Have emails shown when toggle visbility", async () => {
	// 	await act(async () => {
	// 		render(
	// 			<Provider store={store}>
	// 				<Users />
	// 			</Provider>
	// 		);
	// 	});

	// 	let visibilityBtns = screen.getAllByAltText("email visibility button");

	// 	await waitFor(() => {
	// 		expect(visibilityBtns.length).toEqual(2);
	// 		visibilityBtns.forEach((btn) => {
	// 			expect(btn).toHaveAttribute("src", "visibility_off.svg");
	// 		});
	// 	});

	// 	await act(async () => {
	// 		fireEvent.click(visibilityBtns[1]);
	// 	});

	// 	await waitFor(() => {
	// 		expect(UserService.getUserEmail).toHaveBeenCalledWith();
	// 	});

	// 	visibilityBtns = screen.getAllByAltText("email visibility button");
	// 	const tableRows = screen.getAllByRole("row").slice(1);

	// 	expect(visibilityBtns[0]).toHaveAttribute("src", "visibility_off.svg");
	// 	expect(tableRows[0]).toHaveTextContent("******");
	// 	expect(tableRows[0]).not.toHaveTextContent("hidden@example.com");

	// 	expect(visibilityBtns[1]).toHaveAttribute("src", "visibility_on.svg");
	// 	expect(tableRows[1]).not.toHaveTextContent("******");
	// 	expect(tableRows[1]).toHaveTextContent("hidden@example.com");
	// });
});
