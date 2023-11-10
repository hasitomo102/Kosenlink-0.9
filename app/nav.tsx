import { AuthOptions } from '@/app/auth';
import Navbar from '@/app/navbar';
import { getServerSession } from 'next-auth';

export default async function Nav() {
  const session = await getServerSession(AuthOptions);
  return <Navbar user={session?.user} />;
}
