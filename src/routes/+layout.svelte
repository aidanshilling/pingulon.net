<script lang="ts">
	import favicon from "$lib/assets/favicon.svg";
	import StoryCard from "$lib/StoryCard.svelte";
	import type { LayoutProps } from "./$types";
	import { page } from "$app/state";

	const currentStory = $derived(
		page.url.pathname.split("/").filter(Boolean).pop(),
	);

	// TODO: Remove this after done debugging state changes
	$effect(() => {
		console.log(currentStory);
	});

	let { data, children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div id="top-bar">
	<div>pingulon.net</div>
</div>

<div id="layout">
	<div id="nav">
		<div id="nav-title">Stories</div>
		<div id="nav-container">
			{#each data.stories as story, idx}
				<StoryCard
					href="/stories/{story.name}"
					name={story.name}
					{idx}
					selected={story.name === currentStory}
				></StoryCard>
			{/each}
		</div>
	</div>
	<div id="content">
		{@render children()}
	</div>
</div>

<style>
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
	}

	div#nav {
		margin: 5px;
		max-height: 90vh;
	}

	div#nav-title {
		border-radius: 5px;
		border: 1px solid black;
		margin-bottom: 5px;
		padding: 8px;
		font-weight: bold;
		box-shadow: 0px 1px;
	}

	div#nav-container {
		display: flex;
		flex-direction: column;
		border-radius: 5px;
		border: 1px solid black;
		justify-content: start;
		height: fit-content;
		box-shadow: 0px 1px;
	}

	div#content {
		height: 90vh;
		width: 100%;
		margin: 5px;
		border-radius: 5px;
		padding: 10px;
		border: 1px solid black;
		box-shadow: 0px 1px;
		overflow: auto;
	}
</style>
