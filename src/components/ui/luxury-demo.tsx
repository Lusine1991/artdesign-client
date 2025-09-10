import React from 'react';

export const LuxuryDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      {/* Hero Section with Orange-Purple Gradient */}
      <div className="gradient-orange-purple rounded-2xl p-12 mb-8 shadow-luxury">
        <h1 className="text-luxury text-6xl font-bold mb-4">
          Luxury Dark Design System
        </h1>
        <p className="text-xl text-white/90 mb-8">
          Premium & Rich Design with Tailwind CSS 4.1.2
        </p>
        <div className="flex gap-4">
          <button className="gradient-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold shadow-primary transition-luxury hover:scale-105">
            Primary Button
          </button>
          <button className="bg-accent text-accent-foreground px-8 py-4 rounded-xl font-semibold shadow-accent transition-luxury hover:scale-105">
            Secondary Button
          </button>
        </div>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="gradient-card p-6 rounded-xl shadow-card transition-smooth hover:shadow-luxury">
          <div className="w-12 h-12 gradient-primary rounded-lg mb-4 flex items-center justify-center">
            <span className="text-primary-foreground text-xl">✨</span>
          </div>
          <h3 className="text-xl font-bold mb-2">Luxury Orange</h3>
          <p className="text-muted-foreground">
            Premium orange accents with rich shadows and smooth transitions.
          </p>
        </div>

        <div className="gradient-card p-6 rounded-xl shadow-card transition-smooth hover:shadow-luxury">
          <div className="w-12 h-12 gradient-secondary rounded-lg mb-4 flex items-center justify-center">
            <span className="text-secondary-foreground text-xl">🔥</span>
          </div>
          <h3 className="text-xl font-bold mb-2">Rich Orange</h3>
          <p className="text-muted-foreground">
            Warm orange tones with elegant gradients and luxury effects.
          </p>
        </div>

        <div className="gradient-card p-6 rounded-xl shadow-card transition-smooth hover:shadow-luxury">
          <div className="w-12 h-12 bg-accent rounded-lg mb-4 flex items-center justify-center">
            <span className="text-accent-foreground text-xl">💜</span>
          </div>
          <h3 className="text-xl font-bold mb-2">Royal Purple</h3>
          <p className="text-muted-foreground">
            Deep purple accents with premium shadows and glass effects.
          </p>
        </div>
      </div>

      {/* Glass Effect Section */}
      <div className="glass-effect p-8 rounded-2xl mb-8">
        <h2 className="text-3xl font-bold mb-4 text-luxury">Glass Effect</h2>
        <p className="text-lg text-foreground/80 mb-6">
          Beautiful glass morphism with backdrop blur and subtle borders.
        </p>
        <div className="flex gap-4">
          <div className="luxury-glow bg-primary/20 p-4 rounded-lg">
            <span className="text-primary font-semibold">Luxury Glow</span>
          </div>
          <div className="bg-accent/20 p-4 rounded-lg shadow-accent">
            <span className="text-accent font-semibold">Accent Shadow</span>
          </div>
        </div>
      </div>

      {/* Color Palette */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-primary p-4 rounded-lg text-primary-foreground text-center">
          <div className="font-bold">Primary</div>
          <div className="text-sm opacity-80">Luxury Orange</div>
        </div>
        <div className="bg-secondary p-4 rounded-lg text-secondary-foreground text-center">
          <div className="font-bold">Secondary</div>
          <div className="text-sm opacity-80">Rich Orange</div>
        </div>
        <div className="bg-accent p-4 rounded-lg text-accent-foreground text-center">
          <div className="font-bold">Accent</div>
          <div className="text-sm opacity-80">Royal Purple</div>
        </div>
        <div className="bg-success p-4 rounded-lg text-success-foreground text-center">
          <div className="font-bold">Success</div>
          <div className="text-sm opacity-80">Emerald</div>
        </div>
      </div>
    </div>
  );
};
