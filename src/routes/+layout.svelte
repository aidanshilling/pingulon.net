<script lang="ts">
	import favicon from "$lib/assets/favicon.svg";
	import StoryCard from "$lib/StoryCard.svelte";
	import type { LayoutProps } from "./$types";
	import { page } from "$app/state";
	import bgUrl from "$lib/assets/bg.webp";
	import bgSmUrl from "$lib/assets/bg-small.webp";
	import penguin from "$lib/assets/favicon.svg";
	import { browser } from "$app/environment";

	import { onMount } from "svelte";
	import { isMobile } from "$lib/store";
	import { stories } from "$lib/store";

	const currentStory = $derived(
		page.url.pathname.split("/").filter(Boolean).pop(),
	);

	if (browser) {
		onMount(() => {
			const update = () => {
				isMobile.set(window.innerWidth < 768); // your breakpoint
			};

			update();
			window.addEventListener("resize", update);

			return () =>
				window.removeEventListener("resize", update);
		});
		const preloadBg = (url: string) => {
			const img = new window.Image();
			img.src = url;
		};
		preloadBg(bgUrl);
		preloadBg(bgSmUrl);

		const url = window.innerWidth < 768 ? bgSmUrl : bgUrl;
		document.body.style.backgroundImage = `url("${url}")`;
		document.body.classList.add("bg-loaded");
	}

	let { data, children }: LayoutProps = $props();
	let count: Number = $state(data.stories.length);
	stories.set(data.stories);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preload" as="image" href={bgUrl} />
	<link rel="preload" as="image" href={bgSmUrl} />
</svelte:head>

<div id="top-bar">
	<img src={penguin} alt="Pingulon logo." />
	<a href="/"><span id="p">p</span>ingulon.net</a>
</div>

<div id="layout">
	{#if !$isMobile}
		<div id="nav">
			<div id="nav-title">
				<div>Stories</div>
				<div>({count})</div>
			</div>
			<div id="nav-container">
				{#each data.stories as story, idx}
					<StoryCard
						href="/stories/{story.id}"
						name={story.name}
						{idx}
						selected={story.id ===
							currentStory}
					></StoryCard>
				{/each}
			</div>
		</div>
	{/if}

	<div id="content">
		{@render children()}
	</div>
</div>

<style>
	:root {
		--bg-color: rgba(180, 255, 250, 0.05);
		--shadow-color: black;
		--text-color: black;
	}
	:global(html) {
		font-family: "Inter", sans-serif;
		height: 100vh;
		min-height: 100vh;
		width: 100vw;
		margin: 0;
		padding: 0;
	}
	:global(body) {
		margin: 0;
		padding: 0;
		width: 100vw;
		background-size: cover;
		background-position: center;
		background-repeat: repeat;
		background-color: rgba(0, 0, 0, 1);
		color: var(--text-color);
	}

	:global(body.bg-loaded) {
		opacity: 1;
		transition: opacity 0.2s ease-out;
	}

	:global(body:not(.bg-loaded)) {
		opacity: 0;
	}

	div#layout {
		display: flex;
		flex-direction: row;
		height: 95vh;
	}

	div#top-bar {
		display: flex;
		flex-direction: row;
		margin-right: 8px;
		font-weight: bold;
		align-items: flex-start;
		height: 5vh;
		justify-content: left;
		align-items: center;
	}
	img {
		margin-top: 10px;
		max-width: 30pt;
	}

	#p {
		font-size: 24pt;
	}

	div#nav {
		margin: 5px;
		max-height: 90vh;
		max-width: 30vw;
	}

	div#nav-title {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		border-radius: 10px;
		border: 2px solid var(--text-color);
		margin-bottom: 5px;
		padding: 8px;
		font-weight: bold;
		box-shadow: 1px 2px var(--shadow-color);
		background-color: var(--bg-color);
		backdrop-filter: blur(100px);
		-webkit-backdrop-filter: blur(100px); /* for Safari */
	}

	a {
		all: unset;
		cursor: pointer;
	}

	div#nav-container {
		display: flex;
		flex-direction: column;
		border-radius: 10px;
		border: 2px solid var(--text-color);
		justify-content: start;
		height: fit-content;
		box-shadow: 1px 2px var(--shadow-color);
		overflow-y: auto;
		overflow-x: hidden;
		background-color: var(--bg-color);
		backdrop-filter: blur(100px);
		-webkit-backdrop-filter: blur(100px); /* for Safari */
	}

	div#content {
		height: fit-content;
		max-height: 90vh;
		width: 100%;
		margin: 5px;
		margin-right: 10px;
		border-radius: 10px;
		padding: 10px;
		border: 2px solid var(--text-color);
		box-shadow: 1px 2px var(--shadow-color);
		overflow: auto;
		background-color: var(--bg-color);
		backdrop-filter: blur(100px);
		-webkit-backdrop-filter: blur(100px); /* for Safari */
	}
</style>
