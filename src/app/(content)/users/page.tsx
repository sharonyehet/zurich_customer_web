"use client";

import { UserModel } from "@/app/_models/user.model";
import { useAppDispatch, useAppSelector } from "@/app/_redux/hooks";
import { getEmail } from "@/app/_redux/slices/users/users.slice";
import { getUsers } from "@/app/_server-actions/fetch-users";
import { useEffect, useState } from "react";

export default function Users() {
	const [users, setUsers] = useState<UserModel[]>([]);
	const email = useAppSelector((state) => state.users);
	const dispatch = useAppDispatch();

	const onEmailVisbilityClick = (userId: number) => {
		dispatch(getEmail(userId));
	};

	useEffect(() => {
		const fetchUsers = async () => {
			const users = await getUsers(false);
			setUsers(users);
		};

		fetchUsers();
	}, []);

	return (
		<section className="px-3 md:px-6 my-8">
			<h1 className="text-3xl text-blue-900 font-semibold">Users</h1>

			<div className="mt-8 mb-3 text-xs text-gray-400">
				{users.length} results found
			</div>

			<div className="rounded-lg bg-gray-100 p-2 md:pt-0 overflow-x-auto">
				<table className="w-full text-gray-900 md:table">
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
							<tr
								className="w-full py-3 text-sm rounded-sm border-b :last-of-type:border-none"
								key={user.id}
							>
								<td className="whitespace-nowrap px-3 py-3">
									{user.id}
								</td>
								<td className="whitespace-nowrap px-3 py-3 min-w-[200px]">
									<div className="flex gap-x-3 items-center">
										<img
											className="w-8 h-8 object-cover rounded-full"
											src={user.avatar}
										></img>
										<span>{user.first_name}</span>
									</div>
								</td>
								<td className="whitespace-nowrap px-3 py-3 min-w-[200px]">
									{user.last_name}
								</td>
								<td className="whitespace-nowrap px-3 py-3 min-w-[300px]">
									<div className="flex justify-between gap-x-2">
										<span>
											{email[user.id] || user.email}
										</span>
										<img
											className="w-5 h-5 cursor-pointer"
											alt="email visibility button"
											src={
												email[user.id]
													? "visibility_on.svg"
													: "visibility_off.svg"
											}
											onClick={() =>
												onEmailVisbilityClick(user.id)
											}
										></img>
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
