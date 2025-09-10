'use client';

import Link from 'next/link';
import { logout } from '@/entities/user/model/thunks';
import { useAppDispatch } from '@/store/hooks';

export function LogoutButton() {
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      await dispatch(logout())
        .unwrap()
        .then(() => {
          window.location.reload();
        });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <Link
      href="#"
      onClick={(e) => {
        e.preventDefault();
        handleLogout();
      }}
      className="px-4 py-2 text-[20px] rounded hover:bg-hsl(43 96% 90%) hover:text-black transition-colors"
      style={{
        backgroundColor: 'black',
        color: 'hsl(43 96% 90%)',
      }}
    >
      Выйти
    </Link>
  );
}
