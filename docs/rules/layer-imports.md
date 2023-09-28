# Checks imports from higher layer into layer below (`project-fsd-architecture/layer-imports`)

In [FSD](https://feature-sliced.design/) modules on one layer can only interact with modules from the layers strictly below.

## Rule Details

This rule reports on imports from higher layers into layer below. Only `entities` and `shared` can import from the same layers.

## Rule Options

* `alias`: specify it if you use aliases.


  In your project you need some time to allow some CONTROLLED exceptions.

* `ignoreImportPatterns`: specify regex to allow import from ignored files in higher layer.
* `testFilesPatterns`: specify regex to detect test files in which you want to allow import from higher layer.

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
Examples of **incorrect** code for this rule:

```js
// 'project-fsd-architecture/layer-imports': 'error',
// in filename: 'E:\\advanced-react\\src\\entities\\anyPath'
import { addCommentFormActions, addCommentFormReducer } from 'features/Article'
// {ESLintErrorMessage: "Layer can import only [shared, entities] layers."}

// 'project-fsd-architecture/layer-imports':  ["error", { alias: "@" }],
// in filename: 'E:\\advanced-react\\src\\features\\anyPath'
import { addCommentFormActions, addCommentFormReducer } from '@/widgets/Article'
// {ESLintErrorMessage: "Layer can import only [shared, entities] layers."}

// 'project-fsd-architecture/layer-imports':  ["error", { alias: "@", testFilesPatterns: ['NO!!! **/tests/*'] }],
// in filename: 'E:\\advanced-react\\src\\shared\\assets\\tests\\mockArticleData.ts...'
import { Article, ArticleType, ArticleBlockType } from '@/entities/Article';
// {ESLintErrorMessage: "Layer can import only [shared] layers."}

// 'project-fsd-architecture/layer-imports':  ["error", { alias: "@", ignoreImportPatterns: ['NOT!!!**/StoreProvider'],}],
// in filename: 'E:\advanced-react\src\entities\Article.tsx\anyPath'
import { StateSchema } from '@/app/providers/StoreProvider'
// {ESLintErrorMessage: "Layer can import only [shared, entities] layers."}


```

Examples of **correct** code for this rule:

```js
// 'project-fsd-architecture/layer-imports': 'error',
// in filename: 'E:\\advanced-react\\src\\entities\\anyPath'
import { addCommentFormActions, addCommentFormReducer } from 'entities/Article'
import { Button } from 'shared/Button'
// or
import { Button } from 'shared/Button.tsx'
// or
import { Button } from 'shared/ui/Button';


// 'project-fsd-architecture/layer-imports':  ["error", { alias: "@" }],
// in filename: 'E:\\advanced-react\\src\\features\\anyPath'
import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article'
import { Button } from 'shared/ui/Button';
import { useLocation } from 'react-router-dom'

// 'project-fsd-architecture/layer-imports':  ["error", { alias: "@", testFilesPatterns: ['**/tests/*'],ignoreImportPatterns: ['**/StoreProvider'] }],
// in filename: 'E:\\advanced-react\\src\\shared\\assets\\tests\\mockArticleData.ts...'
import { Article, ArticleType, ArticleBlockType } from '@/entities/Article';
// in filename: 'E:\advanced-react\src\entities\Article.tsx\anyPath'
import { StateSchema } from '@/app/providers/StoreProvider'


```

## When Not To Use It

If you do not use FSD.

## Further Reading

If there are other links that describe the issue this rule addresses, please include them here in a bulleted list.
