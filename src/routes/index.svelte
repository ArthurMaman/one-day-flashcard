<script>
	import Table from '$components/Table.svelte';
	import parseCSV from '$util/parseCSV.js';
	import Flash from "$components/Flash.svelte";

	let files;
	let content = [["abc", 123], ["def", 456]];
	let titles = ["Sample Data", "Default Data"];
	let jsonData = [{"Sample Data": "abc", "Default Data": 123}, {"Sample Data": "def", "Default Data": 456}];
	let state = 0;

	$: if (files) {
		const getFileContent = async file => {
			const res = await file.text();
			const arr = parseCSV(res)
			titles = arr[0];
			content = arr[1];
			jsonData = arr[2];
		};
		for (const file of files) {
			getFileContent(file);
		}
	}
</script>

<main>
	<h1>Instant FlashCard</h1>
	<div class="form-card">
		<form>
			<h2>Create flash cards from a CSV file</h2>
			<input type="file" bind:files accept="text/csv"/>
		</form>
		<div>
			<button class="form-card__button" on:click="{()=> state = 1}">Display content</button>
			<button class="form-card__button" on:click="{()=> state = 2}">Start flashing</button>
		</div>
	</div>

	{#if titles && titles.length > 0 && state > 0}
		<div class="page">
			{#if state === 1}
				<Table bind:titles={titles} bind:content={content} />
			{:else if state  === 2}
				<Flash bind:titles={titles} bind:data={jsonData} />
			{/if}
		</div>
	{:else if state > 0}
		<p>No file selected</p>
	{/if}

</main>

<style>
	:root {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	}
	:global(body){
		margin: 0;
	}

	:global(*){
		box-sizing: border-box;
	}

	main {
		text-align: center;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4rem;
		font-weight: 100;
		line-height: 1.1;
		margin: 4rem auto;
		max-width: 14rem;
	}

	p {
		max-width: 14rem;
		margin: 2rem auto;
		line-height: 1.35;
		white-space: pre;
	}

	.page {
		height: 100vh;
		padding: 50px;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;
	}

	.form-card {
		background-color: #FFA385;
		padding: 10px;
		border-radius: 5px;
		width: 600px;
		max-width: 80vw;
	}

	.form-card__button {
		border: solid 2px black;
		border-radius: 5px;
		background-color: rgba(255, 255, 255, 0.3);
		width: 40%;
		font-size: 1.2rem;
		margin: 20px;
	}

	@media (min-width: 600px) {
		h1 {
			max-width: none;
		}

		p {
			max-width: none;
		}
	}

	@media (max-width: 600px) {
		h1 {
			font-size: 2rem;
		}

		.page {
			padding: 20px;
		}
	}
</style>