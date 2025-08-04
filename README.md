# # COMPILE - Online Code Compiler

A modern, web-based code compiler built with Next.js and Monaco Editor that supports multiple programming languages with real-time syntax highlighting and code execution.

![Screenshot](public/js.png)

## ✨ Features

- **🎨 Monaco Editor Integration** - VS Code-like editing experience with IntelliSense
- **🌈 Multiple Themes** - VS Dark, VS Light, GitHub Dark, Monokai, and Solarized Dark
- **🚀 Real-time Code Execution** - Instant compilation and execution using Piston API
- **📱 Responsive Design** - Works seamlessly across desktop and mobile devices
- **💾 State Management** - Persistent editor state with Zustand
- **🎯 Language-specific Templates** - Default code snippets for quick start
- **🔄 Resizable Panels** - Adjustable editor and output panel layout
- **⚡ Performance Optimized** - Built with Next.js 15 and Turbopack

## 🛠️ Supported Languages

| Language   | Version | Runtime     |
|------------|---------|-------------|
| JavaScript | 18.15.0 | Node.js     |
| TypeScript | 5.0.3   | TypeScript  |
| Python     | 3.10.0  | Python      |
| Java       | 15.0.2  | OpenJDK     |
| C++        | 10.2.0  | GCC         |
| C#         | 6.12.0  | .NET        |
| Go         | 1.16.2  | Go          |
| Rust       | 1.68.2  | Rust        |
| Ruby       | 3.0.1   | Ruby        |
| Swift      | 5.3.3   | Swift       |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/saikat709/compile.git
cd compile
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 🏗️ Built With

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[Monaco Editor](https://microsoft.github.io/monaco-editor/)** - VS Code editor for the web
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Zustand](https://zustand-demo.pmnd.rs/)** - Lightweight state management
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[Lucide React](https://lucide.dev/)** - Beautiful icons
- **[React Split](https://github.com/nathancahill/split/)** - Resizable split panes
- **[Piston API](https://piston.readthedocs.io/)** - Code execution engine

## 📁 Project Structure

```
compile/
├── app/
│   ├── (root)/
│   │   ├── page.tsx              # Main compiler page
│   │   ├── _components/          # Page-specific components
│   │   │   ├── EditorPanel.tsx   # Monaco editor wrapper
│   │   │   ├── OutputPanel.tsx   # Code execution results
│   │   │   ├── LanguageSelector.tsx
│   │   │   ├── ThemeSelector.tsx
│   │   │   └── ...
│   │   └── _constants/
│   │       └── index.ts          # Language configs & themes
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
├── hooks/
│   └── useMounted.tsx            # Client-side mounting hook
├── store/
│   └── useCodeEditorStore.ts     # Zustand store
├── types/
│   └── index.ts                  # TypeScript type definitions
└── public/                       # Static assets
```

## 🎨 Customization

### Adding New Languages

1. Add language configuration in `app/(root)/_constants/index.ts`:

```typescript
export const LANGUAGE_CONFIG: LanguageConfig = {
  // ... existing languages
  newlang: {
    id: "newlang",
    label: "New Language",
    logoPath: "/newlang.png",
    pistonRuntime: { language: "newlang", version: "1.0.0" },
    monacoLanguage: "newlang",
    defaultCode: `// Your default code here`,
  },
};
```

2. Add the language logo to the `public/` directory.

### Creating Custom Themes

Add new themes to the `THEME_DEFINITONS` object in the constants file:

```typescript
export const THEME_DEFINITONS = {
  "custom-theme": {
    base: "vs-dark",
    inherit: true,
    rules: [
      // Define syntax highlighting rules
    ],
    colors: {
      // Define editor colors
    },
  },
};
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Monaco Editor](https://microsoft.github.io/monaco-editor/) for the amazing editor
- [Piston](https://piston.readthedocs.io/) for the code execution API
- [Vercel](https://vercel.com/) for hosting and deployment
- All contributors who helped make this project better

## 🔗 Links

<!-- - [Live Demo](https://compile-your-code.vercel.app) (Replace with your actual URL) -->
- [Report Bug](https://github.com/saikat709/compile/issues)
- [Request Feature](https://github.com/saikat709/compile/issues)

---

Made by [saikat709](https://github.com/saikat709)
