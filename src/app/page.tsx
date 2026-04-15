'use client';

import { useState, useMemo } from 'react';
import skillsData from '@/data/skills.json';

type Skill = typeof skillsData.skills[0];
type Publisher = typeof skillsData.publishers[0];
type Category = typeof skillsData.categories[0];

const categoryColors: Record<string, string> = {
  infrastructure: 'bg-blue-100 text-blue-700 border-blue-200',
  development: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'ai-tools': 'bg-violet-100 text-violet-700 border-violet-200',
  workflows: 'bg-amber-100 text-amber-700 border-amber-200',
  security: 'bg-red-100 text-red-700 border-red-200',
  data: 'bg-cyan-100 text-cyan-700 border-cyan-200',
  design: 'bg-pink-100 text-pink-700 border-pink-200',
  docs: 'bg-lime-100 text-lime-700 border-lime-200',
  testing: 'bg-orange-100 text-orange-700 border-orange-200',
};

function AnimeMascot() {
  return (
    <div className="relative w-32 h-32 md:w-40 md:h-40 animate-float">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Body */}
        <ellipse cx="100" cy="130" rx="50" ry="45" fill="#fce7f3" stroke="#ec4899" strokeWidth="2"/>

        {/* Face */}
        <circle cx="100" cy="85" r="55" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2"/>

        {/* Blush */}
        <ellipse cx="65" cy="95" rx="12" ry="8" fill="#fecaca" opacity="0.7"/>
        <ellipse cx="135" cy="95" rx="12" ry="8" fill="#fecaca" opacity="0.7"/>

        {/* Eyes */}
        <ellipse cx="80" cy="80" rx="12" ry="14" fill="white"/>
        <ellipse cx="120" cy="80" rx="12" ry="14" fill="white"/>
        <circle cx="82" cy="82" r="8" fill="#1f2937"/>
        <circle cx="122" cy="82" r="8" fill="#1f2937"/>
        <circle cx="85" cy="79" r="3" fill="white" className="animate-sparkle"/>
        <circle cx="125" cy="79" r="3" fill="white" className="animate-sparkle"/>

        {/* Mouth */}
        <path d="M 90 105 Q 100 115 110 105" stroke="#ec4899" strokeWidth="3" fill="none" strokeLinecap="round"/>

        {/* Cat ears */}
        <path d="M 55 50 L 65 25 L 85 45 Z" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2"/>
        <path d="M 145 50 L 135 25 L 115 45 Z" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2"/>
        <path d="M 60 48 L 68 30 L 80 46 Z" fill="#fecaca"/>
        <path d="M 140 48 L 132 30 L 120 46 Z" fill="#fecaca"/>

        {/* Hair accessories */}
        <circle cx="70" cy="35" r="6" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="1"/>
        <circle cx="130" cy="35" r="6" fill="#8b5cf6" stroke="#6d28d9" strokeWidth="1"/>

        {/* Crown/tiara */}
        <path d="M 75 25 L 80 15 L 90 22 L 100 10 L 110 22 L 120 15 L 125 25"
              fill="none" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round"/>

        {/* Arms */}
        <ellipse cx="55" cy="130" rx="15" ry="10" fill="#fce7f3" stroke="#ec4899" strokeWidth="2"/>
        <ellipse cx="145" cy="130" rx="15" ry="10" fill="#fce7f3" stroke="#ec4899" strokeWidth="2"/>

        {/* Paws */}
        <circle cx="45" cy="140" r="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1"/>
        <circle cx="155" cy="140" r="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1"/>

        {/* Tail */}
        <path d="M 150 150 Q 170 140 165 120 Q 160 105 175 100"
              stroke="#ec4899" strokeWidth="8" fill="none" strokeLinecap="round"/>
      </svg>
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
        WIP
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-violet-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <a href="/" className="font-semibold text-lg text-gray-900 hover:text-gray-700">
              alanamultiskillagent
            </a>
            <span className="hidden sm:inline-block text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
              Multi-Skill Agent Directory
            </span>
          </div>
          <nav className="flex items-center gap-4 text-sm">
            <a href="#about" className="text-gray-600 hover:text-gray-900">About</a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Star on GitHub
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Multi-Skill Agent <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">Directory</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-xl mb-8">
              A curated collection of AI agent skills from official development teams and the community.
              Browse {skillsData.metadata.totalSkills}+ skills across {skillsData.metadata.totalCategories} categories.
            </p>
            <a
              href="#find-skills"
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Browse Skills
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
          <AnimeMascot />
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="py-8 bg-white border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-gray-900">562</div>
            <div className="text-sm text-gray-500">Official Skills</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-gray-900">49</div>
            <div className="text-sm text-gray-500">Dev Teams</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-gray-900">9</div>
            <div className="text-sm text-gray-500">Categories</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-gray-900">Apr 15, 2026</div>
            <div className="text-sm text-gray-500">Last Updated</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedPartners() {
  const partners = ['Claude Code', 'Codex', 'Cursor', 'GitHub Copilot', 'OpenCode'];

  return (
    <section className="py-8 bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
          <span className="text-sm font-medium text-gray-500">Featured Partners:</span>
          {partners.map((partner) => (
            <span
              key={partner}
              className="text-sm font-medium text-gray-700 hover:text-gray-900 cursor-pointer transition-colors"
            >
              {partner}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function PublishersSection({ publishers }: { publishers: Publisher[] }) {
  const featuredPublishers = publishers.slice(0, 16);

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-6 tracking-tight">
          SKILLS BY DEV TEAMS OF:
        </h2>
        <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-16 gap-4">
          {featuredPublishers.map((publisher) => (
            <a
              key={publisher.id}
              href={`#${publisher.id}`}
              className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xs font-bold text-gray-600 group-hover:bg-gray-200 transition-colors">
                {publisher.name.substring(0, 2).toUpperCase()}
              </div>
              <span className="text-xs text-gray-600 group-hover:text-gray-900 text-center truncate w-full">
                {publisher.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory
}: {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelectCategory(null)}
        className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
          selectedCategory === null
            ? 'bg-gray-900 text-white border-gray-900'
            : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
        }`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelectCategory(category.id)}
          className={`px-3 py-1.5 text-sm rounded-full border transition-colors flex items-center gap-1.5 ${
            selectedCategory === category.id
              ? 'bg-gray-900 text-white border-gray-900'
              : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
          }`}
        >
          {category.name}
          <span className="text-xs opacity-60">{category.count}</span>
        </button>
      ))}
    </div>
  );
}

function PublisherFilter({
  publishers,
  selectedPublisher,
  onSelectPublisher,
  totalSkills
}: {
  publishers: Publisher[];
  selectedPublisher: string | null;
  onSelectPublisher: (publisher: string | null) => void;
  totalSkills: number;
}) {
  const [showAll, setShowAll] = useState(false);
  const displayPublishers = showAll ? publishers : publishers.slice(0, 21);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => onSelectPublisher(null)}
          className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
            selectedPublisher === null
              ? 'bg-gray-900 text-white border-gray-900'
              : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
          }`}
        >
          All Publishers
        </button>
        {displayPublishers.map((publisher) => (
          <button
            key={publisher.id}
            onClick={() => onSelectPublisher(publisher.id)}
            className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
              selectedPublisher === publisher.id
                ? 'bg-gray-900 text-white border-gray-900'
                : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
            }`}
          >
            {publisher.name}
          </button>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">
          Showing {totalSkills} skills
        </span>
        {!showAll && publishers.length > 21 && (
          <button
            onClick={() => setShowAll(true)}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Show {publishers.length - 21} more
          </button>
        )}
      </div>
    </div>
  );
}

function SkillCard({ skill }: { skill: Skill }) {
  const categoryClass = categoryColors[skill.category] || 'bg-gray-100 text-gray-700 border-gray-200';

  return (
    <a
      href={`#${skill.name}`}
      className="block p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all group"
    >
      <div className="flex items-start gap-3">
        <span className="text-sm text-gray-400 font-mono w-6 text-right shrink-0">
          {skill.id}.
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="font-mono font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
              {skill.name}
            </span>
            <span className="text-xs text-gray-400">/</span>
            <span className="text-xs text-gray-500">{skill.publisher}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full border ${categoryClass}`}>
              {skill.category}
            </span>
            {skill.type === 'community' && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 border border-purple-200">
                community
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">
            {skill.description}
          </p>
        </div>
      </div>
    </a>
  );
}

function SkillsList({ skills }: { skills: Skill[] }) {
  return (
    <div className="space-y-1">
      {skills.map((skill) => (
        <SkillCard key={`${skill.publisher}-${skill.name}`} skill={skill} />
      ))}
    </div>
  );
}

function Footer() {
  return (
    <footer className="py-8 bg-gray-50 border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-gradient-to-br from-pink-500 to-violet-500 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">A</span>
              </div>
              <span>Maintained by MiniMax Agent Team</span>
            </div>
            <p className="mt-1">alanamultiskillagent - Agent skills directory. No AI-generated filler.</p>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a href="#terms" className="hover:text-gray-700">Terms</a>
            <a href="#privacy" className="hover:text-gray-700">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPublisher, setSelectedPublisher] = useState<string | null>(null);

  const filteredSkills = useMemo(() => {
    let filtered = skillsData.skills;

    if (selectedCategory) {
      filtered = filtered.filter(skill => skill.category === selectedCategory);
    }

    if (selectedPublisher) {
      filtered = filtered.filter(skill => skill.publisher === selectedPublisher);
    }

    return filtered;
  }, [selectedCategory, selectedPublisher]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <Hero />
      <Stats />
      <FeaturedPartners />
      <PublishersSection publishers={skillsData.publishers} />

      <main id="find-skills" className="flex-1 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Find Skills
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Category</h3>
              <CategoryFilter
                categories={skillsData.categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Publisher</h3>
              <PublisherFilter
                publishers={skillsData.publishers}
                selectedPublisher={selectedPublisher}
                onSelectPublisher={setSelectedPublisher}
                totalSkills={filteredSkills.length}
              />
            </div>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-8">
            <SkillsList skills={filteredSkills} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
