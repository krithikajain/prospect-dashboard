import { useState } from 'react';

export function Stage0Home() {
    const [showEmailInput, setShowEmailInput] = useState(false);

    return (
        <div className="w-full flex flex-col relative h-[calc(100vh-140px)]">
            <main className="flex-1 flex items-center justify-center py-6">
                <div className="max-w-7xl w-full bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 p-12 lg:p-20 flex flex-col lg:flex-row items-center justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-slate-50 rounded-full blur-3xl opacity-50"></div>
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-slate-50 rounded-full blur-3xl opacity-50"></div>

                    <div className="lg:w-1/2 z-10 space-y-8">
                        <h1 className="text-[64px] font-semibold tracking-tight text-slate-900 leading-[1.05]">
                            Connecting Data,<br />
                            <span className="text-slate-400">Unlocking Insights</span>
                        </h1>
                        <p className="text-lg text-slate-500 max-w-md leading-relaxed">
                            Our Sales Prospecting Radar analyzes millions of data points to map your ideal customer network, qualifying high-intent leads before you even reach out.                        </p>
                        <div className="flex items-center gap-4 pt-4 h-[60px]">
                            {showEmailInput && (
                                <input
                                    type="email"
                                    placeholder="Enter prospect's email"
                                    autoFocus
                                    className="w-full max-w-[320px] px-6 py-4 rounded-full border border-gray-200 text-sm focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all bg-gray-50/50 shadow-inner"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Escape') setShowEmailInput(false);
                                    }}
                                />
                            )}
                            <button
                                onClick={() => setShowEmailInput(true)}
                                className="bg-slate-900 text-white px-8 py-4 rounded-full font-medium flex items-center space-x-3 hover:opacity-90 transition-all group shadow-sm"
                            >
                                <span>Explore Prospects</span>
                                <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </button>
                        </div>
                    </div>

                    <div className="lg:w-1/2 mt-16 lg:mt-0 flex justify-center lg:justify-end relative">
                        <div className="relative w-full max-w-lg aspect-square">
                            <svg className="w-full h-full drop-shadow-2xl" fill="none" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
                                <path className="text-slate-200" d="M300 100L450 180V340L300 420L150 340V180L300 100Z" stroke="currentColor" strokeWidth="1.5"></path>
                                <path className="text-slate-200" d="M300 100V420M150 180L300 260L450 180M150 340L300 260" stroke="currentColor" strokeWidth="1.5"></path>
                                <path className="text-slate-100" d="M300 240L360 270V330L300 360L240 330V270L300 240Z" fill="currentColor" stroke="currentColor" strokeWidth="1"></path>
                                <path className="text-slate-300" d="M300 240V360M240 270L300 300L360 270" stroke="currentColor" strokeWidth="1"></path>
                                <path className="text-slate-50" d="M400 300L460 330V390L400 420L340 390V330L400 300Z" fill="currentColor" stroke="currentColor" strokeWidth="1"></path>
                                <path className="text-slate-300" d="M400 300V420M340 330L400 360L460 330" stroke="currentColor" strokeWidth="1"></path>
                                <circle className="text-slate-400" cx="300" cy="100" fill="currentColor" r="4"></circle>
                                <circle className="text-slate-400" cx="450" cy="180" fill="currentColor" r="4"></circle>
                                <circle className="text-slate-400" cx="150" cy="180" fill="currentColor" r="4"></circle>
                                <circle className="text-slate-800" cx="300" cy="260" fill="white" r="6" stroke="currentColor" strokeWidth="2"></circle>
                                <path className="text-slate-400" d="M300 100L450 180L300 260" stroke="currentColor" strokeWidth="1.5"></path>
                                <rect className="text-slate-200" fill="currentColor" height="50" rx="4" stroke="currentColor" strokeWidth="1" width="40" x="470" y="240"></rect>
                                <line className="text-slate-400" stroke="currentColor" strokeWidth="2" x1="478" x2="495" y1="255" y2="255"></line>
                                <line className="text-slate-400" stroke="currentColor" strokeWidth="2" x1="478" x2="502" y1="265" y2="265"></line>
                            </svg>
                            <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-blue-500 rounded-full blur-sm animate-pulse opacity-50"></div>
                            <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-indigo-500 rounded-full blur-sm animate-bounce opacity-30" style={{ animationDuration: '3s' }}></div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="w-full max-w-7xl mx-auto py-8 px-8 flex flex-col md:flex-row justify-between items-center opacity-60 hover:opacity-100 transition-opacity duration-500 mt-auto">
                <div className="flex items-center space-x-12 mb-8 md:mb-0">
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold text-slate-900">99.9%</span>
                        <span className="text-xs uppercase tracking-widest text-slate-500 font-medium">Data Accuracy</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold text-slate-900">2.5k+</span>
                        <span className="text-xs uppercase tracking-widest text-slate-500 font-medium">Enterprise Users</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold text-slate-900">40ms</span>
                        <span className="text-xs uppercase tracking-widest text-slate-500 font-medium">Response Time</span>
                    </div>
                </div>
                <div className="flex items-center space-x-6 text-sm font-medium text-slate-400">
                    <a className="hover:text-slate-900 transition-colors" href="#">Documentation</a>
                    <span className="text-slate-300">|</span>
                    <a className="hover:text-slate-900 transition-colors" href="#">Support</a>
                    <span className="text-slate-300">|</span>
                    <a className="hover:text-slate-900 transition-colors" href="#">Contact</a>
                </div>
            </footer>
        </div>
    );
}
