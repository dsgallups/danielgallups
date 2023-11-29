<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">Daniel Gallups</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a
					class="btn btn-sm variant-soft-surface"
					href="https://www.linkedin.com/in/daniel-gallups/"
					target="_blank"
					rel="noreferrer"
				>
					<i class="fa-brands fa-linkedin text-lg" />
				</a>
				<a
					class="btn btn-sm variant-soft-surface"
					href="https://github.com/dsgallups"
					target="_blank"
					rel="noreferrer"
				>
					<i class="fa-brands fa-github text-lg" />
				</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
