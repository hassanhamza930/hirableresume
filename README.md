# Project Architecture and Approach

## Logic and UI Separation

Throughout this project, logic and UI are separated to ensure maintainability and scalability. The approach is as follows:

- **Logic**: All business logic and state management are encapsulated within React custom hooks. These hooks should be created in the `hooks` folder within the specific route folder of the Next.js project. This keeps components clean and focused on rendering.
- **UI**: For all UI elements, only the shared shadCN components located in the root `components` folder are used. These components provide a consistent design system across the application.
- **Component Modification**: shadCN components will only be edited or extended when explicitly requested.

## Recent Changes

### 2025-04-20
- Documented the new single-function API for `useResumeLogic` and the new `prompts.ts` file for centralized prompt management.

### 2025-04-18
- Refactored `useResumeLogic` hook to expose only a single function: `generateResumeContent`, which handles both resume creation and update based on a `userRequest` parameter.
-## useResumeLogic Hook (API)

The `useResumeLogic` hook now exposes only two functions:

```typescript
const { generateResumeContent, generateResumeName } = useResumeLogic({ userId });
```

### Usage
- To **create** a resume:
  ```typescript
  generateResumeContent({ mode: 'create', jobDescription, companyInfo })
  ```
- To **update** a resume:
  ```typescript
  generateResumeContent({ mode: 'update', resumeId, customizationInput, originalResume })
  ```
- To **generate a resume name**:
  ```typescript
  const name = await generateResumeName(jobDescription, companyInfo);
  ```

All fallback and helper functions have been removed for clarity and simplicity. Only these two functions are available for use in the UI and business logic.

## Prompt Management

All system and user prompt templates for resume generation are now stored in `app/prompts.ts` at the app root. Import and use these templates in your logic as needed:

```typescript
import * as prompts from '@/app/prompts';
```

This keeps prompt management centralized and maintainable.
