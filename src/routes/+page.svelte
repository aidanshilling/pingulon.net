<script lang="ts">
	import type { PageProps } from "./$types";

	let { data }: PageProps = $props();
</script>

<div>My Stories!</div>

<div>
	{#each data.stories as story}
		<div><a href="/stories/{story.name}">{story.name}</a></div>
	{/each}
</div>
