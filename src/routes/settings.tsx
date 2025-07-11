import { Box } from '@components/box';
import { Container } from '@components/container';
import { VerticalBox } from '@components/verticalbox';
import { Checkbox } from '@kobalte/core/checkbox';
import { Combobox } from '@kobalte/core/combobox';
import { createFileRoute } from '@tanstack/solid-router';
import { For } from 'solid-js/web';
import { useAccessibilityBgBlur } from 'src/hooks/accessbility';
import { READABLE_REGIONS, REGIONS, useRegion } from 'src/hooks/i18n';

export const Route = createFileRoute('/settings')({
	component: RouteComponent,
});

const credits = [
	{
		category: 'Text Formatting',
		contributors: [
			{ name: 'Tenacity', url: 'https://ko-fi.com/tenacity2612' },
			{
				name: 'Shmucky',
				url: 'https://discordapp.com/users/852864468072398879',
			},
			{ name: 'Em', url: 'https://discordapp.com/users/1012854485216935936' },
		],
	},
	{
		category: 'Translation',
		contributors: [
			{ name: 'RedHarv', url: 'https://www.youtube.com/@RedHarv' },
			{ name: 'Em', url: 'https://discordapp.com/users/1012854485216935936' },
		],
	},
	{
		category: 'Datamining',
		contributors: [
			{ name: 'iant6325', url: 'https://x.com/iant6325' },
			{ name: 'Najox2314', url: 'https://x.com/NajoxP5X' },
			{
				name: 'Pseidn',
				url: 'https://discordapp.com/users/318284876107218945',
			},
		],
	},
	{
		category: 'Ideas and Suggestions',
		contributors: [
			{ name: 'Armlo', url: 'https://discordapp.com/users/627638425150816261' },
			{
				name: 'Brendon',
				url: 'https://discordapp.com/users/574617358409269281',
			},
			{ name: 'Tenacity', url: 'https://ko-fi.com/tenacity2612' },
		],
	},
];

function RouteComponent() {
	const [getRegion, setRegion] = useRegion();
	const [solidColor, setSolidColor] = useAccessibilityBgBlur();

	return (
		<VerticalBox>
			<div class="m-2 flex flex-col gap-y-2">
				<h1 class="font-bold text-4xl text-white">Settings</h1>
				<Box class="flex flex-row items-center p-2">
					<p class="text-white">Select your region: </p>
					<Combobox
						options={REGIONS}
						defaultValue={getRegion()}
						value={getRegion()}
						onChange={(v) => {
							if (v !== null && v !== getRegion()) {
								setRegion(v);
							}
						}}
						itemComponent={(props) => (
							<Combobox.Item item={props.item}>
								<Combobox.ItemLabel class="cursor-pointer py-1 text-white">
									<span class="text-white">
										{READABLE_REGIONS[props.item.rawValue]}
									</span>
								</Combobox.ItemLabel>
							</Combobox.Item>
						)}
					>
						<Combobox.Control aria-label="Select region">
							<Combobox.Trigger class="group">
								<Box class="min-h-12 min-w-35 items-center" intent="secondary">
									<span class="pl-2 text-white">
										{READABLE_REGIONS[getRegion()]}
									</span>
									<div class="icon-[tabler--chevron-down] group-ui-expanded:-rotate-180 mr-2 ml-auto block h-6 w-6 bg-white transition-all" />
								</Box>
							</Combobox.Trigger>
						</Combobox.Control>
						<Combobox.Portal>
							<Combobox.Content class="ui-expanded:motion-scale-in-75 motion-opacity-out-0 motion-duration-[120ms] motion-scale-out-75 z-2">
								<Combobox.Listbox
									class={
										'rounded-lg border-2 border-black bg-red-700 p-4 py-2 dark:border-red-600 dark:bg-zinc-800/60'
									}
								/>
							</Combobox.Content>
						</Combobox.Portal>
					</Combobox>
				</Box>
				<Box class="flex h-16 flex-row items-center p-2">
					<Checkbox class="inline-flex items-center" checked={solidColor()} onChange={setSolidColor}>
						<Checkbox.Label class="text-white">
							Enable background blur
						</Checkbox.Label>
						<Checkbox.Input class="peer absolute h-5 w-5 opacity-0" />
						<Checkbox.Control class="ml-2 flex h-6 w-6 items-center justify-center rounded-md border-2 border-red-600 bg-black/60">
							<Checkbox.Indicator>
								<div class="icon-[tabler--x] h-6 w-6 translate-y-1/8 text-red-600 transition" />
							</Checkbox.Indicator>
						</Checkbox.Control>
					</Checkbox>
				</Box>
				<Box class="flex flex-col gap-y-2 p-4">
					<p class="text-white">
						If you encounter any bugs or have suggestions for improvements,
						please{' '}
						<a
							href="https://github.com/koxx12-dev/p5x-site/issues/new/choose"
							target="_blank"
							rel="noopener noreferrer"
							class="underline"
						>
							open an issue on GitHub
						</a>{' '}
						or{' '}
						<a
							href="https://discord.gg/p5xworldwide"
							target="_blank"
							rel="noopener noreferrer"
							class="underline"
						>
							contact me in the P5X Worldwide Discord
						</a>
						.
					</p>
				</Box>
				<Container
					header={<h2 class="font-semibold text-2xl text-white">Credits</h2>}
					body={
						<>
							<p class="text-white">
								This project is made possible by the contributions of many
								individuals.
								<br />
								Special thanks to the following:
							</p>
							<ul class="list-disc pl-5 text-white">
								<For each={credits}>
									{(credit) => (
										<li class="not-last:mb-2">
											<strong>{credit.category}:</strong>{' '}
											<For each={credit.contributors}>
												{(c, i) => (
													<>
														<a
															href={c.url}
															target="_blank"
															rel="noopener noreferrer"
															class="underline"
														>
															{c.name}
														</a>
														{i() < credit.contributors.length - 1 ? ', ' : ''}
													</>
												)}
											</For>
										</li>
									)}
								</For>
							</ul>
							<p class="text-white">
								Your support and contributions are greatly appreciated!
							</p>
						</>
					}
				/>
			</div>
		</VerticalBox>
	);
}
