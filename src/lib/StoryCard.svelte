<script>
	let { href, name, idx } = $props();
</script>

{#if idx > 0}
	<div style="border-top: 1px solid black">
		<a {href}>{name}</a>
	</div>
{:else}
	<div>
		<a {href}>{name}</a>
	</div>
{/if}

<style>
	div {
		padding: 10px;
		height: 25px;
		width: 225px;
	}
</style>
