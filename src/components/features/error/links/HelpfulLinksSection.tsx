"use client";
import React from "react";

import { useRouter } from "next/navigation";
import { ShoppingBag, Info, User, Palette } from "lucide-react";

const HelpfulLinksSection: React.FC = () => {
  const router = useRouter();

  const links = [
    {
      title: "Главная страница",
      description: "Каталог товаров и услуги",
      icon: ShoppingBag,
      path: "/main",
      color: "bg-blue-500",
    },
    {
      title: "О компании",
      description: "Информация о нас",
      icon: Info,
      path: "/about",
      color: "bg-green-500",
    },
    {
      title: "Профиль",
      description: "Личный кабинет",
      icon: User,
      path: "/user-profile",
      color: "bg-purple-500",
    },
    {
      title: "Оформить заказ",
      description: "Создать новый заказ",
      icon: Palette,
      path: "/add-order",
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="section-card">
      <div className="page-header">
        <h2 className="page-title">Полезные ссылки</h2>
        <p className="page-subtitle">
          Возможно, вы искали одну из этих страниц
        </p>
      </div>

      <div className="grid grid-cols-4 text-center md:grid-cols-2 gap-6">
        {links.map((link, index) => {
          const IconComponent = link.icon;
          return (
            <div
              key={index}
              className="p-6 bg-card/50 rounded-xl border border-border/50 hover:border-primary/50 transition-luxury hover:shadow-luxury hover:-translate-y-1 group cursor-pointer"
              onClick={() => router.push(link.path)}
            >
              <div className="flex items-center justify-center gap-4">
                <div
                  className={`p-3 rounded-lg ${link.color} group-hover:scale-110 transition-luxury`}
                >
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-luxury">
                    {link.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {link.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HelpfulLinksSection;
