import { createFileRoute, useNavigate } from '@tanstack/solid-router';
import widejox from '/assets/namjox.png?url';

export const Route = createFileRoute('/')({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate();

	return (
		<div class='h-screen w-full' on:click={() => {
			navigate({
				to: '/character'
			})
		}}>
			<img src={widejox} aria-hidden class='h-full w-full object-fill' />
		</div>
	);
}
