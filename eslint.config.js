import { fixupPluginRules } from "@eslint/compat";
import eslint from "@eslint/js";
import legacyNextPlugin from "@next/eslint-plugin-next";
import eslintConfigPrettier from "eslint-config-prettier";
import compat from "eslint-plugin-compat";
import legacyImportPlugin from "eslint-plugin-import";
import reactPluginJsxRuntime from "eslint-plugin-react/configs/jsx-runtime";
import reactPluginRecommended from "eslint-plugin-react/configs/recommended";
import legacyHooksPlugin from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

const nextPlugin = fixupPluginRules(legacyNextPlugin);
const hooksPlugin = fixupPluginRules(legacyHooksPlugin);
const importPlugin = fixupPluginRules(legacyImportPlugin);

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  compat.configs["flat/recommended"],
  reactPluginRecommended,
  reactPluginJsxRuntime,
  eslintConfigPrettier,
  {
    plugins: {
      "react-hooks": hooksPlugin,
      "@next/next": nextPlugin,
      import: importPlugin,
    },

    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
      },
      globals: {
        ...globals.browser,
        ...globals.serviceworker,
      },
    },

    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
        },
        node: true,
      },
      "import/core-modules": [
        "bun",
        "bun:ffi",
        "bun:jsc",
        "bun:sqlite",
        "bun:test",
      ]
    },

    rules: {
      // Legacy shared config rules
      ...hooksPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      ...importPlugin.configs["recommended"].rules,
      ...importPlugin.configs["typescript"].rules,

      // DI-specific rules
      "object-shorthand": "error",
      "no-alert": "error",
      "no-console": "error",
      "no-debugger": "error",
      "no-else-return": "error",
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: {
            attributes: false,
          },
        },
      ],
      "@typescript-eslint/consistent-type-imports": "error",
      "no-magic-numbers": "off",
      "@typescript-eslint/no-magic-numbers": [
        "error",
        {
          ignoreEnums: true,
          ignoreNumericLiteralTypes: true,
          ignoreReadonlyClassProperties: true,
          ignoreTypeIndexes: true,
        }
      ],
      "@typescript-eslint/no-require-imports": "error",
      "@typescript-eslint/no-unnecessary-type-parameters": "error",
      "@typescript-eslint/no-unsafe-unary-minus": "error",
      "@typescript-eslint/no-unused-expressions": "error",
      "@typescript-eslint/no-use-before-define": "error",
      "@typescript-eslint/no-useless-template-literals": "error",
      "import/no-amd": "error",
      "import/no-commonjs": "error",
      "import/no-absolute-path": "error",
      "import/no-dynamic-require": "error",
      "import/no-self-import": "error",
      "import/no-useless-path-segments": "error",
      "import/order": [
        "error",
        { "newlines-between": "always", alphabetize: { order: "asc" } },
      ],
      "import/no-unresolved": "off",
    },
  }
);
