<script>
	import '../app.css';
	import { run } from '$lib/wasm/pkg/wasm';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	onMount(() => {
		run();
	});
</script>

<div class="page-container">
	<div id="pagetext"></div>
	<div id="background"><slot /></div>
</div>

<style lang="scss">
	.page-container {
		width: 100vw;
		height: 100vh;
		position: relative;
		#background {
			z-index: 0;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			overflow: hidden;
		}

		:last-child {
			z-index: 1;
		}
	}
</style>
