<script lang="ts">
	import type { CollectionReference, Firestore, Query } from 'firebase/firestore';

	import { collectionStore } from '../stores/collectionStore';
	import { sdk } from '../stores/sdkStore';

	// TODO figure out how to make generics work
	// current setup will not work without mandatory startWith value
	// type T = $$Generic;

	// interface $$Slots {
	//   default: { data: T[], ref: CollectionReference | Query, count: number }
	// }

	interface $$Slots {
		default: { data: any[]; ref: CollectionReference | Query | null; count: number };
		loading: {};
	}

	export let ref: string | CollectionReference | Query;
	export let firestore: Firestore = $sdk?.firestore;
	export let startWith: any = undefined;

	$: store = collectionStore(firestore, ref, startWith);
</script>

{#if $store !== undefined}
	<slot data={$store} ref={store.ref} count={$store?.length ?? 0} />
{:else}
	<slot name="loading" />
{/if}
