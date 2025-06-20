import { createFileRoute } from '@tanstack/solid-router';
import { onMount } from 'solid-js';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export const Route = createFileRoute('/palace/')({
	component: RouteComponent,
});

function RouteComponent() {
	let mapRef: HTMLDivElement | undefined;

	onMount(() => {
		if (!mapRef) return;

		const map = L.map(mapRef).setView([51.505, -0.09], 13);

		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			// attribution:
			// 	'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		}).addTo(map);

		L.marker([51.5, -0.09])
			.addTo(map)
			.bindPopup('A pretty CSS3 popup.<br> Easily customizable.');
	});

	return <div ref={mapRef} class="z-1 h-screen w-full" />;
}
