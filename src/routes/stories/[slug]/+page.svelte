<script lang="ts">
	import type { PageProps } from "./$types";
	import { marked } from "marked";

	let { data }: PageProps = $props();
</script>

<h1>{data.story.name}</h1>
<div>{data.story.date}</div>

{#each data.story.tags as tag}
	<div>{tag}</div>
{/each}

<div>{@html marked.parse("---")}</div>
<div>{@html marked.parse(data.story.body)}</div>
