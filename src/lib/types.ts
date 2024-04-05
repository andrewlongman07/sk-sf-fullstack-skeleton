import type { User } from "firebase/auth";


// blank user profile - user app settings
export type Profile = {

}

// track app state
export type State = {
    view: 0 | 1 | 2, // logged out | signup / signin | signed in
}

// composite of user profile, state and authUser object from firebase
export type CompositeUser = {
    authUser: User | null,
    profile: Profile,
    state: State
}