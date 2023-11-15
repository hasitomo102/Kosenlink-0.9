import { AuthOptions } from '@/app/auth';
import { getUserWithEmail } from '@/app/lib/users';
import Navbar from '@/app/navbar';
import { getServerSession } from 'next-auth';

export default async function Nav() {
  const session = await getServerSession(AuthOptions);
  // fetch the user with the email
  const user = await getUserWithEmail(session?.user?.email, true);
  return <Navbar user={user} />;
}
