# Checks imports from other modules (allowed only from the public API) (`project-fsd-architecture/public-api-imports-validation`)

Imports from other modules are only allowed from the public API (index.ts).

## Rule Details

Reports on absolute imports not from Public API for entities, features,  widgets  or
pages layers. Data should be reexported from the index.ts file or from testing.ts for test data. Auto-fix is available.

## Rule Options

* `alias`: specify it if you use aliases.


In your project you need some time to allow some CONTROLLED exceptions.

* `testFilesPatterns`: specify regex to detect test files in which you want to allow import from higher layer.

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
        'project-fsd-architecture/public-api-imports-validation': [
            'error',
            {
                alias: '@',
                testFilesPatterns: ['**/tests/*'],
            },
        ],
    },
}

```

Examples of **incorrect** code for this rule:

```js
// 'project-fsd-architecture/layer-imports': [{
// alias: '@',
//     testFilesPatterns: ['**/*.test.ts', '**/StoreProviderDecorator.tsx']
// }],

// in filename: 'E:\\advanced-react\\src\\features\\EditableProfileCard\\ui\\EditableProfileCard\\EditableProfileCard.tsx'
import { ProfileCard } from '@/entities/Profile/ui/ProfileCard';
// {ESLintErrorMessage: "Imports from other modules are only allowed from the public API (index.ts)."}
// autoFixOutput: "import { ProfileCard } from '@/entities/Profile';",

// in filename: 'E:\\advanced-react\\src\\entities\\StoreProviderDecorator.tsx'
import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article/testing/file.tsx';
// {ESLintErrorMessage: "Test data should be imported from public API (testing.ts)."}
// autoFixOutput: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article/testing';",


```

Examples of **correct** code for this rule:

```js
// 'project-fsd-architecture/layer-imports': [{
// alias: '@',
//     testFilesPatterns: ['**/*.test.ts', '**/StoreProviderDecorator.tsx']
// }],

// in filename: 'E:\\advanced-react\\src\\features\\EditableProfileCard\\ui\\EditableProfileCard\\EditableProfileCard.tsx'
import { ProfileCard } from '@/entities/Profile';

// in filename: 'E:\\advanced-react\\src\\features\\EditableProfileCard\\ui\\EditableProfileCard\\EditableProfileCard.tsx'
// this case processes slice-imports-validation rule
import { getProfileForm } from 'features/EditableProfileCard/model/selectors/getProfileForm/getProfileForm';

// in filename: 'E:\\advanced-react\\src\\features\\EditableProfileCard\\model\\slice\\profileSlice.test.ts'
// hir is testFilesPatterns, and it is already in public API, and it is OK!
import { Country, CountrySelect } from '@/entities/CountrySelect';

// in filename: 'E:\\advanced-react\\src\\shared\\config\\storybook\\StoreProviderDecorator.tsx'
// testFilesPatterns, it is not in public API, so it is nessesert to create testing.ts API
import { loginReducer } from '@/features/AuthByUsername/testing';


```

## When Not To Use It

If you do not use FSD.

## Further Reading

If there are other links that describe the issue this rule addresses, please include them here in a bulleted list.
