import { signOut } from '@/auth';

export default async function Admin() {
  const handleSignOut = async () => {
    'use server';
    signOut({ redirect: false }).then(() => {
      console.log('log out');
    });
  };
  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <h1 className='text-xl'>Hello Admin</h1>
      <form action={handleSignOut}>
        <button>Clear auth</button>
      </form>
    </div>
  );
}
