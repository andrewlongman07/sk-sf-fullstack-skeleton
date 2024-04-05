<script lang="ts">
	import '../app.css';

	import FirebaseApp from '$lib/sveltefire/components/FirebaseApp.svelte';
	import User from '$lib/sveltefire/components/User.svelte';

	import { auth, firestore } from '$lib/firebase/client';
	import { user } from '$lib/sveltefire/stores/userStore';
</script>

<FirebaseApp {auth} {firestore}>
	<User>
		<div class="flex flex-col w-full h-full justify-center items-center">
			<h1 class="text-3xl">Create your components here</h1>
			<p>
				use the $user store to propagate user auth object, profile and state information throughout
				the app
			</p>
		</div>
	</User>
</FirebaseApp>

<!-- style="background-image: url('/pastel_splashes.png'); background-size: cover; background-position: center;" -->
