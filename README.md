🛒Hackathon Web Shopping Site

This is a responsive e-commerce website built for a hackathon, using HTML, CSS, and JavaScript, enhanced with dark mode, a persistent cart, and real product images.



🐞 Bugs Fixed
✅ Cart array initialization was incorrect — now defaults to [] if localStorage is empty.
✅ LocalStorage was overwritten twice (setItem bug) — fixed to only store serialized data.
✅ showProductDetail used fragile onclick handlers — improved with safe string handling.
✅ Dark mode toggle was page-local — now uses localStorage so it stays synced between index.html and cart.html.
✅ Broken search filter — made case-insensitive and ensured it works across all categories.
✅ CSS and HTML cleanup for consistent IDs and class naming.

✨ Enhancements Made
🌟 Integrated product images (inside images/) for a richer UI.
🌟 Added category-based grouping (Shoes, Electronics, Clothing, Accessories).
🌟 Built a dark mode toggle 🌙 that persists across all pages.
🌟 Redesigned product cards with hover animations, drop shadows, and clean typography.
🌟 Included “Go to Cart” button styled prominently near the search bar.
🌟 Cart page shows a clear total, plus option to clear cart.
🌟 Fully responsive layout using Flexbox and Grid.

🤖 AI Tools Used & How They Helped
ChatGPT (by OpenAI)
🚀 Assisted in debugging, generating product data, designing responsive CSS, cleaning up JavaScript logic, and writing this README.

GitHub Copilot (VS Code)
✍ Helped autocomplete standard JavaScript methods and reduce boilerplate.

AI design suggestions (perplexity)
🖌 Proposed modern UI interactions and color themes.

💻 Tech Stack

HTML5

CSS3 (Flexbox, Grid, transitions)

Vanilla JavaScript

Images stored locally in images/ directory

📂 Project Structure
markdown
Copy
Edit
Hackathon/
├── index.html
├── cart.html
├── style.css
├── index.js
└── images/
    ├── backpack.jpg
    ├── camera.jpg
    ├── hat.jpg
    └── ...etc
🌙 Dark Mode
Click the 🌙 icon to toggle between light & dark.

Theme preference is saved across both pages.

🚀 Happy Shopping!