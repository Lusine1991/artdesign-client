'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAppSelector } from '@/store/hooks';
import { LogoutButton } from '@/components/features/auth/logout-button';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { user } = useAppSelector((state) => state.user);

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
      className={`sticky mb-[10px] px-[30px] top-0 z-50 w-full text-[20px] backdrop-blur supports-[backdrop-filter]:bg-background/60 ${
        scrolled ? 'shadow-luxury' : ''
      }`}
    >
      <div className="container flex h-[60px] items-center">
        <div className="mr-4 flex">
          <Link
            href="/main"
            className="mr-6 flex items-center space-x-3 hover:underline decoration-white"
          >
            <span
              className="font-bold text-xl underline"
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
              <div className="flex gap-[30px] items-center">
                <Link
                  href="/main"
                  className="px-4 py-2 text-[20px] rounded hover:bg-hsl(43 96% 90%) hover:text-black transition-colors"
                  style={{
                    backgroundColor: 'black',
                    color: 'hsl(43 96% 90%)',
                  }}
                >
                  Главная
                </Link>
                <Link
                  href="/about"
                  className="px-4 py-2 text-[20px]  rounded hover:bg-hsl(43 96% 90%) hover:text-black transition-colors"
                  style={{
                    backgroundColor: 'black',
                    color: 'hsl(43 96% 90%)',
                  }}
                >
                  О нас
                </Link>
                <Link
                  href="/add-order"
                  className="px-4 py-2 text-[20px] rounded hover:bg-hsl(43 96% 90%) hover:text-black transition-colors"
                  style={{
                    backgroundColor: 'black',
                    color: 'hsl(43 96% 90%)',
                  }}
                >
                  Оформить заказ
                </Link>

                <Link
                  href="/user-profile"
                  className="px-4 py-2 text-[20px] rounded hover:bg-hsl(43 96% 90%) hover:text-black transition-colors"
                  style={{
                    backgroundColor: 'black',
                    color: 'hsl(43 96% 90%)',
                  }}
                >
                  Личный кабинет
                </Link>
              </div>
              <LogoutButton />
            </>
          ) : (
            <>
              <div></div>
              <div className="flex items-center space-x-3">
                <Link
                  href="/login"
                  className="px-4 py-2 text-[20px] rounded hover:bg-hsl(43 96% 90%) hover:text-black transition-colors"
                  style={{
                    backgroundColor: 'black',
                    color: 'hsl(43 96% 90%)',
                  }}
                >
                  Вход
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 text-[20px] rounded hover:bg-hsl(43 96% 90%) hover:text-black transition-colors"
                  style={{
                    backgroundColor: 'black',
                    color: 'hsl(43 96% 90%)',
                  }}
                >
                  Регистрация
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
