export interface HeaderProps {
	logoSrcUrl: string;
}

export interface FooterProps {
	links: FooterItem[];
}

export interface FooterItem {
	label: string;
	destinationUrl: string;
}
