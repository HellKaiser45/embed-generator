# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Tech Stack
- **Framework**: Qwik (v1.14.1) with Qwik City for routing
- **Styling**: Tailwind CSS (v4.0.0) with DaisyUI (v5.0.46)
- **Language**: TypeScript
- **Build**: Vite
- **Package Manager**: npm (Node.js ^18.17.0 || ^20.3.0 || >=21.0.0)

## Common Commands

### Development
- `npm run dev` - Start dev server with SSR
- `npm run start` - Start dev server and open browser
- `npm run dev.debug` - Debug dev server with inspector

### Build & Preview
- `npm run build` - Full Qwik build (client + server)
- `npm run build.client` - Client-side build only
- `npm run build.preview` - Preview build (SSR)
- `npm run preview` - Build preview and serve

### Code Quality
- `npm run lint` - ESLint check (src/**/*.ts*)
- `npm run fmt` - Prettier format
- `npm run fmt.check` - Prettier format check
- `npm run build.types` - TypeScript type checking

## Architecture & Project Structure

### Entry Points
- `src/root.tsx` - Root Qwik component
- `src/routes/` - Qwik City route pages
- `src/global.css` - Global styles & Tailwind imports

### Components Organization
- `src/components/basics/` - Reusable UI components (Button, Card, Inputs)
- `src/components/icons-registry/` - Icon data and type definitions
- `src/components/lv1/` - Level 1 components
- `src/components/router-head/` - Router head component for SEO/meta

### Utility & Context
- `src/utils/sharedfncs.ts` - Shared utility functions
- `src/contexts/` - Context providers (currently social-banner-context.ts)

### Build Configuration
- **Vite**: `vite.config.ts` - Qwik/Vite setup with TailwindCSS
- **Tailwind**: Configured via Vite plugin in vite.config.ts (no separate config file)
- **DaisyUI**: Pre-configured Tailwind CSS component library
- **Dependencies**: Uses `lz-string` for compression needs

### Development Notes
- Uses modular ES modules (`type: "module"`)
- SSR-first architecture with Qwik
- Tailwind CSS v4 configured via '@tailwindcss/vite'
- DaisyUI v5 provides component classes (btn, card, form, etc.)
- Component library focuses on URL generation widgets

### AI-assisted Development Workflow
When you need to use aider for complex refactoring or feature development:
```bash
# Pattern: "prompt or request to build" | aider
# Examples:
echo "add dark mode toggle to settings page" | aider
echo "refactor button component to support loading states" | aider
echo "create a form validation utility with real-time feedback" | aider
```

**Note**: Run aider commands from the project root directory.