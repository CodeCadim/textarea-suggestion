<script>
	import TextArea from "./textarea.svelte";
	let value = $state("");
	let samples = $state(["banana", "orange", "apple"]);
</script>

<datalist id="datas">
	{#each samples as fruit}
		<option value={fruit}>{fruit}</option>
	{/each}
</datalist>

<TextArea list="datas" bind:value size="20" />

<p>
	Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor doloremque
	nobis quis deleniti officia consectetur libero ab harum, animi unde
	architecto nam ratione culpa tempora? Debitis doloremque ipsa adipisci
	cumque.
</p>

<pre>
{JSON.stringify(value, null, "  ")}
</pre>
