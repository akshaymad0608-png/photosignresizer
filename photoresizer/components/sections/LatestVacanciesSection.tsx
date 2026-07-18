import React from 'react';

const VACANCIES = [
  {
    id: "v-forest",
    board: "Gujarat Forest Department",
    post: "Tracker",
    vacancies: "Various",
    lastDate: "22-Jul-2026",
    qualification: "10 Pass",
    link: "https://ojas.gujarat.gov.in/",
    status: "Active",
    color: "emerald",
    category: "State Govt",
    state: "Gujarat"
  },
  {
    id: "v-pgvcl",
    board: "PGVCL, UGVCL, MGVCL, DGVCL",
    post: "Junior Assistant",
    vacancies: "2306",
    lastDate: "06-Aug-2026",
    qualification: "12th",
    link: "https://ojas.gujarat.gov.in/",
    status: "Active",
    color: "blue",
    category: "State Govt",
    state: "Gujarat"
  },
  {
    id: "v-iob",
    board: "IOB",
    post: "Apprentice",
    vacancies: "750",
    lastDate: "20-Jul-2026",
    qualification: "Graduate",
    link: "https://www.iob.in/",
    status: "Active",
    color: "blue",
    category: "Banking",
    state: "All India"
  },
  {
    id: "v-boi",
    board: "Bank of India",
    post: "Credit Officer",
    vacancies: "Various",
    lastDate: "21-Jul-2026",
    qualification: "Graduate",
    link: "https://bankofindia.co.in/",
    status: "Active",
    color: "rose",
    category: "Banking",
    state: "All India"
  },
  {
    id: "v-ibps-po",
    board: "IBPS",
    post: "Probationary Officer",
    vacancies: "6975",
    lastDate: "21-Jul-2026",
    qualification: "Graduate",
    link: "https://ibps.in/",
    status: "Active",
    color: "blue",
    category: "Banking",
    state: "All India"
  },
  {
    id: "v-ibps-so",
    board: "IBPS",
    post: "Specialist Officer",
    vacancies: "745",
    lastDate: "21-Jul-2026",
    qualification: "Graduate/Post Graduate",
    link: "https://ibps.in/",
    status: "Active",
    color: "rose",
    category: "Banking",
    state: "All India"
  },
  {
    id: "v-iocl",
    board: "IndianOil",
    post: "Apprentice",
    vacancies: "647",
    lastDate: "28-Jul-2026",
    qualification: "ITI / Diploma / Graduate",
    link: "https://iocl.com/",
    status: "Active",
    color: "amber",
    category: "Central Govt",
    state: "All India"
  },
  {
    id: "v-rrb-tech",
    board: "RRB",
    post: "Technician",
    vacancies: "6665",
    lastDate: "29-Jul-2026",
    qualification: "ITI / Diploma",
    link: "https://indianrailways.gov.in/",
    status: "Active",
    color: "blue",
    category: "Railway",
    state: "All India"
  },
  {
    id: "v-railway-section",
    board: "Railway",
    post: "Section Controller",
    vacancies: "119",
    lastDate: "14-Aug-2026",
    qualification: "Graduate",
    link: "https://indianrailways.gov.in/",
    status: "Active",
    color: "emerald",
    category: "Railway",
    state: "All India"
  },
  {
    id: "v-bro",
    board: "BRO",
    post: "Various Posts",
    vacancies: "1898",
    lastDate: "19-Jul-2026",
    qualification: "10th / ITI / Graduate",
    link: "https://bro.gov.in/",
    status: "Active",
    color: "blue",
    category: "Central Govt",
    state: "All India"
  },
  {
    id: "v-gsssb-agri",
    board: "GSSSB",
    post: "Agriculture Overseer",
    vacancies: "14",
    lastDate: "22-Jul-2026",
    qualification: "B.Sc. Agriculture",
    link: "https://ojas.gujarat.gov.in/",
    status: "Active",
    color: "emerald",
    category: "State Govt",
    state: "Gujarat"
  },
  {
    id: "v-jmc",
    board: "JMC",
    post: "Various Posts",
    vacancies: "120",
    lastDate: "20-Jul-2026",
    qualification: "Various",
    link: "https://mcjamnagar.com/",
    status: "Active",
    color: "rose",
    category: "State Govt",
    state: "Gujarat"
  },
  {
    id: "v-rnsb",
    board: "RNSB",
    post: "Various Posts",
    vacancies: "179",
    lastDate: "20-Jul-2026",
    qualification: "Graduate",
    link: "https://rnsbindia.com/",
    status: "Active",
    color: "amber",
    category: "Banking",
    state: "Gujarat"
  },
  {
    id: "v-amc",
    board: "AMC",
    post: "Assistant Senior Clerk",
    vacancies: "250",
    lastDate: "30-Jul-2026",
    qualification: "Graduate",
    link: "https://ahmedabadcity.gov.in/",
    status: "Active",
    color: "blue",
    category: "State Govt",
    state: "Gujarat"
  },
  {
    id: "v-gyan-sahayak",
    board: "Gyan Sahayak",
    post: "Secondary & Higher Secondary Teacher",
    vacancies: "1861",
    lastDate: "15-Jul-2026",
    qualification: "B.Ed. / Post Graduate",
    link: "https://gyansahayak.gujarat.gov.in/",
    status: "Active",
    color: "emerald",
    category: "State Govt",
    state: "Gujarat"
  },
  {
    id: "v-ap-apprentice",
    board: "AP Apprentice",
    post: "Apprentice",
    vacancies: "Various",
    lastDate: "28-Jul-2026",
    qualification: "Diploma / Graduate",
    link: "https://apprenticeshipindia.gov.in/",
    status: "Active",
    color: "blue",
    category: "State Govt",
    state: "Andhra Pradesh"
  }
];


const LatestVacanciesSection = () => {
  // Use first 8 items for the colorful top boxes
  const topBoxes = VACANCIES.slice(0, 8);
  
  // Use the remaining items for the Latest Job list, plus some of the first ones to fill it up
  const latestJobsList = VACANCIES;

  return (
    <div className="bg-card rounded-2xl mb-16 sm:mb-24 overflow-hidden">
      
      {/* Top Colorful Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 p-2">
        {topBoxes.map((job, index) => (
          <a
            key={job.id}
            href={job.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`${index % 2 === 0 ? 'bg-signal' : 'bg-signal'} p-4 text-center text-white font-bold text-sm sm:text-base hover:opacity-90 transition-opacity flex flex-col items-center justify-center min-h-[80px] shadow-sm`}
          >
            <span>{job.board} {job.post}</span>
            <span>Apply Online</span>
          </a>
        ))}
      </div>

      {/* 3 Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-2 mt-4">
        
        {/* Result Column */}
        <div className="border border-signal dark:border-signal bg-card">
          <div className="bg-signal text-white text-center py-2 font-bold text-xl md:text-2xl">
            Result
          </div>
          <div className="p-4 space-y-3 h-[400px] overflow-y-auto">
            <ul className="list-disc pl-5 space-y-3">
              {latestJobsList.map((job) => (
                <li key={`res-${job.id}`} className="text-signal hover:underline cursor-pointer">
                  <a href={job.link} target="_blank" rel="noopener noreferrer">
                    {job.board} {job.post} Result 2026
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Admit Card Column */}
        <div className="border border-signal dark:border-signal bg-card">
          <div className="bg-signal text-white text-center py-2 font-bold text-xl md:text-2xl">
            Admit Card
          </div>
          <div className="p-4 space-y-3 h-[400px] overflow-y-auto">
            <ul className="list-disc pl-5 space-y-3">
              {latestJobsList.map((job) => (
                <li key={`adm-${job.id}`} className="text-signal hover:underline cursor-pointer">
                  <a href={job.link} target="_blank" rel="noopener noreferrer">
                    {job.board} {job.post} Admit Card 2026
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Latest Job Column */}
        <div className="border border-signal dark:border-signal bg-card">
          <div className="bg-signal text-white text-center py-2 font-bold text-xl md:text-2xl">
            Latest Job
          </div>
          <div className="p-4 space-y-3 h-[400px] overflow-y-auto">
            <ul className="list-disc pl-5 space-y-3">
              {latestJobsList.map((job) => (
                <li key={`job-${job.id}`} className="text-signal hover:underline cursor-pointer">
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

