'use client';

import { signOut } from 'next-auth/react';

const LogOutButton = () => {
  return (
    <button onClick={() => signOut({ redirect: true, redirectTo: '/admin' })}>
      Sign out
    </button>
  );
};

export default LogOutButton;
