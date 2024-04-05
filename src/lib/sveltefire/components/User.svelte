<script lang="ts">
	import type { User } from 'firebase/auth';

	import { user } from '../stores/userStore';

	interface $$Slots {
		default: { user: User };
		signedOut: {};
	}

	// wait for User to be available in authUser slot in userStore
	let usr: User;
	$: if ($user?.authUser != null) {
		usr = $user?.authUser;
	}
</script>

<div class="h-full w-full">
	<div class="w-full h-full">
		<slot user={usr} />
	</div>

	<!-- <ErrorToast /> -->
</div>
