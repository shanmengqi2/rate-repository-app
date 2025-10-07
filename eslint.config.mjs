// @ts-check
/// <reference path="./types/eslint-plugin-react-native.d.ts" />

import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactNative from "eslint-plugin-react-native";
import jest from "eslint-plugin-jest";
import babelParser from "@babel/eslint-parser";

export default [
  js.configs.recommended,
  jest.configs["flat/recommended"],
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react,
      "react-native": reactNative,
      jest,
    },
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
    },
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      globals: {
        ...reactNative.environments["react-native"].globals,
      },
    },
  },
];
