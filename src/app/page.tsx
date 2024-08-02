"use client";

import { isAuthenticated } from "@/app/_lib/features/auth/auth.slice";
import { useAppSelector } from "@/app/_lib/hooks";

export default function Home() {
	const isUserAuthenticated = useAppSelector(isAuthenticated);

	return <main></main>;
}
