// Initialize GSAP Animations when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {

    // Register GSAP plugins if needed
    // gsap.registerPlugin(ScrollTrigger); 

    // --- TRANSLATION SYSTEM ---
    const translations = {
        es: {
            nav_about: "Sobre Mí",
            nav_skills: "Habilidades",
            nav_projects: "Proyectos",
            nav_contact: "Contacto",
            hero_role: "Ingeniero Informático <br />Data Analytics & AI",
            hero_cv: "Curriculum",
            about_title: "Sobre Mí",
            about_p1: "Profesional de la Ingeniería Informática con experiencia demostrable en operaciones y logística. Combino competencias técnicas en Software, Bases de Datos y Soporte TI con habilidades de gestión de stock y control de procesos.",
            about_p2: "Me caracterizo por ser un profesional adaptable, responsable y con excelente disposición para el trabajo en terreno o administrativo. Busco una oportunidad para desarrollar mi carrera aplicando tecnología para solucionar problemas reales y optimizar la productividad de la empresa.",
            skills_title: "Habilidades Técnicas",
            skills_bi: "BI & DATOS",
            skills_ai: "IA & AUTOMATIZACIÓN",
            skills_web: "DESARROLLO WEB",
            skills_cloud: "NUBE & HERRAMIENTAS",
            skills_db: "BASES DE DATOS",
            skills_ops: "OPERACIONES Y OTROS",
            projects_title: "Proyectos Destacados",
            project_athenas_title: "Sistema ETL & Flask App <span class='text-slate-500 text-sm font-normal'>Condensa S.A.</span>",
            project_athenas_client: "Condensa S.A.", // Not used directly if HTML is replaced, but kept for reference
            project_athenas_desc: "Una plataforma centralizada para la automatización de procesos de datos (ETL) y visualización operativa. Elimina la fragmentación de información y reduce tiempos de reporte en un 40%.",
            project_dipreseh_title: "Geo-Seguridad Preventiva <span class='text-slate-500 text-sm font-normal'>Sector Público</span>",
            project_dipreseh_desc: "Sistema de generación automática de reportes georreferenciados para la Dirección de Prevención. Permite la asignación estratégica de recursos de seguridad basada en mapas de calor delictual.",
            project_logistics_title: "Optimización de Inventarios <span class='text-slate-500 text-sm font-normal'>Logística</span>",
            project_logistics_desc: "Modelo analítico para la reducción de mermas y optimización de tiempos de despacho. Uso de diagramas BPMN para reestructurar el flujo operativo de bodegas.",
            btn_details: "Ver Detalles <ion-icon name='arrow-forward-outline'></ion-icon>",
            contact_title: "Hablemos",
            contact_subtitle: "¿Interesado en trabajar juntos?",
            contact_desc: "Estoy abierto a nuevas oportunidades, proyectos de consultoría o simplemente para charlar sobre tecnología y datos.",
            contact_location: "Ubicación",
            contact_loc_val: "Chile / Remoto",
            form_name: "Nombre Completo",
            form_email: "Correo Electrónico",
            form_subject: "Asunto",
            form_message: "Mensaje",
            form_submit: "Enviar Mensaje",
            ph_name: "Tu nombre",
            ph_email: "ejemplo@correo.com",
            ph_subject: "¿En qué puedo ayudarte?",
            ph_message: "Escribe tu mensaje aquí...",
            footer_rights: "Copyright © 2026 Carlos Ignacio Galvez Vilca"
        },
        en: {
            nav_about: "About Me",
            nav_skills: "Skills",
            nav_projects: "Projects",
            nav_contact: "Contact",
            hero_role: "Computer Engineer <br />Data Analytics & AI",
            hero_cv: "Resume",
            about_title: "About Me",
            about_p1: "Computer Engineering professional with demonstrable experience in operations and logistics. I combine technical skills in Software, Databases, and IT Support with inventory management and process control capabilities.",
            about_p2: "I characterize myself as an adaptable, responsible professional with excellent disposition for fieldwork or administrative tasks. I seek an opportunity to develop my career by applying technology to solve real problems and optimize company productivity.",
            skills_title: "Technical Skills",
            skills_bi: "BI & DATA",
            skills_ai: "AI & AUTOMATION",
            skills_web: "WEB DEV",
            skills_cloud: "CLOUD & TOOLS",
            skills_db: "DATABASES",
            skills_ops: "OPERATIONS & OTHERS",
            projects_title: "Featured Projects",
            project_athenas_title: "ETL System & Flask App <span class='text-slate-500 text-sm font-normal'>Condensa S.A.</span>",
            project_athenas_desc: "A centralized platform for data process automation (ETL) and operational visualization. Eliminates information fragmentation and reduces reporting times by 40%.",
            project_dipreseh_title: "Geo-Preventive Security <span class='text-slate-500 text-sm font-normal'>Public Sector</span>",
            project_dipreseh_desc: "Automated georeferenced reporting system for the Prevention Directorate. Allows strategic allocation of security resources based on crime heatmaps.",
            project_logistics_title: "Inventory Optimization <span class='text-slate-500 text-sm font-normal'>Logistics</span>",
            project_logistics_desc: "Analytical model for shrinkage reduction and dispatch time optimization. Use of BPMN diagrams to restructure warehouse operational flows.",
            btn_details: "View Details <ion-icon name='arrow-forward-outline'></ion-icon>",
            contact_title: "Let's Talk",
            contact_subtitle: "Interested in working together?",
            contact_desc: "I am open to new opportunities, consulting projects, or just chatting about technology and data.",
            contact_location: "Location",
            contact_loc_val: "Chile / Remote",
            form_name: "Full Name",
            form_email: "Email Address",
            form_subject: "Subject",
            form_message: "Message",
            form_submit: "Send Message",
            ph_name: "Your Name",
            ph_email: "example@email.com",
            ph_subject: "How can I help you?",
            ph_message: "Write your message here...",
            footer_rights: "Copyright © 2026 Carlos Ignacio Galvez Vilca"
        }
    };

    let currentLang = localStorage.getItem('site_lang') || 'es';

    function updateLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('site_lang', lang);

        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                if (translations[lang][key].includes('<') || key === 'btn_details') {
                    el.innerHTML = translations[lang][key];
                } else {
                    el.innerText = translations[lang][key];
                }
            }
        });

        // Update Placeholders
        const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
        placeholders.forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (translations[lang][key]) {
                el.placeholder = translations[lang][key];
            }
        });

        // Update Toggle Switch Visuals
        const btns = {
            es: ['btn-es-desktop', 'btn-es-mobile'],
            en: ['btn-en-desktop', 'btn-en-mobile']
        };

        // Reset all to inactive state
        [...btns.es, ...btns.en].forEach(id => {
            const btn = document.getElementById(id);
            if (btn) {
                btn.classList.remove('bg-primary-600', 'text-white');
                btn.classList.add('text-slate-400', 'hover:text-white');
            }
        });

        // Set active language button styles
        btns[lang].forEach(id => {
            const btn = document.getElementById(id);
            if (btn) {
                btn.classList.remove('text-slate-400', 'hover:text-white');
                btn.classList.add('bg-primary-600', 'text-white');
            }
        });

        // Make currentLang available globally for modal
        window.currentLang = currentLang;
    }

    // Initialize Language
    updateLanguage(currentLang);

    // Event Listeners for Switch Buttons
    const btnEsDesktop = document.getElementById('btn-es-desktop');
    const btnEnDesktop = document.getElementById('btn-en-desktop');
    const btnEsMobile = document.getElementById('btn-es-mobile');
    const btnEnMobile = document.getElementById('btn-en-mobile');

    if (btnEsDesktop) btnEsDesktop.addEventListener('click', () => updateLanguage('es'));
    if (btnEnDesktop) btnEnDesktop.addEventListener('click', () => updateLanguage('en'));
    if (btnEsMobile) btnEsMobile.addEventListener('click', () => updateLanguage('es'));
    if (btnEnMobile) btnEnMobile.addEventListener('click', () => updateLanguage('en'));

    // --- INTRO ANIMATION SEQUENCE (Cinematic Reveal) ---

    // 2. Navbar Reveal
    gsap.from(".navbar-anim-item", {
        duration: 1.5,
        delay: 1.5,
        opacity: 0,
        y: 20,
        ease: "expo.inOut",
        stagger: 0.1
    });

    // 3. Social Media Sidebar Stagger
    gsap.from(".hero-media ul li", {
        duration: 1.5,
        delay: 1.5,
        stagger: 0.08,
        opacity: 0,
        x: -20,
        ease: "expo.inOut",
        stagger: 0.1
    });

    // 4. Main Title Reveal
    gsap.to(".hero-title .hide--text", {
        duration: 1.5,
        delay: 1,
        y: "0%",
        ease: "expo.inOut",
        stagger: 0.1
    });

    // 5. Subtitle/Desc Reveal
    gsap.to(".hero-desc .hide--text", {
        duration: 1.5,
        delay: 1.2,
        y: "0%",
        ease: "expo.inOut",
    });

    // 6. Background Large Text Fade/Slide In
    gsap.from(".hero-subtitle", {
        duration: 1.5,
        delay: 1.5,
        opacity: 0,
        x: -100,
        ease: "expo.inOut",
    });

    // 7. Distortion Image Reveal
    gsap.from(".distortion-container", {
        duration: 1.5,
        delay: 2,
        opacity: 0,
        y: 20,
        ease: "expo.inOut",
    });

    // 8. Overlay Curtain Animation
    gsap.to(".first", {
        duration: 1.5,
        delay: 0.5,
        top: "-100%",
        ease: "expo.inOut",
    });

    gsap.to(".second", {
        duration: 1.5,
        delay: 0.7,
        top: "-100%",
        ease: "expo.inOut",
    });

    gsap.to(".third", {
        duration: 1.5,
        delay: 0.9,
        top: "-100%",
        ease: "expo.inOut",
    });


    // --- UI INTERACTION ---

    // Mobile Menu Logic
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Stick Navbar behavior
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('navbar-scrolled');
            navbar.style.background = ''; // Clear inline if any
        } else {
            navbar.classList.remove('navbar-scrolled');
            navbar.style.background = 'transparent';
        }
    });

    // --- INTERACTIVE GRADIENT BUBBLE ---
    const interBubble = document.querySelector('.interactive');
    if (interBubble) {
        let curX = 0;
        let curY = 0;
        let tgX = 0;
        let tgY = 0;

        const move = () => {
            curX += (tgX - curX) / 20;
            curY += (tgY - curY) / 20;
            interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
            requestAnimationFrame(move);
        };

        window.addEventListener('mousemove', (event) => {
            tgX = event.clientX;
            tgY = event.clientY;
        });

        move();
    }
});

// --- PROJECT MODAL LOGIC & DATA ---

const projectData = {
    "athenas": {
        es: {
            title: "ATHENAS - Sistema Integral de Gestión de Producción",
            content: `
            <div class="grid lg:grid-cols-12 gap-8">
                <!-- LEFT COLUMN: INFO (40% width) -->
                <div class="space-y-8 order-2 lg:order-1 lg:col-span-5">
                    <!-- Executive Summary -->
                    <div class="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                        <h4 class="text-white font-bold text-lg mb-2 flex items-center gap-2">
                            <ion-icon name="stats-chart-outline" class="text-primary-400"></ion-icon>
                            Resumen Ejecutivo
                        </h4>
                        <p class="text-slate-300 text-sm leading-relaxed">
                            Plataforma web desarrollada en Flask que integra monitoreo en tiempo real de producción, 
                            análisis de datos, Realidad Aumentada e inteligencia artificial para optimizar procesos manufactureros. 
                            El sistema conecta equipos IoT, bases de datos SQL Server y proporciona analytics avanzados con NL2SQL.
                        </p>
                    </div>

                    <!-- Modules -->
                    <div>
                        <h4 class="text-primary-400 font-bold text-xl mb-4 border-l-4 border-primary-500 pl-3">🎯 Módulos Principales</h4>
                        <ul class="space-y-3 text-sm">
                            <li class="bg-slate-900/30 p-3 rounded-lg">
                                <strong class="text-white block mb-1">1. Dashboard de Producción</strong>
                                Monitoreo por turno, indicadores en tiempo real (Producción horaria, scrap) y control de estado automatizado.
                            </li>
                            <li class="bg-slate-900/30 p-3 rounded-lg">
                                <strong class="text-white block mb-1">2. Módulo de Estadísticas</strong>
                                Visualización de KPIs con selectores temporales y gráficos interactivos (Chart.js) para producción y scrap.
                            </li>
                            <li class="bg-slate-900/30 p-3 rounded-lg border border-primary-500/20">
                                <strong class="text-primary-300 block mb-1 flex items-center gap-2">
                                    <ion-icon name="sparkles-outline"></ion-icon> 3. Augmented Analytics (IA)
                                </strong>
                                Motor NL2SQL con GPT-4o-mini que convierte preguntas en lenguaje natural a consultas SQL seguras.
                            </li>
                            <li class="bg-slate-900/30 p-3 rounded-lg">
                                <strong class="text-white block mb-1">4. Módulo IoT</strong>
                                Integración con sensores LM35 mediante Arduino/ESP32 para telemetría en tiempo real.
                            </li>
                            <li class="bg-slate-900/30 p-3 rounded-lg">
                                <strong class="text-white block mb-1">5. Realidad Aumentada</strong>
                                Visualización 3D interactiva de líneas de producción.
                            </li>
                        </ul>
                    </div>

                    <!-- Impact -->
                    <div>
                        <h4 class="text-green-400 font-bold text-xl mb-4 flex items-center gap-2">
                            <ion-icon name="trending-up-outline"></ion-icon> Impacto
                        </h4>
                        <div class="bg-green-900/10 border border-green-500/20 p-4 rounded-xl">
                            <p class="italic text-green-100/80 text-sm">
                                "El sistema optimiza la visibilidad de producción, reduce tiempos de decisión mediante IA conversacional y automatiza el monitoreo de líneas."
                            </p>
                        </div>
                    </div>
                </div>

                <!-- RIGHT COLUMN: VIDEO & STACK (60% width) -->
                <div class="space-y-8 order-1 lg:order-2 lg:col-span-7">
                     <!-- Video Demo -->
                    <div class="sticky top-0 z-10">
                        <div class="rounded-xl overflow-hidden shadow-2xl border border-slate-700 bg-black relative group w-full">
                            <video autoplay muted loop playsinline class="w-full h-auto object-cover" preload="metadata">
                                <source src="static/video/condensa_demo.mp4" type="video/mp4">
                                Tu navegador no soporta la reproducción de video.
                            </video>
                             <div class="absolute bottom-2 right-2 bg-black/60 px-2 py-1 rounded text-xs text-white/70 pointer-events-none">
                                Vista Previa
                            </div>
                        </div>
                        
                        <!-- Mini Stack Summary below video -->
                         <div class="mt-6">
                            <h4 class="text-secondary-400 font-bold text-xl mb-4 flex items-center gap-2">
                                <ion-icon name="code-slash-outline"></ion-icon> Stack Tecnológico
                            </h4>
                            <div class="grid grid-cols-2 lg:grid-cols-3 gap-3 text-sm bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
                                <div class="p-2 rounded bg-slate-800/50">
                                    <span class="text-xs text-slate-400 block mb-1">Backend</span>
                                    <span class="text-white font-medium text-xs">Flask 3.0, PyODBC</span>
                                </div>
                                <div class="p-2 rounded bg-slate-800/50">
                                    <span class="text-xs text-slate-400 block mb-1">Database</span>
                                    <span class="text-white font-medium text-xs">SQL Server, SPs, Views</span>
                                </div>
                                <div class="p-2 rounded bg-slate-800/50">
                                    <span class="text-xs text-slate-400 block mb-1">ORM</span>
                                    <span class="text-white font-medium text-xs">SQLAlchemy</span>
                                </div>
                                <div class="p-2 rounded bg-slate-800/50">
                                    <span class="text-xs text-slate-400 block mb-1">AI Core</span>
                                    <span class="text-white font-medium text-xs">OpenAI GPT-4o-mini</span>
                                </div>
                                <div class="p-2 rounded bg-slate-800/50">
                                    <span class="text-xs text-slate-400 block mb-1">AI Framework</span>
                                    <span class="text-white font-medium text-xs">LangChain</span>
                                </div>
                                <div class="p-2 rounded bg-slate-800/50">
                                    <span class="text-xs text-slate-400 block mb-1">Hardware IoT</span>
                                    <span class="text-white font-medium text-xs">ESP32, Arduino Uno</span>
                                </div>
                                <div class="p-2 rounded bg-slate-800/50">
                                    <span class="text-xs text-slate-400 block mb-1">IoT Protocol</span>
                                    <span class="text-white font-medium text-xs">Serial Communication</span>
                                </div>
                                <div class="p-2 rounded bg-slate-800/50">
                                    <span class="text-xs text-slate-400 block mb-1">Frontend</span>
                                    <span class="text-white font-medium text-xs">HTML5, CSS3, JS</span>
                                </div>
                                <div class="p-2 rounded bg-slate-800/50">
                                    <span class="text-xs text-slate-400 block mb-1">Visualization</span>
                                    <span class="text-white font-medium text-xs">Chart.js</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
        },
        en: {
            title: "ATHENAS - Integrated Production Management System",
            content: `
            <div class="grid lg:grid-cols-12 gap-8">
                <div class="space-y-8 order-2 lg:order-1 lg:col-span-5">
                    <div class="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                        <h4 class="text-white font-bold text-lg mb-2 flex items-center gap-2">
                            <ion-icon name="stats-chart-outline" class="text-primary-400"></ion-icon>
                            Executive Summary
                        </h4>
                        <p class="text-slate-300 text-sm leading-relaxed">
                            Web platform developed in Flask integrating real-time production monitoring, 
                            data analysis, Augmented Reality, and AI to optimize manufacturing processes. 
                            The system connects IoT devices, SQL Server databases, and provides advanced analytics with NL2SQL.
                        </p>
                    </div>

                    <div>
                        <h4 class="text-primary-400 font-bold text-xl mb-4 border-l-4 border-primary-500 pl-3">🎯 Main Modules</h4>
                        <ul class="space-y-3 text-sm">
                            <li class="bg-slate-900/30 p-3 rounded-lg">
                                <strong class="text-white block mb-1">1. Production Dashboard</strong>
                                Shift monitoring, real-time indicators (Hourly production, scrap), and automated status control.
                            </li>
                            <li class="bg-slate-900/30 p-3 rounded-lg">
                                <strong class="text-white block mb-1">2. Statistics Module</strong>
                                KPI visualization with time selectors and interactive charts (Chart.js) for production and scrap.
                            </li>
                            <li class="bg-slate-900/30 p-3 rounded-lg border border-primary-500/20">
                                <strong class="text-primary-300 block mb-1 flex items-center gap-2">
                                    <ion-icon name="sparkles-outline"></ion-icon> 3. Augmented Analytics (AI)
                                </strong>
                                NL2SQL engine with GPT-4o-mini converting natural language questions into safe SQL queries.
                            </li>
                            <li class="bg-slate-900/30 p-3 rounded-lg">
                                <strong class="text-white block mb-1">4. IoT Module</strong>
                                Integration with LM35 sensors via Arduino/ESP32 for real-time telemetry.
                            </li>
                            <li class="bg-slate-900/30 p-3 rounded-lg">
                                <strong class="text-white block mb-1">5. Augmented Reality</strong>
                                Interactive 3D visualization of production lines.
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 class="text-green-400 font-bold text-xl mb-4 flex items-center gap-2">
                            <ion-icon name="trending-up-outline"></ion-icon> Impact
                        </h4>
                        <div class="bg-green-900/10 border border-green-500/20 p-4 rounded-xl">
                            <p class="italic text-green-100/80 text-sm">
                                "The system optimizes production visibility, reduces decision-making times through conversational AI, and automates line monitoring."
                            </p>
                        </div>
                    </div>
                </div>

                <div class="space-y-8 order-1 lg:order-2 lg:col-span-7">
                    <div class="sticky top-0 z-10">
                        <div class="rounded-xl overflow-hidden shadow-2xl border border-slate-700 bg-black relative group w-full">
                            <video autoplay muted loop playsinline class="w-full h-auto object-cover" preload="metadata">
                                <source src="static/video/condensa_demo.mp4" type="video/mp4">
                                Your browser does not support video playback.
                            </video>
                             <div class="absolute bottom-2 right-2 bg-black/60 px-2 py-1 rounded text-xs text-white/70 pointer-events-none">
                                Demo Preview
                            </div>
                        </div>
                        
                         <div class="mt-6">
                            <h4 class="text-secondary-400 font-bold text-xl mb-4 flex items-center gap-2">
                                <ion-icon name="code-slash-outline"></ion-icon> Tech Stack
                            </h4>
                            <div class="grid grid-cols-2 lg:grid-cols-3 gap-3 text-sm bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
                                <div class="p-2 rounded bg-slate-800/50">
                                    <span class="text-xs text-slate-400 block mb-1">Backend</span>
                                    <span class="text-white font-medium text-xs">Flask 3.0, PyODBC</span>
                                </div>
                                <div class="p-2 rounded bg-slate-800/50">
                                    <span class="text-xs text-slate-400 block mb-1">Database</span>
                                    <span class="text-white font-medium text-xs">SQL Server, SPs, Views</span>
                                </div>
                                <div class="p-2 rounded bg-slate-800/50">
                                    <span class="text-xs text-slate-400 block mb-1">ORM</span>
                                    <span class="text-white font-medium text-xs">SQLAlchemy</span>
                                </div>
                                <div class="p-2 rounded bg-slate-800/50">
                                    <span class="text-xs text-slate-400 block mb-1">AI Core</span>
                                    <span class="text-white font-medium text-xs">OpenAI GPT-4o-mini</span>
                                </div>
                                <div class="p-2 rounded bg-slate-800/50">
                                    <span class="text-xs text-slate-400 block mb-1">AI Framework</span>
                                    <span class="text-white font-medium text-xs">LangChain</span>
                                </div>
                                <div class="p-2 rounded bg-slate-800/50">
                                    <span class="text-xs text-slate-400 block mb-1">Hardware IoT</span>
                                    <span class="text-white font-medium text-xs">ESP32, Arduino Uno</span>
                                </div>
                                <div class="p-2 rounded bg-slate-800/50">
                                    <span class="text-xs text-slate-400 block mb-1">IoT Protocol</span>
                                    <span class="text-white font-medium text-xs">Serial Communication</span>
                                </div>
                                <div class="p-2 rounded bg-slate-800/50">
                                    <span class="text-xs text-slate-400 block mb-1">Frontend</span>
                                    <span class="text-white font-medium text-xs">HTML5, CSS3, JS</span>
                                </div>
                                <div class="p-2 rounded bg-slate-800/50">
                                    <span class="text-xs text-slate-400 block mb-1">Visualization</span>
                                    <span class="text-white font-medium text-xs">Chart.js</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
        }
    },
    "dipreseh": {
        es: {
            title: "Sistema Integrado de Gestión Operativa (DIPRESEH)",
            content: `
            <div class="grid lg:grid-cols-12 gap-8">
                <div class="space-y-8 order-2 lg:order-1 lg:col-span-5">
                    <div class="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                        <h4 class="text-white font-bold text-lg mb-2 flex items-center gap-2">
                            <ion-icon name="map-outline" class="text-primary-400"></ion-icon>
                            Resumen Ejecutivo
                        </h4>
                        <p class="text-slate-300 text-sm leading-relaxed">
                            Plataforma web avanzada para la centralización, auditoría y visualización estratégica de operaciones de seguridad. 
                            Integra flujos de datos de múltiples unidades (UDIEM, Patrullaje, Seguridad Comunitaria) transformando reportes de campo en inteligencia accionable para la toma de decisiones en tiempo real.
                        </p>
                    </div>
                    <div>
                        <h4 class="text-primary-400 font-bold text-xl mb-4 border-l-4 border-primary-500 pl-3">🗺️ Funcionalidad Clave: Inteligencia Espacial</h4>
                        <ul class="space-y-3 text-sm">
                            <li class="bg-slate-900/30 p-3 rounded-lg">
                                <strong class="text-white block mb-1">1. Mapas de Calor Combinados</strong>
                                Visualización de densidad con Leaflet.js, superponiendo capas de datos de distintas unidades para detectar "zonas calientes".
                            </li>
                            <li class="bg-slate-900/30 p-3 rounded-lg">
                                <strong class="text-white block mb-1">2. Normalización de Coordenadas</strong>
                                Algoritmos en Python para limpieza y validación de coordenadas (Lat/Lon) asegurando precisión en el ploteo.
                            </li>
                            <li class="bg-slate-900/30 p-3 rounded-lg border border-primary-500/20">
                                <strong class="text-primary-300 block mb-1 flex items-center gap-2">
                                    <ion-icon name="options-outline"></ion-icon> 3. Controles Dinámicos
                                </strong>
                                Ajuste en tiempo real de radio, intensidad y difuminado para granularizar el análisis (micro vs macro sectores).
                            </li>
                            <li class="bg-slate-900/30 p-3 rounded-lg">
                                <strong class="text-white block mb-1">4. Análisis Espacio-Temporal</strong>
                                Filtros para "rebobinar" o aislar actividad por rangos de tiempo, visualizando desplazamientos delictuales.
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="text-green-400 font-bold text-xl mb-4 flex items-center gap-2">
                            <ion-icon name="trending-up-outline"></ion-icon> Impacto
                        </h4>
                        <div class="bg-green-900/10 border border-green-500/20 p-4 rounded-xl">
                            <p class="italic text-green-100/80 text-sm">
                                "Modernización de la gestión operativa: de reportes en papel a un Centro de Mando Digital para validar cobertura y optimizar recursos según demanda geográfica real."
                            </p>
                        </div>
                    </div>
                </div>
                <div class="space-y-8 order-1 lg:order-2 lg:col-span-7">
                    <div class="sticky top-0 z-10">
                        <div class="rounded-xl overflow-hidden shadow-2xl border border-slate-700 bg-slate-900 relative group w-full h-64 lg:h-80">
                            <video autoplay muted loop playsinline class="w-full h-full object-cover" preload="metadata">
                                <source src="static/video/dipreseh_demo.mp4" type="video/mp4">
                                Tu navegador no soporta la reproducción de video.
                            </video>
                             <div class="absolute bottom-2 right-2 bg-black/60 px-2 py-1 rounded text-xs text-white/70 pointer-events-none">
                                Vista Previa
                            </div>
                        </div>
                         <div class="mt-6">
                            <h4 class="text-secondary-400 font-bold text-xl mb-4 flex items-center gap-2">
                                <ion-icon name="code-slash-outline"></ion-icon> Stack Tecnológico
                            </h4>
                            <div class="grid grid-cols-2 lg:grid-cols-3 gap-3 text-sm bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
                                <div class="p-2 rounded bg-slate-800/50">
                                    <span class="text-xs text-slate-400 block mb-1">Backend Core</span>
                                    <span class="text-white font-medium text-xs">Python, Flask</span>
                                </div>
                                <div class="p-2 rounded bg-slate-800/50">
                                    <span class="text-xs text-slate-400 block mb-1">Data Processing</span>
                                    <span class="text-white font-medium text-xs">Pandas, NumPy</span>
                                </div>
                                <div class="p-2 rounded bg-slate-800/50">
                                    <span class="text-xs text-slate-400 block mb-1">Data Source</span>
                                    <span class="text-white font-medium text-xs">Google Sheets API</span>
                                </div>
                                <div class="p-2 rounded bg-slate-800/50">
                                    <span class="text-xs text-slate-400 block mb-1">Mapping Lib</span>
                                    <span class="text-white font-medium text-xs">Leaflet.js, Leaflet.heat</span>
                                </div>
                                <div class="p-2 rounded bg-slate-800/50">
                                    <span class="text-xs text-slate-400 block mb-1">Optimization</span>
                                    <span class="text-white font-medium text-xs">TTL Cache, ThreadPool</span>
                                </div>
                                <div class="p-2 rounded bg-slate-800/50">
                                    <span class="text-xs text-slate-400 block mb-1">Frontend</span>
                                    <span class="text-white font-medium text-xs">HTML5, Tailwind, JS</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
        },
        en: {
            title: "Integrated Operations Management System (DIPRESEH)",
            content: `
            <div class="grid lg:grid-cols-12 gap-8">
                <div class="space-y-8 order-2 lg:order-1 lg:col-span-5">
                    <div class="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                        <h4 class="text-white font-bold text-lg mb-2 flex items-center gap-2">
                            <ion-icon name="map-outline" class="text-primary-400"></ion-icon>
                            Executive Summary
                        </h4>
                        <p class="text-slate-300 text-sm leading-relaxed">
                            Advanced web platform for centralization, auditing, and strategic visualization of security operations. 
                            Integrates data flows from multiple units (UDIEM, Patrol, Community Security) transforming field reports into actionable intelligence for real-time decision making.
                        </p>
                    </div>
                    <div>
                        <h4 class="text-primary-400 font-bold text-xl mb-4 border-l-4 border-primary-500 pl-3">🗺️ Core Feature: Spatial Intelligence</h4>
                        <ul class="space-y-3 text-sm">
                            <li class="bg-slate-900/30 p-3 rounded-lg">
                                <strong class="text-white block mb-1">1. Combined Heatmaps</strong>
                                Density visualization with Leaflet.js, overlaying data layers from different units to detect "hot zones".
                            </li>
                            <li class="bg-slate-900/30 p-3 rounded-lg">
                                <strong class="text-white block mb-1">2. Coordinate Normalization</strong>
                                Python algorithms for cleaning and validation of coordinates (Lat/Lon) ensuring plotting accuracy.
                            </li>
                            <li class="bg-slate-900/30 p-3 rounded-lg border border-primary-500/20">
                                <strong class="text-primary-300 block mb-1 flex items-center gap-2">
                                    <ion-icon name="options-outline"></ion-icon> 3. Dynamic Controls
                                </strong>
                                Real-time adjustment of radius, intensity, and blur to granularize analysis (micro vs macro sectors).
                            </li>
                            <li class="bg-slate-900/30 p-3 rounded-lg">
                                <strong class="text-white block mb-1">4. Spatio-Temporal Analysis</strong>
                                Filters to "rewind" or isolate activity by time ranges, visualizing criminal movements.
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="text-green-400 font-bold text-xl mb-4 flex items-center gap-2">
                            <ion-icon name="trending-up-outline"></ion-icon> Impact
                        </h4>
                        <div class="bg-green-900/10 border border-green-500/20 p-4 rounded-xl">
                            <p class="italic text-green-100/80 text-sm">
                                "Modernization of operational management: from paper reports to a Digital Command Center to validat coverage and optimize resources based on real geographical demand."
                            </p>
                        </div>
                    </div>
                </div>
                <div class="space-y-8 order-1 lg:order-2 lg:col-span-7">
                    <div class="sticky top-0 z-10">
                        <div class="rounded-xl overflow-hidden shadow-2xl border border-slate-700 bg-slate-900 relative group w-full h-64 lg:h-80">
                            <video autoplay muted loop playsinline class="w-full h-full object-cover" preload="metadata">
                                <source src="static/video/dipreseh_demo.mp4" type="video/mp4">
                                Your browser does not support video playback.
                            </video>
                             <div class="absolute bottom-2 right-2 bg-black/60 px-2 py-1 rounded text-xs text-white/70 pointer-events-none">
                                Demo Preview
                            </div>
                        </div>
                         <div class="mt-6">
                            <h4 class="text-secondary-400 font-bold text-xl mb-4 flex items-center gap-2">
                                <ion-icon name="code-slash-outline"></ion-icon> Tech Stack
                            </h4>
                            <div class="grid grid-cols-2 lg:grid-cols-3 gap-3 text-sm bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
                                <div class="p-2 rounded bg-slate-800/50">
                                    <span class="text-xs text-slate-400 block mb-1">Backend Core</span>
                                    <span class="text-white font-medium text-xs">Python, Flask</span>
                                </div>
                                <div class="p-2 rounded bg-slate-800/50">
                                    <span class="text-xs text-slate-400 block mb-1">Data Processing</span>
                                    <span class="text-white font-medium text-xs">Pandas, NumPy</span>
                                </div>
                                <div class="p-2 rounded bg-slate-800/50">
                                    <span class="text-xs text-slate-400 block mb-1">Data Source</span>
                                    <span class="text-white font-medium text-xs">Google Sheets API</span>
                                </div>
                                <div class="p-2 rounded bg-slate-800/50">
                                    <span class="text-xs text-slate-400 block mb-1">Mapping Lib</span>
                                    <span class="text-white font-medium text-xs">Leaflet.js, Leaflet.heat</span>
                                </div>
                                <div class="p-2 rounded bg-slate-800/50">
                                    <span class="text-xs text-slate-400 block mb-1">Optimization</span>
                                    <span class="text-white font-medium text-xs">TTL Cache, ThreadPool</span>
                                </div>
                                <div class="p-2 rounded bg-slate-800/50">
                                    <span class="text-xs text-slate-400 block mb-1">Frontend</span>
                                    <span class="text-white font-medium text-xs">HTML5, Tailwind, JS</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
        }
    },
    "logistics": {
        es: {
            title: "Optimización de Inventarios & Reingeniería de Procesos",
            content: `
            <div class="grid lg:grid-cols-12 gap-8">
                <!-- LEFT COLUMN: INFO (40% width) -->
                <div class="space-y-8 order-2 lg:order-1 lg:col-span-5">
                    <!-- Executive Summary -->
                    <div class="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                        <h4 class="text-white font-bold text-lg mb-2 flex items-center gap-2">
                            <ion-icon name="cube-outline" class="text-primary-400"></ion-icon>
                            Resumen Ejecutivo
                        </h4>
                        <p class="text-slate-300 text-sm leading-relaxed">
                            Proyecto integral de consultoría y desarrollo tecnológico enfocado en la reducción de mermas y optimización de tiempos en centros de distribución.
                            Se implementó una reestructuración operativa basada en modelado BPMN y herramientas analíticas de control de stock.
                        </p>
                    </div>

                    <!-- Modules -->
                    <div>
                        <h4 class="text-primary-400 font-bold text-xl mb-4 border-l-4 border-primary-500 pl-3">📦 Áreas de Intervención</h4>
                        <ul class="space-y-3 text-sm">
                            <li class="bg-slate-900/30 p-3 rounded-lg">
                                <strong class="text-white block mb-1">1. Modelamiento de Procesos (BPMN)</strong>
                                Levantamiento y rediseño de flujos operativos (AS-IS / TO-BE), identificando cuellos de botella en la recepción y despacho.
                            </li>
                            <li class="bg-slate-900/30 p-3 rounded-lg">
                                <strong class="text-white block mb-1">2. Control de Mermas</strong>
                                Estrategias de auditoría y sistemas de alerta temprana para desviaciones de inventario físico vs. lógico.
                            </li>
                            <li class="bg-slate-900/30 p-3 rounded-lg border border-primary-500/20">
                                <strong class="text-primary-300 block mb-1 flex items-center gap-2">
                                    <ion-icon name="analytics-outline"></ion-icon> 3. Dashboard Operativo
                                </strong>
                                Implementación de paneles en Power BI para seguimiento de KPIs: Rotación de stock, Tasa de quiebre y Exactitud de inventario.
                            </li>
                        </ul>
                    </div>

                    <!-- Impact -->
                    <div>
                        <h4 class="text-green-400 font-bold text-xl mb-4 flex items-center gap-2">
                            <ion-icon name="trending-up-outline"></ion-icon> Impacto
                        </h4>
                        <div class="bg-green-900/10 border border-green-500/20 p-4 rounded-xl">
                            <p class="italic text-green-100/80 text-sm">
                                "La reingeniería de procesos permitió una reducción significativa en los tiempos de preparación de pedidos y una mejora sustancial en la trazabilidad de los productos."
                            </p>
                        </div>
                    </div>
                </div>

                <!-- RIGHT COLUMN: VISUAL & STACK (60% width) -->
                <div class="space-y-8 order-1 lg:order-2 lg:col-span-7">
                     <!-- Visual Representation -->
                    <div class="sticky top-0 z-10">
                        <div class="rounded-xl overflow-hidden shadow-2xl border border-slate-700 bg-slate-900 relative group w-full h-auto">
                            <img src="static/img/WhatsApp Image 2026-02-07 at 2.23.31 AM.jpeg" 
                                 alt="Logistics Dashboard" 
                                 class="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity">
                        </div>
                        
                         <div class="mt-6">
                            <h4 class="text-secondary-400 font-bold text-xl mb-4 flex items-center gap-2">
                                <ion-icon name="code-slash-outline"></ion-icon> Stack Tecnológico
                            </h4>
                            <div class="grid grid-cols-2 lg:grid-cols-3 gap-3 text-sm bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
                                <div class="p-2 rounded bg-slate-800/50">
                                    <span class="text-xs text-slate-400 block mb-1">Modeling</span>
                                    <span class="text-white font-medium text-xs">Bizagi / Visio</span>
                                </div>
                                <div class="p-2 rounded bg-slate-800/50">
                                    <span class="text-xs text-slate-400 block mb-1">Visualization</span>
                                    <span class="text-white font-medium text-xs">Power BI</span>
                                </div>
                                <div class="p-2 rounded bg-slate-800/50">
                                    <span class="text-xs text-slate-400 block mb-1">Data Processing</span>
                                    <span class="text-white font-medium text-xs">Excel / SQL</span>
                                </div>
                                <div class="p-2 rounded bg-slate-800/50">
                                    <span class="text-xs text-slate-400 block mb-1">Methodology</span>
                                    <span class="text-white font-medium text-xs">Lean Logistics</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
        },
        en: {
            title: "Inventory Optimization & Process Reengineering",
            content: `
            <div class="grid lg:grid-cols-12 gap-8">
                <div class="space-y-8 order-2 lg:order-1 lg:col-span-5">
                    <div class="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                        <h4 class="text-white font-bold text-lg mb-2 flex items-center gap-2">
                            <ion-icon name="cube-outline" class="text-primary-400"></ion-icon>
                            Executive Summary
                        </h4>
                        <p class="text-slate-300 text-sm leading-relaxed">
                            Comprehensive consulting and technological development project focused on shrinkage reduction and dispatch time optimization in distribution centers.
                            Operational restructuring was implemented based on BPMN modeling and analytical stock control tools.
                        </p>
                    </div>

                    <div>
                        <h4 class="text-primary-400 font-bold text-xl mb-4 border-l-4 border-primary-500 pl-3">📦 Intervention Areas</h4>
                        <ul class="space-y-3 text-sm">
                            <li class="bg-slate-900/30 p-3 rounded-lg">
                                <strong class="text-white block mb-1">1. Process Modeling (BPMN)</strong>
                                Mapping and redesign of operational flows (AS-IS / TO-BE), identifying bottlenecks in receiving and dispatching.
                            </li>
                            <li class="bg-slate-900/30 p-3 rounded-lg">
                                <strong class="text-white block mb-1">2. Shrinkage Control</strong>
                                Audit strategies and early warning systems for physical vs. logical inventory deviations.
                            </li>
                            <li class="bg-slate-900/30 p-3 rounded-lg border border-primary-500/20">
                                <strong class="text-primary-300 block mb-1 flex items-center gap-2">
                                    <ion-icon name="analytics-outline"></ion-icon> 3. Operational Dashboard
                                </strong>
                                Implementation of Power BI panels for KPI tracking: Stock Rotation, Stockout Rate, and Inventory Accuracy.
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 class="text-green-400 font-bold text-xl mb-4 flex items-center gap-2">
                            <ion-icon name="trending-up-outline"></ion-icon> Impact
                        </h4>
                        <div class="bg-green-900/10 border border-green-500/20 p-4 rounded-xl">
                            <p class="italic text-green-100/80 text-sm">
                                "Process reengineering allowed a significant reduction in order preparation times and a substantial improvement in product traceability."
                            </p>
                        </div>
                    </div>
                </div>

                <div class="space-y-8 order-1 lg:order-2 lg:col-span-7">
                    <div class="sticky top-0 z-10">
                        <div class="rounded-xl overflow-hidden shadow-2xl border border-slate-700 bg-slate-900 relative group w-full h-auto">
                            <img src="static/img/WhatsApp Image 2026-02-07 at 2.23.31 AM.jpeg" 
                                 alt="Logistics Dashboard" 
                                 class="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity">
                        </div>
                        
                         <div class="mt-6">
                            <h4 class="text-secondary-400 font-bold text-xl mb-4 flex items-center gap-2">
                                <ion-icon name="code-slash-outline"></ion-icon> Tech Stack
                            </h4>
                            <div class="grid grid-cols-2 lg:grid-cols-3 gap-3 text-sm bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
                                <div class="p-2 rounded bg-slate-800/50">
                                    <span class="text-xs text-slate-400 block mb-1">Modeling</span>
                                    <span class="text-white font-medium text-xs">Bizagi / Visio</span>
                                </div>
                                <div class="p-2 rounded bg-slate-800/50">
                                    <span class="text-xs text-slate-400 block mb-1">Visualization</span>
                                    <span class="text-white font-medium text-xs">Power BI</span>
                                </div>
                                <div class="p-2 rounded bg-slate-800/50">
                                    <span class="text-xs text-slate-400 block mb-1">Data Processing</span>
                                    <span class="text-white font-medium text-xs">Excel / SQL</span>
                                </div>
                                <div class="p-2 rounded bg-slate-800/50">
                                    <span class="text-xs text-slate-400 block mb-1">Methodology</span>
                                    <span class="text-white font-medium text-xs">Lean Logistics</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
        }
    }
};

function openModal(projectId, event) {
    const modal = document.getElementById('project-modal');
    const backdrop = document.getElementById('modal-backdrop');
    const panel = document.getElementById('modal-panel');
    const title = document.getElementById('modal-title');
    const body = document.getElementById('modal-body');

    if (!modal || !projectData[projectId]) return;

    // Use globally available currentLang or default to 'es'
    const lang = window.currentLang || 'es';

    // Set Content based on Language
    title.innerHTML = projectData[projectId][lang].title;
    body.innerHTML = projectData[projectId][lang].content;

    // Show Modal (visibility)
    modal.classList.remove('hidden');
    backdrop.classList.remove('opacity-0');

    // Get Trigger Element Rect for Animation
    let startX = 0, startY = 0, startScale = 0.5;

    if (event && event.currentTarget) {
        // Find the parent card element to animate from
        const triggerCard = event.currentTarget.closest('.horizontal-card') || event.currentTarget;
        const rect = triggerCard.getBoundingClientRect();

        // Calculate center of the card
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;

        // Calculate center of the screen (where modal will be)
        const screenCenterX = window.innerWidth / 2;
        const screenCenterY = window.innerHeight / 2;

        startX = cardCenterX - screenCenterX;
        startY = cardCenterY - screenCenterY;

        startScale = 0.2;
    }

    // Reset standard classes
    panel.classList.remove('opacity-0', 'scale-95');
    panel.classList.add('scale-100');

    // GSAP Animation "Expand" from button/card
    gsap.fromTo(panel,
        {
            x: startX,
            y: startY,
            scale: startScale,
            opacity: 0,
            transformOrigin: "center center"
        },
        {
            x: 0,
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: "expo.out",
            clearProps: "all"
        }
    );

    // Fade in Backdrop
    gsap.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.4 });

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('project-modal');
    const backdrop = document.getElementById('modal-backdrop');
    const panel = document.getElementById('modal-panel');

    // Animate Out
    backdrop.classList.add('opacity-0');
    panel.classList.add('opacity-0', 'scale-95');
    panel.classList.remove('scale-100');

    // Wait for transition to finish before hiding
    setTimeout(() => {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }, 300);
}

// Close on backdrop click
const projectModal = document.getElementById('project-modal');
if (projectModal) {
    projectModal.addEventListener('click', (e) => {
        if (e.target.id === 'modal-backdrop' || e.target.id === 'project-modal') {
            closeModal();
        }
    });
}
window.openModal = openModal;
window.closeModal = closeModal;
