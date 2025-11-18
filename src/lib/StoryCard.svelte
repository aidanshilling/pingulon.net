<script>
	let { href, name, idx, selected } = $props();
</script>

<a class:non-top-card={idx > 0} class:selected {href}>
	{selected ? `>` : ``}
	{name}
</a>

<style>
	a {
		all: unset;
		width: 94%;
		padding: 10px;
		min-width: 300px;
		height: 25px;
		background-color: rgba(0, 0, 0, 0);
		cursor: pointer;
	}
	a:hover {
		text-decoration: underline;
		font-weight: bold;
		/* background-color: rgba(100, 0, 00, 0.1); */
	}
	.non-top-card {
		border-top: 1px solid black;
	}
	.selected {
		/* background-color: rgba(225, 0, 0, 0.1); */
		font-weight: bold;
	}
</style>
