import gayTierlist from '@assets/gay_tierlist.png?responsive';
import pullTierlist from '@assets/pull_tierlist.png?responsive';
import { VerticalBox } from '@components/verticalbox';
import { ResponsiveImage } from '@responsive-image/solid';
import { createFileRoute } from '@tanstack/solid-router';
import { type } from 'arktype';
import { Match, Switch } from 'solid-js';

const queryParams = type({
	pull: 'boolean?',
	gay: 'boolean?',
});

export const Route = createFileRoute('/tierlist')({
	component: RouteComponent,
	validateSearch: queryParams,
});

function RouteComponent() {
	const params = Route.useSearch();
	const navigate = Route.useNavigate();

	return (
		<VerticalBox>
			<div class="flex h-screen w-full flex-col items-center justify-center">
				<Switch
					fallback={
						<>
							<h1 class="text-9xl text-white">NO</h1>
							<h2
								class="cursor-pointer text-4xl text-white underline"
								on:click={() => navigate({ search: { pull: true } })}
							>
								unless you want a pull tier list then here you go
							</h2>
							<h2
								class="cursor-pointer text-4xl text-white underline"
								on:click={() => navigate({ search: { gay: true } })}
							>
								there is also a gayness tier list
							</h2>
						</>
					}
				>
					<Match when={params().pull}>
						<div class="relative flex items-center justify-center">
							<ResponsiveImage
								src={pullTierlist}
								alt="character pull tierlist"
								class="h-screen object-contain"
							/>
							<span class="absolute right-0 bottom-0 rounded-tl-md bg-black/60 p-2 text-2xl text-white">
								Tier list by{' '}
								<a
									href="https://x.com/NajoxP5X"
									target="_blank"
									rel="noopener noreferrer"
									class="underline"
								>
									Najox
								</a>
							</span>
						</div>
					</Match>
					<Match when={params().gay}>
						<div class="relative flex items-center justify-center">
							<ResponsiveImage
								src={gayTierlist}
								alt="character gayness tierlist"
								class="h-screen object-contain"
							/>
							<span class="absolute right-0 bottom-0 rounded-tl-md bg-black/60 p-2 text-2xl text-white">
								Gay list by{' '}
								<a
									href="https://x.com/HoshiHime_"
									target="_blank"
									rel="noopener noreferrer"
									class="underline"
								>
									Hoshihime
								</a>
							</span>
						</div>
					</Match>
				</Switch>
			</div>
		</VerticalBox>
	);
}
