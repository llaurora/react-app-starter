# <img src="https://cultofthepartyparrot.com/parrots/hd/everythingsfineparrot.gif" width="30" height="30"/> react-app-starter
[![react](https://img.shields.io/badge/react-^18.2.0-brightgreen.svg?style=flat-square)](https://github.com/facebook/react)
[![typescript](https://img.shields.io/badge/typescript-%5E5.0.4-brightgreen.svg)](https://www.typescriptlang.org/)
[![node](https://img.shields.io/badge/node-%3E%3D16.14.0-brightgreen.svg)](http://nodejs.cn/)
[![MIT licensed](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://raw.githubusercontent.com/wellyshen/react-cool-starter/master/LICENSE)

Quickly create a react app using react18、react-router6、typescript5

## Features
* ⚛️ [React 18](https://react.dev/) - The library for web and native user interfaces
* 🏄 [React Router DOM](https://reactrouter.com/) - Declarative routing for React
* ⚡️ [Vite](https://vitejs.dev/) - Next generation frontend tooling. It's fast! (For the time being only for the development environment)
* 🌈 [Webpack](https://webpack.js.org/) - A bundler for javascript and friends.
* ⚓️ [Typescript](www.typescriptlang.org) - A superset of JavaScript that compiles to clean JavaScript output
* 🔨 [EsLint](https://eslint.org) - Pluggable JavaScript linter
* 🌿 [StyleLint](https://stylelint.io) - Pluggable CSS linter
* 🌀 [Prettier](https://prettier.io) - Opinionated Code Formatter
* ☄️ [CommitLint](https://commitlint.js.org/) - Lint commit messages
* ⚙️ Proxying API Requests in Development

## Getting Started
~~~bash
$ git clone https://github.com/llaurora/react-app-starter.git
$ cd react-app-starter
$ pnpm install
$ pnpm run start
// or start with Vite
$ pnpm run vite
~~~

## Available Scripts

| Script                 | Description                                                  |
| ---------------------- | ------------------------------------------------------------ |
| pnpm run start         | Runs the app in the development mode with webpack            |
| pnpm run start:vite    | Runs the app in the development mode with vite               |
| pnpm run build         | Builds the app for production to the `dist` folder with webpack |
| pnpm run eslint        | find problems with JavaScript code in src directory          |
| pnpm run stylelint     | find problems with  CSS code in src directory                |
| pnpm run lint          | find problems with  JavaScript code and CSS code in src directory |
| pnpm run eslint:fix    | find and try to fix problems with JavaScript code in src directory |
| pnpm run stylelint:fix | find and try to fix problems with CSS code in src directory  |
| pnpm run lint:fix      | find and try to problems with  JavaScript code and CSS code in src directory |
| pnpm run prepare       | husky install                                                |

