import { CardDisplay } from '@components/character/index/card-display';
import { ElementFilter } from '@components/character/index/element-filter';
import { QualityFilter } from '@components/character/index/quality-filter';
import { RoleFilter } from '@components/character/index/role-filter';
import { SearchBar } from '@components/character/index/searchbar';
import { createFileRoute } from '@tanstack/solid-router';
import type { Element, Role } from '@types';
import { createSignal } from 'solid-js';

export const Route = createFileRoute('/character/')({
	component: RouteComponent,
});

function RouteComponent() {
	const [selectedElement, setSelectedElement] = createSignal<Element[]>([
		'physical',
		'gun',
		'fire',
		'ice',
		'wind',
		'elec',
		'nuke',
		'psy',
		'bless',
		'curse',
		'support',
		'almighty',
		'wind_ice',
	]);
	const [selectedRole, setSelectedRole] = createSignal<Role[]>([
		'single',
		'multi',
		'buff',
		'debuff',
		'heal',
		'tank',
		'navi',
	]);
	const [selectedQuality, setSelectedQuality] = createSignal<string[]>([
		'4star',
		'5star',
	]);

	const [search, setSearch] = createSignal<string>('');

	return (
		<div class="flex flex-col gap-2 p-4">
			<h1 class="font-semibold text-4xl text-white">Thieves</h1>
			<div class="flex flex-row gap-2 pt-2">
				<SearchBar setValue={setSearch} />
			</div>
			<div class="flex flex-row flex-wrap justify-center gap-2">
				<ElementFilter
					setValue={setSelectedElement}
					value={selectedElement()}
				/>
				<div class="flex flex-row gap-2">
					<RoleFilter setValue={setSelectedRole} value={selectedRole()} />
					<QualityFilter
						setValue={setSelectedQuality}
						value={selectedQuality()}
					/>
				</div>
			</div>
			<CardDisplay
				elements={selectedElement()}
				roles={selectedRole()}
				qualities={selectedQuality()}
				name={search()}
			/>
		</div>
	);
}
