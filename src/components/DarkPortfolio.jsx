import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Mail,
  Github,
  Linkedin,
  Code,
  Layers,
  Zap,
  Brush,
  Cpu,
  Database,
  Cloud,
  SquareTerminal 
} from "lucide-react";
// --- NavItem ---
const NavItem = ({ href, children, isActive }) => (
  <a
    href={href}
    className={`text-gray-300 hover:text-cyan-400 transition duration-300 relative group p-2 mx-2
                ${isActive ? "text-cyan-400 font-bold" : ""}`}
  >
    {children}
    <span
      className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-cyan-400 transition-all duration-300
                     ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
    ></span>
  </a>
);

// --- SectionHeader ---
const SectionHeader = ({ icon: Icon, title }) => (
  <div className="flex items-center justify-center space-x-3 mb-10">
    <Icon className="text-cyan-400 w-8 h-8 md:w-10 md:h-10 animate-pulse" />
    <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-wider">
      {title}
    </h2>
  </div>
);

// --- Projects Data ---
const projects = [
  {
    id: "project-1",
    title: "Orlank Web Application",
    description:
      "Built a responsive and scalable web application for Orlank Technology using React.js and modern web technologies.",
    technologies: ["React", "React Spring", "Tailwind CSS", "JavaScript(ES6+)"],
    link: "https://webcloneorlank.netlify.app/",
    image: "/image/orlank.png",
    icon: Layers,
  },
  {
    id: "project-2",
    title: "Destiny IT Services Web App",
    description:
      "Built a responsive and interactive web application for Destiny IT Services with smooth animations and dynamic content.",
    technologies: ["Next.js", "React Bootstrap", "Node.js"],
    link: "https://destinyitservices.com/",
    image: "/image/destiny.png",
    icon: Mail,
  },
  {
    id: "project-3",
    title: "Destiny IT Services — HRMS Portal",
    description:
      "Secure HRMS portal allowing employees and admins to manage HR tasks efficiently with role-based login.",
    technologies: [
      "React.js",
      "JavaScript",
      "Tailwind Css",
      "Sass",
      "MongoDB",
      "Node.js",
      "Rest API",
    ],
    link: "https://destinyitservices.com/login",
    image: "/image/hrms.png",
    icon: Zap,
  },
  {
    id: "project-4",
    title: "Bouncing Ball Game",
    description:
      "Interactive bouncing ball game built with HTML, CSS, and JavaScript featuring smooth animations and collision detection.",
    technologies: ["JavaScript", "HTML", "CSS"],
    link: "https://bouncingballjs.netlify.app/",
    image: "/image/bouncingball.png",
    icon: Code,
  },
  {
    id: "project-5",
    title: "Snake Game",
    description:
      "Classic Snake Game with smooth animations, real-time score tracking, and responsive controls.",
    technologies: ["JavaScript", "HTML", "CSS"],
    link: "https://snakejsgames.netlify.app/",
    image: "/image/snake.png",
    icon: Layers,
  },
  {
    id: "project-6",
    title: "ReachInbox",
    description:
      "Responsive inbox app built with React.js, TypeScript, Tailwind CSS, and Vite. Integrated Axios for API calls.",
    technologies: [
      "Axios API",
      "React.js",
      "Tailwind CSS",
      "TypeScript",
      "Vite",
    ],
    link: "https://reachinbox-assignment.vercel.app/",
    image: "/image/reachinox.png",
    icon: Code,
  },
  {
    id: "project-7",
    title: "QAAS (QUALITY ASSESSMENT & ANALYSIS SOFTWARE)",
    description:
      "Software for assessing and analyzing product/service quality with detailed reports and metrics.",
    technologies: [
      "Axios API",
      "React.js",
      "Tailwind CSS",
      "TypeScript",
      "Vite",
      "Node.js",
      "MongoDB",
      "Chart.js",
    ],
    link: "https://qaas.co.in/",
    image: "image/qaas.png",
    icon: Code,
  },
  {
    id: "project-8",
    title: "Office/College Automation CMS",
    description:
      "Designed and developed intuitive UI for the CMS. Focused on responsive, accessible layouts with CS",
    technologies: [
      "Axios API",
      "React.js",
      "Tailwind CSS",
      "TypeScript",
      "Vite",
      "Node.js",
      "MongoDB",
      "Chart.js",
    ],
    link: "http://autocims.in/",
    image: "/image/autocms.jpg",
    icon: Code,
  },
];

// --- Skills Data ---
const skillsData = {
  topSkills: [
    { name: "React.js", level: "Advanced", icon: "react" },
    { name: "Next.js", level: "Intermediate", icon: "nextjs" },
    { name: "JavaScript (ES6+)", level: "Advanced", icon: "js" },
    { name: "TypeScript", level: "Intermediate", icon: "ts" },
    { name: "Tailwind CSS", level: "Advanced", icon: "tailwind" },
    { name: "HTML5 & CSS3", level: "Advanced", icon: "html" },
    { name: "Git & GitHub", level: "Advanced", icon: "git" },
  ],
  frontend: [
    { name: "React.js", level: "Advanced", icon: "react" },
    { name: "Next.js", level: "Intermediate", icon: "nextjs" },
    { name: "JavaScript (ES6+)", level: "Advanced", icon: "js" },
    { name: "TypeScript", level: "Intermediate", icon: "ts" },
    { name: "Tailwind CSS", level: "Advanced", icon: "tailwind" },
    { name: "HTML5 & CSS3", level: "Advanced", icon: "html" },
    { name: "Redux", level: "Intermediate", icon: "redux" },
  ],
  tools: [
    { name: "VS Code", level: "Advanced", icon: "vscode" },
    { name: "Figma", level: "Intermediate", icon: "figma" },
    { name: "Postman", level: "Advanced", icon: "postman" },
    { name: "Git & GitHub", level: "Advanced", icon: "git" },
  ],
};

// --- Skill Icons ---
const getSkillIcon = (iconName) => {
  switch (iconName) {
    case "react":
      return <Zap className="inline-block mr-2 text-cyan-400" size={20} />;
    case "nextjs":
      return <Code className="inline-block mr-2 text-white" size={20} />;
    case "js":
      return <Code className="inline-block mr-2 text-yellow-500" size={20} />;
    case "ts":
      return <Code className="inline-block mr-2 text-blue-500" size={20} />;
    case "tailwind":
      return <Brush className="inline-block mr-2 text-teal-400" size={20} />;
    case "html":
      return <Code className="inline-block mr-2 text-orange-500" size={20} />;
    case "redux":
      return <Layers className="inline-block mr-2 text-purple-500" size={20} />;
    case "git":
      return <Github className="inline-block mr-2 text-orange-600" size={20} />;
    case "vscode":
      return <Code className="inline-block mr-2 text-blue-400" size={20} />;
    case "figma":
      return <Brush className="inline-block mr-2 text-pink-400" size={20} />;
    case "postman":
      return <Mail className="inline-block mr-2 text-orange-700" size={20} />;
    default:
      return <Code className="inline-block mr-2 text-gray-400" size={20} />;
  }
};

// --- App Component ---
const App = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [isLoaded, setIsLoaded] = useState(false);

  const sectionRefs = {
    hero: useRef(null),
    about: useRef(null),
    projects: useRef(null),
    skills: useRef(null),
  };

  const handleScroll = useCallback(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    }, observerOptions);
    Object.keys(sectionRefs).forEach((key) => {
      if (sectionRefs[key].current) observer.observe(sectionRefs[key].current);
    });
    return () => {
      Object.keys(sectionRefs).forEach((key) => {
        if (sectionRefs[key].current)
          observer.unobserve(sectionRefs[key].current);
      });
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    const cleanupObserver = handleScroll();
    return () => {
      clearTimeout(timer);
      if (cleanupObserver) cleanupObserver();
    };
  }, [handleScroll]);

  const scrollToSection = (id) => {
    sectionRefs[id].current?.scrollIntoView({ behavior: "smooth" });
  };
  const getSectionVisibilityClass = (sectionId) =>
    activeSection === sectionId
      ? "opacity-100 translate-y-0 scale-100 blur-none"
      : "opacity-0 translate-y-10 scale-95 blur-sm pointer-events-none";
  const commonClasses = `min-h-screen bg-gradient-to-br from-gray-900 to-black text-gray-100 font-sans p-4 md:p-8 transition-opacity duration-1000 ${
    isLoaded ? "opacity-100" : "opacity-0"
  }`;

  return (
    <div className={commonClasses}>
      <Header activeSection={activeSection} scrollToSection={scrollToSection} />
      <main className="relative max-w-7xl mx-auto pt-20 overflow-hidden">
        <section
          id="hero"
          ref={sectionRefs.hero}
          className={`min-h-[calc(100vh-80px)] flex flex-col justify-center items-center p-4 transition-all duration-700 ease-in-out ${getSectionVisibilityClass(
            "hero"
          )}`}
        >
          <Hero />
        </section>
        <section
          id="about"
          ref={sectionRefs.about}
          className={`min-h-screen flex flex-col justify-center items-center p-4 transition-all duration-700 ease-in-out ${getSectionVisibilityClass(
            "about"
          )}`}
        >
          <About />
        </section>
        <section
          id="projects"
          ref={sectionRefs.projects}
          className={`min-h-screen flex flex-col justify-center p-4 transition-all duration-700 ease-in-out ${getSectionVisibilityClass(
            "projects"
          )}`}
        >
          <Projects />
        </section>
        <section
          id="skills"
          ref={sectionRefs.skills}
          className={`min-h-screen flex flex-col justify-center p-4 transition-all duration-700 ease-in-out ${getSectionVisibilityClass(
            "skills"
          )}`}
        >
          <TechnicalSkills />
        </section>
      </main>
      <Footer />
    </div>
  );
};

// --- Header ---
const Header = ({ activeSection, scrollToSection }) => (
  <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm">
    <nav className="max-w-7xl mx-auto flex justify-center items-center gap-6 py-4 px-4">

      <a
        href="https://github.com/07zain"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-cyan-400 transition duration-300"
      >
        <Github className="w-6 h-6" />
      </a>

      <a
        href="https://www.linkedin.com/in/ashrafzainab/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-cyan-400 transition duration-300"
      >
        <Linkedin className="w-6 h-6" />
      </a>

      <a
        href="mailto:zainabashraf076@gmail.com"
        className="text-gray-400 hover:text-cyan-400 transition duration-300 flex items-center"
      >
        <Mail className="w-6 h-6" />
      </a>

    </nav>
  </header>
);


// --- Hero ---
const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row items-start justify-start min-h-[80vh] text-left p-4 gap-8">
      {/* Left Column */}
      <div className="flex flex-col items-start justify-center space-y-6 md:w-1/2">
        <img
      src="/image/z-Photoroom.png"
      alt="Zainab Ashraf"
  className="w-24 h-24 md:w-32 md:h-32 rounded-full mb-4 object-cover bg-transparent"
    />
     
        <p className="text-3xl md:text-5xl font-bold text-white">
          I'm Zainab Ashraf
        </p>
        <p className="text-xl md:text-3xl text-gray-400 mb-8 animate-slide-up">
          {" "}
          React.js Developer | Building Scalable Web Applications{" "}
        </p>{" "}

        {/* Resume Button */}
    <a
  href="/image/Zainab_Ashraf_CV.pdf"
  target="_blank"
  rel="noopener noreferrer"
  className="
    mt-4 
    px-8 py-3 
    bg-gradient-to-br from-gray-900 to-black 
    text-white 
    font-bold 
    shadow-lg 
    border border-white 
    rounded
    transition duration-300 transform hover:bg-white hover:text-black
    hover:from-white hover:to-white
  "
>
  View Resume
</a>


      </div>

      {/* Right Column: Optional (keep empty or decorative) */}
      <div className="md:w-1/2 flex justify-center items-center">
        <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-cyan-400/10 blur-3xl animate-spin-slow"></div>
      </div>
    </div>
  );
};

// --- About ---

const About = () => {
  const fullText = `A React.js Developer passionate about crafting responsive, user-friendly web applications. I enjoy transforming ideas into smooth, functional digital experiences using clean, efficient code. Constantly improving my skills, I explore modern frontend tools and build impactful projects that solve real problems.`;
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + fullText[index]);
      index++;
      if (index === fullText.length) clearInterval(interval);
    }, 25); // adjust typing speed here
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-20 md:py-32 w-full max-w-4xl mx-auto">
      <SectionHeader icon={Layers} title="About Me" />
      <div className="p-6 bg-gray-800 rounded-xl shadow-2xl shadow-gray-900/50 border border-gray-700 hover:shadow-cyan-900/50 transition duration-500 transform hover:scale-[1.01]">
        <p className="text-lg text-gray-300 leading-relaxed whitespace-pre-line">
          {displayedText}
        </p>
      </div>
    </div>
  );
};

// --- ProjectItem ---
const ProjectItem = ({ project, index }) => {
  const isOdd = index % 2 !== 0;
  const itemRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isVisible) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        },
        { root: null, rootMargin: "0px", threshold: 0.1 }
      );
      if (itemRef.current) observer.observe(itemRef.current);
      return () => {
        if (itemRef.current) observer.unobserve(itemRef.current);
      };
    }
  }, [isVisible]);

  const fadeDirectionClass = isOdd
    ? isVisible
      ? "opacity-100 translate-x-0"
      : "opacity-0 -translate-x-20"
    : isVisible
    ? "opacity-100 translate-x-0"
    : "opacity-0 translate-x-20";

  return (
    <div
      ref={itemRef}
      className={`grid grid-cols-1 md:grid-cols-2 gap-8 w-full p-4 rounded-xl border border-gray-900/50 transition-all duration-700 ease-out ${fadeDirectionClass} hover:bg-gray-800/50 hover:shadow-cyan-900/50 min-h-[300px]`}
    >
      <div
        className={`${
          isOdd ? "md:order-2" : "md:order-1"
        } flex items-center justify-center`}
      >
        <div className="relative rounded-xl overflow-hidden shadow-2xl shadow-cyan-900/30 border border-gray-700 group cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-cyan-500/50 w-full h-full">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110 rotate-[-3deg]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h3 className="text-white text-xl font-bold">{project.title}</h3>
          </div>
        </div>
      </div>
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className={`block p-6 rounded-xl border border-gray-700 shadow-xl bg-gray-800 transition-all duration-500 hover:shadow-cyan-500/50 transform hover:scale-[1.02] hover:bg-gray-700/80 group ${
          isOdd ? "md:order-1" : "md:order-2"
        } h-full flex flex-col justify-between`}
      >
        <div>
          <div className="flex items-center space-x-4 mb-4">
            <project.icon className="w-8 h-8 text-cyan-400 group-hover:animate-pulse" />
            <h3 className="text-2xl font-semibold text-white group-hover:text-cyan-400">
              {project.title}
            </h3>
          </div>
          <p className="text-gray-400 mb-4">{project.description}</p>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {project.technologies.map((tech, i) => (
            <span
              key={i}
              className="text-xs md:text-sm px-2 py-1 bg-gray-700 rounded-md text-gray-300 border border-gray-600"
            >
              {tech}
            </span>
          ))}
        </div>
      </a>
    </div>
  );
};

// --- Projects ---
const Projects = () => (
  <div className="py-20 md:py-32 w-full max-w-7xl mx-auto flex flex-col gap-12">
    <SectionHeader icon={Code} title="Projects" />
    <div className="flex flex-col gap-12">
      {projects.map((project, index) => (
        <ProjectItem key={project.id} project={project} index={index} />
      ))}
    </div>
  </div>
);

// --- TechnicalSkills ---
const TechnicalSkills = () => (
  <div className="py-20 md:py-32 w-full max-w-5xl mx-auto flex flex-col gap-16">
    <SectionHeader icon={Cpu} title="Technical Skills" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {Object.keys(skillsData).map((category) => (
        <div key={category}>
          <h3 className="text-2xl font-semibold text-white mb-4 capitalize">
            {category.replace(/([A-Z])/g, " $1")}
          </h3>
          <ul className="flex flex-wrap gap-4">
            {skillsData[category].map((skill) => (
              <li
                key={skill.name}
                className="flex items-center bg-gray-800 px-3 py-2 rounded-lg border border-gray-700 shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
              >
                {getSkillIcon(skill.icon)}
                <span className="text-gray-300">{skill.name}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
);

// --- Footer ---
const Footer = () => (
    <div>
    <div className="mt-16 text-center">
  <p className=" text-white text-lg mb-4">
    Got a project in mind or want to say hi? Feel free to reach out!
  </p>
  <a
    href="mailto:zainabashraf076@gmail.com"
    className="text-gray-400 font-semibold hover:underline transition duration-300"
  >
    zainabashraf076@gmail.com
  </a>
</div>

  <footer className="mt-20 py-8 border-t border-gray-800 flex justify-between items-center px-8">
    <p className="text-gray-500">Zainab
      &copy; {new Date().getFullYear()} 
    </p>
    <div className="flex space-x-6">
<SquareTerminal/> 
    </div>
  </footer>
  </div>
);

export default App;
