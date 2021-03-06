# Project Updater

This tool automates maintenance by updating the project with a specific set of tasks (see "Included" below). It consists of a script to update the project in the working directory.

## Requirements

* [Node.js](https://nodejs.org/) (v6 or higher)
* Git
* [Yarn](https://yarnpkg.com/) (for Node.js projects)

## Installation

Run `npm i -g @eheikes/project-updater` to install this package.

## Usage

Run `update-project` in your project folder to update it according to these conventions.

Note that human intervention is still required! You'll need to review the changes and commit them or roll them back.

### Modifying the Templates

There are [built-in templates](templates) used by the updater if no other templates are specified. The tool can instead use a specified folder (in order of precedence):

* a `--templates` argument on the command line
* a `TEMPLATES` environment variable
* a `templates` folder in your home directory

### Disabling Tasks

You can also disable certain tasks by including a `tasks.json` file in the templates folder, using the [task filenames](tasks) (minus the file extension). For example, the following skips the `package-lock` and `travisci` tasks:

```json
{
  "package-lock": false,
  "travisci": false
}
```

Tasks are disabled *only* if they are specified with a `false` value.

## Included

* [`.editorconfig`](templates/editorconfig) for automatic style configuration in IDEs
* [`.gitignore`](templates/gitignore) for commonly ignored files
* [`.travis.yml`](templates/travis.yml) for CI/CD
* For npm packages:
  * Adds minimal properties to the `package.json`
  * Adds `LICENSE` file
  * Adds `standard` dependency, configuration, and `lint` script
  * Upgrades the packages to the latest version (within defined range)
  * Updates the `package-lock.json` file
  * Updates the `yarn.lock` file
  * Updates the `contributors` property in `package.json` from the git history
