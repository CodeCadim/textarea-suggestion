<script>
	import { onMount } from "svelte";

	let { value = $bindable(), size, list } = $props();

	let selection = $state(-1);
	let show = $state(false);
	let focused = $state();

	let theList = [];
	onMount(() => {
		theList = Array.from(document.getElementById(list).options);
	});

	let suggestions = $derived.by(() => {
		return theList.filter((item) =>
			item.value.toLowerCase().includes(value.toLowerCase()),
		);
	});
	const key = (ev) => {
		if (!focused) return;
		if (ev.key == "ArrowDown") {
			if (value == "" && !show) show = true;
			else if (suggestions != null && selection < suggestions.length - 1)
				selection++;
		} else if (ev.key == "ArrowUp" && value != null && selection > 0)
			selection--;
		else if (
			ev.key == "Enter" &&
			suggestions.length > 0 &&
			selection > -1 &&
			show
		) {
			ev.preventDefault(); // avoid newline inserted
			choose(selection);
		} else {
			selection = 0;
			show = true;
		}
	};

	const choose = (idx) => {
		value = suggestions[idx].value;
		exit();
	};

	const exit = () => {
		selection = -1;
		show = false;
	};
</script>

<div class="elem" style="width: {size}rem">
	<textarea bind:value onkeydown={key} bind:focused onblur={exit}></textarea>
	{#if show}
		<div class="suggestions" tabindex="-1">
			{#each suggestions as item, idx}
				<button
					class="choice"
					class:selected={idx == selection}
					onmousedown={() => choose(idx)}
				>
					{item.value}
				</button>
			{/each}
		</div>
	{/if}
</div>

<style>
	.elem {
		position: relative;
	}
	textarea {
		width: 100%;
		padding: 0.5rem;
	}
	.suggestions {
		position: absolute;
		z-index: 99999;
		color: lightslategray;
		background-color: lightgray;
		display: flex;
		flex-direction: column;
		width: 100%;
	}
	.suggestions .choice {
		cursor: pointer;
		min-width: 100%;
		border-bottom: 1px solid gray;
		border-radius: 0;
		padding: 4px 1rem;
		text-align: left;
	}
	.suggestions .choice.selected {
		color: lightgray;
		background-color: lightslategray;
	}
</style>
