// Terminal Portfolio - Professional Edition
const terminalOutput = document.getElementById('terminalOutput');
const terminalInput = document.getElementById('terminalInput');
const cursor = document.getElementById('cursor');
const sendBtn = document.getElementById('sendBtn');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const quickCommandsPanel = document.getElementById('quickCommandsPanel');
const quickCommandsClose = document.getElementById('quickCommandsClose');
const overlay = document.getElementById('overlay');
const swipeHint = document.getElementById('swipeHint');

let commandHistory = [];
let historyIndex = -1;
let isMobile = window.innerWidth <= 768;

// ===========================================================================
// COMMAND FUNCTIONS
// ===========================================================================

function showBanner() {
    const banner = `
<span class="ascii-banner">
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║       ██╗███████╗██████╗ ██████╗  ██████╗ ███╗   ██╗     ║
║       ██║██╔════╝██╔══██╗██╔══██╗██╔═══██╗████╗  ██║     ║
║       ██║█████╗  ██████╔╝██║  ██║██║   ██║██╔██╗ ██║     ║
║ ██    ██║██╔══╝  ██╔══██╗██║  ██║██║   ██║██║╚██╗██║     ║
║ ╚═██████║███████╗██║  ██║██████╔╝╚██████╔╝██║ ╚████║     ║
║   ╚═════╝╚══════╝╚═╝  ╚═╝╚═════╝  ╚═════╝ ╚═╝  ╚═══╝     ║
║      ██████╗ ██╗  ██╗██╗██╗     ██╗██████╗               ║
║      ██╔══██╗██║  ██║██║██║     ██║██╔══██╗              ║
║      ██████╔╝███████║██║██║     ██║██████╔╝              ║
║      ██╔═══╝ ██╔══██║██║██║     ██║██╔═══╝               ║
║      ██║     ██║  ██║██║███████╗██║██║                   ║
║      ╚═╝     ╚═╝  ╚═╝╚═╝╚══════╝╚═╝╚═╝                   ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
</span>
<span class="output-dim">╔══════════════════════════════════════════════════════════╗</span>
<span class="output-dim">║  Portfolio Terminal v3.0.0 | Full-Stack & QA Specialist  ║</span>
<span class="output-dim">╚══════════════════════════════════════════════════════════╝</span>
<span class="output-success">●</span> <span class="output-highlight">Welcome to Jerdon Philip Macaraeg's Interactive Portfolio</span>
<span class="output-success">●</span> Type <span class="output-info">help</span> to explore available commands
<span class="output-success">●</span> Use <span class="output-info">↑↓</span> arrows for command history
<span class="output-success">●</span> Press <span class="output-info">Tab</span> for autocomplete`;

    addOutput(banner, 'success');
}

function showHelp() {
    const helpText = `
<span class="divider">══════════════════════════════════════════════════════════</span>
<span class="section-title">📋 Available Commands</span>
<span class="divider">──────────────────────────────────────────────────────────</span>

<span class="output-warning">📁 Profile & Information</span>
  <span class="output-success">about</span>       • Professional summary and background
  <span class="output-success">whoami</span>      • Display current user identity
  <span class="output-success">contact</span>     • Contact details and location
  <span class="output-success">social</span>      • Social media and network links

<span class="output-warning">🛠️ Skills & Experience</span>
  <span class="output-success">skills</span>      • Technical skills and proficiencies
  <span class="output-success">experience</span>  • Professional work history
  <span class="output-success">education</span>   • Academic background
  <span class="output-success">awards</span>      • Honors and recognitions

<span class="output-warning">📂 Projects</span>
  <span class="output-success">projects</span>    • Featured portfolio projects
  <span class="output-success">ls</span>          • List all projects (file view)

<span class="output-warning">🔧 System</span>
  <span class="output-success">neofetch</span>    • System information display
  <span class="output-success">date</span>        • Current date and time
  <span class="output-success">version</span>     • Terminal version information
  <span class="output-success">clear</span>       • Clear terminal screen
  <span class="output-success">banner</span>      • Display welcome banner

<span class="output-warning">📄 Actions</span>
  <span class="output-success">resume</span>      • Download resume (PDF)

<span class="divider">══════════════════════════════════════════════════════════</span>
<span class="output-dim">💡 Pro Tips:</span>
<span class="output-dim">• Use TAB for autocomplete | ↑↓ for command history</span>
<span class="output-dim">• Try aliases: h=help, a=about, p=projects, c=contact</span>
<span class="output-dim">• On mobile? Tap the menu button for quick commands</span>`;

    addOutput(helpText, '');
}

function showAbout() {
    const aboutText = `
<span class="divider">══════════════════════════════════════════════════════════</span>
<span class="section-title">👨‍💻 Professional Profile</span>
<span class="divider">──────────────────────────────────────────────────────────</span>

<span class="output-highlight">Identity</span>
<span class="output-dim">├─</span> <span class="output-success">Name:</span>     Jerdon Philip Macaraeg
<span class="output-dim">├─</span> <span class="output-success">Role:</span>     Full-Stack Developer | QA Specialist
<span class="output-dim">├─</span> <span class="output-success">Location:</span> #81 Tambac, Malasiqui, Pangasinan
<span class="output-dim">├─</span> <span class="output-success">Phone:</span>    09168745394
<span class="output-dim">└─</span> <span class="output-success">Email:</span>    <span class="link" onclick="window.location.href='mailto:jerdonphilipmacaraeg@gmail.com'">jerdonphilipmacaraeg@gmail.com</span>

<span class="output-highlight">Professional Summary</span>
Experienced Full-Stack Engineer, QA professional, and independent 
business owner with a focus on building resilient tools that solve 
real-world problems. Grounded in a strong quality assurance 
background—ranging from manual testing roots to modern end-to-end 
automation with Playwright—I prioritize robust and thoroughly 
validated code delivery.

Highly adept at auditing full-stack applications using Postman, 
browser DevTools, and Google Lighthouse and specialized in 
architecting systems from Electron-based desktop apps to automated 
Azure cloud deployments. I combine technical depth in Node.js and 
SQL with a rigorous testing mindset and a sharp eye for UI/UX to 
ensure every product is as stable and high-performing as it is 
intuitive.

<span class="output-highlight">Current Status</span>
<span class="output-success">● Active</span> — Open to freelance & full-time opportunities

<span class="divider">══════════════════════════════════════════════════════════</span>
<span class="output-dim">For detailed skills, type: skills</span>
<span class="output-dim">For work history, type: experience</span>`;

    addOutput(aboutText, '');
}

function showSkills() {
    const skillsText = `
<span class="divider">══════════════════════════════════════════════════════════</span>
<span class="section-title">🛠️ Technical Skills Matrix</span>
<span class="divider">──────────────────────────────────────────────────────────</span>

<span class="output-warning">🎨 Frontend Development</span>
<span class="output-dim">├─</span> HTML5, CSS3, JavaScript (ES6+)
<span class="output-dim">├─</span> AngularJS
<span class="output-dim">├─</span> Tailwind CSS, Bootstrap
<span class="output-dim">└─</span> Responsive & Mobile-First Design

<span class="output-warning">⚙️ Backend & Desktop</span>
<span class="output-dim">├─</span> Node.js, Express.js
<span class="output-dim">├─</span> PHP, Python, Java
<span class="output-dim">├─</span> Electron (Desktop Apps)
<span class="output-dim">├─</span> RESTful API Development
<span class="output-dim">└─</span> npm, Sequelize ORM

<span class="output-warning">🗄️ Database Systems</span>
<span class="output-dim">├─</span> MySQL
<span class="output-dim">├─</span> PostgreSQL
<span class="output-dim">└─</span> SQLite

<span class="output-warning">🧪 Quality Assurance</span>
<span class="output-dim">├─</span> Manual Testing
<span class="output-dim">├─</span> Playwright (E2E Automation)
<span class="output-dim">├─</span> Postman (API Testing)
<span class="output-dim">├─</span> Browser DevTools Auditing
<span class="output-dim">└─</span> Google Lighthouse Audits

<span class="output-warning">🎯 UI/UX & Creative</span>
<span class="output-dim">├─</span> Wireframing & Mockups
<span class="output-dim">├─</span> User Flows & Process Flows
<span class="output-dim">├─</span> Adobe Photoshop
<span class="output-dim">├─</span> Adobe Lightroom
<span class="output-dim">└─</span> Photography

<span class="output-warning">🔧 DevOps & Tools</span>
<span class="output-dim">├─</span> Git & GitHub
<span class="output-dim">├─</span> CI/CD Pipelines
<span class="output-dim">└─</span> Azure DevOps

<span class="output-warning">📊 Operations</span>
<span class="output-dim">├─</span> Project Management
<span class="output-dim">├─</span> Business Operations
<span class="output-dim">└─</span> Professional Communication

<span class="output-warning">🌐 Languages</span>
<span class="output-dim">├─</span> English
<span class="output-dim">└─</span> Tagalog

<span class="divider">══════════════════════════════════════════════════════════</span>`;

    addOutput(skillsText, '');
}

function showExperience() {
    const experienceText = `
<span class="divider">══════════════════════════════════════════════════════════</span>
<span class="section-title">💼 Professional Experience</span>
<span class="divider">──────────────────────────────────────────────────────────</span>

<span class="output-warning">Lead Software Engineer (Freelance)</span>
<span class="output-dim">Sakura Steel Development Corp & GT Sakura Trading Surplus Mall</span>
<span class="output-dim">January 2026 - Present</span>
<span class="output-info">• Directing full-stack development of a cross-company</span>
<span class="output-info">  Inventory Tracking System unifying logistics between</span>
<span class="output-info">  the development corp and trading surplus mall.</span>
<span class="output-info">• Architecting a scalable desktop application utilizing</span>
<span class="output-info">  Electron and modern JavaScript.</span>
<span class="output-info">• Designing front-end UX with Tailwind CSS for a clean,</span>
<span class="output-info">  utility-driven, consistent interface.</span>
<span class="output-info">• Full project lifecycle ownership as the sole developer.</span>
<span class="output-info">• Integrating Playwright for automated E2E testing and QA.</span>

<span class="output-warning">Business Manager / Operations Lead</span>
<span class="output-dim">Donato's Space Rental</span>
<span class="output-dim">February 2026 - Present</span>
<span class="output-info">• Oversee daily operations and tenant relations for a</span>
<span class="output-info">  local rental property business.</span>
<span class="output-info">• Manage end-to-end leasing workflows, contracts,</span>
<span class="output-info">  payment tracking, and maintenance scheduling.</span>

<span class="output-warning">Lead Photographer & Founder</span>
<span class="output-dim">Lumen Lens Studios</span>
<span class="output-dim">August 2025 - Present</span>
<span class="output-info">• Capture major client moments from weddings to portraits.</span>
<span class="output-info">• Handle full creative process: scouting, directing, editing.</span>
<span class="output-info">• Build brand focused on clear communication and client comfort.</span>

<span class="output-warning">Web Developer</span>
<span class="output-dim">Almont Business Connect Inc.</span>
<span class="output-dim">July 2023 - December 2025</span>
<span class="output-info">• Led UI/UX development using Bootstrap and custom CSS.</span>
<span class="output-info">• Managed CI/CD pipelines using Azure DevOps on Microsoft Azure.</span>
<span class="output-info">• Implemented Physician Orders validation and printing workflow.</span>
<span class="output-info">• Developed patient calendar sticky note feature.</span>
<span class="output-info">• Supported Summary & Reports using Sequelize ORM and MySQL.</span>
<span class="output-info">• Led validation processes for Patient Intake.</span>

<span class="output-warning">Intern Web Developer</span>
<span class="output-dim">Almont Business Connect Inc.</span>
<span class="output-dim">January 2023 - May 2023</span>
<span class="output-info">• Contributed to Healthcare Visit Notes front-end and back-end.</span>
<span class="output-info">• Assisted in coding, testing, and debugging complex systems.</span>
<span class="output-info">• Authored and maintained project documentation.</span>

<span class="output-warning">Intern Quality Assurance</span>
<span class="output-dim">Almont Business Connect Inc.</span>
<span class="output-dim">January 2023 - May 2023</span>
<span class="output-info">• Conducted comprehensive manual testing of applications.</span>
<span class="output-info">• Created and maintained detailed test case documentation.</span>
<span class="output-info">• Collaborated with dev team to identify and track defects.</span>

<span class="divider">══════════════════════════════════════════════════════════</span>
<span class="output-dim">Type projects to see featured work | Type awards for recognitions</span>`;

    addOutput(experienceText, '');
}

function showEducation() {
    const educationText = `
<span class="divider">══════════════════════════════════════════════════════════</span>
<span class="section-title">🎓 Education</span>
<span class="divider">──────────────────────────────────────────────────────────</span>

<span class="output-highlight">Bachelor of Science in Information Technology</span>
<span class="output-success">University of Pangasinan - PHINMA</span>
<span class="output-dim">Dagupan City, Pangasinan</span>

<span class="output-highlight">Relevant Coursework</span>
<span class="output-dim">├─</span> Software Engineering
<span class="output-dim">├─</span> Database Management Systems
<span class="output-dim">├─</span> Web Development
<span class="output-dim">├─</span> Quality Assurance & Testing
<span class="output-dim">└─</span> Project Management

<span class="divider">══════════════════════════════════════════════════════════</span>`;

    addOutput(educationText, '');
}

function showAwards() {
    const awardsText = `
<span class="divider">══════════════════════════════════════════════════════════</span>
<span class="section-title">🏆 Honors & Recognitions</span>
<span class="divider">──────────────────────────────────────────────────────────</span>

<span class="output-highlight">Rookie of the Year</span>
<span class="output-success">Almont Business Connect Inc.</span>
<span class="output-dim">Awarded for outstanding performance and exceptional</span>
<span class="output-dim">contributions during the first year of employment.</span>

<span class="output-highlight">Key Achievements</span>
<span class="output-dim">├─</span> Led physician orders validation and complete printing workflow
<span class="output-dim">├─</span> Developed patient calendar sticky note feature from scratch
<span class="output-dim">├─</span> Managed CI/CD pipelines ensuring smooth Azure cloud deployments
<span class="output-dim">└─</span> Founded and built Lumen Lens Studios photography brand

<span class="divider">══════════════════════════════════════════════════════════</span>`;

    addOutput(awardsText, '');
}

function showProjects() {
    const projectsText = `
<span class="divider">══════════════════════════════════════════════════════════</span>
<span class="section-title">📁 Featured Projects</span>
<span class="divider">──────────────────────────────────────────────────────────</span>

<span class="output-warning">[1] Cross-Company Inventory Tracking System</span>
<span class="output-dim">├─ Type:</span>        Desktop Application (Electron)
<span class="output-dim">├─ Role:</span>        Lead Software Engineer (Sole Developer)
<span class="output-dim">├─ Technologies:</span> Electron, Tailwind CSS, PostgreSQL
<span class="output-dim">├─ Testing:</span>      Playwright E2E Automation
<span class="output-dim">├─ Status:</span>       <span class="output-warning">● In Active Development</span>
<span class="output-dim">├─ Description:</span>  Unified logistics system connecting
<span class="output-dim">│                   Sakura Steel Development Corp and
<span class="output-dim">│                   GT Sakura Trading Surplus Mall.
<span class="output-dim">└─ Link:</span>         <span class="link" onclick="addOutput('🔒 Proprietary software. Contact for details.', 'warning')">Request Access →</span>

<span class="output-warning">[2] Wedding Landing Page</span>
<span class="output-dim">├─ Type:</span>        Single-Page Application
<span class="output-dim">├─ Technologies:</span> HTML, CSS, Tailwind CSS, JavaScript
<span class="output-dim">├─ Status:</span>       <span class="output-success">● Deployed</span>
<span class="output-dim">├─ Description:</span>  Wedding Event Hub — Garden-themed digital
<span class="output-dim">│                   invitation and guest management platform
<span class="output-dim">│                   with interactive photo gallery and maps.
<span class="output-dim">└─ URL:</span>         <span class="link" onclick="window.open('https://lumen-lens-ph.github.io/christopher-jhohanna-wedding/')">Launch Project →</span>

<span class="output-warning">[3] Task Management App</span>
<span class="output-dim">├─ Type:</span>        Productivity Application
<span class="output-dim">├─ Technologies:</span> HTML, CSS, JavaScript, Vue, Tailwind CSS
<span class="output-dim">├─ Status:</span>       <span class="output-warning">● In Development</span>
<span class="output-dim">├─ Description:</span>  Organize tasks, set deadlines, and track
<span class="output-dim">│                   progress with an intuitive interface.
<span class="output-dim">└─ URL:</span>         <span class="link" onclick="window.location.href='docs/assets/html/maintenance/maintenance.html'">View Details →</span>

<span class="output-warning">[4] Lumen Lens Studios</span>
<span class="output-dim">├─ Type:</span>        Photography Business
<span class="output-dim">├─ Role:</span>        Founder & Lead Photographer
<span class="output-dim">├─ Status:</span>       <span class="output-success">● Active</span>
<span class="output-dim">└─ Description:</span>  Professional photography services for
<span class="output-dim">                    weddings, portraits, and events.

<span class="divider">══════════════════════════════════════════════════════════</span>
<span class="output-dim">💡 Click on project links to explore further</span>`;

    addOutput(projectsText, '');
}

function showContact() {
    const contactText = `
<span class="divider">══════════════════════════════════════════════════════════</span>
<span class="section-title">📧 Contact Information</span>
<span class="divider">──────────────────────────────────────────────────────────</span>

<span class="output-highlight">Primary Contact</span>
<span class="output-dim">├─</span> <span class="output-success">📱 Phone:</span>    09168745394
<span class="output-dim">├─</span> <span class="output-success">📧 Email:</span>    <span class="link" onclick="window.location.href='mailto:jerdonphilipmacaraeg@gmail.com'">jerdonphilipmacaraeg@gmail.com</span>
<span class="output-dim">└─</span> <span class="output-success">📍 Address:</span>  #81 Tambac, Malasiqui, Pangasinan

<span class="output-highlight">Professional Status</span>
<span class="output-dim">└─</span> <span class="output-success">Available:</span>  Freelance & Full-time opportunities

<span class="output-highlight">Quick Actions</span>
<span class="output-dim">├─</span> Type <span class="output-info">social</span> for social media links
<span class="output-dim">├─</span> Type <span class="output-info">resume</span> to download my CV
<span class="output-dim">└─</span> Type <span class="output-info">experience</span> for work history

<span class="divider">══════════════════════════════════════════════════════════</span>
<span class="output-dim">I typically respond within 24 hours</span>`;

    addOutput(contactText, '');
}

function showSocial() {
    const socialText = `
<span class="divider">══════════════════════════════════════════════════════════</span>
<span class="section-title">🌐 Social Networks</span>
<span class="divider">──────────────────────────────────────────────────────────</span>

<span class="output-dim">├─</span> <span class="output-success">Facebook:</span>  <span class="link" onclick="window.open('https://www.facebook.com/Philip.Je.Mac')">facebook.com/Philip.Je.Mac</span>
<span class="output-dim">├─</span> <span class="output-success">Instagram:</span> <span class="link" onclick="window.open('https://www.instagram.com/simple_jerdzz')">instagram.com/simple_jerdzz</span>
<span class="output-dim">├─</span> <span class="output-success">GitHub:</span>    <span class="link" onclick="window.open('https://github.com/JerdonPhilip')">github.com/JerdonPhilip</span>
<span class="output-dim">└─</span> <span class="output-success">Business:</span>  Lumen Lens Studios (Photography)

<span class="divider">══════════════════════════════════════════════════════════</span>
<span class="output-dim">Click any link to open in new tab</span>`;

    addOutput(socialText, '');
}

function showNeofetch() {
    const neofetchText = `
<span class="divider">══════════════════════════════════════════════════════════</span>
<div class="neofetch-container">
<div class="neofetch-ascii">
    ████████████      ████████████
  ████████████████  ████████████████
██████████████████████████████████████
██████████████████████████████████████
██████████████████████████████████████
██████████              ██████████
  ██████    ██  ██      ██████
    ████    ██  ██    ████
      ██    ██████    ██
</div>
<div class="neofetch-info">
<span class="label">jerdon@portfolio</span>
<span class="output-dim">──────────────────────────</span>
<span class="label">Name:</span>     <span class="value">Jerdon Philip Macaraeg</span>
<span class="label">Role:</span>     <span class="value">Full-Stack Dev | QA Specialist</span>
<span class="label">OS:</span>       <span class="value">Web Developer OS v3.0</span>
<span class="label">Kernel:</span>   <span class="value">JavaScript ES2024</span>
<span class="label">Shell:</span>    <span class="value">bash 5.2</span>
<span class="label">Uptime:</span>   <span class="value">Since 2023</span>
<span class="label">Packages:</span>  <span class="value">50+ projects completed</span>
<span class="label">CPU:</span>      <span class="value">Brain v1.0 @ 100% creative</span>
<span class="label">Testing:</span>  <span class="value">Playwright + Manual QA</span>
<span class="label">Theme:</span>    <span class="value">Matrix Green Professional</span>
</div>
</div>
<span class="divider">══════════════════════════════════════════════════════════</span>`;

    addOutput(neofetchText, '');
}

function downloadResume() {
    addOutput('', '');
    addOutput('📥 Preparing resume download...', 'info');
    addOutput('├─ File: JERDON_MACARAEG-CV.pdf', 'dim');
    addOutput('├─ Format: PDF Document', 'dim');
    addOutput('├─ Candidate: Jerdon Philip Macaraeg', 'dim');
    addOutput('├─ Role: Full-Stack Developer | QA Specialist', 'dim');

    setTimeout(() => {
        window.open('assets/files/JERDON_MACARAEG-CV.pdf', '_blank');
        addOutput('└─ ✅ Download initiated successfully!', 'success');
    }, 800);
}

function showWhoami() {
    addOutput('jerdonphilipmacaraeg', 'success');
    addOutput('Full-Stack Developer | QA Specialist | Entrepreneur', 'dim');
    addOutput('Location: Pangasinan, Philippines', 'dim');
}

function showDate() {
    const now = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
    };
    addOutput(now.toLocaleDateString('en-US', options), 'info');
}

function showVersion() {
    addOutput('╔════════════════════════════════════╗', 'success');
    addOutput('║  Portfolio Terminal v3.0.0        ║', 'success');
    addOutput('║  Build: 2026.05.16                ║', 'success');
    addOutput('║  Kernel: JavaScript ES2024        ║', 'success');
    addOutput('║  Author: Jerdon Philip Macaraeg   ║', 'success');
    addOutput('╚════════════════════════════════════╝', 'success');
    addOutput('Full-Stack Developer | QA Specialist | Entrepreneur', 'dim');
}

function listProjects() {
    const listText = `
<span class="output-success">~/projects/</span>
<span class="output-dim">├──</span> <span class="output-info">inventory-tracking-system/</span>
<span class="output-dim">│   ├──</span> electron-app/
<span class="output-dim">│   ├──</span> tests/ (Playwright)
<span class="output-dim">│   └──</span> database/
<span class="output-dim">├──</span> <span class="output-info">wedding-landing-page/</span>
<span class="output-dim">│   ├──</span> index.html
<span class="output-dim">│   ├──</span> styles.css
<span class="output-dim">│   └──</span> script.js
<span class="output-dim">├──</span> <span class="output-info">task-management-app/</span>
<span class="output-dim">│   ├──</span> src/
<span class="output-dim">│   └──</span> package.json
<span class="output-dim">└──</span> <span class="output-info">lumen-lens-studios/</span>
<span class="output-dim">    └──</span> Photography Business

<span class="output-dim">4 projects | 3 in development | 1 deployed | 1 active business</span>`;

    addOutput(listText, '');
}

function clearTerminal() {
    terminalOutput.innerHTML = '';
    showBanner();
}

function sudoCommand() {
    addOutput('╔════════════════════════════════════╗', 'warning');
    addOutput('║  🔒 Access Denied                 ║', 'warning');
    addOutput('║  Root access not required.        ║', 'warning');
    addOutput('║  All features are available to    ║', 'warning');
    addOutput('║  you without elevated privileges. ║', 'warning');
    addOutput('╚════════════════════════════════════╝', 'warning');
}

function exitCommand() {
    addOutput('Logging out...', 'warning');
    setTimeout(() => {
        addOutput('', '');
        addOutput('╔════════════════════════════════════╗', 'info');
        addOutput('║  Session not terminated. 😊       ║', 'info');
        addOutput('║  Feel free to continue exploring  ║', 'info');
        addOutput("║  Jerdon Philip Macaraeg's         ║", 'info');
        addOutput('║  professional portfolio.          ║', 'info');
        addOutput('╚════════════════════════════════════╝', 'info');
        addOutput('', '');
        addOutput('Type <span class="output-info">help</span> to see available commands', 'dim');
    }, 1000);
}

// ===========================================================================
// COMMANDS REGISTRY
// ===========================================================================

const commands = {
    'help': showHelp,
    'about': showAbout,
    'skills': showSkills,
    'projects': showProjects,
    'contact': showContact,
    'resume': downloadResume,
    'neofetch': showNeofetch,
    'clear': clearTerminal,
    'whoami': showWhoami,
    'social': showSocial,
    'banner': showBanner,
    'ls': listProjects,
    'date': showDate,
    'experience': showExperience,
    'education': showEducation,
    'awards': showAwards,
    'version': showVersion,
    'sudo': sudoCommand,
    'exit': exitCommand
};

const aliases = {
    'h': 'help',
    'a': 'about',
    's': 'skills',
    'p': 'projects',
    'c': 'contact',
    'r': 'resume',
    'neo': 'neofetch',
    'clr': 'clear',
    'w': 'whoami',
    'bye': 'exit',
    'exp': 'experience',
    'edu': 'education',
    'aw': 'awards',
    'v': 'version'
};

// ===========================================================================
// CORE FUNCTIONS
// ===========================================================================

function addOutput(text, className = '') {
    const line = document.createElement('div');
    line.className = `output-line output-${className}`;
    line.innerHTML = text;
    terminalOutput.appendChild(line);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function addCommandEcho(command) {
    const echo = `
<span class="command-history">┌─[<span class="prompt-user">jerdon</span>@<span class="prompt-host">portfolio</span>]─[<span class="prompt-path">~</span>]</span>
<span class="command-history">└──╼ $ ${escapeHtml(command)}</span>`;
    addOutput(echo, 'dim');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===========================================================================
// INITIALIZATION
// ===========================================================================

function init() {
    showBanner();
    detectMobile();
    setupEventListeners();

    if (swipeHint) {
        setTimeout(() => {
            swipeHint.style.opacity = '0';
            swipeHint.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                swipeHint.style.display = 'none';
            }, 500);
        }, 5000);
    }
}

function detectMobile() {
    isMobile = window.innerWidth <= 768;
    if (mobileMenuToggle) {
        mobileMenuToggle.style.display = isMobile ? 'flex' : 'none';
    }
}

function setupEventListeners() {
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }
    if (quickCommandsClose) {
        quickCommandsClose.addEventListener('click', closeMobileMenu);
    }
    if (overlay) {
        overlay.addEventListener('click', closeMobileMenu);
    }

    document.querySelectorAll('.quick-command-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const command = this.dataset.command;
            executeCommand(command);
            closeMobileMenu();
        });
    });

    if (sendBtn) {
        sendBtn.addEventListener('click', () => {
            const input = terminalInput.value;
            if (input.trim()) {
                executeCommand(input);
                terminalInput.value = '';
            }
        });
    }

    if (terminalInput) {
        terminalInput.addEventListener('keydown', handleInputKeydown);
    }

    window.addEventListener('resize', () => {
        detectMobile();
        if (terminalInput) terminalInput.focus();
    });

    if (terminalOutput) {
        terminalOutput.addEventListener('click', (e) => {
            if (!e.target.closest('.link')) {
                terminalInput.focus();
            }
        });
    }

    setupSwipeGestures();

    const minimizeBtn = document.getElementById('minimizeBtn');
    const maximizeBtn = document.getElementById('maximizeBtn');
    const closeBtn = document.getElementById('closeBtn');

    if (minimizeBtn) {
        minimizeBtn.addEventListener('click', () => {
            addOutput('Window minimize is disabled in web version', 'dim');
        });
    }
    if (maximizeBtn) {
        maximizeBtn.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(() => { });
            } else {
                document.exitFullscreen();
            }
        });
    }
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            addOutput('To close, navigate away from this page', 'dim');
            addOutput('Thank you for visiting! 😊', 'info');
        });
    }
}

// ===========================================================================
// INPUT HANDLING
// ===========================================================================

function handleInputKeydown(e) {
    if (e.key === 'Enter') {
        const input = this.value;
        executeCommand(input);
        this.value = '';
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex > 0) {
            historyIndex--;
            this.value = commandHistory[historyIndex];
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            this.value = commandHistory[historyIndex];
        } else {
            historyIndex = commandHistory.length;
            this.value = '';
        }
    } else if (e.key === 'Tab') {
        e.preventDefault();
        const input = this.value.toLowerCase();

        if (!input) return;

        const allCommands = [...Object.keys(commands), ...Object.keys(aliases)];
        const matches = allCommands.filter(cmd => cmd.startsWith(input));

        if (matches.length === 1) {
            this.value = matches[0];
            this.dataset.lastTabInput = '';
        } else if (matches.length > 1) {
            if (!this.dataset.lastTabInput || this.dataset.lastTabInput !== input) {
                addOutput('', '');
                addOutput('Did you mean:', 'info');
                matches.forEach(match => {
                    addOutput(`  • ${match}`, 'dim');
                });
                addOutput('', '');
                this.dataset.lastTabInput = input;
            } else {
                const currentMatch = this.value;
                const currentIndex = matches.indexOf(currentMatch);
                const nextIndex = (currentIndex + 1) % matches.length;
                this.value = matches[nextIndex];
            }
        }
    } else {
        this.dataset.lastTabInput = '';
    }
}

// ===========================================================================
// MOBILE SUPPORT
// ===========================================================================

function setupSwipeGestures() {
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeDistance = touchEndX - touchStartX;
        if (Math.abs(swipeDistance) > 50) {
            if (swipeDistance < -50 && quickCommandsPanel && !quickCommandsPanel.classList.contains('active')) {
                openMobileMenu();
            } else if (swipeDistance > 50 && quickCommandsPanel && quickCommandsPanel.classList.contains('active')) {
                closeMobileMenu();
            }
        }
    }
}

function toggleMobileMenu() {
    if (quickCommandsPanel && quickCommandsPanel.classList.contains('active')) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

function openMobileMenu() {
    if (quickCommandsPanel) quickCommandsPanel.classList.add('active');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    if (quickCommandsPanel) quickCommandsPanel.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// ===========================================================================
// COMMAND EXECUTION
// ===========================================================================

function executeCommand(input) {
    const trimmedInput = input.trim().toLowerCase();

    if (!trimmedInput) return;

    addCommandEcho(input);

    const commandName = aliases[trimmedInput] || trimmedInput;

    if (commands[commandName]) {
        commands[commandName]();
    } else {
        addOutput(`✗ Command not found: <span class="output-error">${escapeHtml(trimmedInput)}</span>`, 'error');
        addOutput('Type <span class="output-info">help</span> to see available commands', 'dim');
    }

    commandHistory.push(input);
    historyIndex = commandHistory.length;

    addOutput('', '');

    if (terminalInput) terminalInput.focus();
}

// Add command echo
function addCommandEcho(command) {
    const echo = `<span class="command-history">┌─[<span class="prompt-user">jerdon</span>@<span class="prompt-host">portfolio</span>]─[<span class="prompt-path">~</span>]
└──╼ $ ${escapeHtml(command)}</span>`;
    addOutput(echo, 'dim');
}

// ===========================================================================
// STARTUP
// ===========================================================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        init();
        if (terminalInput) terminalInput.focus();
    });
} else {
    init();
    if (terminalInput) terminalInput.focus();
}

console.log('%c🎯 Jerdon Philip Macaraeg - Terminal Portfolio v3.0.0', 'color: #00ff00; font-size: 16px;');
console.log('%c💼 Full-Stack Developer | QA Specialist', 'color: #00ccff; font-size: 14px;');
console.log('%c📋 Type help to explore commands', 'color: #ffaa00;');