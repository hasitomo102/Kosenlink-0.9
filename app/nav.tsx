import { AuthOptions } from '@/app/auth';
import { getUserWithEmail } from '@/app/lib/users';
import Navbar from '@/app/navbar';
import { getServerSession } from 'next-auth';

export default async function Nav() {
  const session = await getServerSession(AuthOptions);
  // fetch the user with the email
  const user = await getUserWithEmail(session?.user?.email);
  // remove the timestamp from the object
  delete user?.emailVerified;
  return <Navbar user={user} />;
}
