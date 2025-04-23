import { initFirestore } from "@auth/firebase-adapter";
import { cert } from "firebase-admin/app";
import { FirestoreDataConverter, QueryDocumentSnapshot } from "firebase-admin/firestore";
import { Invoice } from "@/types/invoices";
import { InvitedUser, User } from "@/types/user";

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT!);

export const firestore = initFirestore({
  credential: cert(serviceAccount),
});

export interface CollectionTypes {
  "users": User,
  "invoice": Invoice,
}

export interface SubcollectionTypes {
  "invited-users": InvitedUser,
}

const ParentCollection: Record<keyof SubcollectionTypes, keyof CollectionTypes> = {
  "invited-users": "users",
}

const genericConverter = <T>() => ({
  toFirestore: (inputData: T) => inputData,
  fromFirestore: (snapshot: QueryDocumentSnapshot): T => snapshot.data() as T,
});

export const fetchCollection = <T extends keyof CollectionTypes>(collectionName: T) => {
  const converter = genericConverter<Partial<CollectionTypes[T]>>() as FirestoreDataConverter<Partial<CollectionTypes[T]>>;
  return firestore.collection(collectionName).withConverter(converter);
};

export const mutateCollection = <T extends keyof CollectionTypes>(collectionName: T) => {
  const converter = genericConverter<CollectionTypes[T]>() as FirestoreDataConverter<CollectionTypes[T]>;
  return firestore.collection(collectionName).withConverter(converter);
};

export const fetchSubcollection = <T extends keyof SubcollectionTypes>(subcollectionName: T, docID: string) => {
  const converter = genericConverter<Partial<SubcollectionTypes[T]>>() as FirestoreDataConverter<Partial<SubcollectionTypes[T]>>;
  return firestore.collection(ParentCollection[subcollectionName]).doc(docID).collection(subcollectionName).withConverter(converter);
};

export const mutateSubcollection = <T extends keyof SubcollectionTypes>(subcollectionName: T, docID: string) => {
  const converter = genericConverter<SubcollectionTypes[T]>() as FirestoreDataConverter<SubcollectionTypes[T]>;
  return firestore.collection(ParentCollection[subcollectionName]).doc(docID).collection(subcollectionName).withConverter(converter);
};