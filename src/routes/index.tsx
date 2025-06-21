import { createFileRoute, useNavigate } from '@tanstack/solid-router';
import najox from '../../public/assets/namjox.png';

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
			<img src={najox} aria-hidden class='h-full w-full object-fill' />
		</div>
	);
}
