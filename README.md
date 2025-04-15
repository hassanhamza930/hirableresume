# Project Architecture and Approach

## Logic and UI Separation

Throughout this project, logic and UI are separated to ensure maintainability and scalability. The approach is as follows:

- **Logic**: All business logic and state management are encapsulated within React custom hooks. These hooks should be created in the `hooks` folder within the specific route folder of the Next.js project. This keeps components clean and focused on rendering.
- **UI**: For all UI elements, only the shared shadCN components located in the root `components` folder are used. These components provide a consistent design system across the application.
- **Component Modification**: shadCN components will only be edited or extended when explicitly requested.

## Recent Changes

### 2025-04-15
- Updated the SpinningLogo component: added a hover animation that smoothly scales up the logo, and ensured it returns to the original spinning animation on mouse leave. Fixed TypeScript syntax errors in the component.
- Updated the Navbar component: applied a slight rotation to the logo container for a modern, playful effect using Tailwind's `rotate-[-6deg]` utility.
- Updated the Navbar component: replaced the 'MyApp' text with the `logo.png` image from the public directory and the brand name 'HirableResume' for a more professional and branded navigation bar.
- Google Fonts are now loaded using a `<link>` tag in the `<head>` section of `app/layout.tsx` for proper font loading in Next.js. The previous `@import` approach in CSS was removed due to lack of support for remote font imports in Next.js app directory CSS files.
