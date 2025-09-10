import React, { useState, FormEvent, useEffect } from 'react';
import axiosInstance from '../../../shared/api/axiosInstance';
import { MessageCircle, Send, X, Phone, Bot, User } from 'lucide-react';

// TypeScript interfaces
interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const AIChatWidget: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Добавляем приветственное сообщение при первом открытии
  useEffect(() => {
    if (open && messages.length === 0) {
      const welcomeMessage: Message = {
        role: 'assistant',
        content: 'Привет 👋 Чем я могу вам помочь сегодня?',
      };
      setMessages([welcomeMessage]);
    }
  }, [open, messages.length]);

  const submitHandler = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const message = formData.get('message') as string;

    if (!message.trim()) return;

    setMessages((prev) => [...prev, { role: 'user', content: message }]);
    setIsLoading(true);
    e.currentTarget.reset();

    try {
      const response = await axiosInstance.post('/ai/messages', { message });
      setMessages((prev) => [...prev, response.data]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Извините, произошла ошибка. Попробуйте позже.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] ai-widget-container">
      {/* Кнопка открытия чата */}
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center ai-widget-button transform hover:scale-105"
          title="Виртуальный помощник"
        >
          <MessageCircle color="white" size={24} />
        </button>
        {/* Индикатор статуса */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm animate-pulse"></div>
        {/* Индикатор непрочитанных сообщений */}
        {messages.length > 1 && !open && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold border-2 border-white">
            {messages.length - 1}
          </div>
        )}
      </div>

      {/* Окно чата */}
      {open && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col z-[9999] ai-widget-chat animate-slide-up">
          {/* Шапка чата */}
          <div className="bg-white border-b border-gray-200 px-4 py-3 rounded-t-xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <Bot size={16} color="#6b7280" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Виртуальный помощник
                </h3>
                <p className="text-xs text-gray-500">Онлайн</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Сообщения */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-end space-x-2 ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                } animate-fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot size={14} color="#6b7280" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-3 message-bubble ${
                    message.role === 'user'
                      ? 'bg-pink-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-800 shadow-sm'
                  }`}
                >
                  <div className="text-sm leading-relaxed whitespace-pre-line">
                    {message.content}
                  </div>
                </div>
                {message.role === 'user' && (
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                    <User size={14} color="white" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-end space-x-2 justify-start animate-fade-in">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot size={14} color="#6b7280" />
                </div>
                <div className="bg-gray-100 rounded-2xl px-4 py-3 shadow-sm">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: '0.1s' }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: '0.2s' }}
                      ></div>
                    </div>
                    <span className="text-gray-500 text-xs">Печатает...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Форма ввода */}
          <div className="p-4 bg-white border-t border-gray-200 rounded-b-xl">
            <form onSubmit={submitHandler} className="flex space-x-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  name="message"
                  placeholder="Напишите ваше сообщение..."
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white text-gray-900 placeholder-gray-500 shadow-sm hover:shadow-md transition-all"
                />
                {isLoading && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="w-5 h-5 border-2 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-12 h-12 bg-pink-500 hover:bg-pink-600 disabled:bg-gray-300 text-white rounded-full flex items-center justify-center transition-all shadow-md hover:shadow-lg hover:scale-105 disabled:hover:scale-100"
                title="Отправить сообщение"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChatWidget;
