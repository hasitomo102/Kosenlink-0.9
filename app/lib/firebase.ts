import { initFirestore } from "@auth/firebase-adapter";
import { cert } from "firebase-admin/app";

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT!);

export const firestore = initFirestore({
  credential: cert(serviceAccount),
});