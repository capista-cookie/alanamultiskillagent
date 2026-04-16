'use client';

import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import skillsData from '../../data/skills.json';

// Type definitions
interface Skill {
  id: string;
  name: string;
  slug: string;
  publisher: string;
  category: string;
  type: string;
  description: string;
  githubUrl: string;
  installCommand: string;
}

interface SkillsData {
  skills: Skill[];
}

// Cast the imported data
const typedSkillsData = skillsData as SkillsData;

export default function PublisherPage() {
  const params = useParams();
  const publisher = params.publisher as string;

  // Get all skills from this publisher
  const publisherSkills = useMemo(() => {
    return typedSkillsData.skills.filter((skill) => skill.publisher === publisher);
  }, [publisher]);

  // Get publisher info (assuming first skill has the publisher data)
  const publisherInfo = publisherSkills[0];

  if (!publisherInfo) {
    return (
      <div className="min-h-screen bg-white text-gray-900 font-sans">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <h1 className="text-2xl font-bold text-gray-900">Publisher not found</h1>
          <Link href="/" className="text-[#00d4a6] hover:text-[#00b38c] transition-colors">
            ← Back to skills
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
        <div className="max-w-[2000px] mx-auto w-full px-4 sm:px-6 lg:px-16 h-12 sm:h-14 flex items-center justify-between">
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="/" className="text-[16px] sm:text-[20px] lg:text-[24px] tracking-widest font-semibold text-gray-900 font-inter">
              <span className="text-[#00d4a6] font-bold" style={{fontFamily: 'Courier New, monospace', textShadow: '1px 1px 0px rgba(0,0,0,0.3)'}}>Alana</span><span className="font-inter">multiskillagent</span>
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

      <main className="flex-1">
        {/* Publisher Header Section */}
        <div className="border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
            <Link href="/" className="inline-flex items-center gap-1.5 text-sm mb-3 transition-colors hover:text-gray-700 text-gray-600">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6"></path>
              </svg>
              Back to skills
            </Link>
            <div className="flex items-center gap-3 sm:gap-4 mb-2">
              <div className="flex items-center gap-2.5">
                {/* GitHub Dynamic Profile Image */}
                <img 
                  src={`https://github.com/${publisher}.png`} 
                  alt={publisher}
                  className="w-9 h-9 rounded-full border border-gray-200 bg-gray-50 object-cover"
                  onError={(e) => { e.currentTarget.style.display = 'none' }}
                />
                <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center" style={{ display: 'none' }}>
                  <span className="text-sm font-semibold text-gray-600 uppercase">
                    {publisher.charAt(0)}
                  </span>
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl font-inter font-semibold text-gray-900">
                {publisher}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-base text-gray-600">
                {publisherSkills.length} skill{publisherSkills.length !== 1 ? 's' : ''} available
              </p>
            </div>
          </div>
        </div>

        {/* Skills List */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {publisherSkills.map((skill, index) => (
            <Link
              key={skill.id}
              href={`/${skill.publisher}/skills/${skill.slug}`}
              className="group flex items-center gap-2 sm:gap-4 py-3 pr-2 sm:pr-4 transition-colors hover:bg-gray-50 border-b border-gray-200 last:border-b-0"
            >
              <span className="text-sm w-6 flex-shrink-0 tabular-nums self-center text-gray-500 font-inter">
                {index + 1}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2.5 min-w-0">
                  <span className="text-sm sm:text-base font-semibold truncate text-gray-900 font-inter">
                    {skill.slug}
                  </span>
                  <span className="hidden sm:inline text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                    {skill.category}
                  </span>
                </div>
                <div className="mt-1.5 flex items-center min-w-0">
                  <p className="text-sm truncate flex-1 min-w-0 text-gray-700">
                    {skill.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-8 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-sm">
          <div className="inline-flex items-center gap-1.5 flex-shrink-0 text-gray-600">
            <div className="w-5 h-5 bg-gray-200 rounded"></div>
            <span>Maintained by Alanamultiskillagent team</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2 text-gray-600">
            <span className="text-lg tracking-widest font-inter text-gray-900">
              <span className="text-[#00d4a6] font-bold" style={{fontFamily: 'Courier New, monospace', textShadow: '1px 1px 0px rgba(0,0,0,0.3)'}}>Alana</span><span className="font-inter">multiskillagent</span>
            </span>
            <span className="text-center">— Agent skills by official dev teams. No AI-generated filler.</span>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0 text-gray-600">
            <a href="/terms" className="hover:underline">Terms</a>
            <a href="/privacy" className="hover:underline">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}