const path = require('path');
const {isPathRelative, shouldBeRelative} = require('../helpers');
const micromatch = require('micromatch');

module.exports = {
  meta: {
    type: null, // `problem`, `suggestion`, or `layout`
    docs: {
      description: "Checks imports from higher layer into layer below",
      recommended: true,
      url: 'https://github.com/PavloPichuzhkin/eslint-plugin-project-fsd-architecture/blob/master/docs/rules/layer-imports.md',
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [
      {
        type: 'object',
        properties: {
          alias: {
            type: 'string',
          },
          ignoreImportPatterns: {
            type: 'array',
          },
          testFilesPatterns: {
            type: 'array',
          }
        },
      }
    ],
  },

  create(context) {
    const layers = {
      'app': [ 'shared', 'entities', 'features', 'widgets', 'pages' ],
      'pages': [ 'shared', 'entities', 'features', 'widgets' ],
      'widgets': [ 'shared', 'entities', 'features' ],
      'features': [ 'shared', 'entities' ],
      'entities': [ 'shared', 'entities' ],
      'shared': ['shared'],
    }

    const availableLayers = {
      'app': 'app',
      'entities': 'entities',
      'features': 'features',
      'shared': 'shared',
      'pages': 'pages',
      'widgets': 'widgets',
    }


    const {
      alias = '',
      ignoreImportPatterns = [],
      testFilesPatterns = []
          } = context.options[0] ?? {};

    const getCurrentFileData = () => {
      const currentFilePath = context.getFilename(); //////////

      const normalizedCurrentFilePath = path.toNamespacedPath(currentFilePath);
      const projectPath = normalizedCurrentFilePath?.split('src')[1];
      const segments = projectPath?.split('\\')

      return {
        currentFileLayer: segments?.[1],
        currentFilePath,
        normalizedCurrentFilePath
    };
    }

    const getImportLayer = (value) => {
      const importPath = alias ? value.replace(`${alias}/`, '') : value;  ///////
      const segments = importPath?.split('/')

      return {importPath, importLayer: segments?.[0] }
    }

    return {
      ImportDeclaration(node) {
        const importPathValue = node.source.value
        const {currentFileLayer, currentFilePath, normalizedCurrentFilePath} = getCurrentFileData()
        const { importPath, importLayer } = getImportLayer(importPathValue)

        if(isPathRelative(importPath)) {
          return;
        }

        if(shouldBeRelative(currentFilePath, importPath)) { // case processes slice-imports-validation rule
          return;
        }

        if(!availableLayers[importLayer] || !availableLayers[currentFileLayer]) {
          return;
        }

        const isIgnored = ignoreImportPatterns.some(pattern => {
          return micromatch.isMatch(importPath, pattern)
        });

        const isCurrentFileTesting = testFilesPatterns.some(
            pattern => micromatch.isMatch(normalizedCurrentFilePath, pattern)
        );

        if(isIgnored || isCurrentFileTesting) {
          return;
        }

        if(!layers[currentFileLayer]?.includes(importLayer)) {
          context.report(node, `Layer can import only [${layers[currentFileLayer]?.join(', ')}] layers.`);
        }
      }
  };
  },
};
