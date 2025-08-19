# Sudoku - Frontend
A **React + Redux Sudoku UI** that can run standalone or as an importable package. Built to showcase modern frontend architecture, state management, and responsive design.

## Overview
Sudoku - Frontend is the **UI layer** of a Sudoku game demo featured in my portfolio. It demonstrates robust state management, dynamic rendering, and modern frontend tooling. While currently a **work-in-progress**, the project is architected with production-level patterns and designed to be extensible.

- **Problem it solves:** Provides a clean, responsive UI for playing Sudoku puzzles of varying sizes.
- **Why it exists:** Created as a **portfolio demo** to showcase frontend engineering depth, with the potential to grow into a full-fledged Sudoku app.
- **Audience:** Hiring managers, engineers, and developers evaluating technical ability.

## Tech Stack  
- **React** – component architecture  
- **Redux Toolkit** – state management & integration with backend API
- **TailwindCSS** – styling & responsive layout
- **Vite (SSR)** – fast development and bundling
- **TypeScript** – type safety & maintainability

## Architecture Highlights  
- **Redux-powered game state:** Centralized via RTK, with future integration to the Sudoku - Backend package.  
- **Dynamic grid system:** Supports Sudoku grids from **2×2 up to 9×9** (future-proofed for more).  
- **Resize-aware rendering:** Uses `ResizeObserver` + React Refs to dynamically adjust cell size, grid layout, and text scaling.  
- **Mono-repo design:** Can be consumed either as a module within the portfolio site or eventually as a standalone app.  

---

## Features (Current & Planned)

 - [x] Mobile-responsive grid rendering
 - [x] Dynamic grid and text sizing
 - [x] Cell selection
 - [ ] Core game controls (enter notes/numbers, undo/redo, and game menu)
 - [ ] Game states (initial load, mid-game, and end-game)
 - [ ] Connection to Sudoku - Backend API layer
 - [ ] Future Nice-to-Haves: cell highlighting, hints, and animations

## Usage  
To run locally, you must have Yarn installed and do the following:
```bash
# Clone the repo
git clone https://github.com/Chain52/portfolio-suite.git

# Move into the root package
cd portfolio-suite

# Install dependencies
yarn install

# Start the dev server
yarn workspace @portfolio/sudoku-frontend dev
```
_Note: This setup is still in progress and may require dependency resolution adjustments._

## Roadmap
- **MVP**: Backend integration + basic game controls.
- **UX Polish**:
	- Game aids: visible cell highlighting, active error checking, and cell markup tools.
	- Hints: Request next best move from backend.
	- Animations for when a game starts/ends, an error occurred, or to display hint logic.
	- Tutorial: Create an interactive tutorial that combines the above to teach various Sudoku techniques.
- **Out of Scope (currently)**: Variant Sudoku (e.g., killer cages, fog Sudoku, etc.)

## Author & Context
- **Author**: Colin Hain - Sole Developer
- **Context**: Part of the larger Portfolio mono-repo
- **Focus**:
	- Advanced **state management** with Redux Toolkit.
	- **Integration design** through backend connection.
	- Solid **UI architecture** and responsive rendering.
	- Modular, reusable package development.

## License
Open source (MIT)
