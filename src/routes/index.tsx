import { createFileRoute, useNavigate } from '@tanstack/solid-router';
import { onMount } from 'solid-js';
import widejox from '/assets/namjox.png?url';

export const Route = createFileRoute('/')({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate();

	onMount(() => {
		//funny
		setTimeout(() => {
			navigate({ to: '/character' });
		}, 1000);
	});

	return (
		<div
			class="h-screen w-full"
			on:click={() => {
				navigate({
					to: '/character',
				});
			}}
		>
			<img src={widejox} aria-hidden class="h-full w-full object-fill" />
		</div>
	);
}
