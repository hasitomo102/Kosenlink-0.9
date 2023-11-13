import { initFirestore } from "@auth/firebase-adapter";
import { cert } from "firebase-admin/app";

// will initialize firestore safely
// must init a firebase account and a firestore database
// https://authjs.dev/reference/adapter/firebase#initfirestore
export const firestore = initFirestore({
 credential: cert({
   projectId: process.env.FIREBASE_PROJECT_ID,
   clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
   privateKey: process.env.FIREBASE_PRIVATE_KEY,
 })
});

type CollectionName = "users" | "invoices";

export /**
 * Main 
 *
 */
const getCollection = (collectionName: CollectionName) => {

}