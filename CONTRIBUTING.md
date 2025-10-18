# Contributing to easy-web-dashboard

Thank you for your interest in contributing to **easy-web-dashboard**.
We welcome contributions of all kinds — bug reports, feature requests, and pull requests.

This project is developed and maintained by [Business Simulations](https://www.businesssimulations.com) and is licensed
under the [MIT licence](LICENSE).

## 📌 Quick links

- **Project repository**: https://github.com/BusinessSimulations/easy-web-dashboard
- **Issues tracker**: https://github.com/BusinessSimulations/easy-web-dashboard/issues
- **MIT licence**: [LICENSE](LICENSE)

## 🐛 Bug reports

If you've encountered a bug, please [open an issue](https://github.com/BusinessSimulations/easy-web-dashboard/issues/new?template=bug_report.yaml) and include:

- A clear and descriptive title
- Steps to reproduce the issue
- Expected and actual behaviour
- Environment details (OS, browser/server, versions, etc.)
- Any relevant logs, screenshots, or code snippets

> Note: please check if the bug has already been raised before creating a new issue.

## ✨ Feature requests

We welcome new ideas. To request a feature or enhancement, [open an issue](https://github.com/BusinessSimulations/easy-web-dashboard/issues/new?template=feature_request.yaml) and include:

- A concise explanation of the feature
- The motivation behind it (what problem it solves or improves)
- Any alternatives or prior work considered

> Note: please check if the feature has already been requested before opening a new issue.

## 🔧 Pull requests

We appreciate code contributions. Please follow these guidelines when submitting a pull request:

1. **Fork** the repository and create your branch from `main`
2. **Write clear commit messages** and keep your changes focused
3. **Include tests** if you're adding or modifying functionality
4. Ensure your code builds and passes all existing tests
5. **Reference related issues** in your pull request description (e.g. “Closes #42”)

Once submitted, your pull request will be reviewed and discussed. Please be responsive to feedback.

## 🛠 Development setup

This section details how you can work on the project locally.

You will need these dependencies:

- NodeJS v22+
- Rust v1.90+

Follow these steps after forking and cloning the repository to run the project:

1. Install dependencies:

```bash
npm ci
```

2. Run the application:

```bash
npm run tauri dev
```

### Useful commands

- `npm run tauri build` - builds the project

## Architecture

Read the [architecture document](./ARCHITECTURE.md) for details on this project's architecture.
