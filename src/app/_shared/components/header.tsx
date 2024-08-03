"use client";

import { signOut } from "next-auth/react";
import {
	isAuthenticated,
	selectUserName,
} from "../../_lib/features/auth/auth.slice";
import { useAppSelector } from "../../_lib/hooks";
import { HeaderProps } from "./models";

export default function Header(props: HeaderProps) {
	const isUserAuthenticated = useAppSelector(isAuthenticated);
	const username = useAppSelector(selectUserName);

	return (
		<header className="px-2 md:px-5 py-6 flex justify-between items-center">
			<img
				className="w-52 h-7 md:w-60 md:h-8 cursor-pointer"
				src={props.logoSrcUrl}
				alt="logo"
			></img>

			{isUserAuthenticated && (
				<div className="flex gap-x-3 items-center">
					<span className="hidden md:inline-block text-sm text-blue-900">
						{username}
					</span>
					<button
						className="text-xs md:text-sm border md:border-2 border-red-600 px-2 md:px-4 py-1 md:py-1.5 rounded-full text-red-500"
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
