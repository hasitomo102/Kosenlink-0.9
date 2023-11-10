import Navbar from '@/app/navbar';
import { getServerSession } from 'next-auth';

export default async function Nav() {
  const session = await getServerSession();
  return <Navbar user={session?.user} />;
}
