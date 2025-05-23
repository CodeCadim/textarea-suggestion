<script>
	let value = $state("");
	let initialList = ["apple\nfraise", "banana", "pear", "cherry"];
	let selection = $state(-1);
	let show = $state(false);

	let suggestions = $derived.by(() => {
		return initialList.filter((item) =>
			item.toLowerCase().includes(value.toLowerCase()),
		);
	});
	const key = (k) => {
		console.log(k.key);
		if (k.key == "ArrowDown") {
			if (value == "" && !show) show = true;
			else if (suggestions != null && selection < suggestions.length - 1)
				selection++;
		} else if (k.key == "ArrowUp" && value != null && selection > 0)
			selection--;
		else if (k.key == "Tab" && selection > -1) choose(selection);
		else if (!show) show = true;
	};

	const choose = (idx) => {
		console.log("DEBUG choose", idx);
		value = suggestions[idx];
		exit();
	};

	const exit = () => {
		selection = -1;
		show = false;
	};
</script>

<pre>DEBUG:
value={value}
currentSelection:{selection}
suggestionsList.length:{suggestions && suggestions.length}
</pre>

<main>
	<textarea bind:value onkeydown={key}></textarea>
	{#if show}
		<div class="suggestions">
			{#each suggestions as item, idx}
				<pre
					class:selected={idx == selection}
					onclick={() => choose(idx)}>{item}</pre>
			{/each}
		</div>
	{/if}
</main>

<style>
	main {
		position: relative;
	}
	.suggestions {
		position: absolute;
		background-color: var(--gray-300);
	}
	.suggestions pre {
		cursor: pointer;
		border-bottom: 1px solid var(--gray-900);
		padding: 4px 1rem;
	}
	.suggestions pre.selected {
		background-color: var(--gray-100);
	}
</style>
