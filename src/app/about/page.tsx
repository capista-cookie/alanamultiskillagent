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