export const projectData: {
	title: string;
	projects: {
		text: string;
		description: string;
		icon: string;
		href: string;
	}[];
}[] = [
	{
		title: "Angular",
		projects: [
			{
				text: "shadcn-ng",
				description:
					"Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.",
				icon: "i-fa-brands:angular",
				href: "https://github.com/adrian-ub/shadcn-ng",
			},
		],
	},
	{
		title: "Laravel",
		projects: [
			{
				text: "Blade Simple Icons",
				description:
					"A package to easily make use of Simple Icons in your Laravel Blade views.",
				href: "https://github.com/ublabs/blade-simple-icons",
				icon: "i-fa-brands:laravel",
			},
			{
				text: "Blade CoreUI Icons",
				description:
					"A package to easily make use of CoreUI Icons in your Laravel Blade views.",
				href: "https://github.com/ublabs/blade-coreui-icons",
				icon: "i-fa-brands:laravel",
			},
		],
	},
];
