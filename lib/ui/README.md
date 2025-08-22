# Portfolio - UI
A **React + Tailwind component and hook library** designed to be shared across my portfolio projects. It centralizes common UI elements and enforces DRY principles while showcasing advanced React + TypeScript techniques.

## Overview
This internal library provides reusable containers, layout primitives, and hooks for my demo apps and main portfolio site. Rather than relying on large third-party UI frameworks, I’ve built my own lightweight system to:
- Avoid unnecessary dependency bloat
- Demonstrate proficiency with **React**, **TypeScript**, and **Tailwind**
- Maintain full control over design and responsiveness

## Tech Stack
- **React** – component framework
- **TailwindCSS** – responsive styling utility
- **TypeScript** – type-safe props and hooks

## Architecture Highlights
- **`useContainerDimensions` hook** – returns a `ref` and dimensions object, updating with ResizeObserver
- **`Flex` component** – a responsive flexbox container with modular, prop-driven control
- **DRY-first design** – centralized logic eliminates duplication across projects

## Key Features
### ResponsiveProp Typing
The core innovation is the **`ResponsiveProp`** custom prop type:
```ts
const TailwindBreakpoint = Object.freeze({
  Base: 'base',
  Small: 'sm',
  Medium: 'md',
  Large: 'lg',
  XL: 'xl',
  TwoXL: '2xl'
});
type TailwindBreakpoint =
  (typeof TailwindBreakpoint)[keyof typeof TailwindBreakpoint];

type ResponsiveProp<T> = T | { [key in TailwindBreakpoint]?: T };
```
The **`ResponsiveProp`** type is utilized in the **`Flex`** component to allow for clean responsive adjustments to rendering or simple always true declarations.
```jsx
// For example, Flex has a grow props with a type of ResponsiveProp<boolean|number>

// will always grow
<Flex grow>{children}</Flex>
// renders <div class="flex grow">...</div>

// will grow at 'lg' breakpoint
<Flex grow={{lg: true}}>{children}</Flex>
// renders <div class="flex lg:grow">...</div>

// will grow more at 'lg' than at 'sm' breakpoints
<Flex grow={{sm: 2, lg: 5}}>{children}</Flex>
// renders <div class="flex sm:grow-2 lg:grow-5">...</div>
```
### Container Abstractions
-   `Flex` is modular and forwards refs for flexible integration
-   Strict, inferred TypeScript types guide proper usage
-   Dynamic class generation enables prop-driven Tailwind utilities

## Notable Challenges & Solutions
-   **Challenge:** Dynamically mapping responsive Tailwind classes from prop declarations
-   **Solution:** Inline sourcing of all relevant class names. While not the most optimized approach (unused classes are included), it was chosen to avoid premature optimization and keep the library simple. Future improvements could leverage build-time generation.

## Usage

This library is designed as an **internal dependency** within the mono-repo. Example usage in another package:
```jsx
import { Flex } from "@portfolio/ui";

<Flex grow={{ sm: true, lg: 2 }}>
  <p>Responsive flex item</p>
</Flex>
```
## Roadmap
-   Add additional primitives: `Grid`, `Box`, `Button`, `ButtonGroup`, `Modal`, etc.
-   Improve `useContainerDimensions` with debounced updates
-   Upgrade `ResponsiveProp` to pull breakpoints dynamically from the Tailwind theme
-   Consider extracting this package from the mono-repo for reuse across personal projects

## Author & Context  
- **Author:** Colin Hain - Sole Developer
- **Context:** Main app of my portfolio mono-repo  
- **Focus:**  
	-   Advanced **React + TypeScript** techniques (forwarded refs, inferred types)
	-   **Responsive design abstraction** in a custom component system
	-   Ability to design **modular, scalable internal libraries**

## License  
This package is covered under the MIT License at the root of the `portfolio-suite` repository.
