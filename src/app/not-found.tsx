'use client';
import React from 'react';
import ErrorHeroBoard from '@/components/features/error/hero/ErrorHeroBoard';


export default function NotFound(): React.JSX.Element {
  return (
    <div>
      {/* Hero Section */}
      <ErrorHeroBoard />

      {/* Helpful Links Section */}
      {/* <div className="page-content py-12">
        <HelpfulLinksSection />
      </div> */}
    </div>
  );
}

