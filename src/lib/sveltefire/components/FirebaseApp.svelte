<script lang="ts">
	import type { Auth } from 'firebase/auth';
	import type { Firestore } from 'firebase/firestore';
	import { sdk } from '../stores/sdkStore';

	export let firestore: Firestore;
	export let auth: Auth;
	sdk.set({ firestore, auth });
</script>

<div class="flex h-screen w-full">
	<slot />
</div>
