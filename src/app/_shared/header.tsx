export default function Header() {
	const onLogoClick = () => {
		// TODO: Route to home page
	};

	return (
		<header className="px-2 md:px-5 py-6 flex justify-between">
			<img
				className="w-52 h-7 md:w-60 md:h-8 cursor-pointer"
				src="zurich_logo.png"
				alt="zurich logo"
			></img>
		</header>
	);
}
