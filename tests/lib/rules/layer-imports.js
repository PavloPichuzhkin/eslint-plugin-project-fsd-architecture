/**
 * @fileoverview Checks imports from higher layer into layer below
 * @author PavloPichuzhkin
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/layer-imports"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester(
    {
      parserOptions: { ecmaVersion: 6, sourceType: 'module' },
    }
);

const enableOptions = [{
  alias: '@',
  ignoreImportPatterns: ['**/StoreProvider']
}]

ruleTester.run("layer-imports", rule, {
  valid: [
    {
      filename: 'E:\\advanced-react\\src\\features\\Article\\anyPath',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/shared/Button.tsx'",
      errors: [],
      options: enableOptions,
    },
    {
      filename: 'E:\\advanced-react\\src\\features\\Article\\anyPath',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article'",
      errors: [],
      options: enableOptions,
    },
    {
      filename: 'E:\\advanced-react\\src\\app\\providers\\anyPath',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/widgets/Article'",
      errors: [],
      options: enableOptions,
    },
    {
      filename: 'E:\\advanced-react\\src\\widgets\\pages\\anyPath',
      code: "import { useLocation } from 'react-router-dom'",
      errors: [],
      options: enableOptions,
    },
    {
      filename: 'E:\\advanced-react\\src\\app\\providers\\anyPath',
      code: "import { addCommentFormActions, addCommentFormReducer } from 'redux'",
      errors: [],
      options: enableOptions,
    },
    {
      filename: 'E:\\advanced-react\\src\\index.tsx\\anyPath',
      code: "import { StoreProvider } from '@/app/providers/StoreProvider';",
      errors: [],
      options: enableOptions,
    },
    {
      filename: 'E:\\advanced-react\\src\\entities\\Article.tsx\\anyPath',
      code: "import { StateSchema } from '@/app/providers/StoreProvider'",
      errors: [],
      options: enableOptions,
    },
  ],

  invalid: [
    {
      filename: 'E:\\advanced-react\\src\\entities\\anyPath',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/features/Article'",
      errors: [{ message: "Layer can import only [shared, entities] layers."}],
      options: enableOptions,
    },
    {
      filename: 'E:\\advanced-react\\src\\features\\anyPath',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/widgets/Article'",
      errors: [{ message: "Layer can import only [shared, entities] layers."}],
      options: enableOptions,
    },
    {
      filename: 'E:\\advanced-react\\src\\widgets\\anyPath',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/widgets/Article'",
      errors: [{ message: "Layer can import only [shared, entities, features] layers."}],
      options: enableOptions,
    },
  ],
});
