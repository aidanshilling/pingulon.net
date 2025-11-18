<script>
	let { href, name, idx, selected } = $props();
</script>

<a class:non-top-card={idx > 0} class:selected {href}>
	{name}
</a>

<style>
	a {
		all: unset;
		display: block;
		align-items: center;
		justify-content: center;
		padding: 10px;
		height: 25px;
		width: 225px;
		background-color: rgba(0, 0, 0, 0);
		cursor: pointer;
	}
	.non-top-card {
		border-top: 1px solid black;
	}
	.selected {
		background-color: rgba(225, 0, 0, 0.1);
	}
</style>
