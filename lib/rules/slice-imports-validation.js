/**
 * @fileoverview checks imports within a module
 * @author PavloPichuzhkin
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */

const {shouldBeRelative, getNormalizedCurrentFilePath} = require("../helpers");
const path = require('path');


module.exports = {
  meta: {
    type: null, // `problem`, `suggestion`, or `layout`
    docs: {
      description: "Checks imports within a module",
      recommended: true,
      url: 'https://github.com/PavloPichuzhkin/eslint-plugin-project-fsd-architecture/blob/master/docs/rules/slice-imports-validation.md',
    },
    fixable: "code", // Or `code` or `whitespace`
    schema: [
      {
        type: 'object',
        properties: {
          alias: {
            type: 'string'
          }
        }
      }
    ], // Add a schema if the rule has options
  },

  create(context) {
    const alias = context.options[0]?.alias || '';

    return {
      ImportDeclaration(node) {
        const value = node.source.value
        const importSource =alias ? value.replace(`${alias}/`, '') : value;

        const importToFileName = context.getFilename();

        if(shouldBeRelative(importToFileName, importSource)) {
          context.report({
                node,
                message: 'same slice - import should be relative',
                fix: (fixer) => {
                  const normalizedPath = getNormalizedCurrentFilePath(importToFileName) // /entities/Article/Article.tsx
                      .split('/')
                      .slice(0, -1)
                      .join('/');
                  let relativePath = path.relative(normalizedPath, `/${importSource}`)
                      .split('\\')
                      .join('/');

                  if (!relativePath.startsWith('.')) {
                    relativePath = './' + relativePath;
                  }

                  return fixer.replaceText(node.source, `'${relativePath}'`)
                }
              });
        }
      }
    };
  },
};
