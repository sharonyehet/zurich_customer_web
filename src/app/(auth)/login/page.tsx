"use client";

import { setAuth } from "@/app/_lib/features/auth/auth.slice";
import { useAppDispatch } from "@/app/_lib/hooks";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Login() {
	const dispatch = useAppDispatch();
	const { data: session, status } = useSession();

	useEffect(() => {
		if (status === "loading") {
			return;
		}

		const isAuthenticated = status === "authenticated";
		if (isAuthenticated && session) {
			const authData = {
				authenticated: isAuthenticated,
				userInfo: {
					email: session?.user?.email || "",
					name: session?.user?.name || "",
				},
			};
			dispatch(setAuth(authData));
		}
	}, [session, status]);

	return (
		<section className="flex max-lg:flex-col">
			<div className="lg:basis-1/2 grow-0">
				<img
					className="w-full h-[30vh] sm:h-[50vh] object-cover object-top lg:h-full lg:object-contain"
					src="login_image.jpg"
					alt="login image"
				></img>
			</div>

			<div className="max-lg:my-10 max-lg:px-3 max-lg:grow lg:basis-1/2 grow-0 flex justify-center items-center">
				<form className="font-light flex flex-col items-center align-middle">
					<h1 className="text-blue-900 text-3xl text-center">
						Welcome to MyZurichLife
					</h1>
					<h2 className="text-gray-600 text-2xl my-5 text-center">
						Please log in to continue
					</h2>
					<button
						type="button"
						className="btn-primary w-fit"
						onClick={() =>
							signIn("google", {
								callbackUrl: "/users",
							})
						}
					>
						Login With Google
					</button>

					<div className="text-gray-400 my-5 max-lg:text-sm text-center">
						Don't have an account?
						<a
							className="ml-2 lg:ml-3 text-blue-900 text-nowrap"
							href="/"
						>
							Register now!
						</a>
					</div>

					<div className="text-gray-400 max-lg:text-sm text-center">
						Don't remember the password?
						<a
							className="ml-2 lg:ml-3 text-blue-900 text-nowrap"
							href="/"
						>
							Forgot Password
						</a>
					</div>
				</form>
			</div>
		</section>
	);
}
