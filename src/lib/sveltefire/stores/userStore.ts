
import { writable, type Writable } from "svelte/store";

import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged, type Auth } from "firebase/auth";

import type { CompositeUser, Profile } from "$lib/types";
import { auth, firestore } from "../../firebase/client";

import { env } from "$env/dynamic/public";

const initialState: CompositeUser = { // create initial values for the store
    authUser: null,
    profile: {
    },
    state: {
        view: 0
    }
};

/**
 * @param  {Auth} auth firebase auth instance
 * @param  {any} startWith optional default data. Useful for server-side cookie-based auth
 * @returns a store with the current firebase user
 */
export function userStore(auth: Auth, startWith = initialState) {
    let unsubscribe: () => void;
    // Fallback for SSR
    if (!globalThis.window) {
        const { subscribe, set, update } = writable(startWith);
        return {
            subscribe,
            set, update
        };
    }
    // Fallback for missing SDK
    if (!auth) {
        console.warn(
            "Firebase Auth is not initialized. Are you missing FirebaseApp as a parent component?"
        );
        const { subscribe, set, update } = writable(startWith);
        return {
            subscribe,
            set, update
        };
    }

    // create a store that listens fire a firebase auth state change
    const { subscribe, set, update } = writable<CompositeUser>(initialState, (set) => {
        unsubscribe = onAuthStateChanged(auth, (authUser) => {
            if (authUser) {
                const userProfileRef = doc(firestore, 'profiles', authUser.uid);

                // onSnapshot listens for real-time updates to the user profile in firebase
                const unsubscribeProfile = onSnapshot(userProfileRef, async (docSnapshot) => {
                    if (docSnapshot.exists()) {
                        let userProfileData: Profile = docSnapshot.data() as Profile;

                        /* 
                        set up the user here 
                        */

                        // set the store to its new values
                        set({ authUser, profile: userProfileData, state: { ...initialState.state, view: 2, } });

                    } else { // user is new

                        let userProfileData: Profile = {
                            // config the new user
                        };

                        await setDoc(userProfileRef, userProfileData);
                        // New profile setup doesn't need an immediate store update since the setDoc operation
                        // will trigger the snapshot listener to update the store.
                    }
                });

                return () => {
                    unsubscribeProfile(); // Unsubscribe from profile changes when the store is unsubscribed
                };

            } else {
                set(initialState); // Reset the store if the user logs out
            }
        });

        return () => {
            unsubscribe(); // Unsubscribe from auth state changes when the store is unsubscribed
        };
    }) as {
        subscribe: Writable<CompositeUser>["subscribe"],
        set: Writable<CompositeUser>["set"],
        update: (updater: (value: CompositeUser) => CompositeUser) => void
    };

    return {
        subscribe,
        set, update
    };
}

export const user = userStore(auth)