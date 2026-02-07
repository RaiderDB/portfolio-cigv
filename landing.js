// Initialize GSAP Animations when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {

    // Register GSAP plugins if needed (not strictly needed for core TweenMax functionality used here)
    // gsap.registerPlugin(ScrollTrigger); 

    // --- INTRO ANIMATION SEQUENCE (Cinematic Reveal) ---

    // 1. Initial State Setups were handled by CSS/HTML structure (opacity: 0 or off-screen)

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
    });

    // 4. Main Title Reveal (Sliding up from hidden overflow)
    // CSS sets translateY(100%), so we animate TO 0%
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
    gsap.from(".hero-subtitle", { // The 'DATA' text
        duration: 1.5,
        delay: 1.5,
        opacity: 0,
        x: -100, // Slightly less aggressive than -10000 for mobile safety
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

    // 8. Overlay Curtain Animation (Yellow/Blue blocks sliding up)
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

// --- PROJECT MODAL LOGIC ---

const projectData = {
    "athenas": {
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
                    
                     <!-- Competencies -->
                     <div>
                        <h4 class="text-slate-400 font-bold text-lg mb-3">Competencias</h4>
                        <div class="flex flex-wrap gap-2">
                            <span class="px-2 py-1 bg-slate-800 rounded-full text-xs text-slate-300 border border-slate-700">Backend modular</span>
                            <span class="px-2 py-1 bg-slate-800 rounded-full text-xs text-slate-300 border border-slate-700">SQL Server</span>
                            <span class="px-2 py-1 bg-slate-800 rounded-full text-xs text-slate-300 border border-slate-700">AI/ML</span>
                            <span class="px-2 py-1 bg-slate-800 rounded-full text-xs text-slate-300 border border-slate-700">IoT</span>
                            <span class="px-2 py-1 bg-slate-800 rounded-full text-xs text-slate-300 border border-slate-700">DevOps</span>
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
                                Demo Preview
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
    "dipreseh": {
        title: "Sistema Integrado de Gestión Operativa (DIPRESEH)",
        content: `
            <div class="grid lg:grid-cols-12 gap-8">
                <!-- LEFT COLUMN: INFO (40% width) -->
                <div class="space-y-8 order-2 lg:order-1 lg:col-span-5">
                    <!-- Executive Summary -->
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

                    <!-- Modules -->
                    <div>
                        <h4 class="text-primary-400 font-bold text-xl mb-4 border-l-4 border-primary-500 pl-3">🗺️ Core Feature: Inteligencia Espacial</h4>
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

                    <!-- Impact -->
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
                    
                     <!-- Competencies -->
                     <div>
                        <h4 class="text-slate-400 font-bold text-lg mb-3">Competencias</h4>
                        <div class="flex flex-wrap gap-2">
                            <span class="px-2 py-1 bg-slate-800 rounded-full text-xs text-slate-300 border border-slate-700">GIS & Mapping</span>
                            <span class="px-2 py-1 bg-slate-800 rounded-full text-xs text-slate-300 border border-slate-700">Data Engineering</span>
                            <span class="px-2 py-1 bg-slate-800 rounded-full text-xs text-slate-300 border border-slate-700">Python Optimization</span>
                            <span class="px-2 py-1 bg-slate-800 rounded-full text-xs text-slate-300 border border-slate-700">API Integration</span>
                        </div>
                     </div>
                </div>

                <!-- RIGHT COLUMN: VISUAL & STACK (60% width) -->
                <div class="space-y-8 order-1 lg:order-2 lg:col-span-7">
                     <!-- Visual Representation -->
                    <div class="sticky top-0 z-10">
                        <div class="rounded-xl overflow-hidden shadow-2xl border border-slate-700 bg-slate-900 relative group w-full h-64 lg:h-80">
                            <!-- Using the card image since no specific video was provided -->
                            <video autoplay muted loop playsinline class="w-full h-full object-cover" preload="metadata">
                                <source src="static/video/dipreseh_demo.mp4" type="video/mp4">
                                Tu navegador no soporta la reproducción de video.
                            </video>
                             <div class="absolute bottom-2 right-2 bg-black/60 px-2 py-1 rounded text-xs text-white/70 pointer-events-none">
                                Demo Preview
                            </div>
                        </div>
                        
                        <!-- Mini Stack Summary below visual -->
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
    "logistics": {
        title: "Optimización de Inventarios",
        content: "<p class='text-center py-10 italic'>Información detallada próximamente.</p>"
    }
};

function openModal(projectId, event) {
    const modal = document.getElementById('project-modal');
    const backdrop = document.getElementById('modal-backdrop');
    const panel = document.getElementById('modal-panel');
    const title = document.getElementById('modal-title');
    const body = document.getElementById('modal-body');

    if (!modal || !projectData[projectId]) return;

    // Set Content
    title.innerText = projectData[projectId].title;
    body.innerHTML = projectData[projectId].content;

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

        // Optional: calculate scale based on width ratio, though fixed 0.1-0.2 is usually smoother
        // startScale = rect.width / panel.offsetWidth; 
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
            clearProps: "all" // Clear inline styles after animation to rely on CSS
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
