import React, { useState } from 'react';
import { Briefcase, Calendar, Users, ExternalLink, Filter } from 'lucide-react';

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
  }
];

const getColorClasses = (color: string, type: 'bg' | 'text' | 'badge') => {
  const colors: Record<string, any> = {
    emerald: {
      bg: "bg-emerald-50 dark:bg-emerald-900/20",
      text: "text-emerald-600 dark:text-emerald-400",
      badge: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
    },
    blue: {
      bg: "bg-blue-50 dark:bg-blue-900/20",
      text: "text-blue-600 dark:text-blue-400",
      badge: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
    },
    rose: {
      bg: "bg-rose-50 dark:bg-rose-900/20",
      text: "text-rose-600 dark:text-rose-400",
      badge: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300"
    },
    amber: {
      bg: "bg-amber-50 dark:bg-amber-900/20",
      text: "text-amber-600 dark:text-amber-400",
      badge: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
    }
  };
  return colors[color][type] || colors.blue[type];
};

const LatestVacanciesSection = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'category' | 'state'>('all');
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const categories = Array.from(new Set(VACANCIES.map(v => v.category)));
  const states = Array.from(new Set(VACANCIES.map(v => v.state)));

  let filteredVacancies = VACANCIES;
  if (activeTab === 'category' && selectedFilter) {
    filteredVacancies = VACANCIES.filter(v => v.category === selectedFilter);
  } else if (activeTab === 'state' && selectedFilter) {
    filteredVacancies = VACANCIES.filter(v => v.state === selectedFilter);
  }

  const handleTabChange = (tab: 'all' | 'category' | 'state') => {
    setActiveTab(tab);
    setSelectedFilter(null);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 sm:p-12 md:p-16 mb-16 sm:mb-24 border border-gray-200 dark:border-gray-800">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight flex items-center gap-3">
            <Briefcase className="text-brand w-8 h-8" />
            Latest Govt Job Vacancies
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl">
            Stay updated with the newest recruitment notifications and apply before the deadline.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-8 pb-6 border-b border-gray-200 dark:border-gray-800">
        <button 
          onClick={() => handleTabChange('all')}
          className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
            activeTab === 'all' 
              ? 'bg-brand text-white shadow-md' 
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          All Jobs
        </button>
        <button 
          onClick={() => handleTabChange('category')}
          className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${
            activeTab === 'category' 
              ? 'bg-brand text-white shadow-md' 
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          <Filter size={16} /> Category Wise
        </button>
        <button 
          onClick={() => handleTabChange('state')}
          className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${
            activeTab === 'state' 
              ? 'bg-brand text-white shadow-md' 
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          <Filter size={16} /> State Wise
        </button>
      </div>

      {activeTab === 'category' && (
        <div className="flex flex-wrap gap-2 mb-8 animate-fade-in">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat === selectedFilter ? null : cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                cat === selectedFilter 
                  ? 'border-brand bg-brand/10 text-brand' 
                  : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-brand/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {activeTab === 'state' && (
        <div className="flex flex-wrap gap-2 mb-8 animate-fade-in">
          {states.map(st => (
            <button
              key={st}
              onClick={() => setSelectedFilter(st === selectedFilter ? null : st)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                st === selectedFilter 
                  ? 'border-brand bg-brand/10 text-brand' 
                  : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-brand/50'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {filteredVacancies.map((job) => (
          <div 
            key={job.id} 
            className="group flex flex-col bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all relative overflow-hidden"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getColorClasses(job.color, 'badge')}`}>
                {job.status}
              </div>
              <div className={`font-bold text-sm ${getColorClasses(job.color, 'text')}`}>
                {job.board}
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-brand transition-colors">
              {job.post}
            </h3>

            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wider font-semibold">
              <span>{job.category}</span>
              <span>•</span>
              <span>{job.state}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Users size={16} className="text-gray-400" />
                <span><strong className="text-gray-900 dark:text-gray-200">{job.vacancies}</strong> Posts</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Calendar size={16} className="text-gray-400" />
                <span>Last Date: <strong className="text-gray-900 dark:text-gray-200">{job.lastDate}</strong></span>
              </div>
            </div>
            
            <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {job.qualification}
              </span>
              <a 
                href={job.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-dark transition-colors"
              >
                Apply Now
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        ))}
        {filteredVacancies.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500 dark:text-gray-400">
            No vacancies found for the selected filter.
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestVacanciesSection;

