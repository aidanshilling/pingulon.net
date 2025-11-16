<script lang="ts">
	import favicon from "$lib/assets/favicon.svg";
	import type { LayoutProps } from "./$types";

	let { data, children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div id="layout">
	<div id="nav">
		{#each data.stories as story}
			<a href="/stories/{story.name}">{story.name}</a>
		{/each}
	</div>
	<div>
		{@render children()}
	</div>
</div>

<style>
	div#layout {
		display: flex;
		flex-direction: row;
	}

	div#nav {
		display: flex;
		flex-direction: column;
	}
</style>
