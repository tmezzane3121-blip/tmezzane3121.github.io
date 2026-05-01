
 $(document).ready(function () {

    // ---------- 1. Menu mobile ----------
    $('#menu-toggle').on('click', function () {
        $('#mobile-menu').addClass('open');
    });
    $('#menu-close').on('click', function () {
        $('#mobile-menu').removeClass('open');
    });
    $('.mobile-link').on('click', function () {
        $('#mobile-menu').removeClass('open');
    });

    // ---------- 2. Navigation : fond glass au scroll ----------
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 80) {
            $('#navbar').addClass('glass').removeClass('py-5').addClass('py-3');
        } else {
            $('#navbar').removeClass('glass').addClass('py-5').removeClass('py-3');
        }
    });

    // ---------- 3. Scroll spy (lien actif dans la nav) ----------
    var sections = ['#about', '#skills', '#education', '#projects', '#contact'];
    $(window).on('scroll', function () {
        var scrollPos = $(this).scrollTop() + 200;
        $.each(sections, function (i, sec) {
            var $sec = $(sec);
            if ($sec.length && $sec.offset().top <= scrollPos && $sec.offset().top + $sec.outerHeight() > scrollPos) {
                $('.nav-link').removeClass('active');
                $('.nav-link[href="' + sec + '"]').addClass('active');
            }
        });
    });

    // ---------- 4. Scroll reveal (apparition des éléments) ----------
    function checkReveal() {
        $('.reveal:not(.visible)').each(function () {
            var elemTop = $(this).offset().top;
            var scrollBottom = $(window).scrollTop() + $(window).height();
            if (elemTop < scrollBottom - 60) {
                $(this).addClass('visible');
            }
        });
    }
    $(window).on('scroll', checkReveal);
    checkReveal();

    // Re-vérifie après le rendu React (Babel est asynchrone)
    $(document).on('react-ready', checkReveal);

    // ---------- 5. Animation barres de compétences (au scroll) ----------
    var skillsAnimated = false;
    function animateSkillBars() {
        if (skillsAnimated) return;
        var $section = $('#skills');
        if ($section.length) {
            var sectionTop = $section.offset().top;
            var scrollBottom = $(window).scrollTop() + $(window).height();
            if (sectionTop < scrollBottom - 100) {
                skillsAnimated = true;
                $('.skill-item').each(function () {
                    var level = $(this).data('level');
                    var $bar = $(this).find('.skill-progress');
                    var $percent = $(this).find('.skill-percent');

                    // Animation du compteur numérique
                    $({ val: 0 }).animate({ val: level }, {
                        duration: 1500,
                        easing: 'swing',
                        step: function () {
                            $percent.text(Math.round(this.val) + '%');
                        },
                        complete: function () {
                            $percent.text(level + '%');
                        }
                    });

                    // Animation de la barre
                    setTimeout(function () {
                        $bar.css('width', level + '%');
                    }, 100);
                });
            }
        }
    }
    $(window).on('scroll', animateSkillBars);
    animateSkillBars();

    // ---------- 6. Animation étoiles (au scroll) ----------
    var starsAnimated = false;
    function animateStars() {
        if (starsAnimated) return;
        var $section = $('#personal-skills');
        if ($section.length) {
            var sectionTop = $section.offset().top;
            var scrollBottom = $(window).scrollTop() + $(window).height();
            if (sectionTop < scrollBottom - 100) {
                starsAnimated = true;
                $('.skill-stars').each(function () {
                    var level = $(this).data('level');
                    var $stars = $(this).find('.star');
                    $stars.each(function (index) {
                        var $star = $(this);
                        setTimeout(function () {
                            if (index < level) {
                                $star.addClass('filled');
                                $star.css('transform', 'scale(1.3)');
                                setTimeout(function () {
                                    $star.css('transform', 'scale(1)');
                                }, 200);
                            }
                        }, index * 120);
                    });
                });
            }
        }
    }
    $(window).on('scroll', animateStars);
    animateStars();

    // ---------- 7. Accordéon formation (jQuery) ----------
    // Le premier item est ouvert par défaut
    $('.accordion-header').first().find('.accordion-arrow').addClass('rotated');

    $('.accordion-header').on('click', function () {
        var $content = $(this).next('.accordion-content');
        var $arrow = $(this).find('.accordion-arrow');
        var isOpen = $content.hasClass('open');

        // Fermer tous les autres
        $('.accordion-content').removeClass('open');
        $('.accordion-arrow').removeClass('rotated');

        // Basculer celui cliqué
        if (!isOpen) {
            $content.addClass('open');
            $arrow.addClass('rotated');
        }
    });

    // ---------- 8. Effet de survol jQuery sur les tags tech ----------
    $('.tech-tag').on('mouseenter', function () {
        $(this).stop().animate({ marginTop: '-2px' }, 150);
    }).on('mouseleave', function () {
        $(this).stop().animate({ marginTop: '0px' }, 150);
    });

    // ---------- 9. Bouton scroll top ----------
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 600) {
            $('#scroll-top').addClass('show');
        } else {
            $('#scroll-top').removeClass('show');
        }
    });
    $('#scroll-top').on('click', function () {
        $('html, body').animate({ scrollTop: 0 }, 800);
    });

    // ---------- 10. Validation formulaire (délégation pour React) ----------
    $(document).on('submit', '#contact-form', function (e) {
        e.preventDefault();
        var isValid = true;

        var $name = $(this).find('#form-name');
        var $email = $(this).find('#form-email');
        var $message = $(this).find('#form-message');

        // Reset des erreurs
        $(this).find('.error-msg').removeClass('show');
        $(this).find('.form-input').removeClass('error');

        // Validation du nom
        if (!$name.val().trim()) {
            $name.addClass('error');
            $name.next('.error-msg').addClass('show');
            isValid = false;
        }

        // Validation de l'email
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!$email.val().trim()) {
            $email.addClass('error');
            $email.next('.error-msg').text('Veuillez renseigner votre email.').addClass('show');
            isValid = false;
        } else if (!emailRegex.test($email.val().trim())) {
            $email.addClass('error');
            $email.next('.error-msg').text("Format d'email invalide.").addClass('show');
            isValid = false;
        }

        // Validation du message
        if (!$message.val().trim()) {
            $message.addClass('error');
            $message.next('.error-msg').addClass('show');
            isValid = false;
        }

        // Si tout est valide
        if (isValid) {
            var $btn = $(this).find('button[type="submit"]');
            var originalText = $btn.text();
            $btn.text('Envoi en cours...').prop('disabled', true);

            // Simuler un envoi
            setTimeout(function () {
                $btn.text('Message envoyé ! ✓').addClass('bg-green-600').removeClass('bg-indigo-500');
                $('#form-success').fadeIn(300);

                setTimeout(function () {
                    $btn.text(originalText).prop('disabled', false).removeClass('bg-green-600').addClass('bg-indigo-500');
                    $('#form-success').fadeOut(300);
                    $('#contact-form')[0].reset();
                }, 3000);
            }, 1200);
        }
    });

    // Retirer l'erreur dès que l'utilisateur tape
    $(document).on('input', '.form-input', function () {
        $(this).removeClass('error');
        $(this).next('.error-msg').removeClass('show');
    });
});


// --- Composant 1 : SectionTitle (réutilisé 5 fois) ---
function SectionTitle({ title, subtitle }) {
    return (
        <div className="text-center mb-16 reveal">
            <h2 className="font-serif text-4xl md:text-5xl font-normal text-gradient mb-4 tracking-tight">
                {title}
            </h2>
            <div className="w-20 h-1 bg-indigo-500 mx-auto mb-4 rounded-full"></div>
            <p className="text-neutral-500 text-lg max-w-2xl mx-auto">{subtitle}</p>
        </div>
    );
}

// --- Composant 2 : ProjectCard (réutilisé 3 fois) ---
function ProjectCard({ title, description, image, technologies, githubLink, demoLink }) {
    const techTags = technologies.map((tech, i) => (
        <span key={i} className="tech-tag text-xs px-3 py-1.5 rounded-full bg-white/5 text-neutral-400 border border-white/10 cursor-default">
            {tech}
        </span>
    ));

    return (
        <div className="project-card glass rounded-2xl overflow-hidden reveal">
            <div className="relative h-48 overflow-hidden">
                <img
                    src={image}
                    alt={"Capture d'écran de " + title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            </div>
            <div className="p-6 md:p-8">
                <h3 className="font-serif text-xl md:text-2xl text-white mb-3">{title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed mb-5">{description}</p>
                <div className="flex flex-wrap gap-2 mb-6">{techTags}</div>
                <div className="flex gap-4">
                    {githubLink && (
                        <a
                            href={githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-indigo-400 transition-colors"
                        >
                            <i className="fab fa-github"></i> Code source
                        </a>
                    )}
                    {demoLink && (
                        <a
                            href={demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-indigo-400 transition-colors"
                        >
                            <i className="fas fa-external-link-alt"></i> Démo
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

// --- Composant 3 : ContactForm ---
function ContactForm() {
    return (
        <div className="glass rounded-2xl p-8 md:p-10 reveal">
            <form id="contact-form" noValidate>
                {/* Nom */}
                <div className="mb-6">
                    <label htmlFor="form-name" className="block text-sm font-medium text-neutral-300 mb-2">
                        Nom complet
                    </label>
                    <input
                        type="text"
                        id="form-name"
                        name="name"
                        placeholder="Votre nom"
                        className="form-input w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-neutral-600 text-sm"
                    />
                    <p className="error-msg">Veuillez renseigner votre nom.</p>
                </div>

                {/* Email */}
                <div className="mb-6">
                    <label htmlFor="form-email" className="block text-sm font-medium text-neutral-300 mb-2">
                        Adresse email
                    </label>
                    <input
                        type="email"
                        id="form-email"
                        name="email"
                        placeholder="vous@exemple.com"
                        className="form-input w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-neutral-600 text-sm"
                    />
                    <p className="error-msg">Veuillez renseigner un email valide.</p>
                </div>

                {/* Message */}
                <div className="mb-8">
                    <label htmlFor="form-message" className="block text-sm font-medium text-neutral-300 mb-2">
                        Message
                    </label>
                    <textarea
                        id="form-message"
                        name="message"
                        rows="5"
                        placeholder="Votre message..."
                        className="form-input w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-neutral-600 text-sm resize-none"
                    ></textarea>
                    <p className="error-msg">Veuillez écrire un message.</p>
                </div>

                {/* Bouton d'envoi */}
                <button
                    type="submit"
                    className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20 active:scale-[0.98]"
                >
                    Envoyer le message
                </button>

                {/* Message de succès */}
                <div id="form-success" className="hidden mt-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm text-center">
                    <i className="fas fa-check-circle mr-2"></i>
                    Votre message a été envoyé avec succès !
                </div>
            </form>
        </div>
    );
}


/* ---------------------------------------------
   RENDU REACT — Montage des composants
   --------------------------------------------- */

// --- Données des 3 projets ---
const projectsData = [
    {
        title: "Jeu SFML — Application C++",
        description: "Application de gestion d'un jeu développée en C++ avec la bibliothèque SFML. Gestion complète des états du jeu, des collisions, du scoring et de l'interface graphique avec sprites et animations.",
        image: "https://picsum.photos/seed/sfml-game-cpp/800/500",
        technologies: ["C++", "SFML", "Orienté Objet", "Collision", "Sprites"],
        githubLink: "https://github.com/tmezzane3121-blip/cppgame",
        demoLink: null
    },
    {
        title: "CinéWeb — Site Dynamique de Cinéma",
        description: "Site web dynamique dédié au cinéma avec affichage de films, fiches détaillées, recherche et filtres par genre. Interface responsive et interactions JavaScript pour une navigation fluide.",
        image: "https://picsum.photos/seed/cinema-website/800/500",
        technologies: ["HTML5", "CSS3", "JavaScript", "Responsive", "API DOM"],
        githubLink: null,
        demoLink: "https://sennachadi7077-web.github.io/min-projet/"
    },
    {
        title: "MySQL — Gestion de Base de Données",
        description: "Conception et implémentation d'une base de données relationnelle MySQL : création de tables, contraintes, requêtes SQL avancées (jointures, sous-requêtes, agrégations) et procédures stockées.",
        image: "https://fastly.picsum.photos/id/133/200/300.jpg?hmac=eJnFxvIwHgkkHHPb2ppK_QqUG4mmom1XpVG0MLQcdTE",
        technologies: ["MySQL", "SQL", "DDL / DML", "Jointures", "Procédures"],
        githubLink: null,
        demoLink: null
    }
];

// --- Titres de sections ---
const titleData = [
    { id: "react-about-title",     title: "À Propos",    subtitle: "Quelques mots sur mon parcours et mes aspirations" },
    { id: "react-skills-title",    title: "Compétences", subtitle: "Mes compétences techniques et personnelles" },
    { id: "react-education-title", title: "Formation",   subtitle: "Mon parcours académique" },
    { id: "react-projects-title",  title: "Projets",     subtitle: "Mes réalisations universitaires" },
    { id: "react-contact-title",   title: "Contact",     subtitle: "N'hésitez pas à me contacter" }
];

// Monter chaque SectionTitle
titleData.forEach(function (item) {
    var container = document.getElementById(item.id);
    if (container) {
        ReactDOM.createRoot(container).render(
            <SectionTitle title={item.title} subtitle={item.subtitle} />
        );
    }
});

// Monter les ProjectCard
var projectsContainer = document.getElementById("react-projects");
if (projectsContainer) {
    var projectElements = projectsData.map(function (project, i) {
        return <ProjectCard key={i} {...project} />;
    });
    ReactDOM.createRoot(projectsContainer).render(
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectElements}
        </div>
    );
}

// Monter le ContactForm
var contactContainer = document.getElementById("react-contact-form");
if (contactContainer) {
    ReactDOM.createRoot(contactContainer).render(<ContactForm />);
}

// Signaler à jQuery que React a terminé le rendu
setTimeout(function () {
    document.dispatchEvent(new Event("react-ready"));
}, 500);