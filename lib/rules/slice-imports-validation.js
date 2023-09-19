/**
 * @fileoverview checks imports within a module
 * @author PavloPichuzhkin
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
const path = require('path');
const {isPathRelative} = require("../helpers");

module.exports = {
  meta: {
    type: null, // `problem`, `suggestion`, or `layout`
    docs: {
      description: "Checks imports within a module",
      recommended: true,
      url: 'docs/slice-imports-validation.md', // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
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
          context.report(node, 'same slice - import should be relative');
        }
      }
    };
  },
};

const layers = {
  'entities': 'entities',
  'features': 'features',
  'shared': 'shared',
  'pages': 'pages',
  'widgets': 'widgets',
}

// import { getProfileForm } from '../../model/selectors/getProfileForm/getProfileForm';
// import { getProfileForm } from '@/features/EditableProfileCard/model/selectors/getProfileForm/getProfileForm';

// E:\advanced-react\src\features\EditableProfileCard\ui\EditableProfileCard\EditableProfileCard.tsx

function shouldBeRelative(toFile, from) {
  if(isPathRelative(from)) {
    return false;
  }

  const fromArray = from.split('/')
  const fromLayer = fromArray[0];
  const fromSlice = fromArray[1];

  if(!fromLayer || !fromSlice || !layers[fromLayer]) {
    return false;
  }

  const normalizedPath = path.toNamespacedPath(toFile);
  const projectSource = normalizedPath.split('src')[1];
  const projectSourceArray = projectSource.split('\\')

  const toLayer = projectSourceArray[1];
  const toSlice = projectSourceArray[2];

  if(!toLayer || !toSlice || !layers[toLayer]) {
    return false;
  }

  return fromSlice === toSlice && toLayer === fromLayer;
}


