import { signIn } from '@/auth';

export default async function Admin() {
  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <form>
        <button type='submit'>SignIn with google</button>
      </form>
      <h1 className='text-xl '>Hello Admin</h1>
    </div>
  );
}
