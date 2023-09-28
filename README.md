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

Project structure example:

```
src
  app
  |  providers
  |    ...
  |    StoreProvider
  |    |  ui
  |    |  |  StoreProvider.tsx
  |    |  index.ts
  |    ThemeProvider
  |    ...
  pages
  |  ...
  |  Main
  |    model
  |    ui
  |    |  MainPage.tsx
  |    index.ts
  widgets
  |  Sidebar
  |    model
  |    |  selectors
  |    |  types
  |    |    sidebar.ts
  |    ui
  |    |  Sidebar.tsx
  |    index.ts
  |    testing.ts
  features
  entities    
  shared
    config
      StoreProviderDecorator.tsx
```

.eslintrc.js example:

```js

// your .eslintrc.js
module.exports = {
    // ...
    plugins: [
        // ...
        'project-fsd-architecture',
        // ...
    ],
    rules: {
        // ...
        'project-fsd-architecture/slice-imports-validation': ['error', { alias: '@' }],
        'project-fsd-architecture/public-api-imports-validation':
            [
                'error', {
                alias: '@',
                testFilesPatterns: ['**/*.test.*', '**/*.story.*', '**/StoreProviderDecorator.tsx'],
            },
            ],
        'project-fsd-architecture/layer-imports': [
            'error',
            {
                alias: '@',
                ignoreImportPatterns: ['**/StoreProvider', '**/testing', '**/router'],
                testFilesPatterns: ['**/tests/*'],
            },
        ],
    },
}

```

## Rules 

<!-- begin auto-generated rules list -->

| Name                                                                         | Description                                                          |
| :--------------------------------------------------------------------------- | :------------------------------------------------------------------- |
| [layer-imports](docs/rules/layer-imports.md)                                 | Checks imports from higher layer into layer below                    |
| [public-api-imports-validation](https://github.com/PavloPichuzhkin/eslint-plugin-project-fsd-architecture/blob/master/docs/rules/public-api-imports-validation.md) | Checks imports from other modules (allowed only from the public API) |
| [slice-imports-validation](https://github.com/PavloPichuzhkin/eslint-plugin-project-fsd-architecture/blob/master/docs/rules/slice-imports-validation.md)           | Checks imports within a module                                       |

<!-- end auto-generated rules list -->


