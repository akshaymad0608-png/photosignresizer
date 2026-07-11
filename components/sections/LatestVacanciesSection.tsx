import React from 'react';

const VACANCIES = [
  {
    id: "v1",
    board: "GSSSB",
    post: "Laboratory Assistant (Various) - PwD SRD",
    vacancies: "Multiple",
    lastDate: "06-Jul-2026",
    qualification: "Relevant Diploma/Degree",
    link: "https://ojas.gujarat.gov.in/",
    status: "Active",
    color: "emerald",
    category: "State Govt",
    state: "Gujarat"
  },
  {
    id: "v2",
    board: "GSRTC",
    post: "DRIVER & CONDUCTOR",
    vacancies: "Multiple",
    lastDate: "05-Jul-2026",
    qualification: "12th Pass / Valid License",
    link: "https://ojas.gujarat.gov.in/",
    status: "Active",
    color: "blue",
    category: "State Govt",
    state: "Gujarat"
  },
  {
    id: "v3",
    board: "SSC",
    post: "Combined Graduate Level (CGL)",
    vacancies: "17,727",
    lastDate: "24-Jul-2026",
    qualification: "Any Graduate",
    link: "https://ssc.nic.in/",
    status: "Active",
    color: "rose",
    category: "Central Govt",
    state: "All India"
  },
  {
    id: "v4",
    board: "RRB",
    post: "NTPC (Under Graduate)",
    vacancies: "3,445",
    lastDate: "15-Aug-2026",
    qualification: "12th Pass",
    link: "https://indianrailways.gov.in/",
    status: "Active",
    color: "amber",
    category: "Railway",
    state: "All India"
  },
  {
    id: "v5",
    board: "IBPS",
    post: "Clerk CRP XIV",
    vacancies: "6,000+",
    lastDate: "21-Jul-2026",
    qualification: "Any Graduate",
    link: "https://ibps.in/",
    status: "Active",
    color: "emerald",
    category: "Banking",
    state: "All India"
  },
  {
    id: "v6",
    board: "UP Police",
    post: "Constable",
    vacancies: "60,244",
    lastDate: "15-Jul-2026",
    qualification: "12th Pass",
    link: "https://uppbpb.gov.in/",
    status: "Active",
    color: "blue",
    category: "Police/Defence",
    state: "Uttar Pradesh"
  },
  {
    id: "v7",
    board: "India Post",
    post: "Gramin Dak Sevak (GDS)",
    vacancies: "44,228",
    lastDate: "05-Aug-2026",
    qualification: "10th Pass",
    link: "https://indiapostgdsonline.gov.in/",
    status: "Active",
    color: "rose",
    category: "Central Govt",
    state: "All India"
  },
  {
    id: "v8",
    board: "SSC",
    post: "Multi Tasking Staff (MTS)",
    vacancies: "8,326",
    lastDate: "31-Jul-2026",
    qualification: "10th Pass",
    link: "https://ssc.nic.in/",
    status: "Active",
    color: "amber",
    category: "Central Govt",
    state: "All India"
  },
  {
    id: "v9",
    board: "RRB",
    post: "ALP & Technician",
    vacancies: "9,144",
    lastDate: "10-Aug-2026",
    qualification: "ITI / Diploma",
    link: "https://indianrailways.gov.in/",
    status: "Active",
    color: "emerald",
    category: "Railway",
    state: "All India"
  },
  {
    id: "v10",
    board: "SBI",
    post: "Probationary Officer (PO)",
    vacancies: "2,000+",
    lastDate: "28-Jul-2026",
    qualification: "Any Graduate",
    link: "https://sbi.co.in/web/careers",
    status: "Active",
    color: "blue",
    category: "Banking",
    state: "All India"
  },
  {
    id: "v11",
    board: "RPF",
    post: "Constable & SI",
    vacancies: "4,660",
    lastDate: "20-Jul-2026",
    qualification: "10th/Graduate",
    link: "https://indianrailways.gov.in/",
    status: "Active",
    color: "rose",
    category: "Police/Defence",
    state: "All India"
  },
  {
    id: "v12",
    board: "BSF",
    post: "Head Constable (RO/RM)",
    vacancies: "1,526",
    lastDate: "25-Jul-2026",
    qualification: "12th with PCM",
    link: "https://rectt.bsf.gov.in/",
    status: "Active",
    color: "emerald",
    category: "Police/Defence",
    state: "All India"
  }
];

const COLORS = [
  'bg-[#808000]', // Olive
  'bg-[#1d35c2]', // Blue
  'bg-[#f56600]', // Orange
  'bg-[#a30000]', // Dark Red
  'bg-[#ff3300]', // Red-Orange
  'bg-[#008000]', // Green
  'bg-[#e830c0]', // Pink
  'bg-[#0073e6]', // Light Blue
];

const LatestVacanciesSection = () => {
  // Use first 8 items for the colorful top boxes
  const topBoxes = VACANCIES.slice(0, 8);
  
  // Use the remaining items for the Latest Job list, plus some of the first ones to fill it up
  const latestJobsList = VACANCIES;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl mb-16 sm:mb-24 overflow-hidden">
      
      {/* Top Colorful Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 p-2">
        {topBoxes.map((job, index) => (
          <a
            key={job.id}
            href={job.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`${COLORS[index % COLORS.length]} p-4 text-center text-white font-bold text-sm sm:text-base hover:opacity-90 transition-opacity flex flex-col items-center justify-center min-h-[80px] shadow-sm`}
          >
            <span>{job.board} {job.post}</span>
            <span>Apply Online</span>
          </a>
        ))}
      </div>

      {/* 3 Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-2 mt-4">
        
        {/* Result Column */}
        <div className="border border-red-800 dark:border-red-900 bg-white dark:bg-gray-800">
          <div className="bg-[#a30000] text-white text-center py-2 font-bold text-xl md:text-2xl">
            Result
          </div>
          <div className="p-4 space-y-3 h-[400px] overflow-y-auto">
            <ul className="list-disc pl-5 space-y-3">
              {latestJobsList.map((job) => (
                <li key={`res-${job.id}`} className="text-[#0000ee] dark:text-blue-400 hover:underline cursor-pointer">
                  <a href={job.link} target="_blank" rel="noopener noreferrer">
                    {job.board} {job.post} Result 2026
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Admit Card Column */}
        <div className="border border-red-800 dark:border-red-900 bg-white dark:bg-gray-800">
          <div className="bg-[#a30000] text-white text-center py-2 font-bold text-xl md:text-2xl">
            Admit Card
          </div>
          <div className="p-4 space-y-3 h-[400px] overflow-y-auto">
            <ul className="list-disc pl-5 space-y-3">
              {latestJobsList.map((job) => (
                <li key={`adm-${job.id}`} className="text-[#0000ee] dark:text-blue-400 hover:underline cursor-pointer">
                  <a href={job.link} target="_blank" rel="noopener noreferrer">
                    {job.board} {job.post} Admit Card 2026
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Latest Job Column */}
        <div className="border border-red-800 dark:border-red-900 bg-white dark:bg-gray-800">
          <div className="bg-[#a30000] text-white text-center py-2 font-bold text-xl md:text-2xl">
            Latest Job
          </div>
          <div className="p-4 space-y-3 h-[400px] overflow-y-auto">
            <ul className="list-disc pl-5 space-y-3">
              {latestJobsList.map((job) => (
                <li key={`job-${job.id}`} className="text-[#0000ee] dark:text-blue-400 hover:underline cursor-pointer">
                  <a href={job.link} target="_blank" rel="noopener noreferrer">
                    {job.board} {job.post} Online Form 2026
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LatestVacanciesSection;

