import { writable } from 'svelte/store';
import { doc, collection, onSnapshot } from 'firebase/firestore';
import type {
    Firestore,
    Query,
    CollectionReference,
    DocumentReference, DocumentData
} from 'firebase/firestore';

// doc store
/**
 * @param  {Firestore} firestore firebase firestore instance
 * @param  {string|DocumentReference} ref document path or reference
 * @param  {any} startWith optional default data
 * @returns a store with realtime updates on document data
 */
export function docStore<T>(
    firestore: Firestore,
    ref: string | DocumentReference,
    startWith?: T
) {
    let unsubscribe: () => void;

    // Fallback for SSR
    if (!firestore || !globalThis.window) {
        console.warn('Firestore is not initialized or not in browser');
        const { subscribe } = writable(startWith);
        return {
            subscribe,
            ref: null,
            id: '',
        }
    }

    const docRef = typeof ref === 'string' ? doc(firestore, ref) : ref;

    const { subscribe } = writable<T | null>(startWith, (set) => {
        unsubscribe = onSnapshot(docRef, (snapshot) => {
            set((snapshot.data() as T) ?? null);
        });

        return () => unsubscribe();
    });

    return {
        subscribe,
        ref: docRef,
        id: docRef.id,
    };
}
