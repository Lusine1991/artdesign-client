'use client';

import { Button } from "@/components/ui/button";
import { logout } from "@/entities/user/model/thunks";
import { useAppDispatch } from "@/store/hooks";

export function LogoutButton() {
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap().then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleLogout}
      style={{
        backgroundColor: 'black',
        color: 'hsl(43 96% 90%)',
        border: '1px solid hsl(43 96% 90%)',
      }}
    >
      Выйти
    </Button>
  );
}
