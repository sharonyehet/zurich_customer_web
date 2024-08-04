import Users from "@/app/(content)/users/page";
import * as UserService from "@/app/_services/user.service";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();
const store = mockStore({
	auth: {
		authenticated: true,
		userInfo: {
			email: "test@example.com",
			name: "test",
		},
	},
});

jest.mock("@/app/_services/user.service", () => ({
	getFilteredUsers: jest.fn().mockReturnValue([
		{
			id: 1,
			first_name: "George",
			last_name: "Washington",
			email: "george@washington.com",
			avatar: "avatar1",
		},
		{
			id: 2,
			first_name: "Gina",
			last_name: "Smith",
			email: "gina@smith.com",
			avatar: "avatar3",
		},
	]),
}));

describe("User Service", () => {
	it("Calls getFilteredUsers", () => {
		render(
			<Provider store={store}>
				<Users />
			</Provider>
		);

		expect(UserService.getFilteredUsers).toHaveBeenCalledTimes(1);
	});

	it("Have 2 results found", () => {
		render(
			<Provider store={store}>
				<Users />
			</Provider>
		);

		const tableRows = screen.getAllByRole("row").slice(1);
		const resultsFound = screen.queryAllByText("2 results found");

		expect(tableRows).toHaveLength(2);
		expect(resultsFound).not.toBeNull();
	});

	it("Have emails masked", () => {
		render(
			<Provider store={store}>
				<Users />
			</Provider>
		);

		const visibilityBtn = screen.getByAltText("email visibility button");
		expect(visibilityBtn).toHaveAttribute("src", "visibility_off.svg");

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

	it("Have emails shown when toggle visbility", () => {
		render(
			<Provider store={store}>
				<Users />
			</Provider>
		);

		const visibilityBtn = screen.getByAltText("email visibility button");
		fireEvent.click(visibilityBtn);

		const tableRows = screen.getAllByRole("row").slice(1);

		expect(visibilityBtn).toHaveAttribute("src", "visibility_on.svg");

		expect(tableRows[0]).not.toHaveTextContent("******");
		expect(tableRows[0]).toHaveTextContent("george@washington.com");

		expect(tableRows[1]).not.toHaveTextContent("******");
		expect(tableRows[1]).toHaveTextContent("gina@smith.com");
	});
});
