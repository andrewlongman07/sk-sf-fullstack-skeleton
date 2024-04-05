import { writable } from 'svelte/store';

import type { Firestore } from 'firebase/firestore';

import type { Auth } from 'firebase/auth';

// SDK store for FirebaseApp comopnent
export const sdk = writable<{ auth: Auth; firestore: Firestore }>();

