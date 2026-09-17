/**
 * Flat ESLint config.
 *
 * `next lint` is deprecated and disappears in Next 16, so this calls ESLint
 * directly (`npm run lint` -> `eslint .`). `eslint-config-next` still ships
 * only the legacy eslintrc shape, hence `FlatCompat` translating it — the
 * same arrangement create-next-app generates for Next 15.
 *
 * Pinned to ESLint 9 deliberately: eslint-config-next@15 declares no peer
 * support for ESLint 10. Revisit when this repo moves to Next 16.
 */
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
});

const config = [
  {
    ignores: [".next/**", "node_modules/**", "out/**", "next-env.d.ts"],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Conventional escape hatch: a leading underscore marks a binding that
      // exists for its position (a destructured field being skipped, an
      // ignored catch) rather than for its value.
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },
];

export default config;
