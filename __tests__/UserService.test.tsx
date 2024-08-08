import { UserPagingApiModel } from "@/app/_models/user.model";
import {
	getAllUsers,
	getUserEmail,
	getUsers,
} from "@/app/_server-actions/fetch-users";

describe("User Service", () => {
	beforeEach(() => {
		global.fetch = jest.fn();

		const mockPage1: UserPagingApiModel = {
			data: [
				{
					id: 1,
					first_name: "John",
					last_name: "Doe",
					email: "john@example.com",
					avatar: "avatar1.png",
				},
				{
					id: 2,
					first_name: "Janet",
					last_name: "Weaver",
					email: "janet@example.com",
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
					first_name: "George",
					last_name: "Bluth",
					email: "george@example.com",
					avatar: "avatar3.png",
				},
			],
			page: 2,
			per_page: 2,
			total: 3,
			total_pages: 1,
		};

		(fetch as jest.Mock).mockImplementation((url: string) => {
			let mockData: UserPagingApiModel;

			if (url.includes("page=1")) {
				mockData = mockPage1;
			} else {
				mockData = mockPage2;
			}

			return Promise.resolve({
				json: jest.fn().mockResolvedValue(mockData),
			});
		});
	});

	it("getAllUsers should return combined data from two pages", async () => {
		const users = await getAllUsers();

		expect(users).toHaveLength(3);
		expect(users[0].first_name).toBe("John");
		expect(users[1].first_name).toBe("Janet");
		expect(users[2].first_name).toBe("George");
	});

	it("getUsers should filter users based on name criteria", async () => {
		const filteredUsers = await getUsers(false);

		expect(filteredUsers).toHaveLength(2);
		expect(filteredUsers[0].last_name).toBe("Weaver");
		expect(filteredUsers[1].first_name).toBe("George");
	});

	it("getUserEmail should return email of selected user", async () => {
		(fetch as jest.Mock).mockImplementation((url: string) => {
			return Promise.resolve({
				json: jest.fn().mockResolvedValue({
					data: {
						id: 2,
						first_name: "Janet",
						last_name: "Weaver",
						email: "janet@example.com",
						avatar: "avatar2.png",
					},
				}),
			});
		});

		const email = await getUserEmail(2);

		expect(email).toEqual("janet@example.com");
	});
});
