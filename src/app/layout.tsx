import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "./_shared/footer";
import Header from "./_shared/header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Zurich Customer Web",
	description: "Zurich Web Developer Assessment by Sharon.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inter.className} flex flex-col min-h-screen`}>
				<Header></Header>
				<main className="flex-grow">{children}</main>
				<Footer></Footer>
			</body>
		</html>
	);
}
