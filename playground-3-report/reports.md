# Accessibility Report

## Color Contrast Checks

**Test Standard:** WCAG (Requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text).

### Test Results (Before Fixes)

| Element | Foreground (Text) | Background | Contrast Ratio | Result   | Issue |
| :--- | :--- | :--- | :--- |:---------| :--- |
| **Main Header** (`font[size='7']`) | White (`#ffffff`) | Light Blue (`#dde`) | **1.25:1** | **FAIL** | Text is invisible against the light background. |
| **Main Content** (`article`) | Dark Gray (`#2a2a2a`) | Green (`#008000`) | **2.85:1** | **FAIL** | Dark text on a medium-dark green background is hard to read. |
| **Footer** | Dark Gray (`#2a2a2a`) | Green (`#008000`) | **2.85:1** | **FAIL** | Same issue as the main content. |
| **Navigation** (`.nav`) | Black (`#000000`) | Magenta (`#ff80ff`) | **14.8:1** | **PASS** | *Note: Found syntax error in CSS (missing #).* |

### Fixes Applied (`style.css`)

1.  **Main Header:** Changed the text color of the main header (`font[size='7']`) to dark gray (`#2a2a2a`) so it is readable against the light blue background.
2.  **Content Areas:** Changed the background color of the main content areas (`article`, `footer`, etc.) from green to white to ensure the text is legible.
3.  **Navigation:** Fixed the typo in the hex code for the navigation bar background (added the missing `#` to `#ff80ff`).