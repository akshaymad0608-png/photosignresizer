import React from 'react';
import { ExternalLink, GraduationCap, Building2, Landmark, Train, Landmark as Bank, Briefcase } from 'lucide-react';

const MAJOR_EXAMS = [
  {
    id: "upsc",
    name: "UPSC",
    fullName: "Union Public Service Commission",
    url: "https://upsc.gov.in/",
    details: "Civil Services, NDA, CDS, CAPF",
    icon: <Landmark className="text-blue-500" size={24} />,
    color: "bg-blue-50 dark:bg-blue-900/20"
  },
  {
    id: "ssc",
    name: "SSC",
    fullName: "Staff Selection Commission",
    url: "https://ssc.nic.in/",
    details: "CGL, CHSL, MTS, GD Constable",
    icon: <Briefcase className="text-emerald-500" size={24} />,
    color: "bg-emerald-50 dark:bg-emerald-900/20"
  },
  {
    id: "ibps",
    name: "IBPS",
    fullName: "Institute of Banking Personnel Selection",
    url: "https://www.ibps.in/",
    details: "PO, Clerk, SO, RRB",
    icon: <Bank className="text-amber-500" size={24} />,
    color: "bg-amber-50 dark:bg-amber-900/20"
  },
  {
    id: "rrb",
    name: "RRB",
    fullName: "Railway Recruitment Board",
    url: "https://indianrailways.gov.in/railwayboard/view_section.jsp?lang=0&id=0,4,1244",
    details: "NTPC, Group D, ALP, JE",
    icon: <Train className="text-red-500" size={24} />,
    color: "bg-red-50 dark:bg-red-900/20"
  },
  {
    id: "gpsc",
    name: "GPSC",
    fullName: "Gujarat Public Service Commission",
    url: "https://gpsc.gujarat.gov.in/",
    details: "Class 1/2, DYSO, PI, STI",
    icon: <Building2 className="text-purple-500" size={24} />,
    color: "bg-purple-50 dark:bg-purple-900/20"
  },
  {
    id: "sbi",
    name: "SBI Careers",
    fullName: "State Bank of India Careers",
    url: "https://sbi.co.in/web/careers",
    details: "SBI PO, SBI Clerk, SO",
    icon: <GraduationCap className="text-cyan-500" size={24} />,
    color: "bg-cyan-50 dark:bg-cyan-900/20"
  },
  {
    id: "gsssb",
    name: "GSSSB",
    fullName: "Gujarat Subordinate Service Selection Board",
    url: "https://gsssb.gujarat.gov.in/",
    details: "Clerk, Head Clerk, ATDO",
    icon: <Briefcase className="text-orange-500" size={24} />,
    color: "bg-orange-50 dark:bg-orange-900/20"
  },
  {
    id: "ojas",
    name: "OJAS Gujarat",
    fullName: "Online Job Application System",
    url: "https://ojas.gujarat.gov.in/",
    details: "Portal for all Gujarat Govt Jobs",
    icon: <Globe className="text-indigo-500" size={24} />,
    color: "bg-indigo-50 dark:bg-indigo-900/20"
  }
];

// Add Globe icon import
import { Globe } from 'lucide-react';

const MajorExamsLinksSection = () => (
  <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 sm:p-12 md:p-16 mb-16 sm:mb-24 border border-gray-200 dark:border-gray-800">
    <div className="text-center mb-12">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
        Important Government Exam Portals
      </h2>
      <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
        Direct links to official websites for notifications, online applications, and exam details.
      </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {MAJOR_EXAMS.map((exam) => (
        <a 
          key={exam.id} 
          href={exam.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all hover:-translate-y-1 relative"
        >
          <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
            <ExternalLink size={18} className="text-gray-400" />
          </div>
          <div className={`w-14 h-14 ${exam.color} rounded-xl flex items-center justify-center mb-5`}>
            {exam.icon}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-brand transition-colors">
              {exam.name}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-xs font-medium mb-3 line-clamp-1">
              {exam.fullName}
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              <span className="font-semibold text-gray-900 dark:text-gray-200">Exams: </span>
              {exam.details}
            </p>
          </div>
        </a>
      ))}
    </div>
  </div>
);

export default MajorExamsLinksSection;
