<script lang="ts">
	import StoryCard from "$lib/StoryCard.svelte";

	import { isMobile } from "$lib/store";
	import { stories } from "$lib/store";
</script>

{#if $isMobile}
	<div id="welcome">Welcome, pick a story from the list!</div>
	<div id="nav-title">
		<div>Stories</div>
		<div>({$stories.length})</div>
	</div>
	<div id="story-list">
		{#each $stories as story, idx}
			<StoryCard
				href="/stories/{story.id}"
				name={story.name}
				{idx}
				selected={idx == 1}
			></StoryCard>
		{/each}
	</div>
{:else}
	<div>Welcome, pick a story from the list!</div>
{/if}

<style>
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

	div#story-list {
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
	div#welcome {
		margin-bottom: 10px;
	}
</style>
