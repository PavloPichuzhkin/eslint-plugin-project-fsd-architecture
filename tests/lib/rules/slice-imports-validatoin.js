/**
 * @fileoverview checks imports within a module
 * @author PavloPichuzhkin
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/slice-imports-validation"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester(
    {
      parserOptions: {ecmaVersion: 6, sourceType: 'module'}
    }
);
ruleTester.run("slice-imports-validation", rule, {
  valid: [
    {
      filename: 'E:\\advanced-react\\src\\features\\EditableProfileCard\\ui\\EditableProfileCard\\EditableProfileCard.tsx',
      code: "import { getProfileForm } from '../../model/selectors/getProfileForm/getProfileForm';",
    },
    { // case processes public-api-imports-validation rule (ERROR)
      filename: 'E:\\advanced-react\\src\\features\\EditableProfileCard\\ui\\EditableProfileCard\\EditableProfileCard.tsx',
      code: "import { ProfileCard } from '@/entities/Profile/ui/ProfileCard';",
      errors: [],
      options: [
  {
    alias: '@'
  }
],
    },
  ],

  invalid: [
    {
      filename: 'E:\\advanced-react\\src\\features\\EditableProfileCard\\ui\\EditableProfileCard\\EditableProfileCard.tsx',
      code: "import { getProfileForm } from '@/features/EditableProfileCard/model/selectors/getProfileForm/getProfileForm';",
      errors: [{ message: "same slice - import should be relative"}],
      options: [
        {
          alias: '@'
        }
      ]
    },
    {
      filename: 'E:\\advanced-react\\src\\features\\EditableProfileCard\\ui\\EditableProfileCard\\EditableProfileCard.tsx',
      // some problem, no alias in the import source
      code: "import { getProfileForm } from 'features/EditableProfileCard/model/selectors/getProfileForm/getProfileForm';",
      errors: [{ message: "same slice - import should be relative"}],
      options: [
        {
          alias: '@'
        }
      ]
    },
    {
      filename: 'E:\\advanced-react\\src\\features\\EditableProfileCard\\ui\\EditableProfileCard\\EditableProfileCard.tsx',
      code: "import { getProfileForm } from 'features/EditableProfileCard/model/selectors/getProfileForm/getProfileForm';",
      errors: [{ message: "same slice - import should be relative"}],
    },
  ],
});
