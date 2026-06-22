import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Reference template demos — kept as a component library, not shipped as
    // routes. They target older motion/lenis APIs and use placeholder content,
    // so we exclude them from lint/type-check and build production sections on
    // top of the clean primitives in components/ui/ instead.
    "components/stylish/**",
  ]),
]);

export default eslintConfig;
