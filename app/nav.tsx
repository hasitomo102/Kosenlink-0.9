import Navbar from '@/app/navbar';
import { getServerSession } from 'next-auth';

export default async function Nav() {
  const session = await getServerSession();
  console.log("user session", session);
  return <Navbar user={session?.user} />;
}
