import { Container } from '@components/container';
import { VerticalBox } from '@components/verticalbox';
import { createFileRoute } from '@tanstack/solid-router';
import { For, Show } from 'solid-js';

export const Route = createFileRoute('/guide/')({
	component: RouteComponent,
});

const guides = [
	{
		title: 'Beginner’s guide',
		description: 'Everything you need to know to get started with the game.',
		authors: [{ name: 'Tenacity', link: 'https://ko-fi.com/tenacity2612' }],
		link: 'https://docs.google.com/document/d/1lMz_Ypyps3o8V4smUvhO_eCsovDk8tFcXvWIPSJhnkM/edit?usp=sharing',
	},
];

function RouteComponent() {
	return (
		<VerticalBox>
			<div class="m-2 flex flex-col gap-y-2">
				<h1 class="font-bold text-4xl text-white">Guides</h1>
				<Container
					header={
						<h2 class="font-semibold text-2xl text-white">External Guides</h2>
					}
					body={
						<ul class="list-disc">
							<For each={guides}>
								{(guide) => (
									<ul class="not-last:mb-2 text-white">
										<a
											href={guide.link}
											target="_blank"
											rel="noopener noreferrer"
											class="underline"
										>
											{guide.title}
										</a>
										<Show when={guide.description}>
											{' - '}
											<span>{guide.description}</span>
										</Show>
										<div>
											<strong>
												{guide.authors.length === 1 ? 'Author' : 'Authors'}:
											</strong>{' '}
											<For each={guide.authors}>
												{(author, i) => (
													<>
														<a
															href={author.link}
															target="_blank"
															rel="noopener noreferrer"
															class="underline"
														>
															{author.name}
														</a>
														{i() < guide.authors.length - 1 ? ', ' : ''}
													</>
												)}
											</For>
										</div>
									</ul>
								)}
							</For>
						</ul>
					}
				/>
			</div>
		</VerticalBox>
	);
}
