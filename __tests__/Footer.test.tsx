import Footer from "@/app/_shared/components/footer";
import { FooterItem } from "@/app/_shared/components/models";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();

describe("Footer", () => {
	const store = mockStore({
		auth: {
			authenticated: false,
			userInfo: {
				email: "",
				name: "",
			},
		},
	});

	const mockLinks: FooterItem[] = [
		{
			label: "Link1",
			destinationUrl: "Url1",
		},
		{
			label: "Link2",
			destinationUrl: "Url2",
		},
	];

	it("Renders the links", () => {
		render(
			<Provider store={store}>
				<Footer links={mockLinks} />
			</Provider>
		);

		const links = screen.getAllByRole("link");
		expect(links.length).toBe(2);
	});
});
