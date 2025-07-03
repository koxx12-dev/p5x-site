import { VerticalBox } from '@components/verticalbox';
import { createFileRoute, Outlet } from '@tanstack/solid-router';

export const Route = createFileRoute('/character')({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<VerticalBox>
			<Outlet />
		</VerticalBox>
	);
}
