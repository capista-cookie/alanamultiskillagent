'use client';

import { useState, useCallback, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import skillsData from '../../../../data/skills.json';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../../../../components/ui/collapsible';

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
  whatItDoes?: string;
  whenToUse?: string[];
  skillMd?: string;
}

interface SkillsData {
  metadata: {
    siteName: string;
    tagline: string;
    description: string;
    lastUpdated: string;
    totalSkills: number;
    totalPublishers: number;
    totalCategories: number;
  };
  categories: Array<{
    id: string;
    name: string;
    count: number;
    color: string;
  }>;
  publishers: Array<{
    id: string;
    name: string;
    skillsCount: number;
    type: string;
    url: string;
    logo: string;
    skillsUrl: string;
  }>;
  skills: Skill[];
}

// Cast the imported data
const typedSkillsData = skillsData as SkillsData;

export default function SkillDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const publisher = params.publisher as string;

  // Find the exact skill and related skills dynamically
  const skill = useMemo(() => typedSkillsData.skills.find((s) => s.slug.toLowerCase() === slug.toLowerCase()), [slug]);

  const publisherData = useMemo(() => {
    return typedSkillsData.publishers.find(p => p.id.toLowerCase() === publisher.toLowerCase()) || {
      id: publisher,
      name: publisher,
      logo: `https://github.com/${publisher}.png`
    };
  }, [publisher]);

  const relatedSkills = useMemo(() => {
    if (!skill) return [];
    return typedSkillsData.skills
      .filter((s) => s.category === skill.category && s.id !== skill.id)
      .slice(0, 4);
  }, [skill]);

  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showSkillMd, setShowSkillMd] = useState(false);
  const [skillMdCopied, setSkillMdCopied] = useState(false);

  // Default markdown content as fallback
  const defaultMd = '';

  const handleCopyInstall = useCallback(() => {
    if (!skill) return;
    navigator.clipboard.writeText(skill.installCommand || `npm install ${skill.name}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [skill]);

  const handleCopyLink = useCallback(() => {
    if (!skill) return;
    navigator.clipboard.writeText(skill.githubUrl || `https://github.com/${skill.publisher}/${skill.name}`);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  }, [skill]);

  const handleCopySkillMd = useCallback(() => {
    if (!skill) return;
    navigator.clipboard.writeText((skill as any).skillMd || defaultMd);
    setSkillMdCopied(true);
    setTimeout(() => setSkillMdCopied(false), 2000);
  }, [skill]);

  if (!skill) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white font-inter text-gray-500">
        Skill not found.
      </div>
    );
  }

  // Process skillMd content to remove frontmatter and format properly
  const processedSkillMd = useMemo(() => {
    const rawMd = (skill as any).skillMd || defaultMd;
    if (!rawMd) return defaultMd;
    
    // Remove frontmatter if present
    const frontmatterEnd = rawMd.indexOf('---\n\n');
    if (frontmatterEnd !== -1) {
      return rawMd.substring(frontmatterEnd + 5);
    }
    
    return rawMd;
  }, [skill]);

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-gray-900 selection:bg-[#00d4a6] selection:text-white">
      
      {/* Header Replicated */}
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
            <a href="https://x.com/alanaagent" target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-1.5 tracking-widest uppercase font-semibold text-gray-500 hover:text-gray-900 transition-colors">
              Twitter
            </a>
            <a href="https://github.com/cookie-may/alanamultiskillagent" target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-1.5 tracking-widest uppercase font-semibold text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </header>

      {/* Skill Header Section */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div>
            <Link href="/" className="inline-flex items-center gap-1.5 text-sm mb-5 text-gray-500 hover:text-gray-900 transition-colors font-inter">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6"></path>
              </svg>
              Back to skills
            </Link>
            
            <div className="flex items-start sm:items-center gap-3 sm:gap-4 flex-wrap mb-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-inter tracking-tight text-gray-900">
                {skill.name}
              </h1>
              <div className="flex items-center gap-2 mt-1 sm:mt-0">
                <span className="text-xs px-2.5 py-1 rounded border border-gray-200 bg-gray-50 text-gray-600 font-inter uppercase tracking-wider">
                  {skill.category}
                </span>
              </div>
            </div>

            <p className="text-base sm:text-lg mb-6 lg:max-w-[70%] text-gray-400 leading-relaxed">
              {skill.description}
            </p>

            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2.5">
                {/* Dynamically Resolved Profile Image */}
                <img
                  src={publisherData.logo || `https://github.com/${skill.publisher}.png`}
                  alt={publisherData.name}
                  className="w-6 h-6 rounded-full border border-gray-200 bg-gray-50 object-cover"
                  onError={(e) => { e.currentTarget.style.display = 'none' }}
                />
                <Link href={`/${skill.publisher}`} className="text-sm font-inter text-gray-600 hover:text-[#00d4a6] transition-colors font-medium">
                  {publisherData.name}
                </Link>
              </div>
              <span className="text-gray-300">|</span>
              <Link href={`/${skill.publisher}`} className="text-sm font-inter text-[#00d4a6] hover:text-[#00b38c] transition-colors font-medium">
                View all {skill.publisher} skills →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10 lg:gap-16">
          <main className="min-w-0">
            
            {/* Setup & Installation */}
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-gray-900">Setup &amp; Installation</h2>
              <div className="rounded-xl p-5 mb-4 bg-gray-50 border border-gray-200">
                <div className="mb-4">
                  <div className="flex items-center gap-2 rounded-md px-4 py-2.5 bg-gray-900 border border-gray-700">
                    <span className="text-[14px] flex-1 truncate font-inter text-gray-200">
                      {skill.installCommand || `gh extension install ${skill.publisher}/${skill.name}`}
                    </span>
                    <button 
                      onClick={handleCopyInstall} 
                      className="flex-shrink-0 p-1 rounded transition-colors duration-150 text-gray-400 hover:text-white" 
                      title="Copy command"
                    >
                      {copied ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00d4a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      ) : (
                         <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path></svg>
                      )}
                    </button>
                  </div>
                </div>
                <span className="text-sm block mb-2 text-gray-600">or paste the link and ask your coding assistant to install it</span>
                <div className="flex items-stretch gap-3">
                  <div className="flex items-center gap-2 rounded-md px-4 py-2.5 flex-1 min-w-0 bg-gray-100 border border-gray-300">
                    <span className="text-[14px] flex-1 truncate font-inter text-gray-900">
                      {skill.githubUrl || `https://github.com/${skill.publisher}/${skill.name}`}
                    </span>
                    <button onClick={handleCopyLink} className="flex-shrink-0 p-1 rounded hover:bg-gray-200 text-gray-500 transition-colors" title="Copy link">
                       {linkCopied ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00d4a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      ) : (
                         <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path></svg>
                      )}
                    </button>
                  </div>
                  <a href={skill.githubUrl || `https://github.com/${skill.publisher}/${skill.name}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-md px-4 py-2.5 text-sm transition-colors duration-150 flex-shrink-0 bg-gray-100 text-gray-900 border border-gray-200 hover:bg-gray-200">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"></path></svg>
                    View on GitHub
                  </a>
                </div>
              </div>
            </section>

            {/* What This Skill Does */}
            {(skill as any).whatItDoes && (
              <section className="mb-8">
                <h2 className="text-xl font-bold mb-4 text-gray-900">What This Skill Does</h2>
                <div className="mb-5">
                  <p className="text-[16px] mb-3 text-gray-400 leading-relaxed">
                    {(skill as any).whatItDoes}
                  </p>
                </div>
                {(skill as any).whenToUse && (skill as any).whenToUse.length > 0 && (
                  <div>
                    <h3 className="text-sm mb-3 text-gray-400 uppercase tracking-wide">When to use it</h3>
                    <ul className="flex flex-col gap-2">
                      {(skill as any).whenToUse.map((item: string, index: number) => (
                        <li key={index} className="flex items-start gap-2.5">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00d4a6" strokeWidth="2" strokeLinecap="round" className="mt-0.5 flex-shrink-0">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span className="text-[16px] text-gray-400 leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            )}

            {/* SKILL.md Preview with Proper Formatting */}
            <section className="mb-12">
              <Collapsible open={showSkillMd} onOpenChange={setShowSkillMd}>
                <div className="w-full flex items-center gap-2 pl-4 pr-2 py-1.5 text-label-13 border rounded-t-md border-b-0 border-gray-200 bg-gray-50">
                  <CollapsibleTrigger className="flex-1 flex items-center gap-3 py-1 bg-transparent border-0 cursor-pointer text-left transition-colors duration-150 hover:opacity-80">
                    <span className="inline-block text-[16px] transition-transform duration-200" style={{ transform: showSkillMd ? 'rotate(90deg)' : 'rotate(0deg)' }}>
                      ›
                    </span>
                    <span className="text-[14px] tracking-[0.04em] font-sans font-semibold">Show SKILL.md file</span>
                  </CollapsibleTrigger>
                  <button 
                    type="button" 
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[12px] cursor-pointer transition-colors duration-150 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200 bg-white text-gray-900 font-inter"
                    onClick={handleCopySkillMd}
                    disabled={!skill}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                    <span>{skillMdCopied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <CollapsibleContent className="w-full max-w-full min-w-0 border border-t-0 border-gray-200 bg-white shadow-sm overflow-hidden">
                  <div className="relative p-6 sm:p-8">
                    <article className="prose max-w-none text-gray-800 break-words
                                        prose-headings:text-gray-900 prose-headings:font-inter prose-headings:font-bold 
                                        prose-h1:text-3xl prose-h2:text-2xl prose-h2:mt-10 prose-h3:text-xl
                                        prose-p:text-gray-700 prose-p:leading-relaxed 
                                        prose-li:text-gray-700 prose-ul:mb-6 prose-li:my-1
                                        prose-strong:text-gray-900 
                                        prose-code:text-[#00d4a6] prose-code:bg-[#00d4a6]/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:border prose-code:border-[#00d4a6]/20 prose-code:font-mono prose-code:text-sm prose-code:font-normal
                                        prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-5 prose-pre:rounded-xl prose-pre:overflow-x-auto prose-pre:shadow-sm prose-pre:my-6
                                        prose-pre:border prose-pre:border-gray-800 [&_pre_code]:bg-transparent [&_pre_code]:text-inherit [&_pre_code]:p-0 [&_pre_code]:border-none
                                        prose-a:text-[#00d4a6] prose-a:no-underline hover:prose-a:underline hover:prose-a:text-[#00b38c]
                                        prose-blockquote:border-l-4 prose-blockquote:border-[#00d4a6] prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600 prose-blockquote:bg-gray-50 prose-blockquote:py-2 w-full
                                        prose-table:w-full prose-table:border-collapse prose-table:my-6 prose-table:text-sm
                                        prose-th:bg-gray-50 prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:font-semibold prose-th:text-gray-900 prose-th:border prose-th:border-gray-200
                                        prose-td:px-4 prose-td:py-3 prose-td:border prose-td:border-gray-200 prose-td:align-top">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {processedSkillMd}
                      </ReactMarkdown>
                    </article>
                  </div>
                  <div className="flex flex-col items-center gap-3 pt-2 pb-4">
                    <div className="w-full h-px bg-gray-200"></div>
                    <button 
                      type="button" 
                      className="h-10 px-6 inline-flex items-center gap-2 rounded-full border transition-colors duration-150 text-[14px] cursor-pointer hover:bg-gray-100 border-gray-200 text-gray-900"
                      onClick={() => setShowSkillMd(false)}
                    >
                      <span>Show Less</span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 transition-transform duration-200 rotate-180">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"></path>
                      </svg>
                    </button>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </section>
          </main>

          {/* Sidebar - Save button */}
          <div className="hidden lg:block lg:sticky lg:top-24 lg:self-start">
            <aside className="flex flex-col gap-4 p-6 rounded-xl border border-gray-200 bg-gray-50/50">
              <button 
                onClick={() => setSaved(!saved)}
                className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition-all duration-200 w-full cursor-pointer font-inter ${
                  saved 
                    ? 'bg-gray-900 text-white border-gray-900' 
                    : 'bg-[#00d4a6] text-gray-900 border-[#00d4a6] hover:bg-[#00b38c]'
                }`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
                {saved ? 'Saved to collection' : 'Save skill'}
              </button>
              <p className="text-xs text-center text-gray-500">
                Save this skill to quickly access it in your workspace.
              </p>
            </aside>
          </div>
        </div>
      </div>

      {/* Similar Skills */}
      {relatedSkills.length > 0 && (
        <div className="py-10 border-t border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold font-inter text-gray-900">Similar Skills</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedSkills.map((relatedSkill) => (
                <Link
                  key={relatedSkill.id}
                  href={`/${relatedSkill.publisher}/skills/${relatedSkill.slug}`}
                  className="group flex flex-col rounded-lg p-4 bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors duration-150 cursor-pointer text-left"
                >
                  <h3 className="text-sm font-medium mb-1.5 font-inter text-gray-900 transition-colors">
                    {relatedSkill.name}
                  </h3>
                  <p className="text-xs leading-relaxed flex-1 mb-4 line-clamp-2 text-gray-600">
                    {relatedSkill.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer Replicated */}
      <footer className="mt-auto py-8 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-sm">
          <a href="https://github.com/VoltAgent/voltagent" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 flex-shrink-0 text-gray-600 hover:text-gray-900 transition-colors">
            <span className="text-[13px]">Maintained by Alanamultiskillagent team</span>
          </a>
          <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2 text-gray-500">
            <span className="text-[15px] sm:text-[18px] tracking-widest font-inter text-gray-900 font-semibold">
              <span className="text-[#00d4a6] font-bold" style={{fontFamily: 'Courier New, monospace', textShadow: '1px 1px 0px rgba(0,0,0,0.3)'}}>Alana</span><span className="font-inter">multiskillagent</span>
            </span>
            <span className="text-center">— Agent skills by official dev teams. No AI-generated filler.</span>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0 text-gray-500">
            <a href="/" className="text-[13px] hover:underline">Terms</a>
            <a href="/" className="text-[13px] hover:underline">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}