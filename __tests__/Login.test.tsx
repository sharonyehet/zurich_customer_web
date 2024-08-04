import Login from "@/app/(auth)/login/page";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { signIn } from "next-auth/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();
jest.mock("next-auth/react", () => ({
	signIn: jest.fn(),
}));

describe("Login", () => {
	const store = mockStore({
		auth: {
			authenticated: false,
			userInfo: {
				email: "",
				name: "",
			},
		},
	});

	it("Renders the login button", () => {
		render(
			<Provider store={store}>
				<Login />
			</Provider>
		);

		const loginBtn = screen.getByRole("button", {
			name: "Login With Google",
		});

		expect(loginBtn).toBeInTheDocument();
	});

	it("Calls signIn func when login btn is clicked", () => {
		render(
			<Provider store={store}>
				<Login />
			</Provider>
		);

		const loginBtn = screen.getByRole("button", {
			name: "Login With Google",
		});

		fireEvent.click(loginBtn);

		expect(signIn).toHaveBeenCalledWith("google", {
			callbackUrl: "/users",
		});
	});
});
