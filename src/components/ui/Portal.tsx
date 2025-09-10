// components/ui/Portal.tsx
'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
  selector?: string;
}

export default function Portal({ 
  children, 
  selector = '#portal-root' 
}: PortalProps) {
  const [mounted, setMounted] = useState(false);
  const [container, setContainer] = useState<Element | null>(null);

  useEffect(() => {
    setMounted(true);
    
    // Создаем контейнер если его нет
    let targetContainer = document.querySelector(selector);
    if (!targetContainer && selector === '#portal-root') {
      targetContainer = document.createElement('div');
      targetContainer.id = 'portal-root';
      document.body.appendChild(targetContainer);
    }
    
    setContainer(targetContainer);

    return () => {
      if (selector === '#portal-root' && targetContainer && targetContainer.children.length === 0) {
        document.body.removeChild(targetContainer);
      }
    };
  }, [selector]);

  if (!mounted || !container) return null;

  return createPortal(children, container);
}