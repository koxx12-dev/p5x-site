import { render } from 'solid-js/web';
import {
	RouterProvider,
	createHashHistory,
	createRouter,
} from '@tanstack/solid-router';
import { routeTree } from './routeTree.gen';
import 'solid-devtools';

const history = createHashHistory();

// Create a new router instance
const router = createRouter({
	routeTree,
	scrollRestoration: true,
	defaultHashScrollIntoView: { behavior: 'smooth', block: 'center' },
	defaultPreload: 'intent',
	defaultPreloadStaleTime: 0,
	defaultViewTransition: true,
	history,
});

// Register the router instance for type safety
declare module '@tanstack/solid-router' {
	interface Register {
		router: typeof router;
	}
}

// Render the app
// biome-ignore lint/style/noNonNullAssertion: its part of index.html, so it will always be there
const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
	render(() => <RouterProvider router={router} />, rootElement);
}
