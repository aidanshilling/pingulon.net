<script lang="ts">
	import favicon from "$lib/assets/favicon.svg";
	import StoryCard from "$lib/StoryCard.svelte";
	import type { LayoutProps } from "./$types";
	import { page } from "$app/state";
	import bgUrl from "$lib/assets/bg3.svg";
	//import bgUrl from "$lib/assets/bg.jpg";

	const currentStory = $derived(
		page.url.pathname.split("/").filter(Boolean).pop(),
	);

	$effect(() => {
		document.body.style.backgroundImage = `url(${bgUrl})`;
		console.log(currentStory);
	});

	let { data, children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div id="top-bar">
	<a href="/"><span id="p">p</span>ingulon.net</a>
</div>

<div id="layout">
	<div id="nav">
		<div id="nav-title">Stories</div>
		<div id="nav-container">
			{#each data.stories as story, idx}
				<StoryCard
					href="/stories/{story.id}"
					name={story.name}
					{idx}
					selected={story.id === currentStory}
				></StoryCard>
			{/each}
		</div>
	</div>
	<div id="content">
		{@render children()}
	</div>
</div>

<style>
	:global(html) {
		font-family: "Inter", sans-serif;
	}
	:global(body) {
		position: relative;
		background-size: cover;
		background-position: center;
	}

	:global(body)::before {
		content: "";
		position: fixed;
		inset: 0;
		pointer-events: none;
		z-index: -1; /* stays behind content */
		/* background: rgba(255, 255, 255, 0.1); */
	}

	div#layout {
		display: flex;
		flex-direction: row;
		max-height: 100vh;
		min-width: 100vh;
	}

	div#top-bar {
		display: flex;
		flex-direction: row;
		margin-left: 8px;
		margin-right: 8px;
		margin-bottom: 10px;
		font-weight: bold;
	}
	#p {
		font-size: 24pt;
	}

	div#nav {
		margin: 5px;
		max-height: 90vh;
	}

	div#nav-title {
		border-radius: 10px;
		border: 2px solid black;
		margin-bottom: 5px;
		padding: 8px;
		font-weight: bold;
		box-shadow: 0px 2px;
	}

	a {
		all: unset;
		cursor: pointer;
	}

	div#nav-container {
		display: flex;
		flex-direction: column;
		border-radius: 10px;
		border: 2px solid black;
		justify-content: start;
		height: fit-content;
		box-shadow: 0px 2px;
		overflow: auto;
	}

	div#content {
		height: 90vh;
		width: 100%;
		margin: 5px;
		border-radius: 10px;
		padding: 10px;
		border: 2px solid black;
		box-shadow: 0px 2px;
		overflow: auto;
	}
</style>
