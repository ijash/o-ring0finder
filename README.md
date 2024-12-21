# O-Ring Finder

## Table of Contents

- [O-Ring Finder](#o-ring-finder)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Using the Site](#using-the-site)
  - [Setup and Development](#setup-and-development)
    - [Prerequisites](#prerequisites)
    - [Setup](#setup)
    - [Code Overview](#code-overview)
    - [Build and Deploy](#build-and-deploy)
  - [Contributing](#contributing)
  - [License](#license)

## Introduction

O-Ring Finder is a web tool to help users find the right o-ring size and details. It is built with React and TypeScript, hosted on GitHub Pages.

## Using the Site

1. Visit: [O-Ring Finder](https://ijash.github.io/o-ring-finder/)
2. Use the input form to filter o-rings.
3. Click on any row to view detailed o-ring specifications.

## Setup and Development

### Prerequisites

- Node.js v14+
- npm v6+
- TypeScript v4+
- React v18+

### Setup

1. Clone: `git clone https://github.com/ijash/o-ring-finder.git`
2. Install dependencies: `npm install`
3. Start development server: `npm start` or `npm run dev`

### Code Overview

- `public`: Static assets and index.html.
- `src`: Application source code.
  - `src/components`: React components for the UI:
    - **Header**: App title and description.
    - **InputSection**: Form for filtering o-rings.
    - **TableSection**: Displays filtered o-rings.
      - **Modal**: Shows o-ring details.
    - **Footer**: Footer content.
  - `src/data`: Raw o-ring data and utilities.
  - `src/css`: CSS/SCSS styles.

### Build and Deploy

1. Build: `npm run build`
2. Deploy: `npm run deploy`

## Contributing

1. Create a branch: `git checkout -b my-feature`
2. Make changes and commit: `git commit -m "Add feature"`
3. Push: `git push origin my-feature`
4. Open a pull request.

## License

O-Ring Finder is under the [GNU GPLv3](LICENSE).
