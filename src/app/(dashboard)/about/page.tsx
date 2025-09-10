'use client';
import React from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getAbout } from '@/entities/about/model/thunks';
import styles from './page.module.css';
import { refresh } from '@/entities/user/model/thunks';

export default function AboutPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { about, loading, error } = useAppSelector((state) => state.about);

  React.useEffect(() => {
    dispatch(getAbout());
    dispatch(refresh());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="page-content">
          <div className="section-card">
            <h2 className="section-title">Ошибка</h2>
            <p className="text-destructive">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!about) {
    return (
      <div className="page-container">
        <div className="page-content">
          <div className="section-card">
            <h2 className="section-title">Данные не найдены</h2>
            <p className="text-muted-foreground">
              Информация о компании временно недоступна
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.aboutPage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1 className={styles.pageTitle}>{about.hero.companyName}</h1>
            <h2 className={styles.heroTitle}>{about.hero.title}</h2>
            <p className={styles.heroDescription}>{about.hero.description}</p>
          </div>
          <div className={styles.contactInfo}>
            <h3 className={styles.contactTitle}>Контакты</h3>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}>📍</span>
              <div className={styles.contactText}>
                <span className={styles.contactLabel}>Адрес:</span>
                <span>{about.hero.address}</span>
              </div>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}>📞</span>
              <div className={styles.contactText}>
                <span className={styles.contactLabel}>Телефон:</span>
                <span>{about.hero.phone}</span>
              </div>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}>✉️</span>
              <div className={styles.contactText}>
                <span className={styles.contactLabel}>Email:</span>
                <span>{about.hero.email}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className={styles.statsSection}>
        <div className={styles.statsContainer}>
          <h2 className={styles.statsTitle}>Наша статистика</h2>
          <div className={styles.statsGrid}>
            {about.statistics.map((stat) => (
              <div key={stat.id} className={styles.statCard}>
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className={styles.missionSection}>
        <div className={styles.missionContainer}>
          <div className={styles.missionIcon}>��</div>
          <h2 className={styles.missionTitle}>{about.mission.title}</h2>
          <p className={styles.missionDescription}>
            {about.mission.description}
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <div className={styles.featuresContainer}>
          <h2 className={styles.featuresTitle}>{about.features.title}</h2>
          <p className={styles.featuresSubtitle}>{about.features.subtitle}</p>
          <div className={styles.featuresGrid}>
            {about.features.items.map((feature) => (
              <div key={feature.id} className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  {feature.icon === 'quality' && '⭐'}
                  {feature.icon === 'speed' && '⚡'}
                  {feature.icon === 'team' && '👥'}
                  {feature.icon === 'guarantee' && '🛡️'}
                  {feature.icon === 'personal' && '🎨'}
                  {feature.icon === 'tech' && '💻'}
                </div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
