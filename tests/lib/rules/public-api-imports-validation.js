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
    {
      filename: 'E:\\advanced-react\\src\\entities\\file.test.ts',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article/testing'",
      errors: [],
      options: [{
        alias: '@',
        testFilesPatterns: ['**/*.test.ts', '**/StoreDecorator.tsx']
      }],
    },
    {
      filename: 'E:\\advanced-react\\src\\entities\\StoreDecorator.tsx',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article/testing'",
      errors: [],
      options: [{
        alias: '@',
        testFilesPatterns: ['**/*.test.ts', '**/StoreDecorator.tsx']
      }],
    }
  ],

  invalid: [
    {
      code: "import { getProfileForm } from 'features/EditableProfileCard/model/selectors/getProfileForm/getProfileForm';",
      errors: [{ message: "Imports from other modules are only allowed from the public API (index.ts)." }],
      options: aliasOptions,
    },
    // {
    //   filename: 'E:\\advanced-react\\src\\entities\\StoreDecorator.tsx',
    //   code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article/testing/file.tsx'",
    //   errors: [{message: 'Test data should be imported from public API (testing.ts).'}],
    //   options: [{
    //     alias: '@',
    //     testFilesPatterns: ['**/*.test.ts', '**/StoreDecorator.tsx']
    //   }],
    // },
    // {
    //   filename: 'E:\\advanced-react\\src\\entities\\StoreDecorator.tsx',
    //   code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article/testing/'",
    //   errors: [{message: 'Test data should be imported from public API (testing.ts).'}],
    //   options: [{
    //     alias: '@',
    //     testFilesPatterns: ['**/*.test.ts', '**/StoreDecorator.tsx']
    //   }],
    // },
    // {
    //   filename: 'E:\\advanced-react\\src\\entities\\entities\\forbidden.ts',
    //   code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article/testing'",
    //   errors: [{message: 'Imports from other modules are only allowed from the public API (index.ts).'}],
    //   options: [{
    //     alias: '@',
    //     testFilesPatterns: ['**/*.test.ts', '**/StoreDecorator.tsx']
    //   }],
    // },
    {
      filename: 'E:\\advanced-react\\src\\entities\\StoreDecorator.tsx',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article/testing/file.tsx'",
      errors: [{message: 'Imports from other modules are only allowed from the public API (index.ts).'}],
      options: [{
        alias: '@',
        testFilesPatterns: ['**/*.test.ts', '**/StoreDecorator.tsx']
      }],
    },
    {
      filename: 'E:\\advanced-react\\src\\entities\\forbidden.ts',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article/testing'",
      errors: [{message: 'Test data should be imported from public API (testing.ts).'}],
      options: [{
        alias: '@',
        testFilesPatterns: ['**/*.test.ts', '**/StoreDecorator.tsx']
      }],
    }

  ],
});
