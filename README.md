# NoteSaver

NoteSaver is a beautiful, modern, and highly intuitive web application designed for organizing, managing, and saving text snippets and notes. Built on top of a professional, trustworthy slate and blue palette, it delivers a clean, responsive, distraction-free note-taking experience.

---

## Key Features

*   **✍️ Clean Creation Interface**: Write and edit notes with soft-bordered fields, validation (disables saving when fields are blank), and active focus rings.
*   **📊 Real-time Metrics**: Live word and character counters displayed in the editor and details viewer.
*   **📁 Local Storage Sync**: Note state is synchronized automatically to `localStorage` so you never lose your data.
*   **🔍 Search & Filter**: Dynamically filter saved notes by title with a real-time matched result badge indicator.
*   **📋 Rich Clipboard Tools**: One-click text copy options across note lists and detailed views with instant toast alerts.
*   **🔗 Native Web Share API**: Shares title, content, and the unique URL via the device's native sharing options, with a clipboard fallback for unsupported platforms.
*   **👓 Read More / Show Less Toggle**: Gracefully truncates long notes in list views for clean layouts.
*   **🎨 Slate Design System**: Crafted with a trustworthy slate-blue theme that supports both light and dark systems cleanly, avoiding over-the-top cyberpunk or generic AI tropes.

---

## Tech Stack

*   **Core**: [React 19](https://react.dev/) + [Vite](https://vite.dev/)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) + [React Redux](https://react-redux.js.org/)
*   **Routing**: [React Router v6](https://reactrouter.com/)
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
*   **Feedback**: [React Hot Toast](https://react-hot-toast.com/)

---

## Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd note-saver
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

---

## Project Structure

```
note-saver/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx       # Navigation header with custom logo
│   │   ├── Home.tsx         # Note creation & editing interface
│   │   ├── Paste.tsx        # Searchable note card list
│   │   └── ViewPaste.tsx    # Single note read-only viewer
│   ├── store/
│   │   ├── slice/
│   │   │   └── pasteSlice.ts # Redux actions, reducers, and schemas
│   │   └── store.ts         # ConfigureStore and RootState types
│   ├── App.tsx              # Browser routing and layouts
│   ├── main.tsx             # Redux Provider and React entry point
│   ├── index.css            # Custom CSS variables, scrollbars & Tailwind setup
│   └── App.css              # Page custom styles
```
