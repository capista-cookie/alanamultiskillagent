export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
        <div className="max-w-[2000px] mx-auto w-full px-4 sm:px-6 lg:px-16 h-12 sm:h-14 flex items-center justify-between">
          <div className="flex items-center gap-4 sm:gap-6">
            <a href="/" className="text-[16px] sm:text-[20px] lg:text-[24px] tracking-widest font-semibold text-gray-900 font-inter">
              <span className="text-[#00d4a6] font-bold" style={{fontFamily: 'Courier New, monospace', textShadow: '1px 1px 0px rgba(0,0,0,0.3)'}}>Alana</span><span className="font-inter">multiskillagent</span>
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a href="/about" className="hidden sm:inline-flex text-xs px-3 py-1.5 tracking-widest uppercase font-semibold text-gray-500 hover:text-gray-900 transition-colors">
              About
            </a>
            <a href="https://x.com/alanaagent" target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-1.5 tracking-widest uppercase font-semibold text-gray-500 hover:text-gray-900 transition-colors">
              Twitter
            </a>
            <a href="https://github.com/cookie-may/alanamultiskillagent" target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-1.5 tracking-widest uppercase font-semibold text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
            <div className="hidden sm:flex items-center gap-3">
              <button className="bg-white border border-gray-300 text-gray-900 hover:bg-gray-50 inline-flex items-center rounded-md px-3 py-1.5 text-xs font-medium transition-colors">
                Sign in
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Page Title Section */}
      <div className="border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-16 py-6">
          <h1 className="text-lg sm:text-2xl font-inter text-[#00d4a6]">About</h1>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-16 py-8 sm:py-10 space-y-8">
        <section>
          <p className="text-base text-gray-600 leading-relaxed">
            Alanamultiskillagent is a browsable frontend for agent skills and multi-skill capabilities.<br /><br />
            We index skills published by official developer teams, and others who maintain their own skill repos.<br />
            No bulk-generated or AI-generated filler. Every skill here was written and shipped by the team that actually builds the product.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3 text-gray-900">Want to Add a Skill?</h2>
          <p className="text-base mb-3 text-gray-600 leading-relaxed">
            To add a skill to this directory, contact the development team. We prioritize skills that are actively maintained, have clear documentation, and are published by official teams or reputable contributors.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3 text-gray-900">Disclaimer</h2>
          <p className="text-base mb-3 text-gray-600 leading-relaxed">
            Alanamultiskillagent is an independent community directory. We index publicly available agent skills from various sources.
          </p>
          <p className="text-base text-gray-600 leading-relaxed">
            Always review the source code of a skill before using it. We cannot guarantee the quality, safety, or behavior of every listed skill.
          </p>
        </section>

        <section className="rounded-xl p-6 sm:p-8 bg-gray-50 border border-gray-200">
          <h2 className="text-xl font-bold mb-3 text-[#00d4a6]">Contact</h2>
          <p className="text-base mb-4 text-gray-600 leading-relaxed">
            If you'd like to contribute or have questions about Alanamultiskillagent, feel free to reach out to the development team.
          </p>
          <p className="text-base text-gray-600">
            <a href="mailto:contact@alanamultiskillagent.dev" className="text-[#00d4a6] hover:text-[#00b38c] underline transition-colors">
              Reach out via email
            </a> to get started.
          </p>
        </section>
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