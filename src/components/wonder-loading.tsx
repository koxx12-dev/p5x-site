export function WonderLoading() {
	return (
		<div class="flex flex-col items-center">
			<img
				src="/assets/generic/icon/loading/loading_wonder.png"
				alt="Loading Wonder"
				class="w-40 animate-loading-rotate"
			/>
			<img
				src="/assets/generic/icon/loading/loading_text.png"
				alt="Loading text"
				class="w-60 animate-loading-rotate-delay"
			/>
		</div>
	);
}
