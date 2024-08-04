import Header from "@/app/_shared/components/header";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { signOut } from "next-auth/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();
jest.mock("next-auth/react", () => ({
	signOut: jest.fn(),
}));

describe("Header for Unauthenticated User", () => {
	const store = mockStore({
		auth: {
			authenticated: false,
			userInfo: {
				email: "",
				name: "",
			},
		},
	});

	it("Renders the logo", () => {
		render(
			<Provider store={store}>
				<Header logoSrcUrl="zurich_logo.png" />
			</Provider>
		);

		const logo = screen.getByAltText("logo");
		expect(logo).toHaveAttribute("src", "zurich_logo.png");
	});

	it("Have no logout button", () => {
		render(
			<Provider store={store}>
				<Header logoSrcUrl="zurich_logo.png" />
			</Provider>
		);

		const logoutBtn = screen.queryByRole("button", {
			name: "Logout",
		});
		expect(logoutBtn).toBeNull();
	});
});

describe("Header for Authenticated User", () => {
	const store = mockStore({
		auth: {
			authenticated: true,
			userInfo: {
				email: "test@example.com",
				name: "test",
			},
		},
	});

	it("Renders the logo", () => {
		render(
			<Provider store={store}>
				<Header logoSrcUrl="zurich_logo.png" />
			</Provider>
		);

		const logo = screen.getByAltText("logo");
		expect(logo).toHaveAttribute("src", "zurich_logo.png");
	});

	it("Have logout button", () => {
		render(
			<Provider store={store}>
				<Header logoSrcUrl="zurich_logo.png" />
			</Provider>
		);

		const logoutBtn = screen.queryByRole("button", {
			name: "Logout",
		});
		expect(logoutBtn).not.toBeNull();
	});

	it("Have username", () => {
		render(
			<Provider store={store}>
				<Header logoSrcUrl="zurich_logo.png" />
			</Provider>
		);

		const username = screen.queryByText("test");
		expect(username).not.toBeNull();
	});

	it("Calls signOut func when logout btn is clicked", () => {
		render(
			<Provider store={store}>
				<Header logoSrcUrl="zurich_logo.png" />
			</Provider>
		);

		const logoutBtn = screen.getByRole("button", {
			name: "Logout",
		});

		fireEvent.click(logoutBtn);

		expect(signOut).toHaveBeenCalledWith({
			callbackUrl: "/",
		});
	});
});
