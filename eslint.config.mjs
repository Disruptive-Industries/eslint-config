import compat from "eslint-plugin-compat";
import globals from "globals";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import reactRecommended from "eslint-plugin-react/configs/recommended.js";
import reactJSXRuntime from "eslint-plugin-react/configs/jsx-runtime.js";
import nextPlugin from "@next/eslint-plugin-next";
import hooksPlugin from "eslint-plugin-react-hooks";

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
    },

    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
      },
      globals: {
        ...globals.browser,
      },
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {
      // Legacy shared config rules
      ...hooksPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,

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
    },
  }
);
