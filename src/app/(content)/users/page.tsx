"use client";

import { UserModel, UserPagingApiModel } from "@/app/_models/user.model";
import { useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Users() {
	const users: UserModel[] = getData();
	const [showEmail, setShowEmail] = useState(false);

	const onEmailVisbilityClick = () => {
		setShowEmail(!showEmail);
	};

	function getData() {
		const urlRoute = "https://reqres.in/api/users";
		const resPage1 = useSWR<UserPagingApiModel>(
			`${urlRoute}?page=1`,
			fetcher
		);

		const resPage2 = useSWR<UserPagingApiModel>(
			`${urlRoute}?page=2`,
			fetcher
		);

		if (resPage1.error || resPage2.error) {
			// This will activate the closest `error.js` Error Boundary
			throw new Error("Failed to fetch data");
		}

		const res = resPage1.data?.data
			.concat(resPage2.data?.data || [])
			.filter(
				(user) =>
					user.first_name.toUpperCase().startsWith("G") ||
					user.last_name.toUpperCase().startsWith("W")
			);

		return res || [];
	}

	return (
		<section className="px-3 md:px-6 my-8">
			<h1 className="text-3xl text-blue-900 font-semibold">Users</h1>

			<div className="flex justify-between items-center">
				<div className="mt-8 mb-3 text-xs text-gray-400">
					{users.length} results found
				</div>
				<img
					className="w-5 h-5 cursor-pointer"
					src={showEmail ? "visibility_on.svg" : "visibility_off.svg"}
					onClick={() => onEmailVisbilityClick()}
				></img>
			</div>

			<div className="rounded-lg bg-gray-100 p-2 md:pt-0 ">
				<table className="min-w-full text-gray-900 md:table md:table-fixed">
					<thead className="rounded-lg text-left text-sm font-normal">
						<tr>
							<th scope="col" className="px-3 py-5 font-medium">
								Id
							</th>
							<th scope="col" className="px-3 py-5 font-medium">
								First Name
							</th>
							<th scope="col" className="px-3 py-5 font-medium">
								Last Name
							</th>
							<th scope="col" className="px-3 py-5 font-medium">
								Email
							</th>
						</tr>
					</thead>
					<tbody className="bg-white">
						{users.map((user) => (
							<tr className="w-full py-3 text-sm rounded-sm border-b :last-of-type:border-none">
								<td className="whitespace-nowrap px-3 py-3">
									{user.id}
								</td>
								<td className="whitespace-nowrap px-3 py-3">
									{user.first_name}
								</td>
								<td className="whitespace-nowrap px-3 py-3">
									{user.last_name}
								</td>
								<td className="whitespace-nowrap px-3 py-3">
									<div className="flex justify-between gap-x-2">
										<span>
											{showEmail ? user.email : "******"}
										</span>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</section>
	);
}
