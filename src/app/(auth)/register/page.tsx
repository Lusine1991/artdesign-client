'use client';

import { ProtectedRoute } from '@/components/layout/protected-route';
import { RegisterForm } from '@/components/forms/register-form';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <ProtectedRoute requireAuth={false}>
      <div className="page-container">
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <h2 className="page-title text-3xl">
                Gevorgyan&apos;s Art & Design Studio
              </h2>
              <p className="page-subtitle">Создайте новый аккаунт</p>
            </div>

            <div className="form-container">
              <RegisterForm />

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-card text-muted-foreground">
                      Или
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <Link href="/login">
                    <Button variant="outline" className="w-full btn-outline">
                      Войти
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
