import { redirect } from 'next/navigation';

export default function HomePage() {
  redirect('/store');
  return null;
}
