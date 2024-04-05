# Sveltekit - SvelteFire (Firebase) - Tailwind CSS - DaisyUI

1. create a firebase project, fill in the client.ts and .env variables

## The User Store

The user store handles auth and propagates the auth instance user pbject throughout the frontend. There is a 'profile' and 'state' object on the store for extra user profile data (create a user profile in firebase with the UID - a listener in the store will update this when you make changes to the firebase) and state management. 

### Auth

The state object already has states 0, 1, and 2. Create a component whose state is controlled by this, and build the login flow accordingly. Create whichever FirebaseAuth function you need and the listener in the userstore will update and set the state to 2.