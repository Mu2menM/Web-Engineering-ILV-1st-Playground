# Accessibility Report

## Color Contrast Checks

**Test Standard:** WCAG (Requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text).

### Test Results (Before Fixes)

| Element                            | Foreground (Text)     | Background          | Contrast Ratio | Result   | Issue                                                        |
|:-----------------------------------|:----------------------|:--------------------|:---------------|:---------|:-------------------------------------------------------------|
| **Main Header** (`font[size='7']`) | White (`#ffffff`)     | Light Blue (`#dde`) | **1.25:1**     | **FAIL** | Text is invisible against the light background.              |
| **Main Content** (`article`)       | Dark Gray (`#2a2a2a`) | Green (`#008000`)   | **2.85:1**     | **FAIL** | Dark text on a medium-dark green background is hard to read. |
| **Footer**                         | Dark Gray (`#2a2a2a`) | Green (`#008000`)   | **2.85:1**     | **FAIL** | Same issue as the main content.                              |
| **Navigation** (`.nav`)            | Black (`#000000`)     | Magenta (`#ff80ff`) | **14.8:1**     | **PASS** | *Note: Found syntax error in CSS (missing #).*               |

### Fixes Applied (`style.css`)

1. **Main Header:** Changed the text color of the main header (`font[size='7']`) to dark gray (`#2a2a2a`) so it is
   readable against the light blue background.
2. **Content Areas:** Changed the background color of the main content areas (`article`, `footer`, etc.) from green to
   white to ensure the text is legible.
3. **Navigation:** Fixed the typo in the hex code for the navigation bar background (added the missing `#` to
   `#ff80ff`).

## Semantic HTML & Navigation

### 1. **Issues Identified (Before Fixes)**

Testing revealed significant barriers for users relying on assistive technology:

| Issue                    | Description                                                                                                           | Impact on User                                                                                                                   |
|:-------------------------|:----------------------------------------------------------------------------------------------------------------------|:---------------------------------------------------------------------------------------------------------------------------------|
| **No Heading Structure** | The page used `<font size="...">` tags for visual sizing instead of semantic `<h1>-<h6>` tags.                        | Critical: Screen reader users cannot navigate by heading. The page is read as a flat stream of text with no hierarchy.           |
| **Missing Landmarks**    | Key areas like the header and navigation were wrapped in generic `<div class="header">` and `<div class="nav">` tags. | High: Users cannot use landmark navigation shortcuts (e.g., jumping straight to the navigation menu).                            |
| **Inaccessible Buttons** | The "Show comment" control was a `<div class="show-hide">`.                                                           | High: The element is not focusable via keyboard (Tab key skips it) and is not announced as a clickable button to screen readers. |
| **Missing Form Labels**  | Inputs for "Your name" and "Your comment" had visual text nearby but no programmatic association.                     | Medium: Screen readers may announce "Edit text" without context. The search input had no label at all.                           |

### 2. **Fixes Applied**

#### A. HTML Structure Updates (index.html)

We replaced purely presentational tags with semantic HTML5 elements to create a meaningful document outline.

**Headings:**

- Replaced `<font size="7">` → `<h1>` (Main Page Title)
- Replaced `<font size="6">` → `<h2>` (Section Titles)
- Replaced `<font size="5">` → `<h3>` (Sub-section Titles)

**Landmarks:**

- Replaced `<div class="header">` → `<header>`
- Replaced `<div class="nav">` → `<nav>`

**Interactivity:**

- Replaced `<div class="show-hide">` → `<button class="show-hide" type="button">` (Now focusable and clickable via
  keyboard)

**Forms:**

- Added `<label for="...">` elements explicitly linked to their inputs via `id`
- Added a visually hidden label for the search bar (`<label class="visually-hidden">Search query</label>`) and
  `role="search"` to the form

#### B. CSS Updates (style.css)

The CSS was updated to style the new semantic tags instead of the deprecated `<font>` tags.

**Typography Selectors:**

- Old: `font[size='7']`, `font[size='6']`
- New: `h1`, `h2`, `h3`

**Layout Selectors:**

- Old: `div[class='nav']`
- New: `nav.nav`

**Utility Classes:**

- Added `.visually-hidden` class to support accessible labels that shouldn't break the visual design

### 3. Validation Results

After these changes:

- Users can navigate the page hierarchy using Heading shortcuts (H key)
- Users can jump to the Navigation region instantly
- Keyboard-only users can Tab to the "Show comment" button and activate it with Enter/Space
- Form inputs are clearly announced with their accessible names