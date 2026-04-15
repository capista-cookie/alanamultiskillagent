'use client';

import { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import skillsData from '../../../data/skills.json';

type Skill = typeof skillsData.skills[0];
type Publisher = typeof skillsData.publishers[0];

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

function PublisherSkillsClient({ publisher, publisherSkills }: { publisher: Publisher | undefined; publisherSkills: Skill[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  const publisherCategories = useMemo(() => {
    const cats: Record<string, { id: string; name: string; count: number }> = {};
    for (const skill of publisherSkills) {
      const catData = skillsData.categories.find(c => c.id === skill.category);
      if (catData) {
        if (!cats[skill.category]) {
          cats[skill.category] = { id: catData.id, name: catData.name, count: 0 };
        }
        cats[skill.category].count++;
      }
    }
    return Object.values(cats).sort((a, b) => b.count - a.count);
  }, [publisherSkills]);

  const filteredSkills = useMemo(() => {
    if (!selectedCategory) return publisherSkills;
    return publisherSkills.filter(s => s.category === selectedCategory);
  }, [publisherSkills, selectedCategory]);

  if (!publisher) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <div className="w-full px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Publisher not found</h1>
          <Link href="/" className="text-teal-600 hover:text-teal-700">Back to home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="sticky top-0 z-50 border-b bg-black/85 backdrop-blur-md" style={{ borderColor: colors.border }}>
        <div className="w-full px-4 sm:px-6 lg:px-16 h-14 flex items-center justify-between" style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-lg sm:text-xl lg:text-2xl tracking-widest" style={{ fontFamily: 'monospace', color: colors.gray900, letterSpacing: '0.12em', fontWeight: 600, lineHeight: 1 }}>
              official<span style={{ color: colors.accent }}>skills</span>.sh
            </Link>
          </div>
        </div>
      </header>

      <div className="border-b" style={{ borderColor: colors.border }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex items-center gap-4 mb-4">
            <img src={publisher.logo} alt={publisher.name} className="w-12 h-12 rounded-full" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: 'monospace', color: colors.gray900 }}>{publisher.name}</h1>
              <p className="text-sm" style={{ color: colors.gray700 }}>{publisherSkills.length} skills</p>
            </div>
          </div>
          <a href={publisher.url} target="_blank" rel="noopener noreferrer" className="text-sm transition-colors hover:text-teal-600" style={{ color: colors.accent, fontWeight: 600 }}>View on GitHub →</a>
        </div>
      </div>

      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wider">Filter by category</h3>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setSelectedCategory(null)} className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${selectedCategory === null ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'}`} style={{ fontFamily: 'monospace' }}>All</button>
              {publisherCategories.map((cat) => (
                <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={`px-3 py-1.5 text-xs rounded-full border transition-colors flex items-center gap-1.5 ${selectedCategory === cat.id ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'}`} style={{ fontFamily: 'monospace' }}>
                  {cat.name} <span className="opacity-60">{cat.count}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4 text-sm" style={{ color: colors.gray700 }}>{filteredSkills.length} {filteredSkills.length === 1 ? 'skill' : 'skills'}</div>

          <div className="space-y-1">
            {filteredSkills.map((skill) => (
              <button key={`${skill.publisher}-${skill.name}`} onClick={() => setSelectedSkill(skill)} className="w-full text-left p-4 rounded-lg border hover:bg-gray-50 transition-colors group" style={{ borderColor: colors.border }}>
                <div className="flex items-start gap-3">
                  <span className="text-sm text-gray-400 font-mono w-8 text-right shrink-0">{skill.id}.</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-mono font-medium group-hover:text-teal-600 transition-colors" style={{ color: colors.gray900, fontSize: '14px' }}>{skill.name}</span>
                      <span className="text-[11px] px-2 py-0.5 rounded-full border bg-gray-100 text-gray-700" style={{ fontFamily: 'monospace' }}>{skill.category}</span>
                    </div>
                    <p className="text-sm line-clamp-2" style={{ color: colors.gray800 }}>{skill.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>

      {selectedSkill && (
        <SkillModal skill={selectedSkill} onClose={() => setSelectedSkill(null)} publisher={publisher.id} />
      )}
    </div>
  );
}

function SkillModal({ skill, onClose, publisher }: { skill: Skill; onClose: () => void; publisher: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(skill.installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [skill.installCommand]);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50" onClick={onClose}>
      <div className="min-h-screen flex items-start justify-center py-8 px-4" onClick={e => e.stopPropagation()}>
        <div className="bg-white rounded-xl max-w-2xl w-full relative">
          <div className="border-b p-6" style={{ borderColor: colors.border }}>
            <div className="flex items-center justify-between mb-4">
              <Link href={`/${publisher}/skills`} className="text-xs transition-colors hover:text-gray-600" style={{ color: colors.gray800 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="inline mr-1"><path d="m15 18-6-6 6-6"/></svg>Back
              </Link>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg></button>
            </div>
            <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: 'monospace' }}>{skill.name}</h1>
            <p className="text-sm" style={{ color: colors.gray700 }}>{skill.description}</p>
          </div>
          <div className="p-6">
            <div className="rounded-xl p-5 mb-6" style={{ background: '#1a1a1a' }}>
              <div className="flex items-center gap-2 rounded-md px-4 py-2.5" style={{ background: '#262626', border: '1px solid #333' }}>
                <span className="text-sm flex-1 truncate" style={{ fontFamily: 'monospace', color: '#e0e0e0' }}>{skill.installCommand}</span>
                <button onClick={handleCopy} className="p-1 rounded" style={{ color: '#888' }}>
                  {copied ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00d4a6" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>}
                </button>
              </div>
            </div>
            <a href={skill.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-medium transition-colors" style={{ background: colors.accent, color: colors.accentDark }}>View on GitHub</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PublisherSkillsPage() {
  const params = useParams();
  const publisherId = params.publisher as string;
  const publisher = skillsData.publishers.find(p => p.id === publisherId);
  const publisherSkills = skillsData.skills.filter(s => s.publisher === publisherId);

  return <PublisherSkillsClient publisher={publisher} publisherSkills={publisherSkills} />;
}
