import { NextAuthProvider } from "../../next-auth.provider";

export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <NextAuthProvider>{children}</NextAuthProvider>;
}
