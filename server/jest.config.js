/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@skyview/shared$": "<rootDir>/../packages/shared/src",
    "^@skyview/shared/(.*)$": "<rootDir>/../packages/shared/src/$1",
  },
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { tsconfig: "tsconfig.json" }],
  },
  testMatch: ["**/*.test.ts", "**/*.spec.ts"],
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/index.ts",
    "!src/app.ts",
    "!src/config/**",
    "!src/modules/**/api/**",
    "!src/modules/**/infrastructure/**",
  ],
}
