# eslint-plugin-project-fsd-architecture

eslint plugin for project fsd architecture validation

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-project-fsd-architecture`:

```sh
npm install eslint-plugin-project-fsd-architecture --save-dev
```

## Usage

Add `project-fsd-architecture` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "project-fsd-architecture"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "project-fsd-architecture/rule-name": "error"
    }
}
```

## Rules 

<!-- begin auto-generated rules list  -->

| Name                                      | Description                                                          |
| :--------------------------------------------------------------------------- | :------------------------------------------------------------------- |
| [public-api-imports-validation](docs/rules/public-api-imports-validation.md) | Checks imports from other modules (allowed only from the public API) |
| [slice-imports-validation](docs/rules/slice-imports-validation.md)           | Checks imports within a module                                       |

<!-- end auto-generated rules list -->


