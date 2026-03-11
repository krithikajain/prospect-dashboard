import { useState, useEffect } from 'react';
import type { SellerContract } from '@/contracts';

interface HomeStageProps {
    onExplore?: (prospect: { firstName: string, lastName: string, email: string }, sellerConfig: SellerContract) => void;
}

export function Stage0Home({ onExplore }: HomeStageProps) {
    // We check localStorage synchronously to avoid UI flash, then fetch latest async
    const savedEmail = localStorage.getItem('seller_email') || '';

    const [sellerName, setSellerName] = useState('Demo User');
    const [sellerEmail, setSellerEmail] = useState(savedEmail);
    const [companyName, setCompanyName] = useState('Acme Analytics');

    const [productCategory, setProductCategory] = useState('Sales');
    const [otherProductCategory, setOtherProductCategory] = useState('');
    const [targetCompanySize, setTargetCompanySize] = useState('Mid-Market (201-1000)');
    const [targetIndustry, setTargetIndustry] = useState('SaaS');
    const [otherTargetIndustry, setOtherTargetIndustry] = useState('');

    const [step, setStep] = useState(0); // 0: Home, 1: Identity, 2: Targeting, 3: Hunt
    const [isAnimating, setIsAnimating] = useState(false);
    const [isInitializing, setIsInitializing] = useState(true);

    useEffect(() => {
        if (!savedEmail) {
            setIsInitializing(false);
            return;
        }

        // Silent background fetch to auth the user and pull their profile config
        fetch(`http://localhost:8000/api/user/${encodeURIComponent(savedEmail)}`)
            .then(res => {
                if (!res.ok) throw new Error("User not found");
                return res.json();
            })
            .then(data => {
                setSellerName(data.sellerName);
                setCompanyName(data.companyName);

                // If it's standard dropdown value, set it. Otherwise put in 'Other' specific field
                const isStandardProduct = ['AI/ML', 'Sales', 'CRM', 'Marketing Automation', 'DevTools', 'FinTech', 'Security', 'Data/Analytics', 'HR Tech'].includes(data.productCategory);
                setProductCategory(isStandardProduct ? data.productCategory : 'Other');
                if (!isStandardProduct) setOtherProductCategory(data.productCategory);

                setTargetCompanySize(data.targetCompanySize[0] || 'Mid-Market (201-1000)');

                const standardIndustries = ['SaaS', 'FinTech', 'E-commerce', 'Healthcare', 'Manufacturing', 'Professional Services', 'Media', 'Education', 'Government'];
                const ind = data.targetIndustries[0] || 'SaaS';
                setTargetIndustry(standardIndustries.includes(ind) ? ind : 'Other');
                if (!standardIndustries.includes(ind)) setOtherTargetIndustry(ind);

                setStep(3); // Jump to hunt!
            })
            .catch(err => {
                console.warn("Soft Auth check failed. User must onboard.", err);
            })
            .finally(() => {
                setIsInitializing(false);
            });
    }, [savedEmail]);

    // Step 3: Hunt the prospect
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const nextStep = () => {
        setIsAnimating(true);
        setTimeout(() => {
            setStep(prev => prev + 1);
            setIsAnimating(false);
        }, 300);
    };

    const prevStep = () => {
        setIsAnimating(true);
        setTimeout(() => {
            setStep(prev => prev - 1);
            setIsAnimating(false);
        }, 300);
    };

    const handleExplore = () => {
        if (step === 0) {
            nextStep();
            return;
        }

        if (step === 1) {
            if (!sellerName.trim() || !sellerEmail.trim() || !companyName.trim()) {
                alert("Please fill in all fields (Display Name, Company Name, and Work Email) to continue.");
                return;
            }
            nextStep();
            return;
        }

        if (step === 2) {
            if (productCategory === 'Other' && !otherProductCategory.trim()) {
                alert("Please specify the exact Product Category.");
                return;
            }
            if (targetIndustry === 'Other' && !otherTargetIndustry.trim()) {
                alert("Please specify the exact Target Industry.");
                return;
            }

            // Save basic persistency
            localStorage.setItem('seller_email', sellerEmail);

            const userConfig = {
                sellerName,
                sellerEmail,
                companyName,
                productCategory: productCategory === 'Other' ? otherProductCategory : productCategory,
                targetCompanySize: [targetCompanySize],
                targetIndustries: [targetIndustry === 'Other' ? otherTargetIndustry : targetIndustry]
            };

            // Post to backend database!
            fetch('http://localhost:8000/api/user/onboard', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userConfig)
            }).then(() => {
                nextStep();
            }).catch(e => {
                console.error("Failed to save to database:", e);
                nextStep(); // Fallback to local run
            });

            return;
        }

        if (step === 3) {
            if (!firstName.trim() || !lastName.trim() || !email.trim()) {
                alert("Please fill in First Name, Last Name, and Work Email to continue.");
                return;
            }
            if (onExplore) {
                onExplore({ firstName, lastName, email }, {
                    sellerName,
                    sellerEmail,
                    companyName,
                    productCategory: productCategory === 'Other' ? otherProductCategory : productCategory,
                    targetCompanySize: [targetCompanySize],
                    targetIndustries: [targetIndustry === 'Other' ? otherTargetIndustry : targetIndustry]
                });
            }
        }
    };

    return (
        <div className="w-full flex-1 flex flex-col relative h-full min-h-0">
            <main className="flex-1 flex items-center justify-center">
                <div className="max-w-7xl w-full bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 p-8 lg:px-16 lg:py-10 flex flex-col lg:flex-row items-center justify-between relative overflow-hidden min-h-[500px]">
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-slate-50 rounded-full blur-3xl opacity-50"></div>
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-slate-50 rounded-full blur-3xl opacity-50"></div>

                    <div className="lg:w-1/2 z-10 space-y-6">
                        <h1 className="text-[54px] lg:text-[60px] font-semibold tracking-tight text-slate-900 leading-[1.05]">
                            Connecting Data,<br />
                            <span className="text-slate-400">Unlocking Insights</span>
                        </h1>
                        <p className="text-lg text-slate-500 max-w-md leading-relaxed">
                            Our Sales Prospecting Radar analyzes millions of data points to map your ideal customer network.
                        </p>

                        {!isInitializing && (
                            <div className={`transition-all duration-300 transform ${isAnimating ? 'opacity-0 -translate-x-8' : 'opacity-100 translate-x-0'}`}>
                                {step === 1 && (
                                    <div className="space-y-6 max-w-md">
                                        <div className="flex items-center space-x-2 text-slate-400">
                                            <span className="text-xs font-bold uppercase tracking-widest">Step 01</span>
                                            <div className="h-px w-8 bg-slate-200"></div>
                                            <span className="text-xs font-medium">Who you are</span>
                                        </div>
                                        <h2 className="text-3xl font-bold text-slate-900">Define your profile</h2>
                                        <div className="space-y-4 pt-2">
                                            <div className="space-y-1">
                                                <label className="text-xs text-slate-400 font-bold uppercase">Your Name</label>
                                                <input type="text" value={sellerName} onChange={e => setSellerName(e.target.value)} className="w-full px-5 py-3 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-slate-900 transition-all" />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs text-slate-400 font-bold uppercase">Company Name</label>
                                                <input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} className="w-full px-5 py-3 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-slate-900 transition-all" />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs text-slate-400 font-bold uppercase">Work Email</label>
                                                <input type="email" value={sellerEmail} onChange={e => setSellerEmail(e.target.value)} className="w-full px-5 py-3 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-slate-900 transition-all" />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {step === 2 && (
                                    <div className="space-y-6 max-w-md">
                                        <div className="flex items-center space-x-2 text-slate-400">
                                            <span className="text-xs font-bold uppercase tracking-widest">Step 02</span>
                                            <div className="h-px w-8 bg-slate-200"></div>
                                            <span className="text-xs font-medium">Your targets</span>
                                        </div>
                                        <h2 className="text-3xl font-bold text-slate-900">Sales Compass</h2>
                                        <div className="space-y-4 pt-2">
                                            <div className="space-y-1">
                                                <label className="text-xs text-slate-400 font-bold uppercase">Your Product Category?</label>
                                                <select value={productCategory} onChange={e => setProductCategory(e.target.value)} className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-slate-900 transition-all appearance-none cursor-pointer">
                                                    <option value="AI/ML">AI/ML</option>
                                                    <option value="Sales">Sales</option>
                                                    <option value="CRM">CRM</option>
                                                    <option value="Marketing Automation">Marketing Automation</option>
                                                    <option value="DevTools">DevTools</option>
                                                    <option value="FinTech">FinTech</option>
                                                    <option value="Security">Security</option>
                                                    <option value="Data/Analytics">Data/Analytics</option>
                                                    <option value="HR Tech">HR Tech</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>

                                            {productCategory === 'Other' && (
                                                <div className="space-y-1 animate-in slide-in-from-top-2">
                                                    <label className="text-xs text-slate-400 font-bold uppercase">Specify Category</label>
                                                    <input type="text" placeholder="e.g. EdTech, BioTech..." value={otherProductCategory} onChange={e => setOtherProductCategory(e.target.value)} className="w-full px-5 py-3 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-slate-900 transition-all" />
                                                </div>
                                            )}
                                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                                                <div className="space-y-1">
                                                    <label className="text-xs text-slate-400 font-bold uppercase">Target Size</label>
                                                    <select value={targetCompanySize} onChange={e => setTargetCompanySize(e.target.value)} className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-slate-900 transition-all appearance-none cursor-pointer">
                                                        <option>Startup (1-50)</option>
                                                        <option>SMB (51-200)</option>
                                                        <option>Mid-Market (201-1000)</option>
                                                        <option>Enterprise (1001-5000)</option>
                                                    </select>
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-xs text-slate-400 font-bold uppercase">Industry Fit</label>
                                                    <select value={targetIndustry} onChange={e => setTargetIndustry(e.target.value)} className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-slate-900 transition-all appearance-none cursor-pointer">
                                                        <option value="SaaS">SaaS</option>
                                                        <option value="FinTech">FinTech</option>
                                                        <option value="E-commerce">E-commerce</option>
                                                        <option value="Healthcare">Healthcare</option>
                                                        <option value="Manufacturing">Manufacturing</option>
                                                        <option value="Professional Services">Professional Services</option>
                                                        <option value="Media">Media</option>
                                                        <option value="Education">Education</option>
                                                        <option value="Government">Government</option>
                                                        <option value="Other">Other</option>
                                                    </select>
                                                </div>
                                            </div>

                                            {targetIndustry === 'Other' && (
                                                <div className="space-y-1 animate-in slide-in-from-top-2">
                                                    <label className="text-xs text-slate-400 font-bold uppercase">Specific Industry</label>
                                                    <input type="text" placeholder="e.g. Agriculture, Legal..." value={otherTargetIndustry} onChange={e => setOtherTargetIndustry(e.target.value)} className="w-full px-5 py-3 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-slate-900 transition-all" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {step === 3 && (
                                    <div className="space-y-6 max-w-md">
                                        <div className="flex items-center space-x-2 text-slate-400">
                                            <span className="text-xs font-bold uppercase tracking-widest">Step 03</span>
                                            <div className="h-px w-8 bg-slate-200"></div>
                                            <span className="text-xs font-medium">The Hunt</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <h2 className="text-3xl font-bold text-slate-900">Hunt a Prospect</h2>
                                            <button
                                                onClick={() => setStep(1)}
                                                className="text-xs font-bold text-slate-400 hover:text-slate-900 uppercase tracking-tighter transition-colors border-b border-dotted border-slate-300"
                                            >
                                                Edit Profile & Strategy
                                            </button>
                                        </div>
                                        <p className="text-sm text-slate-400 leading-relaxed">Enter the details of the decision-maker you want to analyze.</p>
                                        <div className="pt-2 space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-1">
                                                    <label className="text-xs text-slate-400 font-bold uppercase">First Name</label>
                                                    <input
                                                        type="text"
                                                        value={firstName}
                                                        onChange={(e) => setFirstName(e.target.value)}
                                                        placeholder="e.g. Satya"
                                                        autoFocus
                                                        className="w-full px-5 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-slate-900 transition-all font-medium"
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-xs text-slate-400 font-bold uppercase">Last Name</label>
                                                    <input
                                                        type="text"
                                                        value={lastName}
                                                        onChange={(e) => setLastName(e.target.value)}
                                                        placeholder="e.g. Nadella"
                                                        className="w-full px-5 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-slate-900 transition-all font-medium"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs text-slate-400 font-bold uppercase">Work Email</label>
                                                <div className="relative group">
                                                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 material-symbols-outlined group-focus-within:text-slate-900 transition-colors">mail</span>
                                                    <input
                                                        type="email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        placeholder="e.g. satya@microsoft.com"
                                                        className="w-full pl-14 pr-6 py-4 rounded-3xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 transition-all text-lg font-medium"
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter') handleExplore();
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="flex items-center space-x-4 pt-6">
                            {step > 0 && (
                                <button
                                    onClick={prevStep}
                                    className="p-4 rounded-full border border-slate-200 text-slate-400 hover:text-slate-900 hover:border-slate-900 transition-all"
                                >
                                    <span className="material-symbols-outlined block">arrow_back</span>
                                </button>
                            )}
                            <button
                                onClick={handleExplore}
                                className="bg-slate-900 text-white px-10 py-5 rounded-full font-bold flex items-center space-x-3 hover:scale-[1.02] hover:shadow-lg transition-all active:scale-95 disabled:opacity-50"
                            >
                                <span>
                                    {step === 0 ? 'Start Prospecting' :
                                        step === 1 ? 'Configure Targets' :
                                            step === 2 ? 'Ready to Hunt' : 'Unlock Insights'}
                                </span>
                                <span className="material-symbols-outlined text-2xl">
                                    {step === 3 ? 'auto_awesome' : 'arrow_forward'}
                                </span>
                            </button>
                        </div>
                    </div>

                    <div className="lg:w-1/2 lg:mt-0 flex justify-center lg:justify-end relative">
                        <div className="relative w-full max-w-[400px] aspect-square">
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

            <footer className="w-full max-w-7xl mx-auto py-4 px-8 flex flex-col md:flex-row justify-between items-center opacity-60 hover:opacity-100 transition-opacity duration-500 mt-4">
                <div className="flex items-center space-x-12 mb-4 md:mb-0">
                    <div className="flex flex-col">
                        <span className="text-xl font-bold text-slate-900">99.9%</span>
                        <span className="text-[10px] uppercase tracking-widest text-slate-500 font-medium">Data Accuracy</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-bold text-slate-900">2.5k+</span>
                        <span className="text-[10px] uppercase tracking-widest text-slate-500 font-medium">Enterprise Users</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-bold text-slate-900">40ms</span>
                        <span className="text-[10px] uppercase tracking-widest text-slate-500 font-medium">Response Time</span>
                    </div>
                </div>
                <div className="flex items-center space-x-6 text-xs font-medium text-slate-400">
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
