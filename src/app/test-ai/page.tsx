'use client';

import React from 'react';

export default function TestAIPage() {
  return (
    <div className="page-container">
      <div className="page-content">
        <div className="page-header">
          <h1 className="page-title">Тест AI Чат-виджета</h1>
          <p className="page-subtitle">
            Проверка функциональности AI помощника
          </p>
        </div>

        <div className="section-card">
          <h2 className="section-title">Инструкции:</h2>
          <ol className="list-decimal list-inside space-y-2 text-foreground">
            <li>
              В правом нижнем углу должна быть синяя кнопка с иконкой сообщения
            </li>
            <li>Нажмите на кнопку, чтобы открыть чат</li>
            <li>В чате должен быть зеленый индикатор статуса (AI доступен)</li>
            <li>Попробуйте отправить сообщение &quot;Привет&quot;</li>
            <li>AI должен ответить в fallback режиме</li>
          </ol>
        </div>

        <div className="section-card">
          <h3 className="section-title">Ожидаемое поведение:</h3>
          <ul className="list-disc list-inside space-y-1 text-foreground">
            <li>Виджет должен быть виден в правом нижнем углу</li>
            <li>При клике открывается чат-окно</li>
            <li>AI отвечает на простые вопросы без GigaChat API</li>
            <li>Статус всегда показывает &quot;доступен&quot;</li>
          </ul>
        </div>

        <div className="section-card">
          <p className="text-muted-foreground text-center">
            Если виджет не отображается, проверьте консоль браузера на ошибки
          </p>
        </div>
      </div>
    </div>
  );
}
