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
    color: "bg-signal/10 "
  },
  {
    id: "ssc",
    name: "SSC",
    fullName: "Staff Selection Commission",
    url: "https://ssc.nic.in/",
    details: "CGL, CHSL, MTS, GD Constable",
    icon: <Briefcase className="text-signal" size={24} />,
    color: "bg-signal/10 "
  },
  {
    id: "ibps",
    name: "IBPS",
    fullName: "Institute of Banking Personnel Selection",
    url: "https://www.ibps.in/",
    details: "PO, Clerk, SO, RRB",
    icon: <Bank className="text-amber-500" size={24} />,
    color: "bg-signal/10 "
  },
  {
    id: "rrb",
    name: "RRB",
    fullName: "Railway Recruitment Board",
    url: "https://indianrailways.gov.in/railwayboard/view_section.jsp?lang=0&id=0,4,1244",
    details: "NTPC, Group D, ALP, JE",
    icon: <Train className="text-red-500" size={24} />,
    color: "bg-signal/10 "
  },
  {
    id: "gpsc",
    name: "GPSC",
    fullName: "Gujarat Public Service Commission",
    url: "https://gpsc.gujarat.gov.in/",
    details: "Class 1/2, DYSO, PI, STI",
    icon: <Building2 className="text-signal" size={24} />,
    color: "bg-signal/10 "
  },
  {
    id: "sbi",
    name: "SBI Careers",
    fullName: "State Bank of India Careers",
    url: "https://sbi.co.in/web/careers",
    details: "SBI PO, SBI Clerk, SO",
    icon: <GraduationCap className="text-signal" size={24} />,
    color: "bg-signal/10 "
  },
  {
    id: "gsssb",
    name: "GSSSB",
    fullName: "Gujarat Subordinate Service Selection Board",
    url: "https://gsssb.gujarat.gov.in/",
    details: "Clerk, Head Clerk, ATDO",
    icon: <Briefcase className="text-orange-500" size={24} />,
    color: "bg-signal/10 "
  },
  {
    id: "ojas",
    name: "OJAS Gujarat",
    fullName: "Online Job Application System",
    url: "https://ojas.gujarat.gov.in/",
    details: "Portal for all Gujarat Govt Jobs",
    icon: <Globe className="text-signal" size={24} />,
    color: "bg-signal/10 "
  }
];

// Add Globe icon import
import { Globe } from 'lucide-react';

const MajorExamsLinksSection = () => (
  <div className="bg-card rounded-2xl p-8 sm:p-12 md:p-16 mb-16 sm:mb-24 border border-rule">
    <div className="text-center mb-12">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-ink mb-4 tracking-tight">
        Important Government Exam Portals
      </h2>
      <p className="text-muted text-lg max-w-2xl mx-auto">
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
          className="group flex flex-col bg-card-sunk rounded-xl p-6 border border-rule hover:shadow-sm transition-all hover:-translate-y-1 relative"
        >
          <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
            <ExternalLink size={18} className="text-muted" />
          </div>
          <div className={`w-14 h-14 ${exam.color} rounded-xl flex items-center justify-center mb-5`}>
            {exam.icon}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-ink mb-1 group-hover:text-signal transition-colors">
              {exam.name}
            </h3>
            <p className="text-muted text-xs font-medium mb-3 line-clamp-1">
              {exam.fullName}
            </p>
            <p className="text-muted text-sm leading-relaxed">
              <span className="font-semibold text-ink">Exams: </span>
              {exam.details}
            </p>
          </div>
        </a>
      ))}
    </div>
  </div>
);

export default MajorExamsLinksSection;
