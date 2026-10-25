<div align="center">

<img src="assets/logo.png" alt="Kids Education School logo" width="90" />

# 🎒 Kids Education School

### A colourful, fully interactive school website

Responsive landing page for a kids' school with working navigation, program carousel, story pop-ups, admission form, FAQ and more, built with HTML, CSS and vanilla JavaScript.

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](#-tech-stack)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](#-tech-stack)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](#-tech-stack)
[![Responsive](https://img.shields.io/badge/Design-Responsive-2ea44f)](#-features)

[Features](#-features) · [Demo](#-live-demo) · [Screenshots](#-screenshots) · [Getting Started](#-getting-started) · [Customization](#-customization) · [Structure](#-project-structure)

</div>

---

## 📑 Table of Contents

- [About](#-about)
- [Live Demo](#-live-demo)
- [Screenshots](#-screenshots)
- [Features](#-features)
- [Page Sections](#-page-sections)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Customization](#-customization)
- [Data Storage](#-data-storage)
- [Keyboard & Accessibility](#-keyboard--accessibility)
- [Browser Support](#-browser-support)
- [Deploy to GitHub Pages](#-deploy-to-github-pages)
- [Known Limitations](#-known-limitations)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

---

## 📖 About

**Kids Education School** is a front-end project (Assignment 2) built from a school landing-page design. It started as a static page and now includes a complete interactive experience using plain JavaScript: no framework, no build step, no backend.

> Empowering students from small age towards vision.

## 🌐 Live Demo

🔗 **[your-username.github.io/assignment-2](https://your-username.github.io/assignment-2/)**

## 🖼️ Screenshots

| Desktop | Mobile |
| --- | --- |
| ![Desktop preview](screenshots/desktop.png) | ![Mobile preview](screenshots/mobile.png) |

> 📝 Take screenshots of the site (desktop and phone width), save them as `screenshots/desktop.png` and `screenshots/mobile.png`, and they will appear here.

## 🚀 Features

### Navigation
- 📱 **Mobile menu** (hamburger) that opens and closes, also with `Esc`
- 📌 **Sticky header** with shadow on scroll
- 🧭 **Scroll-spy**: the current section is highlighted in the navbar
- 🖱️ **Smooth scrolling** to every section
- 📞 **Contact pop-up** with a validated message form

### Content
- 🎠 **Programs carousel**: Kinder, Elementary, Middle plus Art, Music and Sports clubs (arrows, page indicator, keyboard support)
- 📄 **"Read More" pop-ups** with class size, timing, focus and fees, and an **Enroll** button that pre-selects the program
- 📰 **Story pop-ups** (click any story) and a **View All** list of 8 stories
- 🔢 **Animated counters** (students, teachers, years, awards)
- 💬 **Parent testimonials slider** with auto-play, dots and pause on hover
- ❓ **FAQ accordion** (one item open at a time)

### Forms
- 📝 **Admission form** with field-by-field validation and a reference number on success
- ✉️ **Contact form** and **newsletter signup** with email validation and duplicate check
- 💾 Submissions are saved in the browser with `localStorage` (demo, no server)

### Experience
- 🔔 Toast notifications, scroll-reveal animations, back-to-top button
- ♿ Accessible: ARIA labels, focus styles, keyboard support, reduced-motion support
- 🔤 Quicksand font for a friendly look

## 🧩 Page Sections

| Section | Description |
| --- | --- |
| **Header** | Logo, navigation, Contact button, mobile menu |
| **Hero** | "Empowering students from small age towards vision" with an Enroll Now button |
| **About** | Mission text and animated statistics |
| **Standard Curriculum** | Program cards with carousel and detail pop-ups |
| **Facilities** | Smart classrooms, library, science lab, playground, transport, meals |
| **Our Stories** | Featured story and recent stories with pop-ups |
| **Testimonials** | Parent reviews slider |
| **Admission** | Application steps and online form |
| **FAQ** | Common questions in an accordion |
| **Footer** | Quick links, social media, newsletter, marquee banner |

## 🛠️ Tech Stack

- **HTML5**
- **CSS3** (Flexbox, Grid, media queries)
- **Vanilla JavaScript (ES6+)**
- **[Font Awesome](https://fontawesome.com/)** (icons)
- **[Google Fonts](https://fonts.google.com/specimen/Quicksand)** (Quicksand)

## 📦 Getting Started

No installation or build step is required.

```bash
# 1. Clone the repository
git clone https://github.com/your-username/assignment-2.git

# 2. Open the folder
cd assignment-2

# 3. Open index.html in your browser
```

Or serve it locally:

```bash
npx serve .
# or use the "Live Server" extension in VS Code
```

## 📁 Project Structure

```
assignment-2/
├── assets/            # Logo, hero image, program and story images, social icons
├── styles/
│   ├── style.css      # Original page styles
│   └── extra.css      # Styles for the interactive parts (modals, forms, slider...)
├── screenshots/       # Add your preview images here
├── index.html         # Page markup
├── script.js          # All interactivity
└── README.md
```

### `script.js` at a glance

| Area | What it does |
| --- | --- |
| Navigation | Mobile menu, sticky header, scroll-spy, smooth scroll |
| Programs | Carousel, detail pop-ups, enroll shortcut |
| Stories | Story pop-ups and "View All" list |
| Forms | Admission, contact and newsletter validation, `localStorage` saving |
| FAQ / Slider | Accordion and testimonials slider |
| UI | Toasts, scroll reveal, counters, back-to-top |

## 🎨 Customization

| What to change | Where |
| --- | --- |
| Programs, fees, timings | `PROGRAMS` array at the top of `script.js` |
| Stories (title, date, text) | `STORIES` array in `script.js` |
| Parent reviews | `TESTIMONIALS` array in `script.js` |
| FAQ questions and answers | `FAQS` array in `script.js` |
| Statistics numbers | `data-count` attributes in the About section of `index.html` |
| School phone and address | Contact pop-up at the bottom of `index.html` |
| Colours | CSS variables in `:root` of `styles/extra.css` (`--orange`, `--sky`, `--gold`, `--purple`) |

## 💾 Data Storage

Form submissions are stored in the visitor's own browser only (`localStorage`). Nothing is sent to a server.

| Key | Content |
| --- | --- |
| `ks_applications` | Admission applications |
| `ks_messages` | Contact form messages |
| `ks_newsletter` | Newsletter emails |

To view the data, open DevTools → **Application** → **Local Storage**.

## ⌨️ Keyboard & Accessibility

| Key | Action |
| --- | --- |
| `Tab` / `Shift+Tab` | Move between links, buttons and fields |
| `Enter` / `Space` | Open program or story, use carousel arrows, toggle the mobile menu |
| `Esc` | Close pop-ups and the mobile menu |

Other accessibility features: ARIA labels and states, visible focus outlines, error messages tied to form fields, and `prefers-reduced-motion` support.

## 🌍 Browser Support

Works on the latest versions of Chrome, Edge, Firefox and Safari (desktop and mobile). Pop-ups use the native `<dialog>` element.

## 🚢 Deploy to GitHub Pages

1. Push the project to a GitHub repository (files at the repo root).
2. Go to **Settings → Pages**.
3. Choose **Branch: `main`** and **Folder: `/ (root)`**, then **Save**.
4. Your site will be live in a minute or two.

## ⚠️ Known Limitations

- Form data is not sent anywhere (front-end only, no backend).
- Icons, fonts and the Font Awesome library load from CDNs, so an internet connection is needed for them.
- The footer scrolling text uses the old `<marquee>` tag from the original design.
- Facility and club sections use icons instead of photos.

## 🔮 Roadmap

- [x] Responsive layout and mobile menu
- [x] Interactive programs, stories, FAQ and testimonials
- [x] Admission and contact forms with validation
- [ ] Real backend for form submissions
- [ ] Photo gallery
- [ ] Multi-language support (English / Bangla)

## 🤝 Contributing

1. Fork the repo
2. Create a branch: `git checkout -b feature/my-feature`
3. Commit: `git commit -m "Add my feature"`
4. Push: `git push origin feature/my-feature`
5. Open a Pull Request

## 📄 License

This project is for learning purposes. You can add a license of your choice (for example [MIT](https://choosealicense.com/licenses/mit/)) by creating a `LICENSE` file.

## 🙏 Acknowledgements

- Icons by [Font Awesome](https://fontawesome.com/)
- Font: [Quicksand](https://fonts.google.com/specimen/Quicksand) from Google Fonts
- Design and images from the course assignment

## 👤 Author

**Your Name**

- GitHub: [@your-username](https://github.com/your-username)
- Email: your.email@example.com

---

<div align="center">

⭐ If you like this project, give it a star! ⭐

</div>
