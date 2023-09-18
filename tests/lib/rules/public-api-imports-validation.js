/**
 * @fileoverview Checks imports from other modules (allowed only from the public API)
 * @author PavloPichuzhkin
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/public-api-imports-validation"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: {ecmaVersion: 6, sourceType: 'module'}
});

const aliasOptions = [
  {
    alias: '@'
  }
]

ruleTester.run("public-api-imports-validation", rule, {
  valid: [
    {
      code: "import { Comment } from '../../model/types/comments';",
      errors: [],
      options: aliasOptions,
    },
    {
      code: "import { getProfileForm } from '@/features/EditableProfileCard';",
      errors: [],
      options: aliasOptions,
    },
    {
      code: "import { getProfileForm } from '@/features/EditableProfileCard';",
    },
    {
      code: "import { Country, CountrySelect } from '@/entities/CountrySelect';",
    },
  ],

  invalid: [
    {
      code: "import { getProfileForm } from 'features/EditableProfileCard/model/selectors/getProfileForm/getProfileForm';",
      errors: [{ message: "Imports from other modules are only allowed  from the public API!" }],
      options: aliasOptions,
    },
  ],
});
