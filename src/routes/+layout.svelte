<script lang="ts">
	import favicon from "$lib/assets/favicon.svg";
	import StoryCard from "$lib/StoryCard.svelte";
	import type { LayoutProps } from "./$types";
	import { page } from "$app/state";
	import bgUrl from "$lib/assets/bg.jpg";
	import { browser } from "$app/environment";

	import { onMount } from "svelte";
	import { isMobile } from "$lib/store";
	import { stories } from "$lib/store";

	const currentStory = $derived(
		page.url.pathname.split("/").filter(Boolean).pop(),
	);

	$effect(() => {
		document.body.style.backgroundImage = `url(${bgUrl})`;
	});

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
	}

	let { data, children }: LayoutProps = $props();
	let count: Number = $state(data.stories.length);
	stories.set(data.stories);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div id="top-bar">
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
		--bg-color: rgba(255, 255, 255, 0);
		--shadow-color: black;
		--text-color: black;
	}
	:global(html) {
		font-family: "Inter", sans-serif;
		height: 100vh;
	}
	:global(body) {
		all: unset;
		position: relative;
		background-size: cover;
		background-position: center;
		background-color: rgba(84, 84, 90);
		color: var(--text-color);
	}

	:global(body)::before {
		content: "";
		position: fixed;
		inset: 0;
		pointer-events: none;
		z-index: -1; /* stays behind content */
		background: rgba(255, 255, 255, 0.05);
	}

	div#layout {
		display: flex;
		flex-direction: row;
		height: 95vh;
	}

	div#top-bar {
		display: flex;
		flex-direction: row;
		margin-left: 8px;
		margin-right: 8px;
		font-weight: bold;
		height: 5vh;
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
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px); /* for Safari */
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
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px); /* for Safari */
	}

	div#content {
		max-height: fit-content;
		width: 100%;
		margin: 5px;
		border-radius: 10px;
		padding: 10px;
		border: 2px solid var(--text-color);
		box-shadow: 1px 2px var(--shadow-color);
		overflow: auto;
		background-color: var(--bg-color);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px); /* for Safari */
	}
</style>
