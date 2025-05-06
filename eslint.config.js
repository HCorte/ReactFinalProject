import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
    {
        ignores: ['dist'],
    },
    {
        files: ['**/*.{js,jsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parserOptions: {
                ecmaVersion: 'latest',
                ecmaFeatures: {
                    jsx: true,
                },
                sourceType: 'module',
            },
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        rules: {
            // Start with base rules from @eslint/js
            ...js.configs.recommended.rules,

            // Then override with your own formatting rules
            'indent': [
                'error',
                4,
                {
                    SwitchCase: 1,
                    FunctionDeclaration: {
                        body: 1,
                        parameters: 2,
                    },
                    flatTernaryExpressions: false,
                    ignoredNodes: ['TemplateLiteral *'],
                },
            ],
            'semi': ['error', 'always'],
            'object-curly-spacing': ['error', 'always'],
            'no-unused-vars': [
                'error',
                {
                    varsIgnorePattern: '^[A-Z_]',
                },
            ],
            'react-refresh/only-export-components': [
                'warn',
                {
                    allowConstantExport: true,
                },
            ],
            'quotes': 'off',
            'jsx-quotes': 'off',
            'quote-props': 'off',
        },
    },
];
