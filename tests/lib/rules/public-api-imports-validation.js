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

const enableOptions = [{
  alias: '@',
  testFilesPatterns: ['**/*.test.ts', '**/StoreProviderDecorator.tsx']
}]

ruleTester.run("public-api-imports-validation", rule, {
  valid: [
    {
      code: "import { Comment } from '../../model/types/comments';",
      errors: [],
      options: enableOptions,
    },
    { // now this case processes slice-imports-validation rule
      filename: 'E:\\advanced-react\\src\\features\\EditableProfileCard\\ui\\EditableProfileCard\\EditableProfileCard.tsx',
      code: "import { getProfileForm } from 'features/EditableProfileCard/model/selectors/getProfileForm/getProfileForm';",
      options: enableOptions,
    },
    { // invalid #1
      filename: 'E:\\advanced-react\\src\\features\\EditableProfileCard\\ui\\EditableProfileCard\\EditableProfileCard.tsx',
      code: "import { ProfileCard } from '@/entities/Profile';",
      errors: [],
      options: enableOptions,
    },
    {
      filename: 'E:\\advanced-react\\src\\entities\\Profile\\ui\\ProfileCard.tsx',
      code: "import { Country, CountrySelect } from '@/entities/CountrySelect';",
      options: enableOptions,
    },
    { // but!  hir is testFilesPatterns, and it is already in public API, and it is OK!
      filename: 'E:\\advanced-react\\src\\features\\EditableProfileCard\\model\\slice\\profileSlice.test.ts',
      code: "import { Country, CountrySelect } from '@/entities/CountrySelect';",
      options: enableOptions,
    },
    {
      filename: 'E:\\advanced-react\\src\\entities\\file.test.ts',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article/testing'",
      errors: [],
      options: enableOptions,
    },
    { // testFilesPatterns, it is not in public API, so it is nessesert to create testing.ts API
      filename: 'E:\\advanced-react\\src\\shared\\config\\storybook\\StoreProviderDecorator.tsx',
      code: "import { loginReducer } from '@/features/AuthByUsername/testing';",
      errors: [],
      options: enableOptions,
    },
    { // against the architecture, used only in tests, so only test public API can exist
      filename: 'E:\\advanced-react\\src\\shared\\config\\storybook\\StoreProviderDecorator.tsx',
      code: "import { loginReducer } from '@/features/AuthByUsername';",
      errors: [],
      options: enableOptions,
    }
  ],

  invalid: [
    {
      filename: 'E:\\advanced-react\\src\\features\\EditableProfileCard\\ui\\EditableProfileCard\\EditableProfileCard.tsx',
      code: "import { ProfileCard } from '@/entities/Profile/ui/ProfileCard';",
      errors: [{ message: "Imports from other modules are only allowed from the public API (index.ts)." }],
      options: enableOptions,
      output: "import { ProfileCard } from '@/entities/Profile';",
    },
    { // no testFilesPatterns
      filename: 'E:\\advanced-react\\src\\entities\\entities\\forbidden.ts',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article/testing';",
      errors: [{message: 'Imports from other modules are only allowed from the public API (index.ts).'}],
      options: enableOptions,
      output: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article';",
    },
    {
      filename: 'E:\\advanced-react\\src\\entities\\StoreProviderDecorator.tsx',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article/testing/file.tsx';",
      errors: [{message: 'Test data should be imported from public API (testing.ts).'}],
      options: enableOptions,
      output: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article/testing';",
    },

  ],
});
