'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios, { AxiosError } from 'axios';

export default function VerifyEmail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (token) {
      verifyEmail(token);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const verifyEmail = async (verificationToken: string) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/auth/verify-email?token=${verificationToken}`);
      setStatus('success');
      setMessage(response.data.message);
      
      setTimeout(() => {
        router.push('/');
      }, 3000);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
      setStatus('error');
      setMessage(error.response?.data?.message || 'Ошибка верификации');
      } else {
        setStatus('error');
        setMessage('Ошибка верификации');
      }
    }
  };
  console.log(status, message);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          {status === 'loading' && (
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          )}
          
          {status === 'success' && (
            <div className="text-green-600">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <h2 className="mt-4 text-2xl font-bold">Успешно!</h2>
            </div>
          )}
          
          {status === 'error' && (
            <div className="text-red-600">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <h2 className="mt-4 text-2xl font-bold">Ошибка</h2>
            </div>
          )}
          
          <p className="mt-2 text-gray-600">{message}</p>
          
          {status === 'success' && (
            <p className="mt-4 text-sm text-gray-500">
              Вы будете перенаправлены на главную страницу через несколько секунд...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}