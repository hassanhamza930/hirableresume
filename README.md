# Project Architecture and Approach

## Logic and UI Separation

Throughout this project, logic and UI are separated to ensure maintainability and scalability. The approach is as follows:

- **Logic**: All business logic and state management are encapsulated within React custom hooks. These hooks should be created in the `hooks` folder within the specific route folder of the Next.js project. This keeps components clean and focused on rendering.
- **UI**: For all UI elements, only the shared shadCN components located in the root `components` folder are used. These components provide a consistent design system across the application.
- **Component Modification**: shadCN components will only be edited or extended when explicitly requested.

This methodology helps maintain a clear separation of concerns, promotes reusability, and streamlines future development.
