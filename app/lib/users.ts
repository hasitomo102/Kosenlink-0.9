import { getCollection } from "@/app/lib/firebase";

export /**
 * Function will search for users with the substring
 *
 * @param {string} searchString
 * @return {*} 
 */
const searchUsers = async (searchString: string) => {
    const search = searchString.toLowerCase();

    // define query
    const query = getCollection("users").where('name', '>=', search).where('name', '<=', search + '\uf8ff');
    const snapshot = await query.get();

    // return user objects
    return snapshot.docs.map((userDoc) => userDoc.data());
}