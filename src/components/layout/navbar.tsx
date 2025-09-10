'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';
import { Button } from '@/components/ui/button';
import { LogoutButton } from '@/components/features/auth/logout-button';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { user } = useAppSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [user]);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${
        scrolled ? 'shadow-luxury' : ''
      }`}
    >
      <div className="container flex h-[60px] items-center">
        <div className="mr-4 flex">
          <Link href="/main" className="mr-6 flex items-center space-x-3">
            <span
              className="font-bold text-xl"
              style={{ color: 'hsl(43 96% 90%)' }}
            >
              Gevorgyan&apos;s <br /> Art & Design Studio
            </span>
          </Link>
        </div>

        <div className="flex flex-1 space-x-3 items-center justify-between ">
          {user ? (
            <>
              <div></div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => router.push('/main')}
                  style={{
                    backgroundColor: 'black',
                    color: 'hsl(43 96% 90%)',
                    border: '1px solid hsl(43 96% 90%)',
                  }}
                >
                  Главная
                </Button> 
                <Button
                  variant="outline"
                  onClick={() => router.push('/about')}
                  style={{
                    backgroundColor: 'black',
                    color: 'hsl(43 96% 90%)',
                    border: '1px solid hsl(43 96% 90%)',
                  }}
                >
                  О нас
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push('/add-order')}
                  style={{
                    backgroundColor: 'black',
                    color: 'hsl(43 96% 90%)',
                    border: '1px solid hsl(43 96% 90%)',
                  }}
                >
                  Оформить заказ
                </Button>

                <Button
                  variant="outline"
                  onClick={() => router.push('/user-profile')}
                  style={{
                    backgroundColor: 'black',
                    color: 'hsl(43 96% 90%)',
                    border: '1px solid hsl(43 96% 90%)',
                  }}
                >
              
                  Личный кабинет
                </Button>
              </div>
                <LogoutButton />
            </>
          ) : (
            <>
              <div></div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => router.push('/login')}
                  style={{
                    backgroundColor: 'black',
                    color: 'hsl(43 96% 90%)',
                    border: '1px solid hsl(43 96% 90%)',
                  }}
                >
                  Вход
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push('/register')}
                  style={{
                    backgroundColor: 'black',
                    color: 'hsl(43 96% 90%)',
                    border: '1px solid hsl(43 96% 90%)',
                  }}
                >
                  Регистрация
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
