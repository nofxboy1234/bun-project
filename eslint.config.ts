import js from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReactRefresh from "eslint-plugin-react-refresh";
import { defineConfig } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier";
import pluginQuery from "@tanstack/eslint-plugin-query";
import pluginRouter from "@tanstack/eslint-plugin-router";

export default defineConfig(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    ignores: [
      "node_modules",
      "out",
      "dist",
      "*.tgz",
      "coverage",
      "*.lcov",
      "logs",
      "_.log",
      "report.[0-9]_.[0-9]_.[0-9]_.[0-9]_.json",
      ".env",
      ".env.development.local",
      ".env.test.local",
      ".env.production.local",
      ".env.local",
      ".eslintcache",
      ".cache",
      "*.tsbuildinfo",
      ".idea",
      ".DS_Store",
      "routeTree.gen.ts",
      "bun-project",
      "erd",
    ],
  },
  {
    ...pluginReact.configs.flat.recommended,
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    files: ["src/**/*.{js,jsx,ts,tsx}"],
    plugins: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      "react-hooks": pluginReactHooks as any,
      "react-refresh": pluginReactRefresh,
    },
    rules: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...(pluginReactHooks as any).configs.recommended.rules,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...(pluginReactRefresh as any).configs.vite.rules,
      "react/react-in-jsx-scope": "off",
    },
  },
  eslintConfigPrettier,
  ...pluginQuery.configs["flat/recommended"],
  ...pluginRouter.configs["flat/recommended"],
  {
    rules: {
      "@typescript-eslint/only-throw-error": [
        "error",
        {
          allow: [
            {
              from: "package",
              package: "@tanstack/router-core",
              name: "Redirect",
            },
          ],
        },
      ],
    },
  },
);
