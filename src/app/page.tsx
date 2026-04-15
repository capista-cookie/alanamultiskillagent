'use client';

import { useState, useMemo, useCallback } from 'react';
import skillsData from '../data/skills.json';

type Skill = typeof skillsData.skills[0];
type Publisher = typeof skillsData.publishers[0];
type Category = typeof skillsData.categories[0];

// Category colors matching OG site
const categoryColors: Record<string, string> = {
  infrastructure: 'bg-gray-100 text-gray-700 border border-gray-200',
  development: 'bg-gray-100 text-gray-700 border border-gray-200',
  'ai-tools': 'bg-gray-100 text-gray-700 border border-gray-200',
  workflows: 'bg-gray-100 text-gray-700 border border-gray-200',
  security: 'bg-gray-100 text-gray-700 border border-gray-200',
  data: 'bg-gray-100 text-gray-700 border border-gray-200',
  design: 'bg-gray-100 text-gray-700 border border-gray-200',
  docs: 'bg-gray-100 text-gray-700 border border-gray-200',
  testing: 'bg-gray-100 text-gray-700 border border-gray-200',
};

// Color variables matching OG CSS
const colors = {
  accent: '#00d4a6',
  accentDark: '#03231c',
  gray100: '#ededed',
  gray700: '#bdbdbd',
  gray800: '#808080',
  gray900: '#0a0a0a',
  border: '#e5e5e5',
  background: '#ffffff',
};

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b" style={{ background: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(12px)', borderColor: colors.border }}>
      <div className="w-full px-4 sm:px-6 lg:px-16 h-14 flex items-center justify-between" style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div className="flex items-center gap-6">
          <a href="/" className="text-lg sm:text-xl lg:text-2xl tracking-widest" style={{ fontFamily: 'monospace', color: colors.gray900, letterSpacing: '0.12em', fontWeight: 600, lineHeight: 1 }}>
            official<span style={{ color: colors.accent }}>skills</span>.sh
          </a>
        </div>
        <div className="flex items-center gap-3">
          <a href="/" className="hidden sm:inline-flex text-xs px-3 py-1.5 tracking-widest uppercase rounded-lg transition-colors duration-100" style={{ color: '#ededed', letterSpacing: '0.1em', fontWeight: 600 }}>
            About
          </a>
          <a href="https://github.com/VoltAgent/awesome-agent-skills" target="_blank" rel="noopener noreferrer" className="flex items-center rounded-full overflow-hidden transition-opacity duration-150 hover:opacity-90" style={{ border: `1px solid ${colors.border}` }}>
            <span className="flex items-center gap-1.5 px-3 py-1.5" style={{ background: colors.gray100, color: colors.gray900 }}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
              </svg>
              <span className="hidden sm:inline text-xs">Star</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5" style={{ background: colors.background, color: colors.gray800, borderLeft: `1px solid ${colors.border}` }}>
              <svg width="11" height="11" viewBox="0 0 16 16" fill="#F5A623" style={{ flexShrink: 0 }}>
                <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"></path>
              </svg>
              <span className="text-xs" style={{ fontFamily: 'monospace', minWidth: '32px', textAlign: 'center' }}>15.8k</span>
            </span>
          </a>
          <div className="hidden sm:flex items-center gap-3">
            <a className="inline-flex items-center rounded-md px-3 py-1.5 text-xs transition-colors duration-150 cursor-pointer" style={{ background: 'rgb(255, 255, 255)', border: '1px solid rgb(255, 255, 255)', color: 'rgb(0, 0, 0)' }}>
              Sign in
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="py-16 sm:py-20 border-b" style={{ borderColor: colors.border }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4" style={{ color: colors.gray900 }}>
            OfficialAgent Skills
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-8 max-w-2xl mx-auto" style={{ color: colors.gray700 }}>
            Official skills from the dev teams of software vendors,{' '}
            <br className="hidden sm:block" />
            plus handpicked & community-adopted skills.
          </p>
          <a
            href="#find-skills"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors"
            style={{ background: colors.gray900, color: 'white' }}
          >
            Browse Official Skills
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="py-8 border-b" style={{ borderColor: colors.border, background: colors.gray100 }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold" style={{ color: colors.gray900 }}>Apr 15, 2026</div>
            <div className="text-sm mt-1" style={{ color: colors.gray800 }}>Last Updated</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold" style={{ color: colors.gray900 }}>{skillsData.metadata.totalPublishers}</div>
            <div className="text-sm mt-1" style={{ color: colors.gray800 }}>Dev Teams</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold" style={{ color: colors.gray900 }}>{skillsData.metadata.totalCategories}</div>
            <div className="text-sm mt-1" style={{ color: colors.gray800 }}>Categories</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold" style={{ color: colors.gray900 }}>{skillsData.metadata.totalSkills}</div>
            <div className="text-sm mt-1" style={{ color: colors.gray800 }}>Official Skills</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedPartners() {
  const partners = ['Claude Code', 'Codex', 'Antigravity', 'Cursor', 'GitHub Copilot', 'OpenCode', 'BOOM!', 'BOOM!', "i don't know what i'm doing here...", 'R.I.P. 2008–2025'];

  return (
    <section className="py-8 bg-white border-b" style={{ borderColor: colors.border }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
          {partners.map((partner, index) => (
            <span
              key={index}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 cursor-pointer transition-colors"
              style={{ fontFamily: 'monospace' }}
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
  const featuredPublishers = publishers.slice(0, 32);

  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-xs font-semibold tracking-widest uppercase mb-6" style={{ color: colors.gray800 }}>
          SKILLS BY DEV TEAMS OF:
        </h2>
        <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-16 gap-2">
          {featuredPublishers.map((publisher) => (
            <a
              key={publisher.id}
              href={`/?publisher=${publisher.id}`}
              className="flex flex-col items-center gap-1.5 p-2 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-xs font-bold text-gray-600 group-hover:bg-gray-200 transition-colors" style={{ fontFamily: 'monospace' }}>
                {publisher.name.substring(0, 2).toUpperCase()}
              </div>
              <span className="text-[10px] text-gray-500 group-hover:text-gray-900 text-center truncate w-full" style={{ fontFamily: 'monospace' }}>
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
  const [showAll, setShowAll] = useState(false);
  const displayCategories = showAll ? categories : categories.slice(0, 6);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onSelectCategory(null)}
          className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
            selectedCategory === null
              ? 'bg-gray-900 text-white border-gray-900'
              : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
          }`}
          style={{ fontFamily: 'monospace' }}
        >
          All
        </button>
        {displayCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`px-3 py-1.5 text-xs rounded-full border transition-colors flex items-center gap-1.5 ${
              selectedCategory === category.id
                ? 'bg-gray-900 text-white border-gray-900'
                : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
            }`}
            style={{ fontFamily: 'monospace' }}
          >
            {category.name}
            <span className="opacity-60">{category.count}</span>
          </button>
        ))}
      </div>
      {categories.length > 6 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-3 text-xs text-blue-600 hover:text-blue-700 font-medium"
        >
          {showAll ? 'Show less' : `Show ${categories.length - 6} more`}
        </button>
      )}
    </div>
  );
}

function PublisherFilter({
  publishers,
  selectedPublisher,
  onSelectPublisher,
}: {
  publishers: Publisher[];
  selectedPublisher: string | null;
  onSelectPublisher: (publisher: string | null) => void;
}) {
  const [showAll, setShowAll] = useState(false);
  const displayPublishers = showAll ? publishers : publishers.slice(0, 21);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onSelectPublisher(null)}
          className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
            selectedPublisher === null
              ? 'bg-gray-900 text-white border-gray-900'
              : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
          }`}
          style={{ fontFamily: 'monospace' }}
        >
          All
        </button>
        {displayPublishers.map((publisher) => (
          <button
            key={publisher.id}
            onClick={() => onSelectPublisher(publisher.id)}
            className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
              selectedPublisher === publisher.id
                ? 'bg-gray-900 text-white border-gray-900'
                : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
            }`}
            style={{ fontFamily: 'monospace' }}
          >
            {publisher.name}
          </button>
        ))}
      </div>
      {publishers.length > 21 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-3 text-xs text-blue-600 hover:text-blue-700 font-medium"
        >
          {showAll ? 'Show less' : `Show ${publishers.length - 21} more`}
        </button>
      )}
    </div>
  );
}

function SkillCard({ skill, onClick }: { skill: Skill; onClick: () => void }) {
  const categoryClass = categoryColors[skill.category] || 'bg-gray-100 text-gray-700 border border-gray-200';

  return (
    <button
      onClick={onClick}
      className="w-full text-left p-4 rounded-lg border hover:bg-gray-50 transition-colors group"
      style={{ borderColor: colors.border }}
    >
      <div className="flex items-start gap-3">
        <span className="text-sm text-gray-400 font-mono w-8 text-right shrink-0">
          {skill.id}.
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="font-mono font-medium group-hover:text-teal-600 transition-colors" style={{ color: colors.gray900, fontSize: '14px' }}>
              {skill.name}
            </span>
            <span className="text-xs text-gray-400">/</span>
            <span className="text-xs text-gray-500" style={{ fontFamily: 'monospace' }}>{skill.publisher}</span>
            <span className={`text-[11px] px-2 py-0.5 rounded-full border ${categoryClass}`} style={{ fontFamily: 'monospace' }}>
              {skill.category}
            </span>
            {skill.type === 'community' && (
              <span className="text-[11px] px-2 py-0.5 rounded-full border bg-gray-100 text-gray-600" style={{ fontFamily: 'monospace' }}>
                community
              </span>
            )}
          </div>
          <p className="text-sm line-clamp-2" style={{ color: colors.gray800 }}>
            {skill.description}
          </p>
        </div>
      </div>
    </button>
  );
}

function SkillsList({ skills, onSelectSkill }: { skills: Skill[]; onSelectSkill: (skill: Skill) => void }) {
  return (
    <div className="space-y-1">
      {skills.map((skill) => (
        <SkillCard key={`${skill.publisher}-${skill.name}`} skill={skill} onClick={() => onSelectSkill(skill)} />
      ))}
    </div>
  );
}

function SkillMdViewer({ content }: { content: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [content]);

  return (
    <div className="mt-3 w-full max-w-full min-w-0">
      <div className="w-full flex items-center gap-2 pl-4 pr-2 py-1.5 text-xs border rounded-t-md border-b-0" style={{ color: '#ededed', borderColor: colors.border, background: 'rgb(10, 10, 10)' }}>
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex-1 flex items-center gap-3 py-1 bg-transparent border-0 cursor-pointer text-left transition-colors duration-150 hover:opacity-80"
          style={{ color: '#ededed' }}
        >
          <span className="inline-block transition-transform duration-200" style={{ transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)', color: '#ededed' }}>›</span>
          <span className="text-sm tracking-[0.04em]" style={{ fontWeight: 600 }}>Show SKILL.md file</span>
        </button>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[12px] cursor-pointer transition-colors duration-150"
          style={{ color: colors.gray900, border: `1px solid ${colors.border}`, fontFamily: 'monospace', background: 'transparent' }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path>
          </svg>
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
      {isExpanded && (
        <div className="w-full max-w-full min-w-0 rounded-b-md border border-t-0 overflow-hidden" style={{ background: 'rgb(10, 10, 10)', borderColor: colors.border }}>
          <div className="p-4 overflow-x-auto">
            <pre className="text-sm" style={{ color: '#e0e0e0', fontFamily: 'monospace', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
              <code>{content}</code>
            </pre>
          </div>
          <div className="flex items-center justify-center gap-3 pt-2 pb-4 px-4">
            <div className="w-full h-px" style={{ background: colors.border }}></div>
          </div>
          <div className="flex justify-center pb-4">
            <button
              onClick={() => setIsExpanded(false)}
              className="h-10 px-6 inline-flex items-center gap-2 rounded-full border transition-colors duration-150 text-sm cursor-pointer hover:bg-gray-800"
              style={{ color: '#ededed', borderColor: colors.border }}
            >
              <span>Show Less</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"></path>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function SkillDetailPage({ skill, onBack }: { skill: Skill; onBack: () => void }) {
  const categoryClass = categoryColors[skill.category] || 'bg-gray-100 text-gray-700 border border-gray-200';
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const handleCopyInstall = useCallback(() => {
    navigator.clipboard.writeText(skill.installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [skill.installCommand]);

  const handleCopyLink = useCallback(() => {
    navigator.clipboard.writeText(skill.githubUrl);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  }, [skill.githubUrl]);

  const relatedSkills = useMemo(() => {
    return skillsData.skills
      .filter(s => s.category === skill.category && s.id !== skill.id)
      .slice(0, 4);
  }, [skill.category, skill.id]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Skill Header Section */}
      <div className="border-b" style={{ borderColor: colors.border }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div>
            <a href="/" className="inline-flex items-center gap-1.5 text-xs mb-3 transition-colors duration-150 hover:text-gray-600" style={{ color: colors.gray800 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6"></path>
              </svg>
              Back to skills
            </a>
            <div className="flex items-start sm:items-center gap-2 sm:gap-3 flex-wrap mb-3">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold" style={{ fontFamily: 'monospace', color: colors.gray900 }}>
                {skill.name}
              </h1>
              <div className="flex items-center gap-2">
                {skill.type === 'community' && (
                  <span className="text-[11px] sm:text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full" style={{ background: colors.gray100, color: colors.gray700 }}>
                    community
                  </span>
                )}
                <span className="text-[11px] sm:text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full" style={{ background: colors.gray100, color: colors.gray800 }}>
                  {skill.category}
                </span>
              </div>
            </div>
            <p className="text-sm sm:text-base mb-4 sm:mb-5 lg:max-w-[65%]" style={{ color: colors.gray700 }}>
              {skill.description}
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold" style={{ fontFamily: 'monospace' }}>
                  {skill.publisher.substring(0, 2).toUpperCase()}
                </div>
                <a href={`/?publisher=${skill.publisher}`} className="text-sm transition-colors duration-150 hover:text-teal-600" style={{ fontFamily: 'monospace', color: colors.gray900 }}>
                  {skill.publisher}
                </a>
              </div>
              <a href={`/?publisher=${skill.publisher}`} className="text-sm transition-colors duration-150 hover:text-teal-600" style={{ color: colors.accent, fontWeight: 600 }}>
                View all {skill.publisher} skills →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
          <main className="min-w-0">
            {/* Setup & Installation */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4" style={{ color: colors.gray900 }}>Setup & Installation</h2>
              <div className="rounded-xl p-5 mb-4" style={{ background: colors.gray100, border: `1px solid ${colors.border}` }}>
                <div className="mb-4">
                  <div className="flex items-center gap-2 rounded-md px-4 py-2.5" style={{ background: 'rgb(26, 26, 26)', border: '1px solid rgb(51, 51, 51)' }}>
                    <span className="text-sm flex-1 truncate" style={{ fontFamily: 'monospace', color: 'rgb(224, 224, 224)' }}>
                      {skill.installCommand}
                    </span>
                    <button onClick={handleCopyInstall} className="flex-shrink-0 p-1 rounded transition-colors duration-150" title="Copy command" style={{ color: 'rgb(136, 136, 136)' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <span className="text-xs block mb-2" style={{ color: colors.gray700 }}>or paste the link and ask your coding assistant to install it</span>
                <div className="flex items-stretch gap-2">
                  <div className="flex items-center gap-2 rounded-md px-4 py-2.5 flex-1 min-w-0" style={{ background: colors.gray100, border: `1px solid ${colors.border}` }}>
                    <span className="text-sm flex-1 truncate" style={{ fontFamily: 'monospace', color: colors.gray900 }}>
                      {skill.githubUrl}
                    </span>
                    <button onClick={handleCopyLink} className="flex-shrink-0 p-1 rounded transition-colors duration-150" title="Copy link" style={{ color: colors.gray800 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path>
                      </svg>
                    </button>
                  </div>
                  <a href={skill.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-md px-4 py-2.5 text-xs transition-colors duration-150 flex-shrink-0" style={{ background: colors.gray100, color: colors.gray900, border: `1px solid ${colors.border}` }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"></path>
                    </svg>
                    View on GitHub
                  </a>
                </div>
              </div>
            </section>

            {/* What This Skill Does */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4" style={{ color: colors.gray900 }}>What This Skill Does</h2>
              <div className="mb-5">
                <p className="text-base mb-3" style={{ color: colors.gray700 }}>
                  {skill.whatItDoes}
                </p>
              </div>
              {skill.whenToUse && skill.whenToUse.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold mb-3 uppercase tracking-wider" style={{ color: colors.gray700 }}>When to use it</h3>
                  <ul className="flex flex-col gap-2">
                    {skill.whenToUse.map((item, index) => (
                      <li key={index} className="flex items-start gap-2.5">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="2" strokeLinecap="round" className="mt-0.5 flex-shrink-0">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span className="text-base" style={{ color: colors.gray700 }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>

            {/* SKILL.md Preview */}
            <section className="mb-8">
              <div data-nosnippet="">
                <SkillMdViewer content={skill.skillMd || `# ${skill.name}\n\n${skill.description}`} />
              </div>
            </section>
          </main>

          {/* Sidebar - Save button on desktop */}
          <div className="hidden lg:block lg:sticky lg:top-20 lg:self-start">
            <aside className="flex flex-col gap-4">
              <button className="inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm transition-colors duration-150 w-full cursor-pointer" style={{ background: colors.accent, border: `1px solid ${colors.accent}`, color: colors.accentDark }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
                  <path d="M12 3.3 14.84 9l6.3.92-4.56 4.45 1.08 6.28L12 17.68 6.34 20.65l1.08-6.28-4.56-4.45L9.16 9 12 3.3z"></path>
                </svg>
                Save skill
              </button>
            </aside>
          </div>
        </div>
      </div>

      {/* Similar Skills */}
      {relatedSkills.length > 0 && (
        <div className="py-10" style={{ borderTop: `1px solid ${colors.border}` }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold" style={{ fontFamily: 'monospace', color: colors.accent }}>Similar Skills</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedSkills.map((relatedSkill) => (
                <button
                  key={relatedSkill.id}
                  onClick={() => {
                    // Navigate to related skill
                    window.location.href = `/?skill=${relatedSkill.name}`;
                  }}
                  className="group flex flex-col rounded-lg p-4 transition-colors duration-150 cursor-pointer text-left"
                  style={{ background: colors.gray100, border: `1px solid ${colors.border}` }}
                >
                  <h3 className="text-sm font-medium mb-1.5 transition-colors" style={{ fontFamily: 'monospace', color: colors.gray900 }}>
                    {relatedSkill.name}
                  </h3>
                  <p className="text-xs leading-relaxed flex-1 mb-4 line-clamp-2" style={{ color: colors.gray700 }}>
                    {relatedSkill.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className="mt-auto py-8" style={{ borderTop: `1px solid ${colors.border}` }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs">
        <a href="https://github.com/VoltAgent/voltagent" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 flex-shrink-0" style={{ color: colors.gray800 }}>
          <div className="w-5 h-5 bg-gray-200 rounded" style={{ fontSize: '10px' }}></div>
          <span className="text-sm">Maintained by VoltAgent team</span>
        </a>
        <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2" style={{ color: colors.gray700 }}>
          <span className="text-base sm:text-lg tracking-widest" style={{ fontFamily: 'monospace', color: colors.gray900, letterSpacing: '0.12em' }}>
            official<span style={{ color: colors.accent }}>skills</span>.sh
          </span>
          <span className="text-center">— Agent skills by official dev teams. No AI-generated filler.</span>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0" style={{ color: colors.gray800 }}>
          <a href="/" className="text-sm hover:underline" style={{ color: colors.gray800 }}>Terms</a>
          <a href="/" className="text-sm hover:underline" style={{ color: colors.gray800 }}>Privacy</a>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPublisher, setSelectedPublisher] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [skillListKey, setSkillListKey] = useState(0);

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

  const handleSelectSkill = useCallback((skill: Skill) => {
    setSelectedSkill(skill);
  }, []);

  const handleBackToList = useCallback(() => {
    setSelectedSkill(null);
    setSkillListKey(prev => prev + 1);
  }, []);

  // If a skill is selected, show the detail page
  if (selectedSkill) {
    return (
      <SkillDetailPage
        skill={selectedSkill}
        onBack={handleBackToList}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <Hero />
      <Stats />
      <FeaturedPartners />
      <PublishersSection publishers={skillsData.publishers} />

      <main id="find-skills" className="flex-1 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-2xl font-bold mb-8" style={{ color: colors.gray900 }}>
            Find Skills
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wider">Category</h3>
              <CategoryFilter
                categories={skillsData.categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
            </div>

            <div>
              <h3 className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wider">Publisher</h3>
              <PublisherFilter
                publishers={skillsData.publishers}
                selectedPublisher={selectedPublisher}
                onSelectPublisher={setSelectedPublisher}
              />
            </div>
          </div>

          <div className="mt-8 border-t pt-8" style={{ borderColor: colors.border }} key={skillListKey}>
            <div className="mb-4 text-sm" style={{ color: colors.gray700 }}>
              All {filteredSkills.length} skills
            </div>
            <SkillsList skills={filteredSkills} onSelectSkill={handleSelectSkill} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}