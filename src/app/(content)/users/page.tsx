"use client";

import { getUsers } from "@/app/_lib/actions/fetch-users";
import { UserModel } from "@/app/_models/user.model";
import { useEffect, useState } from "react";

export default function Users() {
	const [showEmail, setShowEmail] = useState(false);
	const [users, setUsers] = useState<UserModel[]>([]);

	const onEmailVisbilityClick = async () => {
		setShowEmail(!showEmail);
	};

	useEffect(() => {
		const fetchUsers = async () => {
			const users = await getUsers(showEmail);
			setUsers(users);
		};

		fetchUsers();
	}, [showEmail]);

	return (
		<section className="px-3 md:px-6 my-8">
			<h1 className="text-3xl text-blue-900 font-semibold">Users</h1>

			<div className="flex justify-between items-center">
				<div className="mt-8 mb-3 text-xs text-gray-400">
					{users.length} results found
				</div>
				<img
					className="w-5 h-5 cursor-pointer"
					alt="email visibility button"
					src={showEmail ? "visibility_on.svg" : "visibility_off.svg"}
					onClick={async () => await onEmailVisbilityClick()}
				></img>
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
										<span>{user.email}</span>
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
