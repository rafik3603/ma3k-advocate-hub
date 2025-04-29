
import React from 'react';
import Navbar from '../components/navbar';
import { SearchBar } from '../components/search-bar';
import { StatsCard } from '../components/stats-card';
import { NavigationButton } from '../components/navigation-button';
import { Logo } from '../components/logo';

const Index = () => {
  // Mock data for stats
  const stats = [
    { title: "قضايا اليوم", value: 1 },
    { title: "قضايا الغد", value: 5 },
    { title: "قضايا الاسبوع", value: 9 },
    { title: "مواعيد اليوم", value: 0 },
    { title: "مواعيد الغد", value: 0 },
  ];

  // Navigation items
  const navigationItems = [
    { title: "القضايا المؤجلة", href: "/pending-cases" },
    { title: "القضايا المفصول فيها", href: "/closed-cases" },
    { title: "القضايا المؤرشفة", href: "/archived-cases" },
    { title: "المواعيد", href: "/appointments" },
    { title: "الموكلين", href: "/clients" },
    { title: "المتابعة المالية", href: "/financial" },
    { title: "المستندات والعرائض", href: "/documents" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <SearchBar />
      
      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 px-4 mb-4">
        <StatsCard title={stats[0].title} value={stats[0].value} />
        <StatsCard title={stats[1].title} value={stats[1].value} />
        <StatsCard title={stats[2].title} value={stats[2].value} />
        
        <StatsCard title={stats[3].title} value={stats[3].value} />
        <Logo />
        <StatsCard title={stats[4].title} value={stats[4].value} />
      </div>

      {/* Navigation Buttons */}
      <div className="px-4 mt-2">
        {navigationItems.map((item, index) => (
          <NavigationButton
            key={index}
            title={item.title}
            href={item.href}
          />
        ))}
      </div>
    </div>
  );
};

export default Index;
