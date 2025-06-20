import { createRootRouteWithContext, Outlet } from '@tanstack/solid-router';
import { TanStackRouterDevtools } from '@tanstack/solid-router-devtools';
import { Menubar } from '@kobalte/core/menubar';
import { For } from 'solid-js';
import { ResponsiveImage } from '@responsive-image/solid';

import home from '@assets/generic/icon/generic/home.svg';
import discord from '@assets/generic/icon/generic/discord.svg';
import metaverseNav from '@assets/generic/icon/generic/metaverse.png?responsive';

const nav = [
	{
		link: '/',
		name: 'Home',
		icon: home,
		icon_alt: 'home icon',
	},
	{
		link: '/character',
		name: 'Character',
		icon: home,
		icon_alt: 'character icon',
	},
	{
		link: '/palace',
		name: 'Palace',
		icon: home,
		icon_alt: 'palace icon',
	},
	{
		link: '/settings',
		name: 'Settings',
		icon: home,
		icon_alt: 'settings icon',
	},
	{
		link: 'https://discord.gg/p5xworldwide',
		name: 'P5X Worldwide',
		icon: discord,
		icon_alt: 'discord icon',
	},
	{
		link: 'https://discord.gg/tqyR9SM5tX',
		name: 'P5X Hangout',
		icon: discord,
		icon_alt: 'discord icon',
	},
];

export const Route = createRootRouteWithContext()({
	component: () => (
		<>
			<NavMenu />
			<Outlet />
			<TanStackRouterDevtools />
		</>
	),
});

function NavMenu() {
	const navigate = Route.useNavigate();

	return (
		<nav class="fixed top-2 left-2 z-50">
			<Menubar>
				<Menubar.Menu>
					<Menubar.Trigger class="opacity-30 ui-expanded:opacity-100 outline-hidden transition-opacity duration-200 hover:opacity-100">
						<ResponsiveImage
							src={metaverseNav}
							alt="menu icon"
							width={48}
							height={48}
						/>
					</Menubar.Trigger>
					<Menubar.Portal>
						<Menubar.Content class="ui-expanded:motion-opacity-in-0 ui-expanded:-motion-translate-x-in-25 ui-expanded:-motion-translate-y-in-25 ui-expanded:motion-scale-in-75 motion-opacity-out-0 motion-duration-[120ms] motion-scale-out-75 -motion-translate-x-out-25 -motion-translate-y-out-25 top-2 left-2 z-50 rounded-xl border-2 border-black bg-red-700 p-2 text-white shadow-md outline-hidden backdrop-blur-sm dark:border-red-600 dark:bg-black/60">
							<For each={nav}>
								{(nav) => (
									<Menubar.Item class="outline-hidden">
										<div
											class="group relative flex cursor-pointer items-center gap-2"
											on:click={() => {
												navigate({ to: nav.link });
											}}
										>
											<img src={nav.icon} alt={nav.icon_alt} class="h-8 w-8" />
											<span class="relative font-semibold text-white">
												{nav.name}
											</span>
											<span
												class="-inset-1.5 -skew-7 absolute block bg-white opacity-0 mix-blend-difference transition-opacity duration-50 group-hover:opacity-100"
												aria-hidden="true"
											/>
										</div>
									</Menubar.Item>
								)}
							</For>
						</Menubar.Content>
					</Menubar.Portal>
				</Menubar.Menu>
			</Menubar>
		</nav>
	);
}
