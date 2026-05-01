# tmezzane3121.github.io
📋 Table des matières
À propos du projet
Technologies utilisées
Structure du projet
Installation et exécution locale
Détail de l'implémentation
Déploiement sur GitHub Pages
Sections du CV
Ressources
Auteur

🎯 À propos du projet
Ce projet a été réalisé dans le cadre de ma formation en 2ème année d'informatique à la Faculté des Sciences Semlalia, Marrakech. L'objectif est de concevoir un CV en ligne moderne et interactif en mobilisant trois technologies complémentaires du développement web :

HTML5 / CSS3 pour la structure et la mise en forme
jQuery pour l'interactivité et la manipulation du DOM
ReactJS pour les composants dynamiques et réutilisables
Le site est entièrement responsive et optimisé pour une navigation fluide sur mobile, tablette et desktop.

🛠 Technologies utilisées
Technologie	Rôle dans le projet	Éléments concrets
HTML5	Structure sémantique	Balises <header>, <section>, <nav>, <footer>, <form>, <label>
CSS3	Mise en forme et animations	Flexbox, Grid, glass morphisme, keyframes, transitions, scrollbar personnalisée
Tailwind CSS	Utilitaire CSS	Classes utilitaires pour le responsive et l'espacement (ne remplace pas le CSS natif)
jQuery	Interactivité DOM	Scroll reveal, barres animées, étoiles, accordéon, validation formulaire, scroll spy
ReactJS 18	Composants UI dynamiques	3 composants fonctionnels avec props : SectionTitle, ProjectCard, ContactForm
Babel	Compilation JSX	Transpilation du JSX en JavaScript standard dans le navigateur
Font Awesome	Icônes	Icônes de contact, compétences, navigation
Google Fonts	Typographie	Inter (sans-serif) + Playfair Display (serif)
📁 Structure du projet
tossad-mezzane.github.io/
│
├── index.html ← Page principale (structure HTML sémantique)
├── style.css ← Styles CSS natifs (glass, animations, responsive)
├── script.js ← Logique jQuery + Composants ReactJS (JSX via Babel)
├── README.md ← Documentation du projet (ce fichier)
│
└── (CDN externes)
├── Tailwind CSS
├── jQuery 3.7.1
├── React 18 + ReactDOM
├── Babel Standalone
├── Font Awesome 6.5
└── Google Fonts

text


> Aucun bundler (Webpack, Vite…) n'est utilisé. Le projet fonctionne directement dans le navigateur grâce aux chargements CDN, ce qui facilite le déploiement sur GitHub Pages.

---

## 💻 Installation et exécution locale

### Prérequis
- Un navigateur web moderne (Chrome, Firefox, Edge)
- Un serveur local (recommandé pour éviter les erreurs CORS avec Babel)

### Option 1 : Avec VS Code (Live Server)
1. Cloner le dépôt :
   ```bash
   git clone https://github.com/tossad-mezzane/tossad-mezzane.github.io.git
Ouvrir le dossier dans VS Code
Installer l'extension Live Server
Faire clic droit sur index.html → Open with Live Server
Option 2 : Avec Python
bash

git clone https://github.com/tossad-mezzane/tossad-mezzane.github.io.git
cd tossad-mezzane.github.io
python3 -m http.server 8000
Puis ouvrir http://localhost:8000 dans le navigateur.

Option 3 : Avec Node.js (npx)
bash

npx serve .
📖 Détail de l'implémentation
CSS Natif (style.css)
Fonctionnalité
Technique CSS
Effet verre dépoli	backdrop-filter: blur(20px) + fond semi-transparent
Texte dégradé	background-clip: text avec dégradé blanc → gris
Apparition au scroll	Classe .reveal avec opacity + translateY + transition
Flottement décoratif	@keyframes float (6s ease-in-out infinite)
Pulsation lumineuse	@keyframes pulseGlow sur la photo de profil
Effet shimmer	Pseudo-élément ::after avec dégradé animé
Barres de progression	width: 0% → transition vers la valeur cible
Étoiles de notation	Transition color + transform: scale()
Accordéon	max-height: 0 → max-height: 250px avec transition
Scrollbar	::-webkit-scrollbar personnalisée en indigo
Responsive	Grilles CSS Grid + Flexbox + tailles adaptatives

jQuery (script.js — Partie 1)
#
Interaction
Description
1	Menu mobile	Ouverture/fermeture du panneau latéral avec ajout/retrait de classe .open
2	Nav glass au scroll	Ajoute la classe .glass à la navbar après 80px de scroll
3	Scroll spy	Détecte la section visible et ajoute .active au lien correspondant
4	Scroll reveal	Ajoute .visible aux éléments .reveal lorsqu'ils entrent dans le viewport
5	Barres de compétences	Anime la largeur des barres + compteur numérique ($.animate) au scroll
6	Étoiles de compétences	Remplissage progressif des étoiles avec effet scale, séquentiel par index
7	Accordéon formation	Basculage ouvert/fermé avec rotation de la flèche (un seul ouvert à la fois)
8	Tags survol	Animation marginTop jQuery sur les tags technologie au hover
9	Scroll top	Affiche/masque le bouton + scroll fluide vers le haut
10	Validation formulaire	Champs vides, regex email, messages d'erreur, simulation d'envoi

ReactJS (script.js — Partie 2)
Composant
Props
Rendu
Réutilisé
SectionTitle	title, subtitle	Titre H2 + trait décoratif + sous-titre	5 fois
ProjectCard	title, description, image, technologies, githubLink, demoLink	Carte projet avec image, tags, liens	3 fois
ContactForm	(aucune)	Formulaire complet avec labels, inputs, bouton, message de succès	1 fois

Les composants React sont montés via ReactDOM.createRoot() dans des <div> conteneurs placés dans le HTML. La validation jQuery utilise la délégation d'événement ($(document).on()) pour interagir avec le formulaire généré par React.

🚀 Déploiement sur GitHub Pages
Étapes suivies
Création du dépôt : Dépôt public nommé tmezzane3121.github.io
Initialisation Git :
bash

git init
git add .
git commit -m "init: cv project"
git remote add origin https://github.com/tmezzane3121-blip/tmezzane3121.github.io.git
git push -u origin main
Activation de GitHub Pages :
Settings → Pages → Source : main branch, dossier /root
Accès : Le site est disponible à https://tmezzane3121.github.io
Historique des commits significatifs
text

init: cv project                     ← Structure HTML de base
feat: add css styles and animations  ← style.css complet
feat: add jquery interactions        ← Menu, scroll, barres, accordéon, validation
feat: add react components           ← SectionTitle, ProjectCard, ContactForm
docs: add README                     ← Documentation du projet
fix: responsive adjustments          ← Ajustements mobile/tablette
📑 Sections du CV
Section
Description
En-tête	Photo de profil, nom, titre, coordonnées (email, LinkedIn, GitHub), localisation
À propos	Biographie de 3 paragraphes : parcours, compétences découvertes, centres d'intérêt et objectifs
Compétences	7 compétences techniques (barres animées jQuery) + 6 compétences personnelles (étoiles animées jQuery)
Formation	Accordéon interactif jQuery : L2 Semlalia, L1 Semlalia, Bac Sciences Mathématiques 2024
Projets	3 cartes React <ProjectCard /> : Jeu SFML C++, CinéWeb HTML/CSS/JS, Base MySQL
Contact	Formulaire React <ContactForm /> avec validation jQuery (nom, email, message)

📚 Ressources
MDN Web Docs — HTML/CSS
jQuery Documentation
React Documentation officielle
GitHub Pages — Guide de démarrage
Tailwind CSS
Font Awesome
Google Fonts
SFML — Documentation

👤 Auteur
Tossad Mezzane

🎓 Étudiant en 2ème année Informatique — Faculté des Sciences Semlalia, Marrakech
📧 tossadmezzane23@gmail.com

