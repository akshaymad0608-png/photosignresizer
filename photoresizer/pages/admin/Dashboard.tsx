import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Settings, FileText, Image, LayoutDashboard, ShieldCheck, Users } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-card-sunk flex font-sans text-ink">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-rule hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-rule font-bold text-xl tracking-tight">
          Admin Panel
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Link to="/admin" className="flex items-center gap-3 px-4 py-3 bg-signal/10 text-signal rounded-xl font-bold">
            <LayoutDashboard size={20} /> Overview
          </Link>
          <Link to="#" className="flex items-center gap-3 px-4 py-3 text-muted hover:bg-card-sunk dark:hover:bg-card-sunk rounded-xl font-medium transition-colors">
            <Image size={20} /> Tool Management
          </Link>
          <Link to="#" className="flex items-center gap-3 px-4 py-3 text-muted hover:bg-card-sunk dark:hover:bg-card-sunk rounded-xl font-medium transition-colors">
            <BarChart3 size={20} /> Analytics
          </Link>
          <Link to="#" className="flex items-center gap-3 px-4 py-3 text-muted hover:bg-card-sunk dark:hover:bg-card-sunk rounded-xl font-medium transition-colors">
            <FileText size={20} /> Blog & Content
          </Link>
          <Link to="#" className="flex items-center gap-3 px-4 py-3 text-muted hover:bg-card-sunk dark:hover:bg-card-sunk rounded-xl font-medium transition-colors">
            <Users size={20} /> Users
          </Link>
          <Link to="#" className="flex items-center gap-3 px-4 py-3 text-muted hover:bg-card-sunk dark:hover:bg-card-sunk rounded-xl font-medium transition-colors">
            <Settings size={20} /> SEO Settings
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 bg-card border-b border-rule flex items-center justify-between px-6">
          <h1 className="text-xl font-bold font-sans">Dashboard Overview</h1>
          <Link to="/" className="text-sm font-medium text-muted hover:text-signal transition-colors">Back to Site</Link>
        </header>

        <div className="flex-1 overflow-auto p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-card rounded-[2rem] p-6 border border-rule shadow-sm flex items-start gap-4">
               <div className="p-3 bg-signal/10 text-signal rounded-2xl"><Image size={24} /></div>
               <div>
                  <p className="text-sm text-muted font-medium">Total Conversions</p>
                  <p className="text-3xl font-bold mt-1">1.2M</p>
               </div>
            </div>
            <div className="bg-card rounded-[2rem] p-6 border border-rule shadow-sm flex items-start gap-4">
               <div className="p-3 bg-signal/10 text-signal rounded-2xl"><Users size={24} /></div>
               <div>
                  <p className="text-sm text-muted font-medium">Active Users (30d)</p>
                  <p className="text-3xl font-bold mt-1">45K</p>
               </div>
            </div>
            <div className="bg-card rounded-[2rem] p-6 border border-rule shadow-sm flex items-start gap-4">
               <div className="p-3 bg-green-500/10 text-green-500 rounded-2xl"><ShieldCheck size={24} /></div>
               <div>
                  <p className="text-sm text-muted font-medium">System Status</p>
                  <p className="text-xl font-bold mt-2 text-green-500">All Systems Operational</p>
               </div>
            </div>
          </div>

          <div className="bg-card rounded-[2rem] border border-rule shadow-sm overflow-hidden mb-8">
            <div className="p-6 border-b border-rule">
               <h2 className="text-lg font-bold">Recent Uploads</h2>
            </div>
            <div className="p-6 text-center text-muted py-12">
               Upload feed proxy is working. Waiting for real-time data...
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
