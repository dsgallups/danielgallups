<script>
	import '../app.css';
	import { greet, run } from '$lib/wasm/pkg/wasm';
	import { browser } from '$app/environment';

	if (browser) {
		run();
	}
</script>

<div class="page-container">
	<div id="background"></div>
	<slot />
</div>

<style lang="scss">
	.page-container {
		width: 100%;
		height: 100%;
		position: relative;
		#background {
			z-index: 0;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
		}
		:last-child {
			z-index: 1;
		}
	}
</style>
