import { fixupPluginRules } from "@eslint/compat";
import eslint from "@eslint/js";
import legacyNextPlugin from "@next/eslint-plugin-next";
import eslintConfigPrettier from "eslint-config-prettier";
import compat from "eslint-plugin-compat";
import legacyImportPlugin from "eslint-plugin-import";
import reactJSXRuntime from "eslint-plugin-react/configs/jsx-runtime.js";
import reactRecommended from "eslint-plugin-react/configs/recommended.js";
import legacyHooksPlugin from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

const nextPlugin = fixupPluginRules(legacyNextPlugin);
const hooksPlugin = fixupPluginRules(legacyHooksPlugin);
const importPlugin = fixupPluginRules(legacyImportPlugin);

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  compat.configs["flat/recommended"],
  reactRecommended,
  reactJSXRuntime,
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
    },

    rules: {
      // Legacy shared config rules
      ...hooksPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      ...importPlugin.configs["recommended"].rules,
      ...importPlugin.configs["typescript"].rules,

      // DI-specific rules
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: {
            attributes: false,
          },
        },
      ],
      "@typescript-eslint/consistent-type-imports": "error",
      "object-shorthand": "error",
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
    },
  }
);
