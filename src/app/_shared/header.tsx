"use client";

import { signOut } from "next-auth/react";
import {
	isAuthenticated,
	selectUserName,
} from "../_lib/features/auth/auth.slice";
import { useAppSelector } from "../_lib/hooks";

export default function Header() {
	const isUserAuthenticated = useAppSelector(isAuthenticated);
	const username = useAppSelector(selectUserName);

	const onLogoClick = () => {
		// TODO: Route to home page
		console.log("is authenticated", isUserAuthenticated);
		console.log("name", username);
	};

	return (
		<header className="px-2 md:px-5 py-6 flex justify-between items-center">
			<img
				className="w-52 h-7 md:w-60 md:h-8 cursor-pointer"
				src="zurich_logo.png"
				alt="zurich logo"
				onClick={() => onLogoClick()}
			></img>

			{isUserAuthenticated && (
				<div className="flex gap-x-3 items-center">
					<span className="text-sm text-blue-900">{username}</span>
					<button
						className="font-light text-sm text-red-600"
						type="button"
						onClick={() => signOut({ callbackUrl: "/" })}
					>
						Logout
					</button>
				</div>
			)}
		</header>
	);
}
