import { UserModel, UserPagingApiModel } from "@/app/_models/user.model";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function getUsers(): UserModel[] {
	const urlRoute = "https://reqres.in/api/users";

	const resPage1 = useSWR<UserPagingApiModel>(`${urlRoute}?page=1`, fetcher);
	const resPage2 = useSWR<UserPagingApiModel>(`${urlRoute}?page=2`, fetcher);

	if (resPage1.error || resPage2.error) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error("Failed to fetch data");
	}

	const res = resPage1.data?.data.concat(resPage2.data?.data || []);

	return res || [];
}

export function getFilteredUsers(): UserModel[] {
	return getUsers().filter(
		(user) =>
			user.first_name.toUpperCase().startsWith("G") ||
			user.last_name.toUpperCase().startsWith("W")
	);
}
