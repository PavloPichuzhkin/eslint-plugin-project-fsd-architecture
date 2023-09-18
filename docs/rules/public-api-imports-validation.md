# Checks imports from other modules (allowed only from the public API) (`project-fsd-architecture/public-api-imports-validation`)

<!-- end auto-generated rule header -->

Please describe the origin of the rule here.

## Rule Details

This rule aims to...

Examples of **incorrect** code for this rule:

```js

import { getProfileForm } from 'features/EditableProfileCard/model/selectors/getProfileForm/getProfileForm';


```

Examples of **correct** code for this rule:

```js

import { getProfileForm } from '@/features/EditableProfileCard';
import { Comment } from '../../model/types/comments';
import { Country, CountrySelect } from '@/entities/CountrySelect';


```

### Options

If there are any options, describe them here. Otherwise, delete this section.

## When Not To Use It

Give a short description of when it would be appropriate to turn off this rule.

## Further Reading

If there are other links that describe the issue this rule addresses, please include them here in a bulleted list.
