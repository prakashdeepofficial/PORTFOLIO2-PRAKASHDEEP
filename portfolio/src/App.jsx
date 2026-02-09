import React, { useState, useEffect, useRef } from 'react';
import emailjs from "emailjs-com";
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import {
    ArrowUpRight,
    Globe,
    Code2,
    Cpu,
    Database,
    Terminal,
    Play,
    Pause,
    Disc,
    Send,
    Layers,
    Wrench,
    FileCode,
    Award,
    ExternalLink,
    CheckCircle2,
    Copy,
    Github,
    Menu,
    X,
    BadgeCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Portfolio() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [time, setTime] = useState(new Date());
    const [showAllProjects, setShowAllProjects] = useState(false);
    const [activeProjectId, setActiveProjectId] = useState(null);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [hoveredProjectId, setHoveredProjectId] = useState(null);

    const navigate = useNavigate()

    // Loader States
    const [isLoading, setIsLoading] = useState(true);
    const [loadingCount, setLoadingCount] = useState(0);

    // --- FRAMER MOTION CURSOR SETUP ---
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring physics for the main cursor dot
    const cursorX = useSpring(mouseX, { stiffness: 500, damping: 28 });
    const cursorY = useSpring(mouseY, { stiffness: 500, damping: 28 });

    // Interaction States
    const [isHoveringName, setIsHoveringName] = useState(false);
    const [isHoveringLink, setIsHoveringLink] = useState(false); // NEW: Track link hovering

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const contactRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        // NEW: Global listener to check if hovering over clickable elements
        const handleMouseOver = (e) => {
            const target = e.target.closest('a, button, input, textarea, [role="button"]');
            setIsHoveringLink(!!target);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, []);

    // Full list of projects
    const allProjects = [
        {
            id: '01',
            title: 'AI-powered Ecommerce Platform for Eco-Friendly Products',
            year: '2025',
            stack: 'React / Node / MongoDB / Java script / OpenAI / Tailwind',
            desc: 'Sustainable online marketplace using AI to recommend eco-friendly products based on user preferences.',
            link: 'https://zoshbazaar.vercel.app',
            github: '#',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQccxmwHH9IBns5PpFsmGkD3-rKSLML42u-vw&s'
        },
        {
            id: '02',
            title: 'AI-powered Resume Builder',
            year: '2025',
            stack: 'OpenAI / React / Node / MongoDB',
            desc: 'Smart tool that creates personalized, professional resumes using AI.',
            link: 'https://resumefy-pied.vercel.app',
            github: '#',
            image: 'https://cdn.prod.website-files.com/635c591378332f38be25d45f/673b128a0b7a6d75befd50b2_res2.webp'
        },
        {
            id: '03',
            title: 'Zestora - AI-powered Restaurants & Food Delivery',
            year: '2025',
            stack: 'OpenAI API / React / Node / MongoDB / Tailwind',
            desc: 'Zestora is an AI-powered restaurant and food delivery platform that leverages OpenAI to enhance user experience. It offers personalized restaurant recommendations, intelligent search capabilities, and an AI-driven chatbot for customer support, making food ordering seamless and enjoyable.',
            link: 'https://zestora-omega.vercel.app',
            github: '#',
            image: 'https://img.freepik.com/free-vector/modern-healthy-food-banners-with-photo_23-2147920530.jpg?semt=ais_hybrid&w=740&q=80'
        },
        {
            id: '04',
            title: 'Social Media Platform - pingup',
            year: '2026',
            stack: 'Reactjs / Node.js / MongoDB / Tailwind CSS / Framer Motion / imagekit',
            desc: 'Real-time cryptocurrency tracker featuring live price charts.',
            link: 'https://socialpingup.vercel.app',
            github: '#',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgtOH0ZoZnsJFmSFd738BxjIm0eBaNlWW7FQ&s'
        },
        {
            id: '05',
            title: 'CAMPUS CONNECT - For Students of LU',
            year: '2026',
            stack: 'Reactjs / Node.js / MongoDB / Tailwind CSS / Framer Motion / imagekit',
            desc: 'Cross-platform mobile application for food ordering.',
            link: '#',
            github: '#',
            image: 'https://media.istockphoto.com/id/642849978/photo/diverse-university-or-college-students-using-laptops-and-wireless-devices.jpg?s=170667a&w=0&k=20&c=eujZFN3okVSyky7bNhgyN5SjzpyFDEBbtqRz-bXrZLA='
        },
        {
            id: '06',
            title: 'CodeSpheres - Master Programming with Interactive Coding Notes',
            year: '2025',
            stack: 'React / MongoDB / React / Motion /React-Merkdown / Tailwind / Imagekit',
            desc: 'CodeSpheres is an interactive coding notes platform that combines the power of React, MongoDB, and Framer Motion to create an engaging learning experience. It allows users to create, organize, and share coding notes with dynamic animations and a user-friendly interface.',
            link: '#',
            github: '#',
            image: 'https://cdn.tech.eu/uploads/2024/05/screen-shot-2024-05-17-at-31234-pm-908.png'
        },
        {
            id: '07',
            title: 'Ping-up - Social Media Platform',
            year: '2022',
            stack: 'MERN Stack / Tailwind CSS / Framer Motion / imagekit',
            desc: 'Social media platform for connecting and sharing with friends.',
            link: 'https://socialpingup.vercel.app',
            github: '#',
            image: 'https://cdn.dribbble.com/userupload/4811847/file/original-39f9ee6bf7abb0d8f9d2142d267cd596.png?resize=400x0'
        },
        {
            id: '08',
            title: 'AI-powered QuickGPT Chatbot',
            year: '2025',
            stack: 'OpenAI / Node / MongoDB / Imagekit',
            desc: 'AI-driven chatbot that provides instant, intelligent responses for any query.',
            link: 'https://quick-gpt-chatbot-tbh7.vercel.app/',
            github: '#',
            image: 'https://images.sftcdn.net/images/t_app-cover-s-16-9,f_auto/p/2c3215da-0764-459f-b7f3-d19a64b5f086/2075099916/quickgpt-z2n-screenshot'
        },
        {
            id: '09',
            title: 'Car Rental Website',
            year: '2025',
            stack: 'React / MongoDB / React / Motion',
            desc: 'Online platform for browsing, comparing, and booking rental cars easily.',
            link: 'https://car-rental-full-tau.vercel.app',
            github: '#',
            image: 'https://cdn.dribbble.com/userupload/4262907/file/original-86ae585ff076c7c13191b9132919ea46.png'
        },
        {
            id: '10',
            title: 'Portfolio v1',
            year: '2021',
            stack: 'HTML / CSS / JS',
            desc: 'My first personal website built from scratch.',
            link: '#',
            github: '#',
            image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1000&auto=format&fit=crop'
        },
    ];

    const visibleProjects = showAllProjects ? allProjects : allProjects.slice(0, 4);

    // --- INTERACTION HANDLERS ---
    const toggleProject = (id) => {
        setActiveProjectId((prev) => (prev === id ? null : id));
    };

    // --- SCROLL & LOAD LOGIC ---
    useEffect(() => {
        const interval = setInterval(() => {
            setLoadingCount((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setIsLoading(false), 800);
                    return 100;
                }
                return prev + Math.floor(Math.random() * 5) + 1;
            });
        }, 50);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        const handleScroll = () => setScrollPosition(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => {
            clearInterval(timer);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        setIsMobileMenuOpen(false);
    };

    // --- THEME LOGIC ---
    const getTheme = () => {
        const heroHeight = window.innerHeight * 0.8;
        if (scrollPosition < heroHeight) return 'dark';
        if (contactRef.current) {
            const rect = contactRef.current.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) return 'dark';
        }
        return 'light';
    };

    const currentTheme = getTheme();

    // --- ANIMATION VARIANTS ---
    const fadeInUp = {
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const profileLink = [
        {
            name: "LinkedIn",
            url: "https://www.linkedin.com/in/prakash-deep-9a70871b8"
        },
        {
            name: "GitHub",
            url: "https://github.com/prakashdeepofficial"
        },
        {
            name: "Freelancer",
            url: "https://www.freelancer.com/u/Prakashdeep06"
        },
        {
            name: "Instagram",
            url: "https://www.instagram.com/prakashdeepofficial"
        },
        {
            name: "LeetCode",
            url: "https://leetcode.com/u/deep542/"
        }
    ]

    const sendEmail = async (e) => {
        e.preventDefault();

        if (!name.trim() || !email.trim() || !message.trim()) {
            alert("Please fill all fields before sending.");
            return;
        }

        setIsSending(true);

        try {
            await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/email/send`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, message }),
            });

            alert("Message sent successfully!");
        } catch (err) {
            alert("Failed to send message.");
        } finally {
            setIsSending(false);
        }
    };



    useEffect(() => {
    }, []);




    return (
        // Toggle 'cursor-none' based on isHoveringLink state
        // If hovering a link, we remove 'cursor-none' to let the browser default pointer show.
        <div className={`font-sans selection:bg-purple-500 selection:text-white relative bg-black ${isHoveringLink ? '' : 'cursor-none'}`}>

            {/* --- ADVANCED CUSTOM CURSOR (FRAMER MOTION) --- */}
            <motion.div
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%'
                }}
                // Hide custom cursor if hovering a link OR if hovering a project row (to avoid double cursors with the card)
                className={`fixed top-0 left-0 rounded-full z-[10000] pointer-events-none transition-all duration-300 ease-out
          ${isHoveringName ? 'w-[200px] h-[200px] bg-white/10 backdrop-blur-sm' : 'w-10 h-10'}
          ${!isHoveringName && currentTheme === 'dark' ? 'bg-black' : ''} 
          ${!isHoveringName && currentTheme === 'light' ? 'bg-white' : ''}
        `}
                animate={{
                    scale: isHoveringLink ? 0 : (hoveredProjectId ? 2.5 : 1), // Grow when hovering project
                    opacity: isHoveringLink ? 0 : 1
                }}
            >
                {hoveredProjectId && (
                    <motion.span
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-[10px] font-bold uppercase tracking-tighter text-black"
                    >
                        View
                    </motion.span>
                )}
            </motion.div>

            {/* --- ADVANCED DOUBLE-SHUTTER LOADER --- */}
            <AnimatePresence mode="wait">
                {isLoading && (
                    <motion.div
                        key="loader"
                        className="fixed inset-0 z-[100] flex flex-col pointer-events-none"
                        exit={{ transition: { delay: 1.5 } }}
                    >
                        <div className="absolute inset-0 flex flex-col z-10">
                            <motion.div initial={{ height: "50vh" }} exit={{ height: 0 }} transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.3 }} className="bg-[#1a1a1a] w-full" />
                            <motion.div initial={{ height: "50vh" }} exit={{ height: 0 }} transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.3 }} className="bg-[#1a1a1a] w-full" />
                        </div>
                        <div className="absolute inset-0 flex flex-col z-20">
                            <motion.div initial={{ height: "50vh" }} exit={{ height: 0 }} transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }} className="bg-black w-full" />
                            <motion.div initial={{ height: "50vh" }} exit={{ height: 0 }} transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }} className="bg-black w-full" />
                        </div>
                        <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="absolute inset-0 flex flex-col items-center justify-center z-30 text-white">
                            <div className="text-8xl font-black tracking-tighter">{Math.min(loadingCount, 100)}%</div>
                            <div className="mt-4 text-sm uppercase tracking-[0.2em] text-gray-400 animate-pulse">Crafting Digital Experience...</div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- MOBILE MENU --- */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                        className="fixed inset-0 z-[60] bg-black text-white flex flex-col items-center justify-center gap-8"
                    >
                        <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-6 right-6 text-white hover:text-gray-400 transition-colors p-2"><X size={32} /></button>
                        <div className="flex flex-col items-center gap-8">
                            {['Services', 'Skills', 'Works', 'Certificates', 'About', 'Contact'].map((item) => (
                                <button key={item} onClick={() => scrollTo(item.toLowerCase())} className="text-4xl md:text-5xl font-black uppercase tracking-tighter hover:text-gray-500 transition-colors">{item}</button>
                            ))}
                            <div className="w-12 h-1 bg-white/20 my-4"></div>
                            <button onClick={() => scrollTo('contact')} className="text-xl font-bold uppercase tracking-widest bg-white text-black px-8 py-3 hover:bg-gray-200 transition-colors">Let's Talk</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- LAYER 1: FIXED HERO (LIGHT) --- */}
            <section
                className={`fixed top-0 left-0 w-full h-screen bg-gray-100 text-black transition-opacity duration-500 ${scrollPosition > window.innerHeight ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                style={{ zIndex: 1 }}
            >
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {/* Center Circle */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[800px] md:h-[800px] bg-black rounded-full opacity-[0.03]"></div>
                    {/* Top Right Circle */}
                    <div className="absolute -top-[20%] -right-[10%] w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-black rounded-full opacity-[0.02]"></div>
                    {/* Bottom Left Circle */}
                    <div className="absolute -bottom-[20%] -left-[10%] w-[400px] h-[400px] md:w-[700px] md:h-[700px] bg-black rounded-full opacity-[0.02]"></div>
                </div>

                <div className="max-w-7xl mx-auto w-full h-full flex flex-col justify-between px-4 sm:px-6 pt-24 sm:pt-32 md:pt-40 pb-12 sm:pb-16 md:pb-20 relative z-10">
                    <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="mb-6 sm:mb-8">
                        <motion.span variants={fadeInUp} className="inline-block px-3 py-1 border border-gray-300 rounded-full text-xs text-gray-600 uppercase tracking-widest mb-4 sm:mb-6">Data Analyst | Business Analyst | Cybersecurity Enthusiast</motion.span>
                        <motion.h1
                            variants={fadeInUp}
                            className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-semibold tracking-tighter leading-[0.9] mb-6 sm:mb-8 cursor-default"
                            onMouseEnter={() => setIsHoveringName(true)}
                            onMouseLeave={() => setIsHoveringName(false)}
                        >
                            HI THERE,<br />I'M <span className="text-gray-400">PRAKASH DEEP.</span>
                        </motion.h1>
                    </motion.div>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-end">
                        <div className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-600 max-w-xl"><span className="text-black font-medium">Data Analyst</span> & <span className="text-black font-medium">Cybersecurity Enthusiast</span>. I transform complex datasets into actionable intelligence while securing digital infrastructure.</div>
                        <div className="flex gap-3 sm:gap-4 md:justify-end">
                            <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-full border border-gray-300 flex items-center justify-center animate-spin-slow"><Globe size={16} className="sm:size-6 text-gray-600" /></div>
                            <div className="flex flex-col justify-center text-[10px] sm:text-xs uppercase tracking-widest text-gray-500"><span>Based in Bareilly</span><span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span></div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- LAYER 2: FIXED FINAL FOOTER (BLACK) --- */}
            <footer className="fixed bottom-0 left-0 w-full h-screen bg-black text-white px-6 flex items-center justify-center z-0">
                <div className="text-center w-full max-w-7xl mx-auto">
                    <p className="text-gray-500 text-sm uppercase tracking-[0.3em] mb-10 animate-pulse">Designed & Built By</p>
                    <h1 onMouseEnter={() => setIsHoveringName(true)} onMouseLeave={() => setIsHoveringName(false)} className="text-[13vw] md:text-[15vw] leading-[0.8] font-black tracking-tighter text-white transition-all duration-700 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-500 hover:via-cyan-500 hover:to-indigo-500 cursor-default select-none">PRAKASH<br />DEEP</h1>
                    <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-white/10 pt-8 w-full text-xs font-bold uppercase tracking-widest text-gray-500">
                        <div className="flex flex-wrap justify-center gap-8">
                            {profileLink.map((social) => (
                                <motion.a onClick={() => navigate(social.url)} whileHover={{ scale: 1.1, color: "#fff" }} key={social.name} href="#" className="hover:text-white transition-colors cursor-pointer">{social.name}</motion.a>
                            ))}
                        </div>
                        <div className="flex gap-8"><span>© {new Date().getFullYear()}</span><span>Bareilly, India</span></div>
                    </div>
                </div>
            </footer>

            {/* Navbar */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className={`fixed top-0 w-full z-50 px-4 sm:px-6 py-4 sm:py-6 transition-all duration-500 ${currentTheme === 'dark' ? ' text-black' : ' text-white blur-bg-white/10'}`}
            >
                <div className="flex justify-between items-center max-w-7xl mx-auto">
                    <div className="text-base sm:text-lg md:text-xl font-bold tracking-tighter cursor-pointer">DEEP.DEV</div>
                    <div className="hidden md:flex gap-6 lg:gap-8 text-xs lg:text-sm font-medium uppercase tracking-widest opacity-80">
                        {['Services', 'Skills', 'Works', 'Certificates', 'About', 'Contact'].map((item) => (
                            <button key={item} onClick={() => scrollTo(item.toLowerCase())} className="hover:opacity-100 transition-opacity cursor-pointer">{item}</button>
                        ))}
                    </div>
                    <button onClick={() => scrollTo('contact')} className={`hidden md:block px-4 lg:px-6 py-2 text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer ${currentTheme === 'dark' ? 'bg-black text-white hover:bg-gray-800' : 'bg-white text-black hover:bg-gray-200'}`}>Let's Talk</button>
                    <button onClick={() => setIsMobileMenuOpen(true)} className={`md:hidden p-2 cursor-pointer ${currentTheme === 'dark' ? 'text-black' : 'text-white'}`}><Menu size={24} /></button>
                </div>
            </motion.nav>

            {/* --- LAYER 3: SCROLLABLE CONTENT --- */}
            <div className="relative z-10 mt-[100vh] mb-[100vh] bg-[#0a0a0a] text-white rounded-t-[3rem] rounded-b-[3rem] shadow-2xl overflow-hidden">

                {/* --- TRIPLE LAYER STICKY SERVICES --- */}
                <section id="services" className="relative">
                    {/* Card 1 */}
                    <div className="sticky top-0 h-screen bg-[#0a0a0a] flex flex-col justify-center px-4 sm:px-6 border-t border-white/10 shadow-2xl">
                        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-8 md:gap-12">
                            <div className="md:w-3/4">
                                <span className="text-xs sm:text-sm text-gray-500 font-mono mb-3 sm:mb-4 block">01.</span>
                                <h3 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 tracking-tighter">Data & Business<br />Analytics</h3>
                                <p className="text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed max-w-md">Transforming complex datasets into actionable business intelligence using advanced visualization and statistical modeling.</p>
                                <div className="flex flex-wrap gap-2 mt-6 sm:mt-8">
                                    {['Power BI', 'Tableau', 'SQL', 'Python', 'Pandas', 'NumPy', 'EDA', 'Statistical Analysis', 'Requirement Gathering'].map(tag => <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-400 border border-white/10">{tag}</span>)}
                                </div>
                            </div>
                            <div className="hidden md:flex items-center justify-center">
                                <div className="w-64 h-64 rounded-full border border-white/10 flex items-center justify-center animate-spin-slow">
                                    <Database size={64} className="text-gray-600" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="sticky top-0 h-screen bg-[#0f0f0f] flex flex-col justify-center px-4 sm:px-6 border-t border-white/10 shadow-2xl">
                        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-8 md:gap-12">
                            <div className="md:w-3/4">
                                <span className="text-xs sm:text-sm text-gray-500 font-mono mb-3 sm:mb-4 block">02.</span>
                                <h3 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 tracking-tighter">Cybersecurity<br />Operations</h3>
                                <p className="text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed max-w-md">Securing digital infrastructure through proactive penetration testing, vulnerability assessments, and robust network defense.</p>
                                <div className="flex flex-wrap gap-2 mt-6 sm:mt-8">
                                    {['Nmap', 'Kali Linux', 'Penetration Testing', 'Risk Assessment', 'Ethical Hacking', 'Wireshark', 'Metasploit'].map(tag => <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-400 border border-white/10">{tag}</span>)}
                                </div>
                            </div>
                            <div className="hidden md:flex items-center justify-center">
                                <div className="w-64 h-64 rounded-full border border-white/10 flex items-center justify-center animate-pulse">
                                    <Terminal size={64} className="text-gray-600" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="sticky top-0 h-screen bg-[#141414] flex flex-col justify-center px-4 sm:px-6 border-t border-white/10 shadow-2xl">
                        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-8 md:gap-12">
                            <div className="md:w-3/4">
                                <span className="text-xs sm:text-sm text-gray-500 font-mono mb-3 sm:mb-4 block">03.</span>
                                <h3 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 tracking-tighter">Business<br />Intelligence</h3>
                                <p className="text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed max-w-md">Bridging the gap between technical data and business goals to optimize performance and drive strategic decision-making.</p>
                                <div className="flex flex-wrap gap-2 mt-6 sm:mt-8">
                                    {['Market Research', 'Competitive Analysis', 'Reporting', 'Excel', 'VBA', 'Cloud Security'].map(tag => <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-400 border border-white/10">{tag}</span>)}
                                </div>
                            </div>
                            <div className="hidden md:flex items-center justify-center">
                                <div className="w-64 h-64 rounded-full border border-white/10 flex items-center justify-center">
                                    <Globe size={64} className="text-gray-600" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Skills */}
                <section id="skills" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 border-t border-white/5 bg-[#0a0a0a]">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeInUp}
                                className="md:w-1/3"
                            >
                                <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-gray-500 mb-3 sm:mb-4">Technical Arsenal</h2>
                                <p className="text-lg sm:text-xl md:text-2xl font-medium leading-tight text-gray-400">A refined collection of cutting-edge technologies and tools that power efficient development, scalable architectures, and high-performance digital solutions.</p>
                            </motion.div>
                            <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10">
                                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="space-y-6">
                                    <div className="flex items-center gap-3 text-white border-b border-gray-800 pb-4"><Database size={20} className="text-gray-500" /><h3 className="text-lg font-bold tracking-wide">DATA ANALYTICS</h3></div>
                                    <div className="grid grid-cols-2 gap-4">
                                        {['Python (Pandas)', 'SQL', 'Excel (Advanced)', 'Power BI', 'Tableau', 'Statistical Analysis'].map((skill) => <div key={skill} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"><span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span><span className="text-sm uppercase tracking-wider">{skill}</span></div>)}
                                    </div>
                                </motion.div>
                                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="space-y-6">
                                    <div className="flex items-center gap-3 text-white border-b border-gray-800 pb-4"><Terminal size={20} className="text-gray-500" /><h3 className="text-lg font-bold tracking-wide">CYBERSECURITY</h3></div>
                                    <div className="grid grid-cols-2 gap-4">
                                        {['Ethical Hacking', 'Penetration Testing', 'Nmap', 'Wireshark', 'Metasploit', 'Vulnerability Assessment'].map((skill) => <div key={skill} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"><span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span><span className="text-sm uppercase tracking-wider">{skill}</span></div>)}
                                    </div>
                                </motion.div>
                                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="space-y-6">
                                    <div className="flex items-center gap-3 text-white border-b border-gray-800 pb-4"><Layers size={20} className="text-gray-500" /><h3 className="text-lg font-bold tracking-wide">BI & CORE</h3></div>
                                    <div className="grid grid-cols-2 gap-4">
                                        {['Market Research', 'EDA', 'Report Generation', 'Networking', 'Linux/Ubuntu', 'Git/GitHub'].map((skill) => <div key={skill} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"><span className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></span><span className="text-sm uppercase tracking-wider">{skill}</span></div>)}
                                    </div>
                                </motion.div>
                                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="space-y-6">
                                    <div className="flex items-center gap-3 text-white border-b border-gray-800 pb-4"><Cpu size={20} className="text-gray-500" /><h3 className="text-lg font-bold tracking-wide">EXPLORING</h3></div>
                                    <div className="grid grid-cols-2 gap-4">
                                        {['Risk Management', 'Cloud Security', 'Web Defense', 'Digital Forensics'].map((skill) => <div key={skill} className="flex items-center gap-2 text-gray-500 hover:text-gray-300 transition-colors"><span className="w-1.5 h-1.5 bg-gray-700 rounded-full"></span><span className="text-sm uppercase tracking-wider">{skill}</span></div>)}
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Works Section with Interaction */}
                <section id="works" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 border-t border-white/5">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 md:gap-0 mb-12 md:mb-16"
                        >
                            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-semibold tracking-tighter">My<br />Projects.</h2>
                            <div className="hidden md:block text-right">
                                <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">Featured Projects</p>
                                <p className="text-xl font-medium">2024 — 2028</p>
                            </div>
                        </motion.div>

                        <div id='projects-section'>
                            <div className="flex flex-col">
                                {visibleProjects.map((work, index) => {
                                    const isOpen = activeProjectId === work.id;

                                    return (
                                        <motion.div
                                            key={work.id}
                                            layout
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1, duration: 0.5 }}
                                            className={`relative border-t transition-colors ${isOpen ? 'border-white/40 bg-white/[0.03]' : 'border-gray-800'}`}
                                        >
                                            <button
                                                type="button"
                                                onClick={() => toggleProject(work.id)}
                                                className="w-full text-left focus:outline-none"
                                                aria-expanded={isOpen}
                                            >
                                                <div
                                                    className="flex flex-col md:flex-row md:items-center py-6 sm:py-8 md:py-10 px-3 sm:px-4 -mx-3 sm:-mx-4 relative z-10 cursor-pointer gap-3 md:gap-0 group"
                                                    onMouseEnter={() => setHoveredProjectId(work.id)}
                                                    onMouseLeave={() => setHoveredProjectId(null)}
                                                >
                                                    <div className="md:w-1/12 text-[10px] sm:text-xs font-mono text-gray-500 group-hover:text-white transition-colors">{work.id}</div>
                                                    <div className="md:w-5/12">
                                                        <h3 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight flex items-center gap-3 transition-transform duration-500 group-hover:translate-x-2">
                                                            <span className={`inline-flex h-8 w-0.5 transition-all duration-500 ${isOpen ? 'bg-purple-500 h-12' : 'bg-white/40 group-hover:bg-white group-hover:h-12'}`} aria-hidden />
                                                            {work.title}
                                                        </h3>
                                                    </div>
                                                    <div className="md:w-3/12 text-gray-500 text-[10px] sm:text-sm font-mono hidden sm:block group-hover:text-gray-300 transition-colors">{work.stack}</div>
                                                    <div className="md:w-3/12 flex justify-end items-center gap-2 sm:gap-4">
                                                        <span className="text-gray-500 text-[10px] sm:text-sm font-mono hidden sm:inline group-hover:text-gray-300 transition-colors">{work.year}</span>
                                                        <motion.div
                                                            animate={{
                                                                rotate: isOpen ? 45 : 0,
                                                                scale: hoveredProjectId === work.id ? 1.2 : 1,
                                                                backgroundColor: isOpen ? '#A855F7' : (hoveredProjectId === work.id ? '#fff' : 'rgba(255,255,255,0.1)')
                                                            }}
                                                            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                                                            className={`p-2 sm:p-3 rounded-full shadow-lg ${isOpen ? 'text-white' : 'text-black bg-white'}`}
                                                        >
                                                            <ArrowUpRight size={16} className="sm:size-5" />
                                                        </motion.div>
                                                    </div>

                                                    {/* Hover Image Preview (Optional / subtle) */}
                                                    <AnimatePresence>
                                                        {hoveredProjectId === work.id && !isOpen && (
                                                            <motion.div
                                                                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                                                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                                                exit={{ opacity: 0, x: 20, scale: 0.8 }}
                                                                className="absolute right-[20%] top-1/2 -translate-y-1/2 w-48 aspect-video rounded-lg overflow-hidden border border-white/20 shadow-2xl pointer-events-none z-20 hidden lg:block"
                                                            >
                                                                <img src={work.image} alt="" className="w-full h-full object-cover" />
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            </button>

                                            <AnimatePresence>
                                                {isOpen && (
                                                    <motion.div
                                                        key={`${work.id}-details`}
                                                        initial={{ height: 0, opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
                                                        animate={{ height: 'auto', opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
                                                        exit={{ height: 0, opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
                                                        transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
                                                        className="overflow-hidden bg-white/[0.04] border border-white/10 rounded-2xl mt-2 sm:mt-3 md:mt-4"
                                                    >
                                                        <div className="relative overflow-hidden">
                                                            <motion.div
                                                                className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/5 to-transparent"
                                                                initial={{ scaleY: 1 }}
                                                                animate={{ scaleY: 0 }}
                                                                exit={{ scaleY: 1 }}
                                                                transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
                                                                style={{ transformOrigin: 'top' }}
                                                            />
                                                            <motion.div
                                                                className="absolute inset-0 bg-gradient-to-t from-white/10 via-white/5 to-transparent"
                                                                initial={{ scaleY: 1 }}
                                                                animate={{ scaleY: 0 }}
                                                                exit={{ scaleY: 1 }}
                                                                transition={{ duration: 0.45, delay: 0.05, ease: [0.76, 0, 0.24, 1] }}
                                                                style={{ transformOrigin: 'bottom' }}
                                                            />

                                                            <div className="relative z-10 p-4 sm:p-6 md:p-8 grid md:grid-cols-5 gap-6 md:gap-8 items-center">
                                                                <div className="md:col-span-3">
                                                                    <motion.div
                                                                        initial={{ scale: 0.9, opacity: 0 }}
                                                                        animate={{ scale: 1, opacity: 1 }}
                                                                        transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                                                        className="aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl group/img"
                                                                    >
                                                                        <img
                                                                            src={work.image}
                                                                            alt={work.title}
                                                                            className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
                                                                        />
                                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-500" />
                                                                    </motion.div>
                                                                </div>

                                                                <div className="md:col-span-2 space-y-6">
                                                                    <motion.div
                                                                        initial={{ y: 20, opacity: 0 }}
                                                                        animate={{ y: 0, opacity: 1 }}
                                                                        transition={{ delay: 0.3 }}
                                                                    >
                                                                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-purple-400 mb-2">Project Overview</h4>
                                                                        <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-light">{work.desc}</p>
                                                                    </motion.div>

                                                                    <motion.div
                                                                        initial={{ y: 20, opacity: 0 }}
                                                                        animate={{ y: 0, opacity: 1 }}
                                                                        transition={{ delay: 0.4 }}
                                                                        className="space-y-3"
                                                                    >
                                                                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">Technologies Used</h4>
                                                                        <div className="flex flex-wrap gap-2">
                                                                            {work.stack.split(' / ').map((tech, i) => (
                                                                                <motion.span
                                                                                    key={tech.trim()}
                                                                                    whileHover={{ y: -2, backgroundColor: 'rgba(255,255,255,0.1)' }}
                                                                                    className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] sm:text-xs font-medium text-gray-400 hover:text-white transition-all"
                                                                                >
                                                                                    {tech.trim()}
                                                                                </motion.span>
                                                                            ))}
                                                                        </div>
                                                                    </motion.div>

                                                                    <motion.div
                                                                        initial={{ y: 20, opacity: 0 }}
                                                                        animate={{ y: 0, opacity: 1 }}
                                                                        transition={{ delay: 0.5 }}
                                                                        className="flex flex-wrap gap-4 pt-4"
                                                                    >
                                                                        <a
                                                                            href={work.link || '#'}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="group/btn relative px-8 py-3 bg-white text-black rounded-xl text-xs font-black uppercase tracking-widest shadow-xl overflow-hidden transition-all hover:scale-105 active:scale-95"
                                                                        >
                                                                            <span className="relative z-10 flex items-center gap-2">
                                                                                Live Demo <ArrowUpRight size={14} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                                                            </span>
                                                                        </a>
                                                                        <a
                                                                            href={work.github || '#'}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="group/btn px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white/10 hover:border-white/30 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                                                                        >
                                                                            <Github size={16} /> Source Code
                                                                        </a>
                                                                    </motion.div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    );
                                })}
                                <div className="border-t border-gray-800"></div>
                            </div>
                        </div>

                        <div className="mt-8 md:mt-12 text-center">
                            <button
                                onClick={() => setShowAllProjects(!showAllProjects)}
                                className="px-6 sm:px-8 py-2 sm:py-3 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all uppercase text-[10px] sm:text-xs font-bold tracking-widest cursor-pointer"
                            >
                                {showAllProjects ? 'Show Less' : 'View All Projects'}
                            </button>
                        </div>
                    </div>
                </section>

                {/* Certificates */}
                <section id="certificates" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 border-t border-white/5">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-4 md:gap-6"
                        >
                            <div><h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-gray-500 mb-2 sm:mb-4">Credentials & Honors</h2><h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">CERTIFICATIONS</h3></div>
                            <div className="flex items-center gap-2 text-gray-400"><Award size={24} /><span className="text-sm uppercase tracking-wider">Verified Achievements</span></div>
                        </motion.div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                            {[
                                {
                                    title: "Data Analysis using Python",
                                    issuer: "NIELIT Calicut",
                                    date: "",
                                    id: "nielit-da-python",
                                    color: "hover:border-indigo-400/50",
                                    url: "https://drive.google.com/file/d/1JzLDfdCLI73npiYAifwH503sLryR7T8j/view"
                                },
                                {
                                    title: "Machine Learning using Python",
                                    issuer: "NIELIT Calicut",
                                    date: "",
                                    id: "nielit-ml-python",
                                    color: "hover:border-blue-300/50",
                                    url: "https://drive.google.com/file/d/1UZgcqNqJR-6vvwCoJcG8E2blBSUQ640_/view"
                                },
                                {
                                    title: "Course on Computer Concepts (CCC)",
                                    issuer: "NIELIT",
                                    date: "",
                                    id: "nielit-ccc",
                                    color: "hover:border-emerald-400/50",
                                    url: "https://drive.google.com/file/d/1Bi9b5BY7AtlhAtCb8MOt62_vs8Qg_4FI/view"
                                },
                                {
                                    title: "Cyber Security",
                                    issuer: "Tech Mahindra Foundation (Skill India Digital Hub)",
                                    date: "",
                                    id: "tmf-cyber-security",
                                    color: "hover:border-red-400/50",
                                    url: "https://drive.google.com/file/d/1Awo-ZngnRIzEBMQh-otszCF9hMAflIrr/view"
                                },
                                {
                                    title: "Cyber Security Awareness",
                                    issuer: "NIELIT Lucknow",
                                    date: "",
                                    id: "nielit-cyber-awareness",
                                    color: "hover:border-sky-400/50",
                                    url: "https://drive.google.com/file/d/1Alw-zXR_wgFXx21BoWK8YAvEh4BUi5kl/view"
                                },
                                {
                                    title: "Generative AI in Education & Research",
                                    issuer: "Mahatma Jyotiba Phule Rohilkhand University, Bareilly (UNESCO Sponsored)",
                                    date: "",
                                    id: "mjpru-genai",
                                    color: "hover:border-fuchsia-400/50",
                                    url: "https://drive.google.com/file/d/1uoUJQp4FtOfV8nwMBioj7lgS_jsbCPLB/view"
                                }
                            ].map((cert, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`group relative overflow-hidden bg-white/5 border border-white/10 p-0 rounded-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/10 ${cert.color}`}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-colors duration-500"></div>
                                    <div className="relative p-8 h-full flex flex-col justify-between z-10">
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl text-white group-hover:bg-white group-hover:text-black transition-all duration-300 shadow-lg"><BadgeCheck size={28} strokeWidth={1.5} /></div>
                                            {cert.date && (
                                                <span className="text-[10px] font-mono tracking-widest text-gray-400 border border-white/10 px-3 py-1 rounded-full uppercase bg-black/20">{cert.date}</span>
                                            )}
                                        </div>
                                        <div className="mb-8">
                                            <h4 className="text-2xl font-bold mb-2 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all duration-300">{cert.title}</h4>
                                            <p className="text-sm text-gray-400 font-medium">{cert.issuer}</p>
                                        </div>
                                        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-t border-white/5 pt-6 mt-auto">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] uppercase tracking-widest text-gray-600 mb-1">Credential ID</span>
                                                <span className="text-xs font-mono text-gray-400">{cert.id}</span>
                                            </div>
                                            <a
                                                href={cert.url || "#"}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-disabled={!cert.url}
                                                className={`flex items-center justify-center gap-2 px-4 py-2 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all border border-white/10 w-full sm:w-auto ${cert.url ? "bg-white text-black hover:bg-gray-200" : "bg-white/10 text-gray-500 cursor-not-allowed pointer-events-none"} opacity-100 translate-y-0 sm:opacity-0 sm:translate-y-2 sm:group-hover:opacity-100 sm:group-hover:translate-y-0`}
                                            >
                                                View Certificate <ArrowUpRight size={14} />
                                            </a>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* About */}
                <section id="about" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 border-t border-white/5">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start relative">
                            <div
                                className="hidden md:block sticky top-24 h-full w-full rounded-3xl overflow-hidden border border-white/10 group"
                                onMouseEnter={() => setIsHoveringName(true)}
                                onMouseLeave={() => setIsHoveringName(false)}
                            >
                                <img src="https://instasize.com/api/image/1679ed424aa33781e701e84554ed4176e2ae4814cf172fbe8c96d289c676a986.jpeg" alt="Prakash Deep" className="w-full h-full object-cover transition-all duration-700 grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80"></div>
                                <div className="absolute bottom-8 left-8"><p className="text-white text-xl font-bold">Prakash Deep</p><p className="text-gray-400 text-sm uppercase tracking-widest">Data Analyst | Business Analyst | Cybersecurity Enthusiast</p></div>
                            </div>
                            <div
                                className="md:hidden relative w-full aspect-[3/4] rounded-3xl overflow-hidden border border-white/10 group"
                                onMouseEnter={() => setIsHoveringName(true)}
                                onMouseLeave={() => setIsHoveringName(false)}
                            >
                                <img src="https://instasize.com/api/image/1679ed424aa33781e701e84554ed4176e2ae4814cf172fbe8c96d289c676a986.jpeg" alt="Prakash Deep" className="w-full h-full object-cover transition-all duration-700 grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80"></div>
                                <div className="absolute bottom-8 left-8"><p className="text-white text-xl font-bold">Prakash Deep</p><p className="text-gray-400 text-sm uppercase tracking-widest">Data Analyst | Business Analyst | Cybersecurity Enthusiast</p></div>
                            </div>
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                className="flex flex-col justify-center min-h-full py-12"
                            >

                                <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-gray-500 mb-6 sm:mb-8">A Little Bit About Me</h2>
                                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 leading-tight">Empowering decisions with <span className="text-gray-600">data</span> and <span className="text-gray-600">security.</span></h3>
                                <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-300 mb-6 sm:mb-8">Hello! I'm <span className="text-white font-bold">Prakash Deep</span>, a Computer Applications professional at the Institute of Engineering & Technology, Bareilly, with a passion for data-driven insights and digital security.</p>
                                <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-8 sm:mb-12">I bridge the gap between complex data analytics and robust cybersecurity practices. Whether it's crafting a deep-dive business report or conducting a security audit, I focus on precision, impact, and integrity in every project.</p>
                                <div className="grid grid-cols-4 gap-4 mb-12">
                                    {[<Database />, <Globe />, <Terminal />, <Cpu />].map((icon, i) => <div key={i} className="aspect-square bg-white/5 flex items-center justify-center rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-all border border-white/5">{icon}</div>)}
                                </div>
                                <div className="relative border-l border-gray-800 pl-8 ml-2 space-y-12">
                                    {[
                                        {
                                            role: 'Ethical Hacking Intern',

                                            company: 'CDAC Noida (Cyber Gyan Project)',
                                            period: '2025 (42 Days)',
                                            desc: 'Conducted hands-on penetration testing and security auditing to identify and mitigate real-world system vulnerabilities.',
                                            actionLabel: 'Certificate',
                                            actionUrl: 'https://drive.google.com/file/d/17GARARxr09Obp-wY2HFm2DuW7YHQy5pF/view?usp=drivesdk'
                                        },
                                        { role: 'Master of Computer Applications (MCA)', company: 'I.E.T., University Campus Bareilly', period: 'Pursuing', desc: 'Focusing on advanced computing, data systems, and information security architectures.' },
                                        { role: 'Bachelor of Computer Applications (BCA)', company: 'Saraswati Institute of Management and Technology Rudrapur U.S Nagar (Kumaun University Nainital)', period: 'Graduated', desc: 'Acquired strong foundational knowledge in programming, database management, and computer networks.' },
                                        {
                                            role: 'Diploma in Office Management',
                                            company: 'National Board of Computer Education Skill India',
                                            period: 'Completed',
                                            desc: 'Training focused on office administration, documentation, and coordination workflows.',
                                            actionLabel: 'Diploma in Office Management',
                                            actionUrl: 'https://drive.google.com/file/d/1BAQc44iRM0pl3I-aWP7s4eg7hE_spyFe/view?usp=drivesdk'
                                        }
                                    ].map((item, i) => (
                                        <div key={i} className="relative group">
                                            <div className="absolute -left-[37px] top-1 w-4 h-4 bg-black border border-gray-600 rounded-full group-hover:bg-white group-hover:scale-125 transition-all"></div>
                                            <h3 className="text-lg font-bold text-white mb-1">{item.role}</h3>
                                            <div className="flex justify-between items-center text-xs uppercase tracking-widest text-gray-500 mb-4"><span>{item.company}</span><span>{item.period}</span></div>
                                            <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                                            {item.actionUrl && (
                                                <a
                                                    href={item.actionUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="mt-3 inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider border border-white/10 bg-white text-black hover:bg-gray-200 transition-all"
                                                >
                                                    {item.actionLabel} <ArrowUpRight size={12} />
                                                </a>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* --- SCROLLABLE CONTACT FOOTER (WHITE) --- */}
                <section ref={contactRef} id="contact" className="min-h-screen bg-white text-black px-4 sm:px-6 py-12 sm:py-20 md:py-32 flex flex-col justify-between">
                    <div className="max-w-7xl mx-auto w-full flex-grow flex flex-col justify-between">
                        <div className="grid md:grid-cols-2 gap-8 md:gap-16 lg:gap-32">
                            <div className="flex flex-col justify-start">
                                <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter mb-6 sm:mb-8 leading-[0.9]">LET'S WORK <br /> TOGETHER.</h2>
                                <p className="text-gray-500 text-sm sm:text-base md:text-lg lg:text-xl mb-8 sm:mb-12 max-w-md leading-relaxed">I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!</p>
                                <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-12">
                                    <a href="mailto:deepprakash724@gmail.com" className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold hover:text-gray-600 transition-colors group break-all sm:break-normal">deepprakash724@gmail.com <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" /></a>
                                    <div className="flex gap-3 sm:gap-6 mt-3 sm:mt-4 flex-wrap items-center">
                                        {profileLink.map((social) => <a onClick={() => navigate(social.url)} key={social.name} href="#" className="text-xs sm:text-sm font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-all cursor-pointer">{social.name}</a>)}
                                        <a href="https://drive.google.com/file/d/1g9sPqlKJNAMC0Z3n_JTnlEyDeVkl1J9b/view?usp=drivesdk" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm font-bold uppercase tracking-widest bg-black text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-full hover:bg-gray-800 transition-all cursor-pointer flex items-center gap-1">📄 Resume</a>
                                    </div>
                                </div>
                                <div className="mt-auto hidden md:block">
                                    <div className="bg-black text-white p-3 sm:p-4 rounded-2xl flex items-center gap-3 sm:gap-4 w-fit pr-6 sm:pr-8 shadow-2xl">
                                        <div className={`w-10 sm:w-12 h-10 sm:h-12 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0 ${isPlaying ? 'animate-pulse' : ''}`}><Disc className={`text-white ${isPlaying ? 'animate-spin' : ''}`} size={20} sm:size={24} /></div>
                                        <div className="flex-1 min-w-0 mr-3 sm:mr-4"><div className="text-[8px] sm:text-[10px] uppercase tracking-widest text-green-400 mb-0.5">On Repeat</div><div className="font-bold truncate text-xs sm:text-sm">Can't Stop the Feeling!</div><div className="text-[10px] sm:text-xs text-gray-400">Justin Timberlake</div></div>
                                        <button onClick={() => setIsPlaying(!isPlaying)} className="w-9 sm:w-10 h-9 sm:h-10 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer flex-shrink-0">{isPlaying ? <Pause size={14} sm:size={16} fill="black" /> : <Play size={14} sm:size={16} fill="black" className="ml-1" />}</button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center mt-8 md:mt-0">
                                <form onSubmit={sendEmail} className="w-full space-y-6 sm:space-y-8 md:space-y-10">
                                    <div className="relative group">
                                        <input onChange={(e) => setName(e.target.value)} value={name} type="text" id="name" className="peer w-full bg-transparent border-b-2 border-gray-200 py-3 sm:py-4 text-base sm:text-lg md:text-xl text-black focus:outline-none focus:border-black transition-colors placeholder-transparent" placeholder="Name" />
                                        <label htmlFor="name" className="absolute left-0 -top-3.5 text-xs font-bold uppercase tracking-widest text-gray-400 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 sm:peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-gray-900 peer-focus:text-xs">Your Name</label>
                                    </div>
                                    <div className="relative group">
                                        <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" id="email" className="peer w-full bg-transparent border-b-2 border-gray-200 py-3 sm:py-4 text-base sm:text-lg md:text-xl text-black focus:outline-none focus:border-black transition-colors placeholder-transparent" placeholder="Email" />
                                        <label htmlFor="email" className="absolute left-0 -top-3.5 text-xs font-bold uppercase tracking-widest text-gray-400 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 sm:peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-gray-900 peer-focus:text-xs">Your Email</label>
                                    </div>
                                    <div className="relative group">
                                        <textarea onChange={(e) => setMessage(e.target.value)} value={message} id="message" rows={3} className="peer w-full bg-transparent border-b-2 border-gray-200 py-3 sm:py-4 text-base sm:text-lg md:text-xl text-black focus:outline-none focus:border-black transition-colors placeholder-transparent resize-none" placeholder="Message" />
                                        <label htmlFor="message" className="absolute left-0 -top-3.5 text-xs font-bold uppercase tracking-widest text-gray-400 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 sm:peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-gray-900 peer-focus:text-xs">Your Message</label>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isSending}
                                        className={`group w-full py-4 sm:py-6 font-bold text-xs sm:text-sm uppercase tracking-[0.2em] flex items-center justify-between px-4 sm:px-8
    ${isSending ? "bg-gray-700 cursor-not-allowed" : "bg-black hover:bg-gray-900 cursor-pointer"}
    text-white transition-all`}
                                    >
                                        {isSending ? (
                                            <span className="flex items-center gap-3">
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                Sending...
                                            </span>
                                        ) : (
                                            <>
                                                <span>Send Message</span>
                                                <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                            </>
                                        )}
                                    </button>

                                </form>
                            </div>
                        </div>
                        <div className="pt-12 sm:pt-16 md:pt-20 border-t border-gray-100 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gray-400">
                            <div>&copy; {new Date().getFullYear()} Prakash Deep.</div>
                            <div className="flex gap-4"><a href="https://github.com/prakashdeepofficial" className="hover:text-black transition-colors cursor-pointer">GitHub</a><a href="https://www.linkedin.com/in/prakash-deep-9a70871b8" className="hover:text-black transition-colors cursor-pointer">LinkedIn</a></div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}