'use client';

import { useState, useMemo } from 'react';
import skillsData from '../data/skills.json';
import Link from 'next/link';

export default function Home() {
  const [selectedPublisher, setSelectedPublisher] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filtering logic matching original functionality
  const filteredSkills = useMemo(() => {
    return skillsData.skills.filter((skill) => {
      const matchesPublisher = selectedPublisher ? skill.publisher === selectedPublisher : true;
      const matchesCategory = selectedCategory ? skill.category === selectedCategory : true;
      const matchesSearch = searchQuery 
        ? skill.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
          skill.description.toLowerCase().includes(searchQuery.toLowerCase()) 
        : true;
      return matchesPublisher && matchesCategory && matchesSearch;
    });
  }, [selectedPublisher, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/85 backdrop-blur-md">
        <div className="max-w-[2000px] mx-auto w-full px-4 sm:px-6 lg:px-16 h-12 sm:h-14 flex items-center justify-between">
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="/" className="text-[16px] sm:text-[20px] lg:text-[24px] tracking-widest font-semibold text-gray-900 font-mono">
              official<span className="text-[#00d4a6]">skills</span>.sh
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/about" className="hidden sm:inline-flex text-xs px-3 py-1.5 tracking-widest uppercase font-semibold text-gray-500 hover:text-gray-900 transition-colors">
              About
            </Link>
            <div className="hidden sm:flex items-center gap-3">
              <button className="bg-white border border-gray-300 text-gray-900 hover:bg-gray-50 inline-flex items-center rounded-md px-3 py-1.5 text-xs font-medium transition-colors">
                Sign in
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        className="relative z-20 overflow-visible bg-white border-b border-gray-200"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(0,0,0,0.03) 3px, rgba(0,0,0,0.03) 4px)' }}
      >
        <div className="relative grid grid-cols-1 lg:grid-cols-[1.55fr_0.95fr_0.7fr] items-stretch mx-auto max-w-[2000px]">
          {/* Title Box */}
          <div className="flex flex-col border-b lg:border-b-0 lg:border-r border-gray-200 px-4 sm:px-6 py-8 sm:py-10 lg:px-16 lg:py-10">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl leading-[1.05] mb-6 font-mono font-medium tracking-tight">
              Official<br />
              <span className="text-[#00d4a6]">Agent Skills</span>
            </h1>
            <p className="mb-8 text-[14px] sm:text-[16px] text-gray-500 leading-relaxed">
              {skillsData.metadata.description.split(', ').map((line, i) => (
                <span key={i}>{line}{i === 0 && ', '}<br className="hidden sm:block" /></span>
              ))}
            </p>
            <div className="flex flex-wrap gap-2.5">
              <a href="#find-skills" className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-gray-50 hover:bg-gray-100 px-5 py-2.5 text-sm text-gray-900 font-mono transition-colors">
                Browse Official Skills ↓
              </a>
            </div>
          </div>

          {/* Quick Stats Box */}
          <div className="hidden lg:block px-8 py-8 border-r border-gray-200 bg-white/50 backdrop-blur-sm">
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="text-[#00d4a6] text-[10px]">▸</span>
              <h3 className="text-xs uppercase tracking-widest text-gray-400 font-mono font-medium">Quick Stats</h3>
            </div>
            <div className="flex flex-col">
              <div className="flex justify-between py-2.5 border-t border-gray-200 text-[15px]">
                <span className="text-gray-500">Last Updated</span>
                <span className="text-[#00d4a6] font-mono">{skillsData.metadata.lastUpdated}</span>
              </div>
              <div className="flex justify-between py-2.5 border-t border-gray-200 text-[15px]">
                <span className="text-gray-500">Dev Teams</span>
                <span className="text-[#00d4a6] font-mono">{skillsData.metadata.totalPublishers}</span>
              </div>
              <div className="flex justify-between py-2.5 border-t border-gray-200 text-[15px]">
                <span className="text-gray-500">Categories</span>
                <span className="text-[#00d4a6] font-mono">{skillsData.metadata.totalCategories}</span>
              </div>
              <div className="flex justify-between py-2.5 border-t border-gray-200 text-[15px]">
                <span className="text-gray-500">Official Skills</span>
                <span className="text-[#00d4a6] font-mono">{skillsData.metadata.totalSkills}</span>
              </div>
            </div>
          </div>

          {/* Empty Space for Grid alignment */}
          <div className="hidden lg:flex flex-col relative bg-gray-50/50" />
        </div>
      </section>

      {/* Infinite Marquee Slider (Publishers) */}
      <section className="border-b border-gray-200 h-14 flex items-center bg-white overflow-hidden">
        <div className="flex items-center px-4 sm:px-6 lg:px-16 border-r border-gray-200 h-full shrink-0 bg-white z-10 relative">
          <span className="text-xs text-gray-500 font-mono tracking-widest uppercase">SKILLS BY DEV TEAMS OF:</span>
        </div>
        <div className="flex-1 h-full overflow-hidden relative bg-[#fafafa]">
          <div className="animate-marquee h-full flex items-center">
            {/* Duplicated array to create a seamless infinite loop */}
            {[...skillsData.publishers, ...skillsData.publishers].map((pub, idx) => (
              <a 
                key={`${pub.id}-${idx}`} 
                href={`/${pub.id}/skills`} 
                className="flex items-center gap-2.5 px-6 border-r border-gray-200 h-full hover:bg-gray-100 transition-colors shrink-0"
              >
                <img src={pub.logo} alt={pub.name} width={18} height={18} className="rounded-full shrink-0 object-cover" />
                <span className="text-sm font-mono text-gray-700">{pub.id}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Find Skills Main Section */}
      <section id="find-skills" className="px-4 sm:px-6 lg:px-16 py-10 lg:py-14 max-w-[2000px] mx-auto">
        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold font-mono tracking-wide text-[#00d4a6]">
            Find Skills
          </h2>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Filters Sidebar */}
          <div className="w-full lg:w-64 shrink-0 flex flex-col gap-8">
            
            {/* Publishers Filter */}
            <div>
              <h3 className="text-sm font-semibold border-b border-gray-900 pb-2 mb-3 font-mono text-gray-900 uppercase tracking-widest">
                Publishers
              </h3>
              <div className="flex flex-col gap-0.5 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                <button 
                  onClick={() => setSelectedPublisher(null)} 
                  className={`text-left text-sm py-2 px-2 border-b border-gray-100 transition-colors ${selectedPublisher === null ? 'text-gray-900 font-semibold' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  All Publishers
                </button>
                {skillsData.publishers.map(pub => (
                  <button 
                    key={pub.id}
                    onClick={() => setSelectedPublisher(pub.id)} 
                    className={`flex items-center gap-2.5 text-left text-sm py-2 px-2 transition-colors ${selectedPublisher === pub.id ? 'text-gray-900 font-semibold' : 'text-gray-500 hover:text-gray-900'}`}
                  >
                    <img src={pub.logo} alt={pub.name} width={16} height={16} className="rounded-full shrink-0" />
                    <span className="truncate font-mono">{pub.id}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Categories Filter */}
            <div>
              <h3 className="text-sm font-semibold border-b border-gray-900 pb-2 mb-3 font-mono text-gray-900 uppercase tracking-widest">
                Categories
              </h3>
              <div className="flex flex-col gap-0.5">
                <button 
                  onClick={() => setSelectedCategory(null)} 
                  className={`text-left text-sm py-2 px-2 border-b border-gray-100 transition-colors ${selectedCategory === null ? 'text-gray-900 font-semibold' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  All Categories
                </button>
                {skillsData.categories.map(cat => (
                  <button 
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)} 
                    className={`flex items-center justify-between text-left text-sm py-2 px-2 transition-colors ${selectedCategory === cat.id ? 'text-gray-900 font-semibold' : 'text-gray-500 hover:text-gray-900'}`}
                  >
                    <span className="truncate font-mono">{cat.name}</span>
                    <span className="text-[11px] text-gray-400 font-mono border border-gray-200 rounded px-1.5 py-0.5">{cat.count}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Skills List Column */}
          <div className="flex-1 min-w-0">
            {/* Search Bar */}
            <div className="mb-6 relative">
              <input 
                type="text" 
                placeholder="Search by name or description..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-10 rounded-md border border-gray-200 text-sm font-mono focus:outline-none focus:border-[#00d4a6] focus:ring-1 focus:ring-[#00d4a6] placeholder-gray-400 bg-gray-50/50 transition-all"
              />
              <svg className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* List */}
            <div className="flex flex-col border-t border-gray-200">
              {filteredSkills.map((skill, index) => (
                <Link 
                  href={`/${skill.publisher}/skills/${skill.slug}`} 
                  key={skill.id} 
                  className="group flex items-start sm:items-center gap-4 py-4 px-2 hover:bg-gray-50 border-b border-gray-100 transition-colors"
                >
                  {/* Skill Index */}
                  <span className="w-8 shrink-0 text-[13px] text-gray-400 font-mono tabular-nums pt-0.5 sm:pt-0">
                    {index + 1}
                  </span>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <div className="flex items-baseline gap-2 mb-1.5">
                      <span className="font-semibold text-gray-900 font-mono text-[15px] truncate group-hover:text-[#00d4a6] transition-colors">
                        {skill.name}
                      </span>
                      <span className="hidden sm:inline text-xs text-gray-500 font-mono truncate">
                        {skill.publisher} / skills
                      </span>
                    </div>
                    <p className="text-[13px] text-gray-600 truncate leading-relaxed">
                      {skill.description}
                    </p>
                  </div>
                </Link>
              ))}

              {filteredSkills.length === 0 && (
                <div className="py-12 text-center flex flex-col items-center justify-center">
                  <span className="text-4xl mb-3">👻</span>
                  <span className="text-gray-500 font-mono text-sm">No skills found matching your criteria.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}