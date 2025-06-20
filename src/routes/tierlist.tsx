import { createFileRoute } from '@tanstack/solid-router';
import { type } from 'arktype';
import { Show } from 'solid-js';

import tierlist from '@assets/pull_tierlist.png?responsive';
import { ResponsiveImage } from '@responsive-image/solid';

const queryParams = type({
	pull: 'boolean?',
});

export const Route = createFileRoute('/tierlist')({
	component: RouteComponent,
	validateSearch: queryParams,
});

function RouteComponent() {
	const params = Route.useSearch();
	const navigate = Route.useNavigate();

	return (
		<div class="flex min-h-screen flex-row justify-center">
			<main class="min-h-screen w-full max-w-301 border-red-600 border-r-2 border-l-2 bg-black/40">
				<div class="flex h-screen w-full flex-col items-center justify-center">
					<Show
						when={params().pull}
						fallback={
							<>
								<h1 class="text-9xl text-white">NO</h1>
								<h2
									// biome-ignore lint/nursery/useSortedClasses: <explanation>
									class="text-4xl text-white underline cursor-pointer"
									on:click={() => navigate({ search: { pull: true } })}
								>
									unless you want a pull tier list then here you go
								</h2>
							</>
						}
					>
						<div class="relative flex items-center justify-center">
							<ResponsiveImage
								src={tierlist}
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
					</Show>
				</div>
			</main>
		</div>
	);
}
