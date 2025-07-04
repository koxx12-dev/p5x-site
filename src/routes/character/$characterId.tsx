import { CharacterAwarenessDisplay } from '@components/character/page/character-awareness-display';
import { CharacterMentalImageDisplay } from '@components/character/page/character-mental-image-display';
import { CharacterSkillDisplay } from '@components/character/page/character-skill-display';
import { CharacterStatsTable } from '@components/character/page/character-stats-table';
import { CharacterAssetDisplay } from '@components/character-asset';
import { ElementDisplay } from '@components/element';
import { RoleDisplay } from '@components/role';
import {
	createFileRoute,
	type ErrorComponentProps,
	Link,
} from '@tanstack/solid-router';
import { TraversalError } from 'arktype';
import { Show } from 'solid-js';
import { useThief } from 'src/hooks/collections';
import { cn } from 'src/utils';

export const Route = createFileRoute('/character/$characterId')({
	component: RouteComponent,
	errorComponent: ErrorRouteComponent,
});

function RouteComponent() {
	const params = Route.useParams();

	const thief = useThief(params().characterId);

	return (
		<Show when={thief()} fallback={<NotFoundRouteComponent />}>
			{(thiefData) => (
				<div class="m-4 flex flex-col gap-2">
					<div class="flex flex-col gap-2 pt-2 xl:flex-row">
						<div class="relative aspect-2/1 size-full xl:static xl:aspect-square">
							<CharacterAssetDisplay
								characterId={thiefData().id}
								assetType={'full'}
								class="mask-b-from-50% xl:mask-none absolute aspect-square w-full xl:static"
								loading="eager"
							/>
						</div>
						<div class="z-1 flex w-full flex-col xl:max-w-1/2">
							<div class="relative h-23 w-max">
								<h1
									class="relative font-semibold text-6xl text-white"
									style={{
										'view-transition-name': `code-name-${thiefData().id}`,
									}}
								>
									{thiefData().code_name}
								</h1>
								<span
									class={cn(
										'absolute bottom-6.5 h-1 w-full',
										thiefData().quality === 5 &&
											'bg-[url(/assets/rainbow.svg)] bg-size-[100%]',
										thiefData().quality === 4 && 'bg-star-gold',
									)}
									aria-hidden="true"
								/>
								<h2 class="absolute bottom-0 text-nowrap font-semibold text-normal text-white">
									{thiefData().full_name}
								</h2>
								<RoleDisplay
									characterRole={thiefData().role}
									class="-right-10 absolute top-0 h-8 w-8"
								/>
								<ElementDisplay
									element={thiefData().element}
									class="-right-10 absolute top-7.5 h-8 w-8"
								/>
							</div>
							<Show when={thiefData().stats}>
								{(stats) => <CharacterStatsTable stats={stats()} />}
							</Show>
						</div>
					</div>
					<div class="z-1">
						<Show when={thiefData().skill}>
							{(skill) => <CharacterSkillDisplay skill={skill()} />}
						</Show>

						<Show when={thiefData().awareness}>
							{(awareness) => (
								<CharacterAwarenessDisplay awareness={awareness()} />
							)}
						</Show>
						<Show when={thiefData().mental_image}>
							{(mentalImage) => (
								<CharacterMentalImageDisplay mentalImage={mentalImage()} />
							)}
						</Show>
					</div>
				</div>
			)}
		</Show>
	);
}

function NotFoundRouteComponent() {
	const params = Route.useParams();

	return (
		<div class="flex h-screen flex-col items-center justify-center">
			<span class="text-white">
				Character "{params().characterId}" not found
			</span>
			<Link to="/character" class="text-blue-500 hover:underline">
				Go back to character list
			</Link>
		</div>
	);
}

function ErrorRouteComponent(props: ErrorComponentProps) {
	const params = Route.useParams();

	if (props.error instanceof TraversalError) {
		return (
			<div class="flex h-screen flex-col items-center justify-center">
				<span class="text-white">
					Invalid character data for "{params().characterId}"
				</span>
				<span class="whitespace-pre-line text-white">
					{props.error.message.trim()}
				</span>
				<Link to="/character" class="text-blue-500 hover:underline">
					Go back to character list
				</Link>
			</div>
		);
	}

	return (
		<div class="flex h-screen flex-col items-center justify-center">
			<h1 class="text-white">Something went wrong</h1>
			<span class="whitespace-pre-line text-white">
				{props.error.message || 'An unexpected error occurred.'}
			</span>
			<Link to="/" class="text-blue-500 hover:underline">
				Go back to home
			</Link>
		</div>
	);
}
