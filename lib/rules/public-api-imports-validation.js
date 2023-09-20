/**
 * @fileoverview Checks imports from other modules (allowed only from the public API)
 * @author PavloPichuzhkin
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */

const { shouldBeRelative } = require("../helpers");
const path = require("path");
const micromatch = require("micromatch");


module.exports = {
  meta: {
    type: null, // `problem`, `suggestion`, or `layout`
    docs: {
      description: "Checks imports from other modules (allowed only from the public API)",
      recommended: true,
      url: 'https://github.com/PavloPichuzhkin/eslint-plugin-project-fsd-architecture/blob/master/docs/rules/public-api-imports-validation.md',
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [
      {
        type: 'object',
        properties: {
          alias: {
            type: 'string'
          },
          testFilesPatterns: {
            type: 'array'
          }
        }
      }
    ],
  },

  create(context) {
    const { alias = '', testFilesPatterns = [] } = context.options[0] ?? {};

    const checkingLayers = {
      'entities': 'entities',
      'features': 'features',
      'pages': 'pages',
      'widgets': 'widgets',
    }

    return {
      ImportDeclaration(node) {
        const value = node.source.value
        const importSource =alias ? value.replace(`${alias}/`, '') : value;

        const currentFilePath = context.getFilename();

        if(shouldBeRelative(currentFilePath, importSource)) {
          return;
        }

        // [features, EditableProfileCard, model, selectors]
        const segments = importSource.split('/')
        const layer = segments[0];

        if(!checkingLayers[layer]) {
          return;
        }

        const isImportNotFromPublicApi = segments.length > 2;

        const normalizedPath = path.toNamespacedPath(currentFilePath);

        const isCurrentFileTesting = testFilesPatterns.some(
            pattern => micromatch.isMatch(normalizedPath, pattern)
        );

        if(isImportNotFromPublicApi && !isCurrentFileTesting) {
          context.report(node, 'Imports from other modules are only allowed from the public API (index.ts).');
        }

        // [features, EditableProfileCard, testing]
        const isTestingPublicApi = segments[2] === 'testing' && segments.length < 4;

        if(isCurrentFileTesting && !isTestingPublicApi && isImportNotFromPublicApi) {
            context.report(node, 'Test data should be imported from public API (testing.ts).');
          }
      }
    };
  },
};
