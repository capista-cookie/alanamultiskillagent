'use client';

import { useState, useMemo } from 'react';
import skillsData from '../data/skills.json';
import Link from 'next/link';

export default function Home() {
  const [selectedPublisher, setSelectedPublisher] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const skillsPerPage = 20;

  // Tools data for compatibility grid
  const tools = [
    {
      name: 'Claude Code',
      svg: `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" aria-hidden="true" focusable="false"><path d="m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z"></path></svg>`,
      link: '/claude-code'
    },
    {
      name: 'Codex',
      svg: `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" aria-hidden="true" focusable="false"><path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"></path></svg>`,
      link: '/codex'
    },
    {
      name: 'Antigravity',
      svg: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" aria-hidden="true" focusable="false"><mask height="23" id="lobe-icons-antigravity-fill-0" maskUnits="userSpaceOnUse" width="24" x="0" y="1"><path d="M21.751 22.607c1.34 1.005 3.35.335 1.508-1.508C17.73 15.74 18.904 1 12.037 1 5.17 1 6.342 15.74.815 21.1c-2.01 2.009.167 2.511 1.507 1.506 5.192-3.517 4.857-9.714 9.715-9.714 4.857 0 4.522 6.197 9.714 9.715z"></path></mask><g mask="url(#lobe-icons-antigravity-fill-0)"><g filter="url(#lobe-icons-antigravity-fill-1)"><path d="M-1.018-3.992c-.408 3.591 2.686 6.89 6.91 7.37 4.225.48 7.98-2.043 8.387-5.633.408-3.59-2.686-6.89-6.91-7.37-4.225-.479-7.98 2.043-8.387 5.633z"></path></g><g filter="url(#lobe-icons-antigravity-fill-2)"><path d="M15.269 7.747c1.058 4.557 5.691 7.374 10.348 6.293 4.657-1.082 7.575-5.653 6.516-10.21-1.058-4.556-5.691-7.374-10.348-6.292-4.657 1.082-7.575 5.653-6.516 10.21z"></path></g><g filter="url(#lobe-icons-antigravity-fill-3)"><path d="M-12.443 10.804c1.338 4.703 7.36 7.11 13.453 5.378 6.092-1.733 9.947-6.95 8.61-11.652C8.282-.173 2.26-2.58-3.833-.848-9.925.884-13.78 6.1-12.443 10.804z"></path></g><g filter="url(#lobe-icons-antigravity-fill-4)"><path d="M-12.443 10.804c1.338 4.703 7.36 7.11 13.453 5.378 6.092-1.733 9.947-6.95 8.61-11.652C8.282-.173 2.26-2.58-3.833-.848-9.925.884-13.78 6.1-12.443 10.804z"></path></g><g filter="url(#lobe-icons-antigravity-fill-5)"><path d="M-7.608 14.703c3.352 3.424 9.126 3.208 12.896-.483 3.77-3.69 4.108-9.459.756-12.883C2.69-2.087-3.083-1.871-6.853 1.82c-3.77 3.69-4.108 9.458-.755 12.883z"></path></g><g filter="url(#lobe-icons-antigravity-fill-6)"><path d="M9.932 27.617c1.04 4.482 5.384 7.303 9.7 6.3 4.316-1.002 6.971-5.448 5.93-9.93-1.04-4.483-5.384-7.304-9.7-6.301-4.316 1.002-6.971 5.448-5.93 9.93z"></path></g><g filter="url(#lobe-icons-antigravity-fill-7)"><path d="M2.572-8.185C.392-3.329 2.778 2.472 7.9 4.771c5.122 2.3 11.042.227 13.222-4.63 2.18-4.855-.205-10.656-5.327-12.955-5.122-2.3-11.042-.227-13.222 4.63z"></path></g><g filter="url(#lobe-icons-antigravity-fill-8)"><path d="M-3.267 38.686c-5.277-2.072 3.742-19.117 5.984-24.83 2.243-5.712 8.34-8.664 13.616-6.592 5.278 2.071 11.533 13.482 9.29 19.195-2.242 5.713-23.613 14.298-28.89 12.227z"></path></g><g filter="url(#lobe-icons-antigravity-fill-9)"><path d="M28.71 17.471c-1.413 1.649-5.1.808-8.236-1.878-3.135-2.687-4.531-6.201-3.118-7.85 1.412-1.649 5.1-.808 8.235 1.878s4.532 6.2 3.119 7.85z"></path></g><g filter="url(#lobe-icons-antigravity-fill-10)"><path d="M18.163 9.077c5.81 3.93 12.502 4.19 14.946.577 2.443-3.612-.287-9.727-6.098-13.658-5.81-3.931-12.502-4.19-14.946-.577-2.443 3.612.287 9.727 6.098 13.658z"></path></g><g filter="url(#lobe-icons-antigravity-fill-11)"><path d="M-.915 2.684c-1.44 3.473-.97 6.967 1.05 7.804 2.02.837 4.824-1.3 6.264-4.772 1.44-3.473.97-6.967-1.05-7.804-2.02-.837-4.824 1.3-6.264 4.772z"></path></g></g><defs><filter color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse" height="17.587" id="lobe-icons-antigravity-fill-1" width="19.838" x="-3.288" y="-11.917"><feflood flood-opacity="0" result="BackgroundImageFix"></feflood><feblend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feblend><fegaussianblur result="effect1_foregroundBlur_977_115" stdDeviation="1.117"></fegaussianblur></filter><filter color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse" height="38.565" id="lobe-icons-antigravity-fill-2" width="38.9" x="4.251" y="-13.493"><feflood flood-opacity="0" result="BackgroundImageFix"></feflood><feblend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feblend><fegaussianblur result="effect1_foregroundBlur_977_115" stdDeviation="5.4"></fegaussianblur></filter><filter color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse" height="36.517" id="lobe-icons-antigravity-fill-3" width="40.955" x="-21.889" y="-10.592"><feflood flood-opacity="0" result="BackgroundImageFix"></feflood><feblend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feblend><fegaussianblur result="effect1_foregroundBlur_977_115" stdDeviation="4.591"></fegaussianblur></filter><filter color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse" height="36.517" id="lobe-icons-antigravity-fill-4" width="40.955" x="-21.889" y="-10.592"><feflood flood-opacity="0" result="BackgroundImageFix"></feflood><feblend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feblend><fegaussianblur result="effect1_foregroundBlur_977_115" stdDeviation="4.591"></fegaussianblur></filter><filter color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse" height="36.595" id="lobe-icons-antigravity-fill-5" width="36.632" x="-19.099" y="-10.278"><feflood flood-opacity="0" result="BackgroundImageFix"></feflood><feblend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feblend><fegaussianblur result="effect1_foregroundBlur_977_115" stdDeviation="4.591"></fegaussianblur></filter><filter color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse" height="34.087" id="lobe-icons-antigravity-fill-6" width="33.533" x=".981" y="8.758"><feflood flood-opacity="0" result="BackgroundImageFix"></feflood><feblend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feblend><fegaussianblur result="effect1_foregroundBlur_977_115" stdDeviation="4.591"></fegaussianblur></filter><filter color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse" height="35.276" id="lobe-icons-antigravity-fill-7" width="35.978" x="-6.143" y="-21.659"><feflood flood-opacity="0" result="BackgroundImageFix"></feflood><feblend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feblend><fegaussianblur result="effect1_foregroundBlur_977_115" stdDeviation="4.591"></fegaussianblur></filter><filter color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse" height="46.523" id="lobe-icons-antigravity-fill-8" width="45.114" x="-11.96" y="-.46"><feflood flood-opacity="0" result="BackgroundImageFix"></feflood><feblend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feblend><fegaussianblur result="effect1_foregroundBlur_977_115" stdDeviation="3.531"></fegaussianblur></filter><filter color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse" height="24.054" id="lobe-icons-antigravity-fill-9" width="25.094" x="10.485" y=".58"><feflood flood-opacity="0" result="BackgroundImageFix"></feflood><feblend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feblend><fegaussianblur result="effect1_foregroundBlur_977_115" stdDeviation="3.159"></fegaussianblur></filter><filter color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse" height="30.007" id="lobe-icons-antigravity-fill-10" width="33.508" x="5.833" y="-12.467"><feflood flood-opacity="0" result="BackgroundImageFix"></feflood><feblend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feblend><fegaussianblur result="effect1_foregroundBlur_977_115" stdDeviation="2.669"></fegaussianblur></filter><filter color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse" height="26.151" id="lobe-icons-antigravity-fill-11" width="22.194" x="-8.355" y="-8.876"><feflood flood-opacity="0" result="BackgroundImageFix"></feflood><feblend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feblend><fegaussianblur result="effect1_foregroundBlur_977_115" stdDeviation="3.303"></fegaussianblur></filter></defs></svg>`,
      link: '/antigravity'
    },
    {
      name: 'Cursor',
      svg: `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" aria-hidden="true" focusable="false"><path d="M11.503.131 1.891 5.678a.84.84 0 0 0-.42.726v11.188c0 .3.162.575.42.724l9.609 5.55a1 1 0 0 0 .998 0l9.61-5.55a.84.84 0 0 0 .42-.724V6.404a.84.84 0 0 0-.42-.726L12.497.131a1.01 1.01 0 0 0-.996 0M2.657 6.338h18.55c.263 0 .43.287.297.515L12.23 22.918c-.062.107-.229.064-.229-.06V12.335a.59.59 0 0 0-.295-.51l-9.11-5.257c-.109-.063-.064-.23.061-.23"></path></svg>`,
      link: '/cursor'
    },
    {
      name: 'GitHub Copilot',
      svg: `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" aria-hidden="true" focusable="false"><path d="M23.922 16.997C23.061 18.492 18.063 22.02 12 22.02 5.937 22.02.939 18.492.078 16.997A.641.641 0 0 1 0 16.741v-2.869a.883.883 0 0 1 .053-.22c.372-.935 1.347-2.292 2.605-2.656.167-.429.414-1.055.644-1.517a10.098 10.098 0 0 1-.052-1.086c0-1.331.282-2.499 1.132-3.368.397-.406.89-.717 1.474-.952C7.255 2.937 9.248 1.98 11.978 1.98c2.731 0 4.767.957 6.166 2.093.584.235 1.077.546 1.474.952.85.869 1.132 2.037 1.132 3.368 0 .368-.014.733-.052 1.086.23.462.477 1.088.644 1.517 1.258.364 2.233 1.721 2.605 2.656a.841.841 0 0 1 .053.22v2.869a.641.641 0 0 1-.078.256Zm-11.75-5.992h-.344a4.359 4.359 0 0 1-.355.508c-.77.947-1.918 1.492-3.508 1.492-1.725 0-2.989-.359-3.782-1.259a2.137 2.137 0 0 1-.085-.104L4 11.746v6.585c1.435.779 4.514 2.179 8 2.179 3.486 0 6.565-1.4 8-2.179v-6.585l-.098-.104s-.033.045-.085.104c-.793.9-2.057 1.259-3.782 1.259-1.59 0-2.738-.545-3.508-1.492a4.359 4.359 0 0 1-.355-.508Zm2.328 3.25c.549 0 1 .451 1 1v2c0 .549-.451 1-1 1-.549 0-1-.451-1-1v-2c0-.549.451-1 1-1Zm-5 0c.549 0 1 .451 1 1v2c0 .549-.451 1-1 1-.549 0-1-.451-1-1v-2c0-.549.451-1 1-1Zm3.313-6.185c.136 1.057.403 1.913.878 2.497.442.544 1.134.938 2.344.938 1.573 0 2.292-.337 2.657-.751.384-.435.558-1.15.558-2.361 0-1.14-.243-1.847-.705-2.319-.477-.488-1.319-.862-2.824-1.025-1.487-.161-2.192.138-2.533.529-.269.307-.437.808-.438 1.578v.021c0 .265.021.562.063.893Zm-1.626 0c.042-.331.063-.628.063-.894v-.02c-.001-.77-.169-1.271-.438-1.578-.341-.391-1.046-.69-2.533-.529-1.505.163-2.347.537-2.824 1.025-.462.472-.705 1.179-.705 2.319 0 1.211.175 1.926.558 2.361.365.414 1.084.751 2.657.751 1.21 0 1.902-.394 2.344-.938.475-.584.742-1.44.878-2.497Z"></path></svg>`,
      link: '/github-copilot'
    },
    {
      name: 'OpenCode',
      svg: `<svg fill-rule="evenodd" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" aria-hidden="true" focusable="false"><path d="M16 6H8v12h8V6zm4 16H4V2h16v20z"></path></svg>`,
      link: '/opencode'
    }
  ];

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

  // Pagination
  const totalPages = Math.ceil(filteredSkills.length / skillsPerPage);
  const paginatedSkills = useMemo(() => {
    const startIndex = (currentPage - 1) * skillsPerPage;
    return filteredSkills.slice(startIndex, startIndex + skillsPerPage);
  }, [filteredSkills, currentPage, skillsPerPage]);

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [selectedPublisher, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans page-enter">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/85 backdrop-blur-md">
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
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        className="relative z-20 overflow-visible bg-white border-b border-gray-200 mb-8"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(0,0,0,0.03) 3px, rgba(0,0,0,0.03) 4px)' }}
      >
        <div className="relative grid grid-cols-1 lg:grid-cols-[1.2fr_1.1fr_0.9fr] items-stretch mx-auto max-w-[2000px]">
          {/* Title Box */}
          <div className="flex flex-col border-b lg:border-b-0 lg:border-r border-gray-200 px-4 sm:px-6 py-8 sm:py-10 lg:px-16 lg:py-10">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl leading-[1.05] mb-6 font-inter font-medium tracking-tight">
              Official<br />
              <span className="text-[#00d4a6]">Agent Skills</span>
            </h1>
            <p className="mb-8 text-[14px] sm:text-[16px] text-gray-500 leading-relaxed">
              {skillsData.metadata.description.split(', ').map((line, i) => (
                <span key={i}>{line}{i === 0 && ', '}<br className="hidden sm:block" /></span>
              ))}
            </p>
            <div className="flex flex-wrap gap-2.5">
              <a href="#find-skills" className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-gray-50 hover:bg-gray-100 px-5 py-2.5 text-sm text-gray-900 font-inter transition-colors">
                Browse Official Skills ↓
              </a>
            </div>
          </div>

          {/* Character Image -> Moved to middle */}
          <div id="character-showcase" className="hidden lg:flex flex-col relative animate-fade-in-up items-center justify-center px-8">
            <div className="relative w-[300px] h-[340px] rounded-2xl overflow-hidden border-2 border-transparent hover:border-[#00d4a6]/30 transition-all duration-500 group shadow-[0_0_40px_-15px_rgba(0,212,166,0.2)]">
              {/* HUD Elements */}
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')] opacity-10 mix-blend-overlay z-10 pointer-events-none"></div>
              <div className="absolute top-2 left-2 text-[10px] text-[#00d4a6] font-mono z-20 opacity-70 tracking-widest pointer-events-none">
                SYS.RDY // 100%
              </div>
              <div className="absolute bottom-2 right-2 text-[10px] text-[#00d4a6] font-mono z-20 opacity-70 tracking-widest pointer-events-none">
                SYNC.OP // ACTIVE
              </div>
              
              {/* Glitch Overlay on Hover (Subtle) */}
              <div className="absolute inset-0 bg-[#00d4a6] mix-blend-overlay opacity-0 group-hover:opacity-10 transition-opacity duration-500 z-10 pointer-events-none"></div>

              {/* Character Image */}
              <img 
                src="/char.jpeg" 
                alt="Stylized Cyberpunk Assistant" 
                className="w-full h-full object-cover object-top scale-[1.01] group-hover:scale-[1.05] transition-transform duration-700 ease-out" 
              />
            </div>
          </div>

          {/* Quick Stats Box -> Moved to right */}
          <div className="hidden lg:block px-8 py-8 bg-white/50 backdrop-blur-sm">
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="text-[#00d4a6] text-[10px]">▸</span>
              <h3 className="text-xs uppercase tracking-widest text-gray-400 font-inter font-medium">Quick Stats</h3>
            </div>
            <div className="flex flex-col">
              <div className="flex justify-between py-2.5 border-t border-gray-200 text-[15px]">
                <span className="text-gray-500">Last Updated</span>
                <span className="text-[#00d4a6] font-inter">{skillsData.metadata.lastUpdated}</span>
              </div>
              <div className="flex justify-between py-2.5 border-t border-gray-200 text-[15px]">
                <span className="text-gray-500">Dev Teams</span>
                <span className="text-[#00d4a6] font-inter">{skillsData.metadata.totalPublishers}</span>
              </div>
              <div className="flex justify-between py-2.5 border-t border-gray-200 text-[15px]">
                <span className="text-gray-500">Categories</span>
                <span className="text-[#00d4a6] font-inter">{skillsData.metadata.totalCategories}</span>
              </div>
              <div className="flex justify-between py-2.5 border-t border-gray-200 text-[15px]">
                <span className="text-gray-500">Official Skills</span>
                <span className="text-[#00d4a6] font-inter">{skillsData.metadata.totalSkills}</span>
              </div>
            </div>
          </div>
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
          <h2 className="text-xl sm:text-2xl font-semibold font-inter tracking-wide text-[#00d4a6]">
            Find Skills
          </h2>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Filters Sidebar */}
          <div className="w-full lg:w-64 shrink-0 flex flex-col gap-8">
            
            {/* Publishers Filter */}
            <div>
              <h3 className="text-sm font-semibold border-b border-gray-900 pb-2 mb-3 font-inter text-gray-900 uppercase tracking-widest">
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
                    onDoubleClick={() => setSelectedPublisher(null)}
                    className={`flex items-center gap-2.5 text-left text-sm py-2 px-2 transition-colors select-none ${selectedPublisher === pub.id ? 'text-gray-900 font-semibold' : 'text-gray-500 hover:text-gray-900'}`}
                  >
                    <img src={pub.logo} alt={pub.name} width={16} height={16} className="rounded-full shrink-0" />
                    <span className="truncate font-inter pointer-events-none">{pub.id}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Categories Filter */}
            <div>
              <h3 className="text-sm font-semibold border-b border-gray-900 pb-2 mb-3 font-inter text-gray-900 uppercase tracking-widest">
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
                    <span className="truncate font-inter">{cat.name}</span>
                    <span className="text-[11px] text-gray-400 font-inter border border-gray-200 rounded px-1.5 py-0.5">{cat.count}</span>
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
                className="w-full px-4 py-3 pl-10 rounded-md border border-gray-200 text-sm font-inter focus:outline-none focus:border-[#00d4a6] focus:ring-1 focus:ring-[#00d4a6] placeholder-gray-400 bg-gray-50/50 transition-all"
              />
              <svg className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* List */}
            <div className="flex flex-col border-t border-gray-200 max-h-[600px] overflow-y-auto">
              {paginatedSkills.map((skill, index) => (
                <Link 
                  href={`/${skill.publisher}/skills/${skill.slug}`} 
                  key={skill.id} 
                  className="group flex items-start sm:items-center gap-4 py-4 px-2 hover:bg-gray-50 border-b border-gray-100 transition-colors"
                >
                  {/* Skill Index */}
                  <span className="w-8 shrink-0 text-[13px] text-gray-400 font-inter tabular-nums pt-0.5 sm:pt-0">
                    {(currentPage - 1) * skillsPerPage + index + 1}
                  </span>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <div className="flex items-baseline gap-2 mb-1.5">
                      <span className="font-semibold text-gray-900 font-inter text-[15px] truncate group-hover:text-[#00d4a6] transition-colors">
                        {skill.name}
                      </span>
                      <span className="hidden sm:inline text-xs text-gray-500 font-inter truncate">
                        {skill.publisher} / skills
                      </span>
                    </div>
                    <p className="text-[13px] text-gray-600 truncate leading-relaxed">
                      {skill.description}
                    </p>
                  </div>
                </Link>
              ))}

              {paginatedSkills.length === 0 && (
                <div className="py-12 text-center flex flex-col items-center justify-center">
                  <span className="text-4xl mb-3">👻</span>
                  <span className="text-gray-500 font-inter text-sm">No skills found matching your criteria.</span>
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-500">
                  Showing {((currentPage - 1) * skillsPerPage) + 1} to {Math.min(currentPage * skillsPerPage, filteredSkills.length)} of {filteredSkills.length} skills
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <span className="text-sm text-gray-700">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}