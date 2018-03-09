# Project Templates

This folder contains templates and configuration for my various software projects. It includes a script to update the project in the working directory.

## Requirements

* [Node.js](https://nodejs.org/) (v6 or higher)
* Git
* [Yarn](https://yarnpkg.com/) (for Node.js projects)

## Installation

Run `npm i -g @eheikes/project-template` to install this package.

## Usage

Run `update-project` in your project folder to update it according to these conventions.

Note that human intervention is still required! You'll need to review the changes and commit them or roll them back.

## Included

* [`.editorconfig`](templates/editorconfig) for automatic style configuration in IDEs
* [`.gitignore`](templates/gitignore) for commonly ignored files
* [`.travis.yml`](templates/travis.yml) for CI/CD
* For npm packages:
  * Adds minimal properties to the `package.json`
  * Adds `standard` dependency, configuration, and `lint` script
  * Upgrades the packages to the latest version (within defined range)
  * Updates the `package-lock.json` file
  * Updates the `yarn.lock` file
  * Updates the `contributors` property in `package.json` from the git history
