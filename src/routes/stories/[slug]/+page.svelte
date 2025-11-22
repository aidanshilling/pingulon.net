<script lang="ts">
	import type { PageProps } from "./$types";
	import { marked } from "marked";

	let { data }: PageProps = $props();
</script>

<div id="title">
	<h1>{data.story.name}</h1>
	<div>
		{new Date(data.story.date).toLocaleDateString(undefined, {
			month: "long",
			day: "numeric",
			year: "numeric",
		})}
	</div>
</div>

<h4>By Aidan Shilling</h4>

<div id="tags">
	{#each data.story.tags as tag}
		<div class="tag">#{tag}</div>
	{/each}
</div>

<div>{@html marked.parse(data.story.body)}</div>

<style>
	h1 {
		margin: 0;
	}

	h4 {
		margin: 0;
		font-weight: 400;
		margin-bottom: 4px;
	}

	.tag {
		border-radius: 10px;
		background-color: rgba(70, 20, 115, 0.5);
		padding: 4px;
		font-size: 8pt;
		width: fit-content;
		border: 1px solid black;
		margin-right: 4px;
		margin-top: 4px;
	}

	div#tags {
		display: flex;
		flex-direction: row;
		border-bottom: 1px solid black;
		padding-bottom: 16px;
	}
	div#title {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
</style>
