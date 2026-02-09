import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
    authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID,
    databaseURL: import.meta.env.PUBLIC_FIREBASE_DATABASE_URL,
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
