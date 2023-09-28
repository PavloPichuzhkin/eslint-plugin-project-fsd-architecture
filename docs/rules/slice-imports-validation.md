# Checks imports within a module (`project-fsd-architecture/slice-imports-validation`)

Checks imports relative path within a single slice in [FSD](https://feature-sliced.design/) project.

## Rule Details

Reports on non-relative path imports within a slice. Auto-fix is available (soon).

## Rule Options

* `alias`: specify it if you use alias.

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
        'project-fsd-architecture/slice-imports-validation': [ 'error', { alias: '@' } ],
    },
}

```

Examples of **incorrect** code for this rule:

```js
// 'project-fsd-architecture/slice-imports-validation': 'error'
// in filename: 'E:\\advanced-react\\src\\features\\EditableProfileCard\\ui\\EditableProfileCard\\EditableProfileCard.tsx'
import { getProfileForm } from 'features/EditableProfileCard/model/selectors/getProfileForm/getProfileForm';// {ESLintErrorMessage: "Layer can import only [shared, entities] layers."}
// {ESLintErrorMessage: "same slice - import should be relative"}

// 'project-fsd-architecture/slice-imports-validation': ['error', { alias: '@' }],
// in filename: 'E:\\advanced-react\\src\\features\\EditableProfileCard\\ui\\EditableProfileCard\\EditableProfileCard.tsx'
import { getProfileForm } from '@/features/EditableProfileCard/model/selectors/getProfileForm/getProfileForm';// {ESLintErrorMessage: "Layer can import only [shared, entities] layers."}
// {ESLintErrorMessage: "same slice - import should be relative"}


```

Examples of **correct** code for this rule:

```js
// 'project-fsd-architecture/slice-imports-validation': ['error', { alias: '@' }],
// in filename: 'E:\\advanced-react\\src\\features\\EditableProfileCard\\ui\\EditableProfileCard\\EditableProfileCard.tsx'
import { getProfileForm } from '../../model/selectors/getProfileForm/getProfileForm';

// in filename: 'E:\\advanced-react\\src\\features\\EditableProfileCard\\index.ts'
export { EditableProfileCard } from './ui/EditableProfileCard/EditableProfileCard';

// in filename: 'E:\\advanced-react\\src\\features\\EditableProfileCard\\ui\\EditableProfileCard\\EditableProfileCard.tsx'
// case processes public-api-imports-validation rule (ERROR)
import { ProfileCard } from '@/entities/Profile/ui/ProfileCard';


```

## When Not To Use It

If you do not use FSD.

## Further Reading

If there are other links that describe the issue this rule addresses, please include them here in a bulleted list.
