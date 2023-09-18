# Checks imports within a module (`project-fsd-architecture/slice-imports-validation`)

<!-- end auto-generated rule header -->

Please describe the origin of the rule here.

## Rule Details

This rule aims to...

Examples of **incorrect** code for this rule:

```js

filename - 'E:\\advanced-react\\src\\features\\EditableProfileCard\\ui\\EditableProfileCard\\EditableProfileCard.tsx',
code - "import { getProfileForm } from '@/features/EditableProfileCard/model/selectors/getProfileForm/getProfileForm';",
errors - [{ message: "same slice - import should be relative"}]

```

Examples of **correct** code for this rule:

```js

import { getProfileForm } from '../../model/selectors/getProfileForm/getProfileForm';

```

### Options
.eslintrc.js
```js
rules: {
//...
//     'project-fsd-architecture/slice-imports-validation': ['error', { alias: '@' }]
}

```

## When Not To Use It

Give a short description of when it would be appropriate to turn off this rule.

## Further Reading

If there are other links that describe the issue this rule addresses, please include them here in a bulleted list.
