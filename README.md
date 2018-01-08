# Project Templates

This folder contains templates and configuration for my various software projects. It uses the [Update](http://update.github.io/update/) framework to generate & update the files.

## Installation

You'll need [Node.js](https://nodejs.org/) installed on your machine to use this tool.

1. Copy this repo to a `templates` folder in your home directory: `git clone git@github.com:eheikes/project-template.git ~/templates`
1. Run `~/templates/install`

## Usage

Run `~/templates/update` in your project folder to update it according to these conventions.

## Included

* [`.editorconfig`](_editorconfig) for automatic style configuration in IDEs
* [`.gitignore`] for commonly ignored files
* for Node.js projects:
  * normalizes the `package.json` using [`normalize-pkg`](https://github.com/jonschlinkert/normalize-pkg)
  * creates an `index.js` file if one doesn't exist
