"use client";

import { useSession } from "next-auth/react";
import { Inter } from "next/font/google";
import { ReactNode, useEffect } from "react";
import { NextAuthProvider } from "./_contexts/next-auth.provider";
import StoreProvider from "./_contexts/store.provider";
import { useAppDispatch } from "./_redux/hooks";
import { setAuth } from "./_redux/slices/auth/auth.slice";
import Footer from "./_shared/components/footer";
import Header from "./_shared/components/header";
import { FooterItem } from "./_shared/components/models";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const footerLinks: FooterItem[] = [
		{
			label: "Personal Data Notice",
			destinationUrl: "/",
		},
		{
			label: "Terms and Conditions",
			destinationUrl: "/",
		},
		{
			label: "Frequently Asked Questions (FAQ)",
			destinationUrl: "/",
		},
	];

	return (
		<html lang="en">
			<body className={`${inter.className} flex flex-col min-h-screen`}>
				<NextAuthProvider>
					<StoreProvider>
						<Header logoSrcUrl="zurich_logo.png"></Header>
						<AuthHandler>{children}</AuthHandler>
						<Footer links={footerLinks}></Footer>
					</StoreProvider>
				</NextAuthProvider>
			</body>
		</html>
	);
}

function AuthHandler({ children }: { children: ReactNode }) {
	const { data: session, status } = useSession();
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (status === "loading") {
			return;
		}

		if (status === "authenticated" && session) {
			const authData = {
				authenticated: true,
				userInfo: {
					email: session.user?.email || "",
					name: session.user?.name || "",
				},
			};
			dispatch(setAuth(authData));
		}
	}, [status, session]);

	return <main className="flex-grow">{children}</main>;
}
