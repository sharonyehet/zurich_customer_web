import { FooterProps } from "./models";

export default function Footer(props: FooterProps) {
	return (
		<footer className="bg-zr-greyish-blue px-3 md:px-6 py-8 lg:min-h-32">
			<div className="flex justify-between gap-x-2 text-blue-900 font-extralight text-xs md:text-sm">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 ">
					{props.links.map((link) => (
						<a href={link.destinationUrl}>{link.label}</a>
					))}
				</div>

				<span className="self-end text-nowrap">
					&copy;Zurich Malaysia
				</span>
			</div>
		</footer>
	);
}
