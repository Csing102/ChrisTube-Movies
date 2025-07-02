# ChrisTube

[![Live Demo](https://img.shields.io/badge/Live%20Demo-View-brightgreen)](https://csing102.github.io/ChrisTube-Movies/)

ChrisTube is a sleek, dark-mode friendly movie and TV show browser built with HTML, CSS, and vanilla JavaScript. It integrates The Movie Database (TMDB) API and offers:

* **Trending Content**: Browse this week’s top movies and TV shows.
* **Lazy-loading & Skeleton Screens**: Fast initial load with graceful placeholders.
* **Error States & Retry**: Friendly error UI on network or image failures.
* **Offline Mode**: Service Worker caching for uninterrupted browsing.
* **Ad-blocking**: Blocks pop-ups and ad containers for a clean UI.
* **Favorites**: Save and revisit your favorite titles in localStorage.
* **Search Suggestions**: Dynamic type-ahead search with TMDB results.
* **TV Controls**: Season and episode selection directly in the player.
* **Dark/Light Mode**: Toggleable themes with system preference support.

---

## 📥 Installation

1. **Clone the repo**:

   ```bash
   git clone https://github.com/csing102/ChrisTube-Movies.git
   ```
2. **Serve locally**:

   ```bash
   cd ChrisTube-Movies
   # with a static server:
   npx serve
   # or Python:
   python3 -m http.server 8000
   ```
3. **Open** your browser at `http://localhost:8000` (or your chosen port).

---

## 🚀 Usage

* **Browse** by scrolling through trending cards.
* **Click** a poster to open the video modal.
* **Select** seasons and episodes for TV shows.
* **Click** the ❤️ icon to add/remove favorites.
* **Toggle** light/dark mode in Settings (⚙️).
* **Works offline** after the first visit thanks to Service Worker.

---

## 🔗 Live Demo

Explore the app live: [https://csing102.github.io/ChrisTube-Movies/](https://csing102.github.io/ChrisTube-Movies/)

---

## 🎬 Embed a Batman Movie

Watch **Batman Begins** right here using an HTML `<video>` tag:

```html
<video width="100%" height="500" controls>
  <source src="https://vidsrc.to/embed/movie/272" type="video/mp4">
  Your browser does not support the video tag.
</video>
```

*Note: Ensure the source URL points to a direct video stream or MP4 file.*

---

## 💖 Please Donate

If you enjoy using ChrisTube and want to support its continuous development, please consider making a small donation:

[Donate Here](https://github.com/sponsors/csing102)

Your support keeps the project alive and improves features for everyone!

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repo.
2. Create your feature branch (`git checkout -b feature/AwesomeFeature`).
3. Commit your changes (`git commit -m 'Add AwesomeFeature'`).
4. Push to the branch (`git push origin feature/AwesomeFeature`).
5. Open a Pull Request.

---

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
