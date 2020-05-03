module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  rules: {
    'react/jsx-props-no-spreading': 0,
    'react/prefer-stateless-function': 0,
    'react/sort-comp': 0,
    'max-len': 0,
    'linebreak-style': 0,
    'react/jsx-filename-extension': 0,
    'spaced-comment': 0,
    'class-methods-use-this': 0,
    'react/jsx-indent': ['error', 2],
    'react/jsx-indent-props': ['error', 2],
    'no-restricted-syntax': 0,
    'no-underscore-dangle': 0,
    // Allows <a href="#"></a>
    'jsx-a11y/anchor-is-valid': 0,
    'react/prop-types': 0,
    'react/forbid-prop-types': 0,
    'react/no-did-update-set-state': 0,
    'arrow-body-style': 0,
    'function-paren-newline': 0,
    // Allows i++
    'no-plusplus': 0,
    // Not needed as explained in: https://stackoverflow.com/questions/44437203/how-do-i-resolve-eslint-import-no-named-as-default
    'import/no-named-as-default': 0,
    // Don't enforce camelCase
    camelcase: 0,
    // Spreading arguments is needed when some arguments are accessed within func body
    'prefer-rest-params': 0,
    'arrow-parens': 0,
    'import/order': 0,
  },
  env: {
    browser: true,
  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
};