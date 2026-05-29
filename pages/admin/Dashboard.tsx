import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Settings, FileText, Image, LayoutDashboard, ShieldCheck, Users } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 flex dark:bg-gray-950 font-sans text-gray-900 dark:text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-800 font-black text-xl tracking-tight">
          Admin Panel
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Link to="/admin" className="flex items-center gap-3 px-4 py-3 bg-brand/10 text-brand rounded-xl font-bold">
            <LayoutDashboard size={20} /> Overview
          </Link>
          <Link to="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 rounded-xl font-medium transition-colors">
            <Image size={20} /> Tool Management
          </Link>
          <Link to="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 rounded-xl font-medium transition-colors">
            <BarChart3 size={20} /> Analytics
          </Link>
          <Link to="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 rounded-xl font-medium transition-colors">
            <FileText size={20} /> Blog & Content
          </Link>
          <Link to="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 rounded-xl font-medium transition-colors">
            <Users size={20} /> Users
          </Link>
          <Link to="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 rounded-xl font-medium transition-colors">
            <Settings size={20} /> SEO Settings
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6">
          <h1 className="text-xl font-bold font-sans">Dashboard Overview</h1>
          <Link to="/" className="text-sm font-medium text-gray-500 hover:text-brand transition-colors">Back to Site</Link>
        </header>

        <div className="flex-1 overflow-auto p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-900 rounded-[2rem] p-6 border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
               <div className="p-3 bg-brand/10 text-brand rounded-2xl"><Image size={24} /></div>
               <div>
                  <p className="text-sm text-gray-500 font-medium">Total Conversions</p>
                  <p className="text-3xl font-black mt-1">1.2M</p>
               </div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-[2rem] p-6 border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
               <div className="p-3 bg-accent/10 text-accent rounded-2xl"><Users size={24} /></div>
               <div>
                  <p className="text-sm text-gray-500 font-medium">Active Users (30d)</p>
                  <p className="text-3xl font-black mt-1">45K</p>
               </div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-[2rem] p-6 border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
               <div className="p-3 bg-green-500/10 text-green-500 rounded-2xl"><ShieldCheck size={24} /></div>
               <div>
                  <p className="text-sm text-gray-500 font-medium">System Status</p>
                  <p className="text-xl font-bold mt-2 text-green-500">All Systems Operational</p>
               </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800">
               <h2 className="text-lg font-bold">Recent Uploads</h2>
            </div>
            <div className="p-6 text-center text-gray-500 py-12">
               Upload feed proxy is working. Waiting for real-time data...
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
