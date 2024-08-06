"use server";

import { UserModel } from "@/app/_models/user.model";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export async function getAllUsers(
	page = 1,
	allUsers = []
): Promise<UserModel[]> {
	const url = `https://reqres.in/api/users?page=${page}`;
	const { data, total_pages } = await fetcher(url);

	allUsers = allUsers.concat(data);

	if (page < total_pages) {
		return getAllUsers(page + 1, allUsers);
	} else {
		return allUsers;
	}
}

export async function getUsers(showEmail: boolean): Promise<UserModel[]> {
	return (await getAllUsers())
		.filter(
			(user) =>
				user.first_name.toUpperCase().startsWith("G") ||
				user.last_name.toUpperCase().startsWith("W")
		)
		.map((user) => {
			if (!showEmail) {
				user.email = "******";
			}
			return user;
		});
}
