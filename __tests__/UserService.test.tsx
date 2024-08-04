import { UserPagingApiModel } from "@/app/_models/user.model";
import { getFilteredUsers, getUsers } from "@/app/_services/user.service";
import useSWR from "swr";

// Mock the `useSWR` hook
jest.mock("swr", () => ({
	__esModule: true,
	default: jest.fn(),
}));

describe("User Service", () => {
	const mockUseSWR = useSWR as jest.Mock;

	beforeEach(() => {
		jest.resetAllMocks(); // Reset mocks before each test
	});

	it("getUsers should return combined data from two pages", () => {
		const mockPage1: UserPagingApiModel = {
			data: [
				{
					id: 1,
					first_name: "John",
					last_name: "Doe",
					email: "john@example.com",
					avatar: "avatar1.png",
				},
			],
			page: 1,
			per_page: 1,
			total: 2,
			total_pages: 2,
		};
		const mockPage2: UserPagingApiModel = {
			data: [
				{
					id: 2,
					first_name: "Jane",
					last_name: "Smith",
					email: "jane@example.com",
					avatar: "avatar2.png",
				},
			],
			page: 2,
			per_page: 1,
			total: 2,
			total_pages: 1,
		};

		mockUseSWR.mockImplementation((url: string) => {
			if (url.includes("page=1")) {
				return { data: mockPage1, error: null };
			}
			if (url.includes("page=2")) {
				return { data: mockPage2, error: null };
			}
			return { data: [], error: null };
		});

		const users = getUsers();

		expect(users).toHaveLength(2);
		expect(users[0].first_name).toBe("John");
		expect(users[1].first_name).toBe("Jane");
	});

	it("getFilteredUsers should filter users based on name criteria", () => {
		const mockPage1: UserPagingApiModel = {
			data: [
				{
					id: 1,
					first_name: "George",
					last_name: "Doe",
					email: "george@example.com",
					avatar: "avatar1.png",
				},
				{
					id: 2,
					first_name: "Jane",
					last_name: "Smith",
					email: "jane@example.com",
					avatar: "avatar2.png",
				},
			],
			page: 1,
			per_page: 2,
			total: 3,
			total_pages: 2,
		};
		const mockPage2: UserPagingApiModel = {
			data: [
				{
					id: 3,
					first_name: "Johnson",
					last_name: "Will",
					email: "will@example.com",
					avatar: "avatar3.png",
				},
			],
			page: 2,
			per_page: 2,
			total: 3,
			total_pages: 2,
		};

		mockUseSWR.mockImplementation((url: string) => {
			if (url.includes("page=1")) {
				return { data: mockPage1, error: null };
			}
			if (url.includes("page=2")) {
				return { data: mockPage2, error: null };
			}
			return { data: [], error: null };
		});

		const filteredUsers = getFilteredUsers();

		expect(filteredUsers).toHaveLength(2);
		expect(filteredUsers[0].first_name).toBe("George");
		expect(filteredUsers[1].last_name).toBe("Will");
	});
});
