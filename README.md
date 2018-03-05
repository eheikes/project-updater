# Project Templates

This folder contains templates and configuration for my various software projects. It includes a script to update the project in the working directory.

## Installation

You'll need [Node.js](https://nodejs.org/) installed on your machine to use this tool. Then run `npm i -g @eheikes/project-template` to install this package.

## Usage

Run `update-project` in your project folder to update it according to these conventions.

## Included

* [`.editorconfig`](templates/editorconfig) for automatic style configuration in IDEs
* [`.gitignore`](templates/gitignore) for commonly ignored files
* [`.travis.yml`](templates/travis.yml) for CI/CD
* For npm packages:
  * Adds minimal properties to the `package.json`
  * Adds `standard` dependency, configuration, and `lint` script
  * Updates the `package-lock.json` file
  * Updates the `yarn.lock` file
  * Updates the `contributors` property in `package.json` from the git history
