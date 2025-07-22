# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Qwik City static-site application with Tailwind CSS and DaisyUI for styling. The project is built using the Qwik framework, a modern UI framework focused on performance through resumability.

## Development Commands

```shell
# Install dependencies
bun install

# Start development server with SSR
bun start
# Alternative
npm start

# Format code with Prettier
bun fmt
# Check formatting
bun fmt.check

# Run ESLint
bun lint

# Build the project
bun build
# Build client only
bun build.client
# Build preview
bun build.preview
# Type checking
bun build.types

# Preview production build locally
bun preview

# Qwik CLI tool (for adding integrations)
bun qwik add
```

## Deployment

The project is set up for Static Site Generation (SSG):

```shell
# Add static adapter
bun run qwik add static

# Build for production
bun build
```

## Project Architecture

### Framework and Libraries

- **Qwik**: Main UI framework for building resumable applications
- **Qwik City**: Routing and SSR/SSG capabilities for Qwik
- **Tailwind CSS**: Utility-first CSS framework for styling
- **DaisyUI**: Component library built on top of Tailwind

### Directory Structure

- `src/`
  - `components/`: Reusable UI components
    - `basics/`: Basic UI components like buttons and icons
    - `lv1/`: Level 1 components like icon selectors
    - `router-head/`: Components for document head
  - `routes/`: Application routes and pages
  - `entry.*.tsx`: Entry points for different build modes
  - `root.tsx`: Root component with app providers
  - `global.css`: Global styles

### Components System

The project uses a hierarchical component system:
- `basics/`: Low-level UI components (buttons, icons)
- `lv1/`: Higher-level components that may compose basic components

### Routing

Qwik City provides file-based routing, with routes defined in the `src/routes/` directory.

### Build System

The project uses Vite for the build process, with custom configurations for Qwik and Tailwind. Key features include:
- Server-side rendering (SSR) during development
- Support for static site generation (SSG) in production
- Tailwind CSS integration
- TypeScript type checking

### Code Quality Tools

- ESLint for code linting
- Prettier for code formatting (with Tailwind plugin)
- TypeScript for type checking