# VS Code Workspace Configuration in React Projects

This markdown file documents the purpose and usage of `.vscode/settings.json` and `.vscode/extensions.json` in a React project.

---

## `.vscode/settings.json`

This file defines **project-specific editor settings** for Visual Studio Code.

### Purpose

* Ensure consistent formatting, linting, and behavior across your team
* Override global VS Code settings within the project scope

### Example

```json
{
  "editor.formatOnSave": true,
  "editor.tabSize": 2,
  "files.exclude": {
    "**/node_modules": true,
    "**/.next": true
  },
  "eslint.enable": true,
  "prettier.requireConfig": true
}
```

---

##  `.vscode/extensions.json`

This file recommends VS Code extensions to install when a developer opens the workspace.

###  Purpose

* Promote consistency across team member environments
* Help new developers install necessary extensions easily

### Example

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "formulahendry.auto-close-tag",
    "formulahendry.auto-rename-tag",
    "xabikos.ReactSnippets",
    "eamodio.gitlens"
  ],
  "unwantedRecommendations": [
    "some.unnecessary-extension"
  ]
}
```

When someone opens the project folder in VS Code, they'll be prompted to install the recommended extensions.

---

##  Best Practices

* Always commit `.vscode/extensions.json` to source control for team visibility
* Optionally commit `.vscode/settings.json` if your team wants unified editor behavior
* Do **not** put personal or OS-specific settings in these files

---

## Summary

| File                      | Purpose                                     |
| ------------------------- | ------------------------------------------- |
| `.vscode/settings.json`   | Customize editor behavior for the workspace |
| `.vscode/extensions.json` | Recommend useful extensions to team members |
