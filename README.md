
# 🚗 Car Finder

**Car Finder** is a modern web app built with **Next.js 13 (App Router)** and **Tailwind CSS**, designed to help users explore and find their ideal vehicle based on filters like brand, model, fuel type, and more.

## ✨ Features

- Clean, responsive UI using Tailwind CSS
- Car listings and filters for dynamic searching
- Toggleable Dark Mode
- Modular, component-based structure

## 🧪 Technologies Used

- [Next.js 13](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- TypeScript
- React Hooks
- Modern file-based routing (App Router)

## 🚧 Known Issues

- **Dark Mode Toggle**: Although the toggle button correctly adds/removes the `dark` class on the root `<html>` element, the full styling is not being applied across all components.  
  **Reason**: The `dark:` classes are not yet implemented everywhere and Tailwind's dark mode was not fully configured in the initial setup.  
  **Note**: Given more time, this can be fully resolved with proper configuration and styling updates.

## 📦 Getting Started

```bash
# Clone the repo
git clone https://github.com/ishan-eth/car-finder.git
cd car-finder

# Install dependencies
npm install

# Run the development server
npm run dev
```

## 📁 Project Structure

```
src/
├── app/              # Next.js pages and layout
├── components/       # Reusable UI components
├── styles/           # Global CSS
├── types/            # Type definitions
```

## 📌 TODO

- Fix full dark mode implementation
- Add persistent dark mode state with `localStorage`
- Add sorting/filter enhancements
- Integrate car data from a real API

---

## 🤝 Contributing

Pull requests are welcome! If you have suggestions for improvements, feel free to open an issue or submit a PR.

---

## 📃 License

This project is open-source and available under the [MIT License](LICENSE).
