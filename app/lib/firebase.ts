import { Invoice } from "@/types/invoices";
import { User } from "@/types/user";
import { initFirestore } from "@auth/firebase-adapter";
import { cert } from "firebase-admin/app";
import { CollectionReference, DocumentData, FirestoreDataConverter, QueryDocumentSnapshot } from "firebase-admin/firestore";

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

// View the firebase admin documentation
// https://firebase.google.com/docs/reference/admin/node/firebase-admin.firestore.md#firebase-adminfirestore_module

/**
 * Define the schema types in the collections in firebase
 *
 * @export
 * @interface CollectionTypes
 */
export interface CollectionTypes {
  "users": User,
  "invoice": Invoice,
};

// /**
//  * Generic data type converter from firestore
//  *
//  * @template T
//  */
const genericConverter = <T>() => ({
	toFirestore: (inputData: T) => inputData,
	fromFirestore: (snapshot: QueryDocumentSnapshot): T => snapshot.data() as T,
});


/**
 * Create a collection function, using typecasting and the withConverter function to get typed data back from firestore
 *
 * @template T
 * @param {string} collectionName
 * @return {*}  {CollectionReference<T>}
 */
const getCollection = <T extends keyof CollectionTypes>(
	collectionName: T
) => {
	const converter = genericConverter<CollectionTypes[T]>() as FirestoreDataConverter<CollectionTypes[T]>;
	// return collection(db, collectionName).withConverter<T>(converter);
	return firestore.collection(collectionName).withConverter<CollectionTypes[T]>(converter);
};