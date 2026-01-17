#  Frontend Accessibility (A11y)

## 1. What is Accessibility?

Accessibility means building web applications that can be **used by everyone**, including people diffent disabilites

---

## 2. Why Accessibility Matters

* **Users**: Screen reader, keyboard-only, low vision users
* **UX & SEO**: Better structure = better usability & crawlability
* **Business**: Larger audience reach

---

## 3. Accessibility Tree (Core Concept)

* Browser creates an **Accessibility Tree** from DOM
* Screen readers read **Accessibility Tree**, not DOM
* Tree contains:

  * Role (what it is)
  * Name (label/text)
  * State (disabled, expanded, checked)

DOM ≠ Accessibility Tree

---

## 4. Semantic HTML (Most Important)

Use correct HTML elements so browser can assign **auto ARIA roles**.

Examples:

* `<button>` → role=button
* `<a href>` → role=link
* `<input type="checkbox">` → role=checkbox

Avoid using `<div>` for interactive elements.

---

## 5. Auto ARIA Roles

* Browser automatically assigns ARIA roles to semantic elements
* Reduces need for manual ARIA

Rule:

> Never add `role` to a semantic element

---

## 6. Keyboard Accessibility

* All interactions must work via keyboard
* Use Tab / Shift+Tab for navigation
* Use Enter / Space for activation

Avoid removing focus outlines

---

## 7. Focus Management

Required for:

* Modals
* Dropdowns
* SPA route changes

Ensure:

* Focus moves to active content
* Focus is trapped inside modals

---

## 8. ARIA (When Needed)

ARIA is used when semantic HTML is not enough.

Common attributes:

* `aria-expanded` → open/closed state
* `aria-disabled` → unavailable state
* `aria-label` → accessible name

Rule:

> ARIA provides meaning, not behavior

---

## 9. Live Regions (Dynamic Updates)

Used when content updates without page reload.

* `aria-live="polite"` → non-urgent updates
* `aria-live="assertive"` → urgent updates
* `role="alert"` → critical messages

Examples:

* Add to cart
* Form validation
* Toast notifications

---

## 10. Forms Accessibility

* Always associate `<label>` with inputs
* Provide clear error messages
* Use ARIA for dynamic errors

---

## 11. Images & Media

* Use `alt` text for images
* Empty alt (`alt=""`) for decorative images
* Provide captions/transcripts for media

---

## 13. Accessibility in React

Common issues:

* Clickable divs
* Missing labels
* No focus handling

Best practices:

* Use semantic components
* Manage focus with `useRef`
* Prefer accessible UI libraries

---


---

## 15. Golden Rules (Interview Ready)

1. Semantic HTML first
2. Keyboard accessibility is mandatory
3. ARIA only when necessary
4. image with alt
5. video with transcription and caption

---

## One-Line Summary

Accessibility is about using semantic HTML, proper keyboard support, focus management, and ARIA to ensure that all users, including those using assistive technologies, can effectively use web applications.
