import { fetchCollection } from "@/app/lib/firebase";

export /**
 * Function will search for users with the substring
 *
 * @param {string} searchString
 * @return {*} 
 */
const searchUsers = async (searchString: string) => {
    const search = searchString.toLowerCase();

    // define query
    const query = fetchCollection("users").where('email', '>=', search).where('email', '<=', search + '\uf8ff');
    // const query = fetchCollection("users");
    const snapshot = await query.get();

    // return user objects, making sure id is required
    return snapshot.docs.map((userDoc) => ({ ...userDoc.data(), id: userDoc.id }));
}