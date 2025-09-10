'use client';
import React from 'react';

const QrSection: React.FC = () => {
  return (
    <div className="section-card">
      <div className="page-header">
        <h2 className="page-title">QR-код для оплаты</h2>
        <p className="page-subtitle">
          Отсканируйте QR-код для оплаты через мобильное приложение банка
        </p>
      </div>

      <div className="flex justify-center">
        <div className="bg-card/50 p-8 rounded-2xl border border-border/50 shadow-luxury">
          <img
            src="http://ArtDesignGevorgyans.mooo.com/qr/qr.webp"
            alt="QR-код для оплаты"
            width={400}
            height={400}
            className="rounded-xl shadow-luxury"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default QrSection;
