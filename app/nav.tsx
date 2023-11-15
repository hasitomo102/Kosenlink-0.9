import { AuthOptions } from '@/app/auth';
import Navbar from '@/app/navbar';
import { getServerSession } from 'next-auth';

export default async function Nav() {
  const session = await getServerSession(AuthOptions);
  console.log("Session:", session);
  return <Navbar user={session?.user} />;
}
