# TypeScript Configuration (`tsconfig.json`) 

This document explains each important field in a typical `tsconfig.json` file for modern JavaScript/TypeScript projects, especially React (e.g., with Vite or Next.js).

---

## Structure

```json
{
  "compilerOptions": {
    ...
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}
```

---

## compilerOptions

| Option   | Means...                                | Example                  |
| -------- | --------------------------------------- | ------------------------ |
| `target` | **What JavaScript version** to write in | ES5, ES6, ES2020, ESNext |
| `module` | **How to import/export code**           | CommonJS, ES6, ESNext    |


### 1. `target`

* **Purpose**: Determines the version of JavaScript to compile to.
* **Type**: `"ES5"`, `"ES6"`, `"ES2020"`, `"ESNext"`, etc.
* **Recommended**: `"ESNext"` for modern apps (Vite, Next.js, etc.)
* **Example**:

  ```json
  "target": "ESNext"
  ```

---

### 2. `module`

* **Purpose**: Specifies the module system to use.
* **Values**: `"CommonJS"`, `"ESNext"`, `"ES6"`, etc.
* **Recommended**: `"ESNext"` for browser environments or bundlers.
* **Example**:

  ```json
  "module": "ESNext"
  ```

---

### 3.`jsx`

* **Purpose**: Enables JSX support for React.
* **Values**:

  * `"react"` – for older setups
  * `"react-jsx"` – for React 17+ with new JSX transform
* **Example**:

  ```json
  "jsx": "react-jsx"
  ```

---

### 4.`strict`

* **Purpose**: Enables all strict type-checking options.
* **Default**: `false`
* **Recommended**: `true` (enforces safe type usage)
* **Example**:

  ```json
  "strict": true
  ```

---

### 5.`baseUrl`

* **Purpose**: Sets the base path for module resolution.
* **Recommended**: `"."` to reference project root.
* **Example**:

  ```json
  "baseUrl": "."
  ```

---

### 6. `paths`

* **Purpose**: Creates custom aliases for import paths.
* **Works With**: `baseUrl`
* **Example**:

  ```json
  "paths": {
    "~/*": ["src/*"],
    "@components/*": ["src/components/*"]
  }
  ```

---

### 7. `skipLibCheck`

* **Purpose**: Skips type checking for declaration (`.d.ts`) files in `node_modules`.
* **Recommended**: `true` to avoid irrelevant third-party type errors and speed up build.
* **Example**:

  ```json
  "skipLibCheck": true
  ```

---

### 8. `outDir`

* **Purpose**: Directory to emit compiled JS files.
* **Example**:

  ```json
  "outDir": "dist"
  ```

---

##  include & exclude

### `include`

* **Purpose**: Files/folders TypeScript should include for compilation.
* **Common**:

  ```json
  "include": ["src"]
  ```

### `exclude`

* **Purpose**: Files/folders TypeScript should ignore.
* **Common**:

  ```json
  "exclude": ["node_modules", "dist"]
  ```

---

## Full Example `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "jsx": "react-jsx",
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "~/*": ["src/*"],
      "@components/*": ["src/components/*"]
    },
    "moduleResolution": "node",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "allowSyntheticDefaultImports": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

---

* tsconfig.json = brain of your TypeScript project

* It controls how code is compiled

* Helps you catch errors early, organize code better, and set project rules

* Mandatory in any real-world TS project
