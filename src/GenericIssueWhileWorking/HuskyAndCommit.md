<!-- https://typicode.github.io/husky/get-started.html ===> husky
https://commitlint.js.org/concepts/shareable-config.html ==> conventional commit  -->


#  Git Workflow Setup: Husky + Commitlint (Conventional Commits)

This project uses **Husky** and **Commitlint** to enforce clean and consistent Git commit messages, and to automatically run code checks before code is committed or pushed.

---

##  Why Use This Setup?

| Tool           | Purpose                                                |
| -------------- | ------------------------------------------------------ |
| **Husky**      | Hooks into Git to run scripts (like lint, test, etc.)  |
| **Commitlint** | Enforces proper commit message formats (e.g., `feat:`) |

This ensures:

* Consistent commit messages
* Cleaner Git history
* Fewer bugs in production
* Fewer CI/CD failures

---

## Setup Instructions

### 1. Install Dependencies

```bash
npm install --save-dev husky @commitlint/{config-conventional,cli}
```

---

### 2. Enable Husky

```bash
npx husky install
```

And in `package.json`:

```json
{
  "scripts": {
    "prepare": "husky install"
  }
}
```

---

### 3. Configure Commitlint

Create a file called `commitlint.config.ts` (or `.js`):

```ts
// commitlint.config.ts
import type { UserConfig } from '@commitlint/types';

const Configuration: UserConfig = {
  extends: ['@commitlint/config-conventional'],
};

export default Configuration;
```

> This uses the Conventional Commit format (like `feat:`, `fix:`, `chore:`).

---

### 4. Add Git Hooks via Husky

#### `commit-msg` – Enforce message format

```bash
npx husky add .husky/commit-msg 'npx commitlint --edit "$1"'
```

>  **What does `--edit "$1"` mean?**
>
> * `--edit` tells Commitlint to read the message from a file
> * `$1` is a special variable passed by Git – it points to the temporary file that contains your commit message (e.g., `.git/COMMIT_EDITMSG`)
> * So this command checks the real commit message that was typed

#### `pre-commit` – Run code checks (optional)

```bash
npx husky add .husky/pre-commit 'npm run lint && npm run test'
```

Edit `.husky/pre-commit`:

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run lint
npm test
```

---

##  Commit Message Format (Conventional Commits)

Your commit messages must follow this format:

```
<type>(optional scope): <description>
```

### Common types:

| Type     | Meaning                           |
| -------- | --------------------------------- |
| feat     | A new feature                     |
| fix      | A bug fix                         |
| docs     | Documentation only changes        |
| style    | Formatting, missing semi colons   |
| refactor | Code change, no feature/fix       |
| test     | Adding or fixing tests            |
| chore    | Maintenance (e.g., deps, configs) |

### ✅ Good Examples:

* `feat: add user login page`
* `fix(auth): handle invalid token`
* `docs(readme): update install steps`

### ❌ Bad Examples (will be rejected):

* `updated stuff`
* `bug fix`
* `final changes`

---

### 2. Enable VS Code Git Panel to Show Warnings

These extensions help you write correct messages directly from the UI.

---

## 🧪 Test Your Setup

### Commit a good message:

```bash
git commit -m "feat(user): add registration form"
```

✅ Will pass

### Commit a bad message:

```bash
git commit -m "done stuff"
```

❌ Will fail with a Commitlint error

---
## 📁 Folder Structure Example

```
my-project/
├── .husky/
│   ├── commit-msg
│   └── pre-commit
├── commitlint.config.ts
├── package.json
└── ...
```

---

##  Summary

* **Husky** automates Git checks

* **Commitlint** enforces clean message format

* Works for teams and CI/CD pipelines

