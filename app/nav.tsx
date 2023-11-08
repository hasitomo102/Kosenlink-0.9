import Navbar from '@/app/navbar';
import { auth } from '@/app/auth';

export default async function Nav() {
  const session = await auth();
  return <Navbar user={session?.user} />;
}
