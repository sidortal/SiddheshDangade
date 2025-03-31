import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TypeAnimation } from 'react-type-animation';
import { useSpring, animated } from '@react-spring/web';
import { 
  Award, 
  BookOpen, 
  Briefcase, 
  Code2, 
  Download,
  FileText, 
  GraduationCap, 
  Heart, 
  Mail,
  Menu, 
  Moon,
  Phone,
  Sun,
  X,
  ChevronDown,
  Github,
  Linkedin,
  Twitter,
  Globe,
  Calendar,
  Instagram
} from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(false);
  const [showContent, setShowContent] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState('home');
  const mainContentRef = React.useRef<HTMLDivElement>(null);

  // Scroll animation hooks
  const [projectsRef, projectsInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [educationRef, educationInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [contactRef, contactInView] = useInView({ threshold: 0.2, triggerOnce: true });

  // Floating animation for social icons
  const floatAnimation = useSpring({
    from: { transform: 'translateY(0px)' },
    to: async (next) => {
      while (true) {
        await next({ transform: 'translateY(-10px)' });
        await next({ transform: 'translateY(0px)' });
      }
    },
    config: { duration: 2000 },
  });

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Scroll spy effect
  React.useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'projects', 'education', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleExplore = () => {
    setShowContent(true);
    setTimeout(() => {
      mainContentRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Social media links component
  const SocialLinks = () => (
    <animated.div style={floatAnimation} className="fixed left-4 bottom-4 flex flex-col space-y-4">
      <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
        className="p-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors duration-300">
        <Github size={20} />
      </a>
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
        className="p-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors duration-300">
        <Linkedin size={20} />
      </a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
        className="p-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors duration-300">
        <Twitter size={20} />
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
        className="p-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors duration-300">
        <Instagram size={20} />
      </a>
    </animated.div>
  );

  return (
    <div className="bg-gray-900 text-white">
      {/* Full Screen Hero */}
      <section id="home" className={`min-h-screen relative flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 transition-all duration-700 ${showContent ? 'hero-exit' : ''}`}>
        <div className="absolute top-4 right-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg text-white hover:bg-gray-700 transition-all duration-300 transform hover:scale-110"
          >
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>
        
        <div className="text-center text-white px-4">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            Siddhesh Dangade
          </motion.h1>
          <TypeAnimation
            sequence={[
              'EV Battery Specialist',
              1500,
              'Cloud Operations Engineer',
              1500,
              'Electronics Engineer',
              1500,
            ]}
            wrapper="p"
            speed={50}
            className="text-2xl md:text-3xl mb-8 text-gray-300"
            repeat={Infinity}
          />
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col items-center space-y-4"
          >
            <button
              onClick={handleExplore}
              className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
            >
              Explore My Profile
            </button>
            <ChevronDown 
              size={32} 
              className="animate-bounce mt-8 cursor-pointer text-white"
              onClick={handleExplore}
            />
          </motion.div>
        </div>

        <SocialLinks />
      </section>

      {/* Main Content */}
      <AnimatePresence>
        {showContent && (
          <motion.div 
            ref={mainContentRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="book-content"
          >
            {/* Navigation */}
            <nav className="bg-gray-800 shadow-lg sticky top-0 z-50 transition-all duration-500">
              <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between h-16">
                  <div className="flex items-center">
                    <span className="text-xl font-bold text-white transition-colors duration-500">
                      EV and Cloud Engineer
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={toggleDarkMode}
                      className="p-2 rounded-lg text-white hover:bg-gray-700 transition-all duration-300 transform hover:scale-110"
                    >
                      {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    <div className="md:hidden">
                      <button
                        onClick={toggleMenu}
                        className="text-white hover:text-gray-300 focus:outline-none transition-colors duration-300"
                      >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                      </button>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                      {['projects', 'education', 'contact'].map((section) => (
                        <a
                          key={section}
                          href={`#${section}`}
                          className={`flex items-center space-x-1 ${
                            activeSection === section
                              ? 'text-blue-400'
                              : 'text-gray-300'
                          } hover:text-white transition-all duration-300 transform hover:scale-110`}
                        >
                          {section === 'projects' && <Code2 size={18} />}
                          {section === 'education' && <GraduationCap size={18} />}
                          {section === 'contact' && <Mail size={18} />}
                          <span className="capitalize">{section}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {isMenuOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="md:hidden pb-4"
                    >
                      {['projects', 'education', 'contact'].map((section) => (
                        <a
                          key={section}
                          href={`#${section}`}
                          className={`block py-2 ${
                            activeSection === section
                              ? 'text-blue-400'
                              : 'text-gray-300'
                          } hover:text-white transition-colors duration-300`}
                        >
                          <span className="capitalize">{section}</span>
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            {/* Projects Section */}
            <motion.section
              ref={projectsRef}
              initial={{ opacity: 0, y: 50 }}
              animate={projectsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 transition-colors duration-500"
              id="projects"
            >
              <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12 text-white">
                  Featured Projects
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[1, 2, 3].map((index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      className="bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                    >
                      <img 
                        src={`https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80`}
                        alt={`Project ${index}`}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-6">
                        <h3 className="font-semibold text-xl mb-2 text-white">
                          Project {index}
                        </h3>
                        <p className="mb-4 text-gray-300">
                          Description for Project {index}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 bg-blue-900 text-blue-200 rounded-full text-sm">React</span>
                          <span className="px-3 py-1 bg-green-900 text-green-200 rounded-full text-sm">Node.js</span>
                          <span className="px-3 py-1 bg-purple-900 text-purple-200 rounded-full text-sm">TypeScript</span>
                        </div>
                        <div className="mt-4 flex space-x-4">
                          <a href="#" className="text-blue-400 hover:text-blue-300 flex items-center">
                            <Globe size={16} className="mr-1" /> Demo
                          </a>
                          <a href="#" className="text-gray-400 hover:text-gray-300 flex items-center">
                            <Github size={16} className="mr-1" /> Code
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* Education Section */}
            <motion.section
              ref={educationRef}
              initial={{ opacity: 0, y: 50 }}
              animate={educationInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="py-16 bg-gray-800 transition-colors duration-500"
              id="education"
            >
              <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12 text-white">
                  Education Journey
                </h2>
                <div className="space-y-8">
                  {[
                    {
                      title: "Bachelor of Technology in Electronics and Telecommunication",
                      institution: "Dr. Babasaheb Ambedkar Technological University",
                      period: "2021 - 2024",
                      description: "Focused on mechanical design and thermal engineering"
                    },
                    {
                      title: "Diploma in Electronics and Telecommunication",
                      institution: "Dr. Babasaheb Ambedkar Technological University",
                      period: "2018 - 2021",
                      description: "Specialized in manufacturing processes"
                    },
                    {
                      title: "Secondary School Certificate (10th)",
                      institution: "Central Board of Secondary Education (CBSE)",
                      period: "2018",
                      description: "Ranked 3rd in Board Exams with an overall score of 80.40%"
                    }
                  ].map((edu, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -50 }}
                      animate={educationInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                      className="flex items-start transform hover:scale-105 transition-transform duration-300"
                    >
                      <div className="flex-shrink-0">
                        <GraduationCap className="text-blue-400" size={24} />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-xl font-semibold text-white">
                          {edu.title}
                        </h3>
                        <p className="text-gray-300">
                          {edu.institution}
                        </p>
                        <div className="flex items-center mt-2">
                          <Calendar size={16} className="mr-2 text-gray-400" />
                          <p className="text-gray-400">
                            {edu.period}
                          </p>
                        </div>
                        <p className="mt-2 text-gray-400">
                          {edu.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* Contact Section */}
            <motion.section
              ref={contactRef}
              initial={{ opacity: 0, y: 50 }}
              animate={contactInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="py-16 bg-gray-900 transition-colors duration-500"
              id="contact"
            >
              <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12 text-white">
                  Get in Touch
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-gray-800 p-6 rounded-lg shadow-lg"
                  >
                    <div className="flex items-center space-x-4 mb-4">
                      <Mail className="text-blue-400" size={24} />
                      <a href="mailto:dangadesid@gmail.com" className="text-white hover:text-gray-300 hover:underline">
                        dangadesid@gmail.com
                      </a>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Phone className="text-blue-400" size={24} />
                      <a href="tel:+918956095432" className="text-white hover:text-gray-300 hover:underline">
                        +91 8956095432
                      </a>
                    </div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-gray-800 p-6 rounded-lg shadow-lg"
                  >
                    <form className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block mb-2 text-white">Name</label>
                        <input
                          type="text"
                          id="name"
                          className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block mb-2 text-white">Email</label>
                        <input
                          type="email"
                          id="email"
                          className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300"
                        />
                      </div>
                      <div>
                        <label htmlFor="message" className="block mb-2 text-white">Message</label>
                        <textarea
                          id="message"
                          rows={4}
                          className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300"
                        ></textarea>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
                      >
                        Send Message
                      </motion.button>
                    </form>
                  </motion.div>
                </div>
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;