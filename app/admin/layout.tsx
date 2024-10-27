'use client';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = useSession();
  const pathName = usePathname();
  useEffect(() => {
    if (pathName === '/admin/dashboard' && session.status === 'unauthenticated')
      session.update();
  }, [pathName, session]);

  return <>{children}</>;
}
