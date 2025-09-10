'use client';
import React from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getAbout } from '@/entities/about/model/thunks';
import { refresh } from '@/entities/user/model/thunks';
import AboutHeroBoard from '@/components/features/about/hero/AboutHeroBoard';
import StatisticsSection from '@/components/features/about/statistics/StatisticsSection';
import MissionSection from '@/components/features/about/mission/MissionSection';
import FeaturesSection from '@/components/features/about/features/FeaturesSection';

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
    <div>
      {/* Hero Section */}
      <AboutHeroBoard
        companyName={about.hero.companyName}
        title={about.hero.title}
        description={about.hero.description}
      />

      {/* Statistics Section */}
      {/* <div className="page-content py-12"> */}
        <StatisticsSection statistics={about.statistics} />
      {/* </div> */}

      {/* Mission Section */}
      {/* <div className="page-content py-12"> */}
        <MissionSection
          title={about.mission.title}
          description={about.mission.description}
        />
      {/* </div> */}

      {/* Features Section */}
      {/* <div className="page-content py-12"> */}
        <FeaturesSection
          title={about.features.title}
          subtitle={about.features.subtitle}
          items={about.features.items}
        />
      {/* </div> */}
    </div>
  );
}
