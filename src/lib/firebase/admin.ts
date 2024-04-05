import {
    deleteApp,
    getApp,
    getApps,
    initializeApp,
    cert,
    type ServiceAccount,
} from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';


let firebaseApp;

import { env } from '$env/dynamic/private';


// implementation pulled from original geppetto build (project: AI tools/geppetto)
const serviceAccount: ServiceAccount = {
    projectId: env.FIREBASE_PROJECT_ID,
    privateKey:
        env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    clientEmail: env.FIREBASE_CLIENT_EMAIL
};

const firebaseAdminConfig = {
    credential: cert(serviceAccount),
    projectId: env.FIREBASE_PROJECT_ID,
    databaseURL: env.FIREBASE_DB_URL
};


if (!getApps().length) {

    // found at https://www.benmvp.com/blog/initializing-firebase-admin-node-sdk-env-vars/
    // firebaseApp = admin.initializeApp({
    //     credential: admin.credential.cert({
    //         projectId: env.FIREBASE_PROJECT_ID,
    //         clientEmail: env.FIREBASE_CLIENT_EMAIL,
    //         // replace `\` and `n` character pairs w/ single `\n` character
    //         privateKey: env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    //     })
    // })


    // console.log(JSON.parse(env.FIREBASE_ADMIN_CONFIG))
    firebaseApp = initializeApp(firebaseAdminConfig);
    // console.log('created App');
} else {
    firebaseApp = getApp();
    deleteApp(firebaseApp);
    firebaseApp = initializeApp(firebaseAdminConfig);
}

export const adminAuth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
